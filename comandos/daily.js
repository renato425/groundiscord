const builders = require('@discordjs/builders')
const Discord = require('discord.js')
const ms = require('parse-ms')
const command = new builders.SlashCommandBuilder()
    .setName('daily')
    .setDescription('Colete seu prêmio diário!')

module.exports = {
    data: command.toJSON(),
    execute: (interaction, c, db) => {
        db.ref(`Usuários/${interaction.user.id}`).once('value').then(s => {
            const snap = new Object()
            for (const i in s.val()) {
                snap[i] = s.val()[i]
            }
            // co objectDaily['timeout'] = snap['Timeouts'] || { daily: null }
            // if (snap['Timeout'])
            if (!snap.hasOwnProperty('Timeouts')) {
                snap['Timeouts'] = { daily: null }
            }
            let timeout = 8.64e+7
            let daily_timeout = snap['Timeouts'].daily
            if (daily_timeout !== null && timeout - (Date.now() - daily_timeout) > 0) {
                let time = ms(timeout - (Date.now() - daily_timeout))
                return interaction.reply({ content: 'Você já coletou seu prêmio diário! Colete novamente em: **' + time.hours + ' horas, ' + time.minutes + ' minutos e ' + time.seconds + ' segundos!**', ephemeral: true })
            } else {
                let amount = Math.floor(Math.random() * (10000 - 1000) + 1000)
                db.ref(`Usuários/${interaction.user.id}`).once('value').then(ss => {
                    db.ref(`Usuários/${interaction.user.id}`).update({
                        saldo: (snap.saldo || 0) + amount
                    })
                })
                db.ref(`Usuários/${interaction.user.id}/Timeouts`).update({
                    daily: Date.now()
                })
                let embed = new Discord.MessageEmbed()
                    .setTitle(':coin: ' +  interaction.user.username + '#' + interaction.user.discriminator + ' | Prêmio Diário!')
                    .setColor('GREEN')
                    .setDescription(':moneybag: Seu prêmio diário de **G$ ' + amount + '** foi coletado! Colete novamente depois de 24 horas!')
                    .setThumbnail(interaction.user.displayAvatarURL({ dynamic: true }))
                interaction.reply({ embeds: [embed] })
            }
        })
    }
}