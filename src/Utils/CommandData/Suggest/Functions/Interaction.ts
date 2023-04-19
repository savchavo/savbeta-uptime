import { ButtonInteraction, Colors, escapeMarkdown, ModalSubmitInteraction } from "discord.js";
import {
  addSuggestionDenyer,
  addSuggestionSupporter,
  checkSuggestionDenyer,
  checkSuggestionSupporter,
  getSuggestion,
  getUserSuggestions,
  removeSuggestionDenyer,
  removeSuggestionSupporter,
  setActionAdmin,
} from "../../../Database/Suggestion";
import { isSuggestionsUsable } from "../../../Database/Suggestions";
import { getEmbed, replyInteraction } from "../../../Interactions";
import {
  destekBaşarı,
  destekKaldır,
  destekKendin,
  destekUyarı,
  dmZatenHata,
  dmÖneriHata,
  dmÖneriKabulBaşarı,
  dmÖneriRedBaşarı,
  redBaşarı,
  redKaldır,
  redKendin,
  redUyarı,
  sistemYokHata,
} from "../Constants/Messages";
import { adminDenyModal } from "../Constants/Modals";
import { adminRow, suggestDmRow } from "../Constants/Rows";
import {
  checkInteractionPerm,
  createSuggestionFailedEmbed,
  createSuggestionSuccessEmbed,
  getSuggestionEmbed,
  parseInteractionId,
} from "./Helpers";

export async function acceptSuggestion(interaction: ButtonInteraction): Promise<any> {
  const serverId = interaction.guildId as string;

  if (!isSuggestionsUsable(serverId)) {
    return replyInteraction(interaction, getEmbed(sistemYokHata, Colors.Red), { ephemeral: true });
  }
  const suggestionMessage = interaction.message;
  const userId = interaction.user.id;

  if (getUserSuggestions(serverId, userId).find((suggestion) => suggestion.messageId === suggestionMessage.id)) {
    return replyInteraction(interaction, getEmbed(destekKendin, Colors.Yellow), { ephemeral: true });
  }

  const supporterData = [serverId, suggestionMessage.id, userId] as const;
  const client = interaction.client;
  const messageList = [];

  if (checkSuggestionSupporter(...supporterData)) {
    removeSuggestionSupporter(...supporterData);
    messageList.push(destekKaldır.replace("{0}", suggestionMessage.url));
  } else {
    addSuggestionSupporter(...supporterData);
    if (checkSuggestionDenyer(...supporterData)) {
      removeSuggestionDenyer(...supporterData);
      messageList.push(destekUyarı);
    }
    messageList.push(destekBaşarı.replace("{0}", suggestionMessage.url));
  }

  suggestionMessage.edit({ embeds: [await getSuggestionEmbed(client, serverId, suggestionMessage.id)] });
  return replyInteraction(interaction, getEmbed(messageList.join("\n"), Colors.Green), { ephemeral: true });
}

export async function denySuggestion(interaction: ButtonInteraction): Promise<any> {
  const serverId = interaction.guildId as string;

  if (!isSuggestionsUsable(serverId)) {
    return replyInteraction(interaction, getEmbed(sistemYokHata, Colors.Red), { ephemeral: true });
  }
  const suggestionMessage = interaction.message;
  const userId = interaction.user.id;

  if (getUserSuggestions(serverId, userId).find((suggestion) => suggestion.messageId === suggestionMessage.id)) {
    return replyInteraction(interaction, getEmbed(redKendin, Colors.Yellow), { ephemeral: true });
  }

  const denyerData = [serverId, suggestionMessage.id, userId] as const;
  const client = interaction.client;
  const messageList = [];

  if (checkSuggestionDenyer(...denyerData)) {
    removeSuggestionDenyer(...denyerData);
    messageList.push(redKaldır.replace("{0}", suggestionMessage.url));
  } else {
    addSuggestionDenyer(...denyerData);
    if (checkSuggestionSupporter(...denyerData)) {
      removeSuggestionSupporter(...denyerData);
      messageList.push(redUyarı);
    }
    messageList.push(redBaşarı.replace("{0}", suggestionMessage.url));
  }

  suggestionMessage.edit({ embeds: [await getSuggestionEmbed(client, serverId, suggestionMessage.id)] });
  return replyInteraction(interaction, getEmbed(messageList.join("\n"), Colors.Green), { ephemeral: true });
}

export async function openAdminPanel(interaction: ButtonInteraction): Promise<any> {
  if (!checkInteractionPerm(interaction)) return;
  return replyInteraction(interaction, undefined, {
    components: [adminRow(parseInteractionId(interaction))],
    ephemeral: true,
  });
}

export async function acceptSuggestionAdmin(interaction: ButtonInteraction): Promise<any> {
  if (!checkInteractionPerm(interaction)) return;
  const serverId = interaction.guildId as string;
  const messageId = parseInteractionId(interaction);
  const suggestion = getSuggestion(serverId, messageId, true);
  if (suggestion.actionAdminId)
    return replyInteraction(interaction, getEmbed(dmZatenHata, Colors.Red), { ephemeral: true });
  const adminId = interaction.user.id;
  const client = interaction.client;
  try {
    const userDm = await (await client.users.fetch(suggestion.userId)).createDM();
    userDm.send({
      embeds: [await createSuggestionSuccessEmbed(client, serverId, messageId, interaction.user.id)],
      components: [suggestDmRow(messageId, suggestion.messageUrl)],
    });
    setActionAdmin(serverId, messageId, adminId);
    return replyInteraction(interaction, getEmbed(dmÖneriKabulBaşarı, Colors.Green), { ephemeral: true });
  } catch (error) {
    console.error(error);
    return replyInteraction(interaction, getEmbed(dmÖneriHata, Colors.Red), { ephemeral: true });
  }
}

export async function denySuggestionAdmin(interaction: ButtonInteraction): Promise<any> {
  if (!checkInteractionPerm(interaction)) return;
  const serverId = interaction.guildId as string;
  const messageId = parseInteractionId(interaction);
  const suggestion = getSuggestion(serverId, messageId, true);
  if (suggestion.actionAdminId)
    return replyInteraction(interaction, getEmbed(dmZatenHata, Colors.Red), { ephemeral: true });
  return interaction.showModal(adminDenyModal(parseInteractionId(interaction)));
}

export async function denySuggestionAdminWithReason(interaction: ModalSubmitInteraction): Promise<any> {
  if (!checkInteractionPerm(interaction)) return;
  const serverId = interaction.guildId as string;
  const messageId = parseInteractionId(interaction);
  const suggestion = getSuggestion(serverId, messageId, true);
  if (suggestion.actionAdminId)
    return replyInteraction(interaction, getEmbed(dmZatenHata, Colors.Red), { ephemeral: true });
  const adminId = interaction.user.id;
  const client = interaction.client;
  const reason = interaction.fields.getTextInputValue(`suggest-deny-reason:${parseInteractionId(interaction)}`);
  try {
    const userDm = await (await client.users.fetch(suggestion.userId)).createDM();
    userDm.send({
      embeds: [
        await createSuggestionFailedEmbed(client, serverId, messageId, interaction.user.id, reason || "Belirtilmedi."),
      ],
      components: [suggestDmRow(messageId, suggestion.messageUrl)],
    });
    setActionAdmin(serverId, messageId, adminId);
    return replyInteraction(interaction, getEmbed(dmÖneriRedBaşarı, Colors.Green), { ephemeral: true });
  } catch (error) {
    console.error(error);
    return replyInteraction(interaction, getEmbed(dmÖneriHata, Colors.Red), { ephemeral: true });
  }
}
