


import {
  ButtonInteraction,
  ColorResolvable,
  Colors,
  CommandInteraction,
  EmbedBuilder,
  InteractionReplyOptions,
  Message,
  MessageReplyOptions,
  ModalSubmitInteraction,
} from "discord.js";

export function getEmbed(description?: string, color?: ColorResolvable): EmbedBuilder {
  return new EmbedBuilder().setColor(color ?? null).setDescription(description ?? null);
}

export async function replyMessage(
  message: Message,
  messageData: string | EmbedBuilder | EmbedBuilder[],
  options: MessageReplyOptions = {}
): Promise<void> {
  const data: MessageReplyOptions = {
    embeds: Array.isArray(messageData)
      ? messageData
      : [
          typeof messageData === "string"
            ? new EmbedBuilder().setColor(Colors.Blue).setDescription(messageData)
            : messageData,
        ],
    ...options,
  };

  message.reply({ allowedMentions: { parse: [] }, ...data });
}

export async function replyInteraction(
  interaction: ButtonInteraction | ModalSubmitInteraction | CommandInteraction,
  messageData?: string | EmbedBuilder | EmbedBuilder[],
  options: InteractionReplyOptions = {}
): Promise<void> {
  const data: InteractionReplyOptions = {
    embeds: messageData
      ? Array.isArray(messageData)
        ? messageData
        : [
            typeof messageData === "string"
              ? new EmbedBuilder().setColor(Colors.Blue).setDescription(messageData)
              : messageData,
          ]
      : [],
    ...options,
  };

  interaction.reply({ allowedMentions: { parse: [] }, ...data });
}
