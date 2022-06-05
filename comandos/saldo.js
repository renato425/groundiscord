const builders = require('@discordjs/builders')
const Discord = require('discord.js')
const command = new builders.SlashCommandBuilder()
.setName('saldo')
.setDescription('Verifique o seu saldo ou de outra pessoa!')

command.addUserOption(opt =>
    opt.setName('user')
    .setDescription('Usuário que será verificado')
    // .setDescriptionLocalization('')
    .setRequired(false)   
)

module.exports = {
    data: command.toJSON(),
    execute: (interaction, client, db) => {
        if (interaction.options._hoistedOptions[0]) {
            db.ref(`Usuários/${interaction.options._hoistedOptions[0].value}`).once('value').then(s => {
                const snap = new Object()
                for(const i in s.val()) {
                    snap[i] = s.val()[i]
                }
                if (!snap.hasOwnProperty('saldo')) snap.saldo = 0
                db.ref(`Usuários`).once('value').then(ss => {
                    // client.users.cache.get(interaction.options.getUser('user').id) = interaction.options.getUser('user')
                    let arrayIdsAnBullet = []
                    for (const i in ss.val()) {
                        arrayIdsAnBullet.push({saldo: ss.val()[i].saldo, id: i})
                    }
                    if (!arrayIdsAnBullet.some(cont => cont.id == interaction.options._hoistedOptions[0].value)) arrayIdsAnBullet.push({saldo: 0, id: interaction.options._hoistedOptions[0].value})
                    arrayIdsAnBullet.sort((a,b) => {
                        return b.saldo - a.saldo
                    })
                    let posicao
                    for (const i in arrayIdsAnBullet) {
                        if (arrayIdsAnBullet[i].id == interaction.options._hoistedOptions[0].value) {
                            posicao = parseInt(i) + 1
                            break
                        }
                    }
                    const embed = new Discord.MessageEmbed()
                    .setTitle('Saldo de ' + interaction.options.getUser('user').tag)
                    // .setThumbnail(client.users.cache.get(interaction.options._hoistedOptions[0].displayAvatarURL({dynamic: true}))
                    .setThumbnail(interaction.options.getUser('user').displayAvatarURL({dynamic: true}))
                    .setDescription('**G$ ' + snap.saldo + '**\nSabia que ' + '<@!' + interaction.options.getUser('user') + '>' + ' está na **' + posicao + '° Posição Global?** Saiba mais usando `/top`')
                    .setTimestamp()
                    .setColor('DARK_GREEN')
                    interaction.reply({embeds: [embed]})
                })
            })
        } else {
            db.ref(`Usuários/${interaction.user.id}`).once('value').then(s => {
                const snap = new Object()
                for (const i in s.val()) {
                    snap[i] = s.val()[i]
                }
                if (!snap.hasOwnProperty('saldo')) snap.saldo = 0
                db.ref(`Usuários`).once('value').then(ss => {
                    let arrayIdsAnBullet = []
                    // console.log(ss.val())
                    for (const i in ss.val()) {
                        arrayIdsAnBullet.push({saldo: ss.val()[i].saldo, id: i})
                    }
                    // if ()
                    if (!arrayIdsAnBullet.some(cont => cont.id == interaction.user.id)) arrayIdsAnBullet.push({saldo: 0, id: interaction.user.id})
                    arrayIdsAnBullet.sort((a,b) => {
                        return b.saldo - a.saldo
                    })
                    let posicao
                    console.log(arrayIdsAnBullet, posicao)
                    for (const i in arrayIdsAnBullet) {
                        if (arrayIdsAnBullet[i].id == interaction.user.id) {
                            console.log(i, posicao)
                            posicao = parseInt(i) + 1
                            break
                        }
                    }
                    const embed = new Discord.MessageEmbed()
                    .setTitle(':bank: Saldo de ' + interaction.user.username + '#' + interaction.user.discriminator)
                    .setThumbnail(interaction.user.displayAvatarURL({dynamic: true}))
                    .setColor('DARK_GREEN')
                    .setDescription(':credit_card: **G$ ' + snap.saldo + '**\nSabia que você está na **' + posicao + '° Posição Global?** Para ver o top, use `/top`')
                    .setTimestamp()
                    interaction.reply({embeds: [embed]})
                })
            })
        }
    }
}