const Discord = require('discord.js')
const builders = require('@discordjs/builders')
const command = new builders.SlashCommandBuilder()
.setName('invite')
.setDescription('Convide o Ground para o seu servidor!')

module.exports = {
    data: command.toJSON(),
    execute: (interaction) => {
        const embed = new Discord.MessageEmbed()
        .setTitle('Convidar o Ground')
        .setColor('YELLOW')
        .setDescription('[Me convide para seu servidor](https://discord.com/api/oauth2/authorize?client_id=933441984704692265&permissions=0&scope=applications.commands%20bot) e tenha um bot de economia em seu servidor (não falo fantástico por que não é)')
        .setTimestamp()
        interaction.reply({embeds: [embed]})
    }
}