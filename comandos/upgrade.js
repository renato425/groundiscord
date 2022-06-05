const Discord = require('discord.js')
const builders = require('@discordjs/builders')
const command = new builders.SlashCommandBuilder()
    .setName('upgrade')
    .setDescription('Dê um upgrade em algumas de suas posses!')

module.exports = {
    data: command.toJSON(),
    execute: (interaction, client, db) => {
        const config = require('../config.json').BOLSA
        config.porcent = parseFloat(config.porcent)
        db.ref(`Usuários/${interaction.user.id}/Inventário`).once('value').then(ss => {
            const snap = new Object()
            for (const i in ss.val()) {
                snap[i] = ss.val()[i]
            }
            const SelectMenu = new Discord.MessageSelectMenu()
            .setCustomId('select')
            .setPlaceholder('Selecione uma posse sua para fazer o upgrade!')
            // switch(snap[i])
            // for (const i in snap) {
                if (snap.hasOwnProperty('terreno')) {
                    SelectMenu.addOptions([
                        {
                            label: 'Terreno com Casa',
                            description: 'Valor: G$ ' + (30000 + (30000 * config.porcent)),
                            value: 'tc'
                        },
                        {
                            label: 'Terreno com Apartamento',
                            description: 'Valor: G$ ' + (50000 + (50000 * config.porcent)),
                            value: 'ta'
                        },
                        {
                            label: 'Terreno com Loja',
                            description: 'Valor: G$ ' + (45000 + (45000 * config.porcent)),
                            value: 'tl'
                        }
                    ])
                }
                if (snap.hasOwnProperty('terreno_loteado')) {
                    SelectMenu.addOptions([
                        {
                            label: 'Terreno Loteado com Casa',
                            description: 'Valor: G$ ' + (15000 + (15000 * config.porcent)),
                            value: 'tlc' 
                        },
                        {
                            label: 'Terreno Loteado com Loja',
                            description: 'Valor: G$ ' + (35000 + (35000 * config.porcent)),
                            value: 'tll'
                        }
                    ])
                }
                interaction.reply({content: 'Escolha um terreno abaixo para evoluir!', components: [new Discord.MessageActionRow().addComponents(SelectMenu)]}).then(() => {
                    const channel = interaction.channel
                    const filter = (interactionn) => interactionn.user.id == interaction.user.id && interactionn.customId == 'select'
                    const collector = channel.createMessageComponentCollector({filter: filter, max: 1, time: 300000})
                    collector.on('collect', i => {
                        // i.reply({content: i.customId})
                        // console.log(i)
                        db.ref(`Usuários/${interaction.user.id}`).once('value').then(sss => {
                            const ssnap = new Object()
                            for (const i in sss.val()) {
                                ssnap[i] = sss.val()[i]
                            }
                            //30000 
                            switch(i.values[0]) {
                                case 'tc': {
                                    if (ssnap.saldo< (30000 + (30000 * config.porcent))) return i.reply({content: 'Você não tem dinheiro suficiente para executar esse comando!'})
                                    if (!snap.hasOwnProperty('terreno_com_casa')) snap.terreno_com_casa = 0
                                    db.ref(`Usuários/${interaction.user.id}/Inventário`).update({
                                    terreno: snap.terreno - 1 == 0 ? null : snap.terreno - 1,
                                    terreno_com_casa: snap.terreno_com_casa + 1
                                })
                                db.ref(`Usuários/${interaction.user.id}`).update({
                                    saldo: ssnap.saldo - (30000 + (30000 * config.porcent))
                                })
                                i.reply({content: 'Item evoluido com sucesso!'})
                                break
                            }
                            case 'ta': {
                                //50000
                                if (ssnap.saldo < (50000 + (50000 * config.porcent))) return i.reply({content: 'Você não tem dinheiro para executar esse comando!'})
                                if (!snap.hasOwnProperty('terreno_com_apartamento')) snap.terreno_com_apartamento = 0
                                db.ref(`Usuários/${interaction.user.id}/Inventário`).update({
                                    terreno: snap.terreno - 1 == 0 ? null : snap.terreno - 1,
                                    terreno_com_apartamento: snap.terreno_com_apartamento + 1
                                })
                                db.ref(`Usuários/${interaction.user.id}`).update({
                                    saldo: ssnap.saldo - (50000 + (50000 * config.porcent))
                                })
                                i.reply({content: 'Item evoluido com sucesso!'})
                                break
                            }
                            case 'tl': {
                                if (ssnap.saldo < (45000 + (45000 * config.porcent))) return i.reply({content: 'Você não tem dinheiro para executar esse comando!'})
                                if (!snap.hasOwnProperty('terreno_com_loja')) snap.terreno_com_loja = 0
                                db.ref(`Usuários/${interaction.user.id}/Inventário`).update({
                                    terreno: snap.terreno - 1 ? null : snap.terreno - 1,
                                    terreno_com_loja: snap.terreno_com_loja + 1
                                })
                                db.ref(`Usuários/${interaction.user.id}`).update({
                                    saldo: ssnap.saldo - (45000 + (45000 * config.porcent))
                                })
                                i.reply({content: 'Item evoluido com sucesso!'})
                                break
                            }
                            case 'tlc': {
                                if (ssnap.saldo < (15000 + (15000 * config.porcent))) return i.reply({content: 'Você não tem dinheiro para executar esse comando!'})
                                // db.ref(`Usuários/${interaction.user.id}/Inventário`).update({
                                //     terreno: snap.terreno - 1,
                                //     terreno_loteado_com_casa: snap.terreno_loteado_com_casa + 1
                                // })
                                if (!snap.hasOwnProperty('terreno_loteado_com_casa')) snap.terreno_loteado_com_casa = 0
                                db.ref(`Usuários/${interaction.user.id}/Inventário`).update({
                                    terreno_loteado: ss.val().terreno_loteado - 1 == 0 ? null : ss.val().terreno_loteado - 1,
                                    terreno_loteado_com_casa: ss.val().terreno_loteado_com_casa + 1
                                })
                                db.ref(`Usuários/${interaction.user.id}`).update({
                                    saldo: ssnap.saldo - (50000 + (50000 * config.porcent))
                                })
                                i.reply({content: 'Item evoluido com sucesso!'})
                                break
                            }
                            case 'tll': {
                                if (ssnap.saldo < (35000 + (35000 * config.porcent))) return i.reply({content: 'Você não tem dinheiro para executar esse comando!'})
                                if (!snap.hasOwnProperty('terreno_loteado_com_loja')) snap.terreno_loteado_com_loja = 0
                                db.ref(`Usuários/${interaction.user.id}/Inventário`).update({
                                    terreno_loteado: snap.terreno_loteado - 1 == 0 ? null : snap.terreno_loteado - 1,
                                    terreno_loteado_com_loja: snap.terreno_loteado_com_loja + 1
                                })
                                db.ref(`Usuários/${interaction.user.id}`).update({
                                    saldo: ssnap.saldo - (50000 + (50000 * config.porcent))
                                })
                                i.reply({content: 'Item evoluido com sucesso!'})
                                break
                            }
                        }
                        db.ref(`Usuários/${interaction.user.id}/Inventário`).update({
                            lastTimestamp: Date.now()
                        })
                        })
                    })
                })
            // }
        })
    }
}