const Discord = require('discord.js')
const builders = require('@discordjs/builders')
const command = new builders.SlashCommandBuilder()
.setName('top')
.setDescription('Verifique o ranking de melhores usuários!')

module.exports = {
    data: command.toJSON(),
    execute: (interaction, client, db) => {
            db.ref('Usuários').once('value').then(ss => {
                let arrayIdsAnBullet = []
                for (const i in ss.val()) {
                    console.log(i)
                    arrayIdsAnBullet.push({saldo: ss.val()[i].saldo, id: i})
                }
                // console.log(arrayIds)
                if (!arrayIdsAnBullet.some(cont => cont.id == interaction.user.id)) arrayIdsAnBullet.push({saldo:0, id: interaction.user.id})
                arrayIdsAnBullet.sort((a,b) => {
                    return b.saldo - a.saldo
                })
                // console.log(arrayIdsAnBullet[0].id)
                let string = ''
                // client.users.fetch('')
                for (let i = 0; i < 10; i++) {
                    if (!arrayIdsAnBullet[i]) break
                    // client.users.fetch(arrayIdsAnBullet[i].id).then(user => {
                        string = string + `${i + 1}° - ${client.users.cache.get(arrayIdsAnBullet[i].id).tag || 'Usuário não Encontrado#????'} - G$ ${arrayIdsAnBullet[i].saldo}\n`
                    // })
                }
                const embed = new Discord.MessageEmbed()
                .setTitle(':medal: Top 10 Mundial | Ground Bot')
                .setColor('GOLD')
                .setDescription(string)
                .setTimestamp()
                interaction.reply({embeds: [embed]})
            })
        }
    }