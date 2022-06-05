const Discord = require('discord.js')
const builders = require('@discordjs/builders')
const command = new builders.SlashCommandBuilder()
.setName('posses')
.setDescription('Verifique suas posses ou as posses de outra pessoa')

command.addUserOption(opt =>
    opt.setName('user')
    .setDescription('Usuário onde será verificada suas posses')
    .setRequired(false)    
)

module.exports = {
    data: command.toJSON(),
    execute: (interaction, client, db) => {
        const user = interaction.options.getUser('user') || interaction.user
        db.ref(`Usuários/${user.id}/Inventário`).once('value').then(ss => {
            const snap = new Object()
            for (const i in ss.val()) {
                snap[i] = ss.val()[i]
            }
            const embed = new Discord.MessageEmbed()
            .setTitle('Posses de ' + user.tag)
            .setColor('GREEN')
            if (snap.hasOwnProperty('terreno')) embed.addField('Terrenos', `Possui **${snap.terreno}** disponíveis`)
            if (snap.hasOwnProperty('terreno_loteado')) embed.addField('Terrenos Loteados', `Possui **${snap.terreno_loteado}** disponíveis`)
            if (snap.hasOwnProperty('terreno_com_casa')) embed.addField('Terrenos com Casa', `Possui **${snap.terreno_com_casa}** disponíveis`)
            if (snap.hasOwnProperty('terreno_loteado_com_casa')) embed.addField('Terreno Loteado com Casa', `Possui **${snap.terreno_loteado_com_casa}** disponíveis`)
            if (snap.hasOwnProperty('terreno_com_apartamento')) embed.addField('Terrenos com Apartamentos', `Possui **${snap.terreno_com_apartamento}** disponíveis!`)
            if (snap.hasOwnProperty('terreno_com_loja')) embed.addField('Terrenos com Loja', `Possui **${snap.terreno_com_loja}** disponíveis`)
            if (snap.hasOwnProperty('terreno_loteado_com_loja')) embed.addField('Terrenos Loteado com Loja', `Possui **${snap.terreno_loteado_com_Loja}** disponíveis`)
            embed.setTimestamp()
            interaction.reply({embeds: [embed]})
        })
    }
}