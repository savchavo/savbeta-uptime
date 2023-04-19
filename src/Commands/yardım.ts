import { Commands } from "../Interfaces";
import { codeBlock, EmbedBuilder } from "discord.js";
import Discord from "discord.js"


export const Command: Commands = {
    name: "yardım",
    description: "Sav Beta'nın yardım komutunu görürsünüz ",
    async run(client, message, args,) {
        let cmd = client.commands.map((x: any) => `> • **__.${x.name}__** 🠮 ${x.description}`)
        var page = 1;

        const row: any = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setLabel('Destek Sunucusu')
                    .setEmoji("📕")
                    .setURL("https://discord.gg/z9X8TpQAEE")
                    .setStyle(Discord.ButtonStyle.Link),
                new Discord.ButtonBuilder()
                    .setLabel('Botu davet et')
                    .setEmoji("📘")
                    .setURL("https://discord.com/api/oauth2/authorize?client_id=1006122563933573131&permissions=8&scope=bot")
                    .setStyle(Discord.ButtonStyle.Link),
                new Discord.ButtonBuilder()
                    .setLabel('Bota oy ver')
                    .setEmoji("📗")
                    .setURL("https://top.gg/bot/1006122563933573131/vote")
                    .setStyle(Discord.ButtonStyle.Link),
                new Discord.ButtonBuilder()
                    .setLabel('Sponsor')
                    .setEmoji("❤")
                    .setURL("https://discord.gg/roderika")
                    .setStyle(Discord.ButtonStyle.Link),
            );

        const buttons = new Discord.ActionRowBuilder()
            .addComponents(
                new Discord.ButtonBuilder()
                    .setCustomId('sol')
                    .setEmoji("1025357695240388661")
                    .setDisabled(true)
                    .setStyle(Discord.ButtonStyle.Success),
                new Discord.ButtonBuilder()
                    .setCustomId('sayfa')
                    .setLabel("1/4")
                    .setDisabled(true)
                    .setStyle(Discord.ButtonStyle.Secondary),
                new Discord.ButtonBuilder()
                    .setCustomId('sag')
                    .setEmoji("1025357694221172736")
                    .setStyle(Discord.ButtonStyle.Success),
            );


        const embed = new Discord.EmbedBuilder()
            .setAuthor({ name: "Yardım menüsü | ", iconURL: client?.user?.displayAvatarURL() })
            .setDescription("• Yardım almak için en doğru yerdesin, bir sorunun olursa destek sunucusunda seni bekliyor olacağız.")
            .addFields({ name: `<:new1:1025306297677135923><:new2:1025306296553066576> **|** Yenilikler/Güncellemeler`, value: `> • Son güncelleme notları için [tıkla](https://discord.gg/z9X8TpQAEE).` })
            .addFields({ name: `<:global:1025305700257243176> **|** Tüm komutlar`, value: `${cmd.slice(0, 5).join("\n") || "Bu sayfada komut bulunmuyor"} ` })
            .setColor("#36393F")
            .setThumbnail(`${client?.user?.displayAvatarURL()}`)

        return message.reply({ embeds: [embed], components: [row, buttons] }).then(async (msg) => {

            const collector = message.channel.createMessageComponentCollector({});

            collector.on('collect', async (i: any) => {
                if (i.user.id !== message?.author?.id) return;


                if (i.customId === "sag") {

                    if (page === 1) {
                        page += 1;

                        const buttons = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId('sol')
                                    .setEmoji("1025357695240388661")
                                    .setStyle(Discord.ButtonStyle.Success),
                                new Discord.ButtonBuilder()
                                    .setCustomId('sayfa')
                                    .setLabel(page + "/4")
                                    .setDisabled(true)
                                    .setStyle(Discord.ButtonStyle.Secondary),
                                new Discord.ButtonBuilder()
                                    .setCustomId('sag')
                                    .setEmoji("1025357694221172736")
                                    .setStyle(Discord.ButtonStyle.Success),
                            );

                        const embed = new Discord.EmbedBuilder()
                            .setAuthor({ name: "Yardım menüsü | ", iconURL: client.user?.displayAvatarURL() })
                            .setDescription("• Yardım almak için en doğru yerdesin, bir sorunun olursa destek sunucusunda seni bekliyor olacağız.")
                            .addFields({ name: `<:new1:1025306297677135923><:new2:1025306296553066576> **|** Yenilikler/Güncellemeler`, value: `> • Son güncelleme notları için [tıkla](https://discord.gg/z9X8TpQAEE).` })
                            .addFields({ name: `<:global:1025305700257243176> **|** Tüm komutlar`, value: `${cmd.slice(5, 10).join("\n") || "Bu sayfada komut bulunmuyor"} ` })
                            .setColor("#36393F")
                            .setThumbnail(`${client.user?.displayAvatarURL()}`)

                        return i.update({ embeds: [embed], components: [row, buttons] })
                    }

                    if (page === 2) {
                        page += 1;

                        const buttons = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId('sol')
                                    .setEmoji("1025357695240388661")
                                    .setStyle(Discord.ButtonStyle.Success),
                                new Discord.ButtonBuilder()
                                    .setCustomId('sayfa')
                                    .setLabel(page + "/4")
                                    .setDisabled(true)
                                    .setStyle(Discord.ButtonStyle.Secondary),
                                new Discord.ButtonBuilder()
                                    .setCustomId('sag')
                                    .setEmoji("1025357694221172736")
                                    .setStyle(Discord.ButtonStyle.Success),
                            );

                        const embed = new Discord.EmbedBuilder()
                            .setAuthor({ name: "Yardım menüsü | ", iconURL: client.user?.displayAvatarURL() })
                            .setDescription("• Yardım almak için en doğru yerdesin, bir sorunun olursa destek sunucusunda seni bekliyor olacağız.")
                            .addFields({ name: `<:new1:1025306297677135923><:new2:1025306296553066576> **|** Yenilikler/Güncellemeler`, value: `> • Son güncelleme notları için [tıkla](https://discord.gg/z9X8TpQAEE).` })
                            .addFields({ name: `<:global:1025305700257243176> **|** Tüm komutlar`, value: `${cmd.slice(10, 15).join("\n") || "Bu sayfada komut bulunmuyor"} ` })
                            .setColor("#36393F")
                            .setThumbnail(`${client.user?.displayAvatarURL()}`)

                        return i.update({ embeds: [embed], components: [row, buttons] })
                    }

                    if (page === 3) {
                        page += 1;

                        const buttons = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId('sol')
                                    .setEmoji("1025357695240388661")
                                    .setStyle(Discord.ButtonStyle.Success),
                                new Discord.ButtonBuilder()
                                    .setCustomId('sayfa')
                                    .setLabel(page + "/4")
                                    .setDisabled(true)
                                    .setStyle(Discord.ButtonStyle.Secondary),
                                new Discord.ButtonBuilder()
                                    .setCustomId('sag')
                                    .setDisabled(true)
                                    .setEmoji("1025357694221172736")
                                    .setStyle(Discord.ButtonStyle.Success),
                            );

                        const embed = new Discord.EmbedBuilder()
                            .setAuthor({ name: "Yardım menüsü | ", iconURL: client?.user?.displayAvatarURL() })
                            .setDescription("• Yardım almak için en doğru yerdesin, bir sorunun olursa destek sunucusunda seni bekliyor olacağız.")
                            .addFields({ name: `<:new1:1025306297677135923><:new2:1025306296553066576> **|** Yenilikler/Güncellemeler`, value: `> • Son güncelleme notları için [tıkla](https://discord.gg/z9X8TpQAEE)).` })
                            .addFields({ name: `<:global:1025305700257243176> **|** Tüm komutlar`, value: `${cmd.slice(15, 20).join("\n") || "Bu sayfada komut bulunmuyor"}` })
                            .setColor("#36393F")
                            .setThumbnail(`${client?.user?.displayAvatarURL()}`)

                        return i.update({ embeds: [embed], components: [row, buttons] })
                    }

                }

                if (i.customId === "sol") {

                    if (page === 4) {
                        page -= 1;

                        const buttons = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId('sol')
                                    .setEmoji("1025357695240388661")
                                    .setStyle(Discord.ButtonStyle.Success),
                                new Discord.ButtonBuilder()
                                    .setCustomId('sayfa')
                                    .setLabel(page + "/4")
                                    .setDisabled(true)
                                    .setStyle(Discord.ButtonStyle.Secondary),
                                new Discord.ButtonBuilder()
                                    .setCustomId('sag')
                                    .setEmoji("1025357694221172736")
                                    .setStyle(Discord.ButtonStyle.Success),
                            );

                        const embed = new Discord.EmbedBuilder()
                            .setAuthor({ name: "Yardım menüsü | ", iconURL: client?.user?.displayAvatarURL() })
                            .setDescription("• Yardım almak için en doğru yerdesin, bir sorunun olursa destek sunucusunda seni bekliyor olacağız.")
                            .addFields({ name: `<:new1:1025306297677135923><:new2:1025306296553066576> **|** Yenilikler/Güncellemeler`, value: `> • Son güncelleme notları için [tıkla](https://discord.gg/z9X8TpQAEE).` })
                            .addFields({ name: `<:global:1025305700257243176> **|** Tüm komutlar`, value: `${cmd.slice(10, 15).join("\n") || "Bu sayfada komut bulunmuyor"}` })
                            .setColor("#36393F")
                            .setThumbnail(`${client?.user?.displayAvatarURL()}`)

                        return i.update({ embeds: [embed], components: [row, buttons] })
                    }

                    if (page === 3) {
                        page -= 1;

                        const buttons = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId('sol')
                                    .setEmoji("1025357695240388661")
                                    .setStyle(Discord.ButtonStyle.Success),
                                new Discord.ButtonBuilder()
                                    .setCustomId('sayfa')
                                    .setLabel(page + "/4")
                                    .setDisabled(true)
                                    .setStyle(Discord.ButtonStyle.Secondary),
                                new Discord.ButtonBuilder()
                                    .setCustomId('sag')
                                    .setEmoji("1025357694221172736")
                                    .setStyle(Discord.ButtonStyle.Success),
                            );

                        const embed = new Discord.EmbedBuilder()
                            .setAuthor({ name: "Yardım menüsü | ", iconURL: client.user?.displayAvatarURL() })
                            .setDescription("• Yardım almak için en doğru yerdesin, bir sorunun olursa destek sunucusunda seni bekliyor olacağız.")
                            .addFields({ name: `<:new1:1025306297677135923><:new2:1025306296553066576> **|** Yenilikler/Güncellemeler`, value: `> • Son güncelleme notları için [tıkla](https://discord.gg/z9X8TpQAEE).` })
                            .addFields({ name: `<:global:1025305700257243176> **|** Tüm komutlar`, value: `${cmd.slice(5, 10).join("\n") || "Bu sayfada komut bulunmuyor"}` })
                            .setColor("#36393F")
                            .setThumbnail(`${client.user?.displayAvatarURL()}`)

                        return i.update({ embeds: [embed], components: [row, buttons] })
                    }

                    if (page === 2) {
                        page -= 1;

                        const buttons = new Discord.ActionRowBuilder()
                            .addComponents(
                                new Discord.ButtonBuilder()
                                    .setCustomId('sol')
                                    .setEmoji("1025357695240388661")
                                    .setDisabled(true)
                                    .setStyle(Discord.ButtonStyle.Success),
                                new Discord.ButtonBuilder()
                                    .setCustomId('sayfa')
                                    .setLabel(page + "/4")
                                    .setDisabled(true)
                                    .setStyle(Discord.ButtonStyle.Secondary),
                                new Discord.ButtonBuilder()
                                    .setCustomId('sag')
                                    .setEmoji("1025357694221172736")
                                    .setStyle(Discord.ButtonStyle.Success),
                            );

                        const embed = new Discord.EmbedBuilder()
                            .setAuthor({ name: "Yardım menüsü | ", iconURL: client.user?.displayAvatarURL() })
                            .setDescription("• Yardım almak için en doğru yerdesin, bir sorunun olursa destek sunucusunda seni bekliyor olacağız.")
                            .addFields({ name: `<:new1:1025306297677135923><:new2:1025306296553066576> **|** Yenilikler/Güncellemeler`, value: `> • Son güncelleme notları için [tıkla](https://discord.gg/z9X8TpQAEE).` })
                            .addFields({ name: `<:global:1025305700257243176> **|** Tüm komutlar`, value: `${cmd.slice(0, 5).join("\n") || "Bu sayfada komut bulunmuyor"}` })
                            .setColor("#36393F")
                            .setThumbnail(`${client.user?.displayAvatarURL()}`)

                        return i.update({ embeds: [embed], components: [row, buttons] })
                    }

                }

            });


            setTimeout(() => { msg.edit({ content: "❗ **|** Mesaj artık de-aktif. ", components: [] }) }, 1000 * 60)



        });


    }

};
