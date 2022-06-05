const Discord = require('discord.js')
const builders = require('@discordjs/builders')
const command = new builders.SlashCommandBuilder()
.setName('servidor')
.setDescription('Os servidores oficiais do Ground!')

command.addSubcommand(opt =>
    opt.setName('suporte')
    .setDescription('Servidor tira-dúvidas do Ground')    
)

command.addSubcommand(opt =>
    opt.setName('leilao')
    .setDescription('Servidor oficial de Leilões do Ground!')    
)

module.exports = {
    data: command.toJSON(),
    execute: (interaction) => {
        if (interaction.options.getSubcommand() == 'suporte') {
            const embed = new Discord.MessageEmbed()
            .setTitle('Servidor de Suporte | Ground Bot')
            .setColor('GREEN')
            .setDescription('Entre no meu [servidor de suporte](https://discord.gg/c3398BH3Ua) para receber informações sobre o Groun!')
            .setTimestamp()
            interaction.reply({embeds: [embed]})
        } else {
            const embed = new Discord.MessageEmbed()
            .setTitle('Servidor de Leilões | Ground Bot')
            .setColor('GREEN')
            .setDescription('Entre no meu [servidor de Leilões](https://discord.gg/KdnQ5Zry79) e participe dos eventos!')
            .setTimestamp()
            interaction.reply({embeds: [embed]})
        }
    }
}