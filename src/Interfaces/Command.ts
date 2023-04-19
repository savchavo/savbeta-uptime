import { RomanBot } from "../Client"
import { Message } from "discord.js";

export interface Commands {
    name: string,
    description: string,
    run: (client: RomanBot, message : Message, args: string[]) => Promise<any> | any;
}