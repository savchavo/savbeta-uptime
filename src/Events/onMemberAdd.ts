import { Events } from "../Interfaces"
import { GuildMember, Message, ChannelType } from "discord.js"
import db from "croxydb";

export const Event: Events = {
    name: "guildMemberAdd",
    once: false,

    async run(client, member: GuildMember) {
        const karsilama: { channel: string } = db.fetch(`karsilama_${member.guild.id}`);

        if(karsilama) {
            const channel = member.guild.channels.cache.get(karsilama.channel);

            if(channel && channel.type === ChannelType.GuildText) {
                
                channel.send(`🗳 **|** Hoşgeldin **${member.user.username}**, sunucumuza gelmekten mutluluk duyarız 🎉`)
            }
        }
    },
}