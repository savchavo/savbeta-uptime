import { Commands } from "../Interfaces";
import { codeBlock, EmbedBuilder } from "discord.js";

import db from "croxydb";

export const Command : Commands = {
    name: "blacklist",
    description: "Kullanıcıları kara listeye ekleme/çıkarma yapabilirsiniz",

    async run(client, message, args) {
        const myValue : string = args[0];

        if(!client.config.developers.includes(message.author.id)) {
            message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription("<:arp:1075001795971125321>Bunu yapabilmek için developers rolun gerekli.") 
                ]
               })
               
               return;
        }

        if(myValue === "ekle") {
            const id : string = args[1];
        
           db.push(`zenciler`, `${id}`)
           message.reply({
            embeds: [
                new EmbedBuilder()
                .setDescription("<:tik:1075001793223860325>Kullanıcı başarıyla kara listeye eklendi")
            ]
           })
        } else if(myValue === "çıkar") {
            const id : string = args[1];
        
            db.unpush(`zenciler`, id)

            message.reply({
             embeds: [
                 new EmbedBuilder()
                 .setDescription("<:tik:1075001793223860325>Kullanıcı başarıyla kara listeden çıkarıldı.")
             ]
            })
        } else if(myValue === "list") {

            message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setDescription(db.fetch(`zenciler`).map((x: string) => `<@${x}>`).join("\n") || "Veritabanı boş.")//denıyom dc bak
                ] 
            })// message send ????
        }
    }
} 