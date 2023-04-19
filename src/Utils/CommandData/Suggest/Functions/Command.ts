import { ChannelSelectMenuBuilder, Colors, Message, ThreadAutoArchiveDuration } from "discord.js";
import {
  deleteSuggestions,
  getSuggestionsChannel,
  getSuggestionsCount,
  getSuggestions,
  getSuggestionsStatus,
  overwriteSuggestions,
  setSuggestions,
} from "../../../Database/Suggestions";
import { DBServerSuggestion } from "../../../Database/Suggestion";
import { getServer, setServer } from "../../../Database/Server";
import { getEmbed, replyMessage } from "../../../Interactions";
import {
  durumYok,
  kanalAyarBaşarı,
  kanalDurum,
  kanalGeçersizHata,
  kanalIdHata,
  kanalKapalıHata,
  kanalYok,
  mesajYok,
  sistemAçBaşarı,
  sistemDurum,
  sistemKapalıHata,
  sistemKapatBaşarı,
  sistemSilBaşarı,
  yetkiAyarlaBaşarı,
  yetkiSilBaşarı,
  yetkiSunucuSahibiHata,
  yetkiYanlışHata,
  öneriOluşturBaşarı,
} from "../Constants/Messages";
import { checkMessagePerm, createSuggestionEmbed, createSuggestionMessageData, createSuggestionTitle } from "./Helpers";
import { suggestRow } from "../Constants/Rows";

export async function requestSuggestion(message: Message, args: string[]): Promise<any> {
  const kanalId = getSuggestionsChannel(message.guildId);
  if (!kanalId) return replyMessage(message, getEmbed(kanalKapalıHata, Colors.Red));

  const durum = getSuggestionsStatus(message.guildId);
  if (durum === false) return replyMessage(message, getEmbed(sistemKapalıHata, Colors.Red));

  if (!args.length) return replyMessage(message, getEmbed(mesajYok, Colors.Red));
  const öneriMesaj = args.join(" ");

  const kanal = await message.guild?.channels.fetch(kanalId).catch();
  if (!kanal || !kanal.isTextBased()) return replyMessage(message, getEmbed(kanalGeçersizHata));

  const suggestionNumber = getSuggestionsCount(message.guildId) + 1;
  const suggestionMessage = await kanal.send({
    embeds: [createSuggestionEmbed(öneriMesaj, createSuggestionTitle(suggestionNumber), message)],
  });
  await suggestionMessage.edit({ components: [suggestRow(suggestionMessage.id)] });

  const threadChannel = await suggestionMessage.startThread({
    name: createSuggestionTitle(suggestionNumber),
    autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
  });

  const serverData = getServer(`${message.guildId}`, true);
  const serverSuggestions = getSuggestions(`${message.guildId}`, true);
  const newUser: DBServerSuggestion = {
    userId: message.author.id,
    suggestion: öneriMesaj,
    accepts: [],
    denies: [],
    messageId: suggestionMessage.id,
    suggestionId: suggestionNumber,
    messageUrl: suggestionMessage.url,
  };
  serverData.suggestions = {
    ...serverSuggestions,
    last: suggestionNumber,
    list: [...(serverSuggestions.list ?? []), newUser],
  };
  setServer(`${message.guildId}`, serverData);

  return replyMessage(
    message,
    getEmbed(
      öneriOluşturBaşarı
        .replace("{0}", kanal.toString())
        .replace("{1}", `[öneri](${suggestionMessage.url})`)
        .replace("{2}", threadChannel.toString()),
      Colors.Green
    )
  );
}

export async function changeStatus(message: Message, args: string[]): Promise<any> {
  if (!checkMessagePerm(message)) return;
  if (!args.length) {
    const status = getServer(message.guildId as string, true)?.suggestions?.status;
    return replyMessage(
      message,
      getEmbed(durumYok, Colors.Red).setFooter({
        text: sistemDurum.replace(
          "{0}",
          status === true ? "Açık" : status === undefined ? "Açık (ayarlanmamış)" : "Kapalı"
        ),
      })
    );
  }
  const [durum] = args;
  switch (durum) {
    case "aç": {
      overwriteSuggestions(`${message.guildId}`, { status: true });
      return replyMessage(message, getEmbed(sistemAçBaşarı, Colors.Green));
    }
    case "kapat": {
      overwriteSuggestions(`${message.guildId}`, { status: false });
      return replyMessage(message, getEmbed(sistemKapatBaşarı, Colors.Green));
    }
    case "sil": {
      deleteSuggestions(`${message.guildId}`);
      return replyMessage(message, getEmbed(sistemSilBaşarı, Colors.Gold));
    }
    default:
      return replyMessage(message, getEmbed(durumYok, Colors.Red));
  }
}

export async function setChannel(message: Message, args: string[]): Promise<any> {
  if (!checkMessagePerm(message)) return;
  if (!args.length) {
    const channel = getServer(message.guildId as string, true)?.suggestions?.channel;
    return replyMessage(
      message,
      getEmbed(kanalYok, Colors.Red).setFooter({
        text: kanalDurum.replace("{0}", channel ? `<#${channel}>` : "Ayarlanmamış"),
      })
    );
  }
  const [kanalId] = args;

  if (!/^(\d{18,19}|<#\d{18,19}>)$/.test(kanalId)) return replyMessage(message, getEmbed(kanalIdHata, Colors.Red));

  const yeniId = kanalId.startsWith("<") ? kanalId.slice(2, -1) : kanalId;
  const kanal = await message.guild?.channels.fetch(yeniId).catch();
  if (!kanal || !kanal.isTextBased()) return replyMessage(message, getEmbed(kanalYok));

  overwriteSuggestions(`${message.guildId}`, { channel: yeniId });
  return replyMessage(message, getEmbed(kanalAyarBaşarı.replace("{0}", kanal.toString()), Colors.Green));
}

export async function setAdminRole(message: Message, args: string[]): Promise<any> {
  const serverId = message.guildId as string;
  const suggestions = getSuggestions(serverId, true);
  const { adminPerm, ...others } = suggestions;

  if (message.member?.id !== message.guild?.ownerId)
    return replyMessage(message, getEmbed(yetkiSunucuSahibiHata, Colors.Red));

  const [perm] = args;
  const messageList = [];

  if (perm) {
    if (!/^(\d{18,19}|<@&\d{18,19}>)$/.test(perm)) return replyMessage(message, getEmbed(yetkiYanlışHata, Colors.Red));
    const newPerm = perm.startsWith("<") ? perm.slice(3, -1) : perm;
    overwriteSuggestions(serverId, { adminPerm: newPerm });
    messageList.push(yetkiAyarlaBaşarı.replace("{0}", `<@&${newPerm}>`));
  } else {
    setSuggestions(serverId, others);
    messageList.push(yetkiSilBaşarı);
  }

  return replyMessage(message, getEmbed(messageList.join("\n"), Colors.Green));
}
