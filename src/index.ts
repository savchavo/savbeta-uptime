import chalk from "chalk";
import { IntentsBitField } from "discord.js";
import { RomanBot } from "./Client";

const client = new RomanBot({
    intents: [
        IntentsBitField.Flags.GuildMembers,
        IntentsBitField.Flags.GuildMessages,
        IntentsBitField.Flags.GuildMessageReactions,
        IntentsBitField.Flags.GuildModeration,
        IntentsBitField.Flags.MessageContent,
        IntentsBitField.Flags.Guilds,
    ],
    allowedMentions: {
        parse: ["everyone", "roles", "users"]


    },
});

client.init();