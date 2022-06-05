const Discord = require('discord.js')
const builders = require('@discordjs/builders')
const command = new builders.SlashCommandBuilder()
.setName('botinfo')
.setDescription('Informações sobre o Ground!')

module.exports = {
    data: command.toJSON(),
    execute: (interaction,client) => {
        const embed = new Discord.MessageEmbed()
.setAuthor({name:'Ground Bot - O seu bot de economia!',iconURL: client.user.displayAvatarURL()})
.setColor('BLUE')
.setDescription('Sou conhecido como Ground. Sou um bot que começou a sua fase de criação em Maio/2022 (considero meu aniversário o mês inteiro de maio! :O).\n\nAtualmente, estou na versão **0.5.0-BETA**\n\nMeu criador (no qual seu apelido é RNT ou Renatiin) me criou em JavaScript (NodeJS) utilizando Discord.JS')
.addField('Menções Honrosas', '1. `Renatiin#8510`. Meu criador! :)\n2. Todos aqueles que me ajudaram em relação a código, doação... etc!\nE claro, você. Que está usando o bot nesse exato momento!')
.setFooter({text: 'Eu amo vocês! | Criado por Renatiin#8510', iconURL: 'https://cdn.discordapp.com/avatars/858573520875421746/b2b3bb16bab143efe4d8405c0ccd06a7.png?size=2048'})
        interaction.reply({embeds: [embed]}).catch(err => {})
    }
}