const Discord = require('discord.js')
const builders = require('@discordjs/builders')
const ms = require('parse-ms')
const command = new builders.SlashCommandBuilder()
.setName('bolsa')
.setDescription('Verifique o valor da bolsa de valores!')

module.exports = {
    data: command.toJSON(),
    execute: (interaction) => {
        const config = require('../config.json').BOLSA
        let getTimeoutJSON = config.timestamp
        let timeout = require('ms')('30 minutes')
        let time = ms(timeout - (Date.now() - getTimeoutJSON))
        let bolsa = config.porcent.replace(/0./g, '')
        // if (bolsa.startsWith('-')) bolsa = '-' + config.porcent.replace('-0.', '')
        const embed = new Discord.MessageEmbed()
        .setTitle('Bolsa de Valores | Ground Bot')
        .setColor('GREEN')
        .addField(':bar_chart: Valor da Bolsa', '**' + bolsa + '%**')
        .addField(':clock12: Tempo restante para nova atualização', '**' + time.minutes + 'm, ' + time.seconds + 's**')
        .setTimestamp()
        interaction.reply({embeds: [embed]}).catch(err => {})
    }
}