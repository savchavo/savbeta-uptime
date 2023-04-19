import { Commands } from "../Interfaces"
import db from "croxydb";
import { EmbedBuilder, ActionRowBuilder, ChannelType, ButtonBuilder } from "discord.js"

export const Command: Commands = {
 name: "karşıla",
 description: "Sunucuna gelen üyeleri karşıla.",
 async run(client, message, args) {

    if (!message.member?.permissions.has('BanMembers')) return message.reply("Bu komutu kullanmak için yeterli yetkiye sahip değilsiniz.");
    const karsilama: { channel: string } = db.fetch(`karsilama_${message.guild?.id}`);
    if(!karsilama) {
        const channel = message.mentions.channels.first() || message.channel;

        if(channel && channel.type === ChannelType.GuildText) {
            db.set(`karsilama_${message.guild?.id}`, { channel: channel.id });
           
    
   


            return message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor("Green")
                    .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.avatarURL()}` })
                    .setTitle("✅ İşlem başarılı")
                    .setDescription(`> Karşılama kanalı başarıyla \` #${channel.name} \` olarak aktif ettiniz.`)
                    .setFooter({ text: `${client.user?.username}`, iconURL: `${client.user?.avatarURL()}` })
                ]
            })
        }
    } else {
            db.delete(`karsilama_${message.guild?.id}`, true);

            return message.reply({
                embeds: [
                    new EmbedBuilder()
                    .setColor("Red")
                    .setAuthor({ name: `${message.author.username}`, iconURL: `${message.author.avatarURL()}` })
                    .setTitle("✅ Veri silme işlemi başarılı")
                    .setDescription(`> Karşılama işlemini başarıyla \` de-aktif \` ettiniz.`)
                    .setFooter({ text: `${client.user?.username}`, iconURL: `${client.user?.avatarURL()}` })
                ]
            })
    }

 }
}
