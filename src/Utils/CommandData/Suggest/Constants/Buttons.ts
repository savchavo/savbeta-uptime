
import { ButtonBuilder, ButtonStyle } from "discord.js";

export function acceptButton(messageId: string) {
  return new ButtonBuilder()
    .setCustomId(`suggest-accept:${messageId}`)
    .setLabel("Destekliyorum")
    .setEmoji("🔼")
    .setStyle(ButtonStyle.Success);
}
export function denyButton(messageId: string) {
  return new ButtonBuilder()
    .setCustomId(`suggest-deny:${messageId}`)
    .setLabel("Desteklemiyorum")
    .setEmoji("🔽")
    .setStyle(ButtonStyle.Danger);
}

export function adminButton(messageId: string) {
  return new ButtonBuilder().setCustomId(`suggest-admin:${messageId}`).setEmoji("⚙️").setStyle(ButtonStyle.Secondary);
}
export function adminAcceptButton(messageId: string) {
  return new ButtonBuilder()
    .setCustomId(`suggest-admin-accept:${messageId}`)
    .setEmoji("✅")
    .setLabel("Onayla")
    .setStyle(ButtonStyle.Success);
}

export function adminDenyButton(messageId: string) {
  return new ButtonBuilder()
    .setCustomId(`suggest-admin-deny:${messageId}`)
    .setEmoji("✖️")
    .setLabel("Reddet")
    .setStyle(ButtonStyle.Danger);
}

export function gotoSuggestionButton(messageId: string, messageUrl: string) {
  return new ButtonBuilder().setStyle(ButtonStyle.Link).setURL(messageUrl).setLabel("Öneriye Git");
}
