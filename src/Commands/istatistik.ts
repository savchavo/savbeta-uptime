import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, codeBlock } from "discord.js";
import { Commands } from "../Interfaces";

export const Command: Commands = {
    name: "istatistik",
    description: "Sav Beta'nın istatistiklerini öğrenerek birkaç bilgi elde etmiş olabilirsin.",

    async run(client, message, args) {
       

       return message.reply({
            embeds: [
                new EmbedBuilder()
                .setColor("#2F3136")
                .setAuthor({ name: message.author.username, iconURL: `${message.author.avatarURL() || client.user?.avatarURL()}` })
                .setTitle(`Sav Beta'nın istatistik değerleri.`)
                .setDescription(`> Sav Beta'nın istatistik bilgilerini burada görüntüleyebilir, inceleyebilirsiniz.`)
                .addFields([
                    {
                        name: "Sunucu sayısı;",
                        value: `${codeBlock("yaml",`${client.guilds.cache.size.toFixed()}`)}`,
                        inline: false
                    },
                    {
                        name: "Kullanıcı sayısı;",
                        value: `${codeBlock("yaml", `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0).toFixed()}`)}`,
                        inline: false
                    },
                    {
                        name: "Diğer bilgiler;",
                        value: `
                        Node.js: \` ${process.versions.node} \`
                        Typescript: \`4.9.5\`
                        SavBot: \`0.0.2\`
                        `,
                        inline: false
                    },
                ])
                .setFooter({ text: `Bizi tercih ettiğiniz için teşekkürler!`, iconURL: `${client.user?.avatarURL()}` })
                .setTimestamp(client.user?.createdTimestamp)
            ],
            components: [
                new ActionRowBuilder<ButtonBuilder>().addComponents(
                    new ButtonBuilder()
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=1006122563933573131&permissions=8&scope=bot")
                    .setEmoji(`<<:emoji16:1083101209788952576>`)
                    .setLabel("Sav Beta'ı davet et")
                    .setStyle(ButtonStyle.Link),
                    new ButtonBuilder()
                    .setURL("https://discord.gg/z9X8TpQAEE")
                    .setEmoji(`<:emoji16:1083101209788952576>`)
                    .setLabel("Topluluk sunucumuza katıl")
                    .setStyle(ButtonStyle.Link)
                    
                )
            ]
        });
    },
}