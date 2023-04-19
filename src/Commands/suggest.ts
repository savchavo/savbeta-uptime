import { Colors } from "discord.js";
import { Commands } from "../Interfaces";
import { seçenekBelirt } from "../Utils/CommandData/Suggest/Constants/Messages";
import {
  changeStatus,
  requestSuggestion,
  setAdminRole,
  setChannel,
} from "../Utils/CommandData/Suggest/Functions/Command";
import { getEmbed, replyMessage } from "../Utils/Interactions";

export const Command: Commands = {
  name: "suggest",
  description: "Öneri sistemi",
  async run(client, message, args) {
    const [firstArg, ...otherArgs] = args;

    switch (firstArg) {
      case "iste":
        return requestSuggestion(message, otherArgs);
      case "durum":
        return changeStatus(message, otherArgs);
      case "kanal":
        return setChannel(message, otherArgs);
      case "yetkili":
        return setAdminRole(message, otherArgs);
      default:
        return replyMessage(message, getEmbed(seçenekBelirt, Colors.Red));
    }
  },
};
