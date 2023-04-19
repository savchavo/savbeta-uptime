import { ClientEvents } from "discord.js";
import { RomanBot } from "../Client";

export interface Events {
    name: keyof ClientEvents,
    once: boolean,
    run: (client: RomanBot, ...args: any) => Promise<any> | any;
}