import { Events } from "../Interfaces";
import config from "../config.json";
import {EmbedBuilder} from "discord.js";

import db from "croxydb";

export const Event : Events = {
    name: "messageCreate",
    once: false,

    run: (client, message) => {
            if(message.author.bot) return;
            if(!message.guild) return;
            if(!message.content.startsWith(config.prefix)) return;

            const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
            const cmd = client.commands.get(args.shift().toLowerCase());

            if(cmd) {
                const zenci: any = db.fetch(`zenciler`);
 
                if(zenci.includes(message.author.id)){
                 message.reply({
                    embeds: [
                        new EmbedBuilder()
                            .setImage("https://cdn.discordapp.com/attachments/1075001880024985660/1075106650001788979/tumblr_e47c644c45e9750985a1d2c1015ebfe7_25eac1c2_1280.png")
                            .setDescription("Blacklistesin orospu evladı")
                                    
                    ]
                    
                    
               })
               return;
            }
             
            return cmd.run(client, message, args)
    }
}
    
}