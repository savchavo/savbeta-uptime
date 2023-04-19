import {
  ButtonInteraction,
  Client,
  Colors,
  EmbedBuilder,
  escapeMarkdown,
  Guild,
  GuildMember,
  Message,
  ModalSubmitInteraction,
} from "discord.js";
import { getSuggestion } from "../../../Database/Suggestion";
import { getSuggestionsAdminPerm } from "../../../Database/Suggestions";
import { getEmbed, replyInteraction, replyMessage } from "../../../Interactions";
import {
  dmÖneriKabulBaşlık,
  dmÖneriKabulYetkili,
  dmÖneriNumara,
  dmÖneriRedBaşlık,
  dmÖneriRedSebep,
  dmÖneriRedYetkili,
  dmÖneriSunucu,
  yetkiRolEksikHata,
  yetkisizHata,
} from "../Constants/Messages";
import { suggestRow } from "../Constants/Rows";

export function createSuggestionEmbed(suggestionMessage: string, suggestionTitle: string, message: Message) {
  return getEmbed(suggestionMessage, Colors.Green)
    .setAuthor({ name: message.author.tag, iconURL: message.author.displayAvatarURL() })
    .setTitle(suggestionTitle)
    .setFooter({ text: `🔼 0 kişi destekliyor | 🔽 0 kişi desteklemiyor` });
}

export function parseInteractionId(
  interactionId: string | ButtonInteraction | ModalSubmitInteraction | Message
): string {
  const id =
    typeof interactionId === "string"
      ? interactionId
      : interactionId instanceof Message
      ? interactionId.id
      : interactionId.customId;
  const messageId = id.split(":").at(-1);
  if (!messageId) throw new Error("Eksik id girildi.");
  return messageId;
}

export function stringStartSwitch<RunWith extends unknown[] = []>(
  str: string,
  cases: [Str: string, Func: (...data: RunWith) => unknown][],
  runWith?: RunWith
): void {
  for (const [caseStr, caseFunc] of cases) {
    const runData = runWith ?? ([] as unknown[] as RunWith);
    if (str.startsWith(caseStr)) return void caseFunc(...runData);
  }
}

export async function createSuggestionSuccessEmbed(
  client: Client,
  serverId: string,
  messageId: string,
  adminId: string
): Promise<EmbedBuilder> {
  const suggestion = getSuggestion(serverId, messageId, true);
  const author = await client.users.fetch(suggestion.userId);
  const admin = await client.users.fetch(adminId);
  const server = client.guilds.cache.get(serverId) as Guild;
  const description = [
    dmÖneriNumara.replace("{0}", suggestion.suggestionId.toString()),
    dmÖneriSunucu.replace("{0}", server.name),
    dmÖneriKabulYetkili.replace("{0}", escapeMarkdown(admin.tag)),
  ].join("\n");

  return getEmbed(description, Colors.Green).setAuthor({
    name: dmÖneriKabulBaşlık,
    iconURL: author.displayAvatarURL(),
  });
}

export async function createSuggestionFailedEmbed(
  client: Client,
  serverId: string,
  messageId: string,
  adminId: string,
  reason: string
): Promise<EmbedBuilder> {
  const suggestion = getSuggestion(serverId, messageId, true);
  const author = await client.users.fetch(suggestion.userId);
  const admin = await client.users.fetch(adminId);
  const server = client.guilds.cache.get(serverId) as Guild;
  const description = [
    dmÖneriNumara.replace("{0}", suggestion.suggestionId.toString()),
    dmÖneriSunucu.replace("{0}", server.name),
    dmÖneriRedYetkili.replace("{0}", escapeMarkdown(admin.tag)),
    dmÖneriRedSebep.replace("{0}", escapeMarkdown(reason)),
  ].join("\n");

  return getEmbed(description, Colors.Red).setAuthor({
    name: dmÖneriRedBaşlık,
    iconURL: author.displayAvatarURL(),
  });
}

export async function getSuggestionEmbed(client: Client, serverId: string, messageId: string) {
  const suggestion = getSuggestion(serverId, messageId, true);
  const acceptSize = suggestion.accepts.length;
  const denySize = suggestion.denies.length;
  const suggestionMessage = suggestion.suggestion;
  const suggestionTitle = createSuggestionTitle(suggestion.suggestionId);
  const user = await client.users.fetch(suggestion.userId);
  return getEmbed(suggestionMessage, Colors.Green)
    .setAuthor({ name: user.tag, iconURL: user.displayAvatarURL() })
    .setTitle(suggestionTitle)
    .setFooter({ text: `🔼 ${acceptSize} kişi destekliyor | 🔽 ${denySize} kişi desteklemiyor` });
}

export function createSuggestionTitle(suggestionNumber: number): string {
  return `✨ Öneri #${suggestionNumber}`;
}

export function createSuggestionMessageData(suggestionText: string, suggestionNumber: number, message: Message) {
  return {
    embeds: [createSuggestionEmbed(suggestionText, createSuggestionTitle(suggestionNumber), message)],
    components: [suggestRow(parseInteractionId(message))],
  };
}

export function checkMessagePerm(message: Message): boolean {
  const serverId = message.guildId as string;
  const isAdmin = message.member?.permissions.has("Administrator", true);
  const adminPerm = getSuggestionsAdminPerm(serverId);

  if (message.member?.id === message.guild?.ownerId) return true;
  if (!adminPerm && !isAdmin) {
    replyMessage(message, getEmbed(yetkisizHata, Colors.Red));
    return false;
  }
  if (adminPerm && !message.member?.roles.cache.has(adminPerm)) {
    replyMessage(message, getEmbed(yetkiRolEksikHata, Colors.Red));
    return false;
  }

  return true;
}

export function checkInteractionPerm(interaction: ButtonInteraction | ModalSubmitInteraction): boolean {
  const serverId = interaction.guildId as string;
  const member = interaction.member as GuildMember;
  const isAdmin = member.permissions.has("Administrator", true);
  const adminPerm = getSuggestionsAdminPerm(serverId);

  if (member.id === interaction.guild?.ownerId) return true;
  if (!adminPerm && !isAdmin) {
    replyInteraction(interaction, getEmbed(yetkisizHata, Colors.Red), { ephemeral: true });
    return false;
  }
  if (adminPerm && !member.roles.cache.has(adminPerm)) {
    replyInteraction(interaction, getEmbed(yetkiRolEksikHata, Colors.Red), { ephemeral: true });
    return false;
  }

  return true;
}
