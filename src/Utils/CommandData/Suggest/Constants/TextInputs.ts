import { TextInputBuilder, TextInputStyle } from "discord.js";

export function adminDenyReasonInput(messageId: string) {
  return new TextInputBuilder()
    .setCustomId(`suggest-deny-reason:${messageId}`)
    .setLabel("Sebep")
    .setPlaceholder("Örnek: Gereksiz öneri")
    .setMaxLength(500)
    .setStyle(TextInputStyle.Paragraph)
    .setRequired(false);
}
