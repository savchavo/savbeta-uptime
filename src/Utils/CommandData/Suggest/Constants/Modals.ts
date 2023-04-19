import { ModalBuilder } from "discord.js";
import { adminDenyRow } from "./Rows";

export function adminDenyModal(messageId: string) {
  return new ModalBuilder()
    .setCustomId(`suggest-admin-deny-reason:${messageId}`)
    .setTitle("Öneriyi Reddet")
    .addComponents(adminDenyRow(messageId));
}
