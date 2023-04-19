import { ActionRowBuilder, ButtonBuilder, TextInputBuilder } from "discord.js";
import {
  acceptButton,
  adminAcceptButton,
  adminDenyButton,
  adminButton,
  denyButton,
  gotoSuggestionButton,
} from "./Buttons";
import { adminDenyReasonInput } from "./TextInputs";

export function suggestRow(messageId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(
    acceptButton(messageId),
    denyButton(messageId),
    adminButton(messageId)
  );
}
export function adminRow(messageId: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(adminAcceptButton(messageId), adminDenyButton(messageId));
}
export function adminDenyRow(messageId: string) {
  return new ActionRowBuilder<TextInputBuilder>().addComponents(adminDenyReasonInput(messageId));
}

export function suggestDmRow(messageId: string, messageUrl: string) {
  return new ActionRowBuilder<ButtonBuilder>().addComponents(gotoSuggestionButton(messageId, messageUrl));
}
