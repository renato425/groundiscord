/* 
Comandos:
/comprar <id> x
/loja x
/upgrade x
/servidor suporte x
/servidor leilao x
/bolsa x
/top x
/botinfo
/ping x
/saldo x
/daily x
/pay <dar: amount> <para: user> x
/invite x
/inv x
/vender x
*/

/*
Terreno com Lote: R$ 25,000
Terreno Comum: R$ 50,000
Terreno com casa construida - lote: R$ 60,000
Terreno com casa construida: R$ 75,000
Terreno com apartamento: R$ 100,000
Terreno com loja: R$ 95,000
Terreno com loja - Lote: R$ 75,000

As pessoas podem comprar um terreno com casas, apartamento ou lojas construidas... ou comprar o terreno comum e pagar mais "barato"

Evoluir: terreno com lote para terreno com casa - lote: R$ 15,000
Evoluir: terreno comum para terreno com casa: R$ 30,000
Evoluir: terreno comum para terreno com apartamento: R$ 50,000
Evoluir: terreno comum para terreno com loja: R$ 45,000
Evoluir: terreno com lote para terreno com loja: R$ 35,000

Aluguel: Terreno Loteado: R$ 3,125
Aluguel: Terreno comum: R$ 6, 250
Aluguel: Terreno com casa - Lote: R$ 7,500 
Aluguel: Terreno com casa: R$ 9,375
Aluguel: Terreno com apartamento: R$ 12,500
Aluguel: Terreno com Loja: R$ 11,875
Aluguel: Terreno com Loja - Lote: R$ 9,375
*/

const Discord = require('discord.js')
const firebase = require('firebase').default
const Slash = require('discord-slash-commands-client')
require('firebase/database')
const config = require('./config.json')
const fs = require('fs')
firebase.initializeApp({
    apiKey: "x",
    authDomain: "x",
    projectId: "ground-bot",
    storageBucket: "x",
    messagingSenderId: "    ",
    appId: "x"
})
const client = new Discord.Client({intents: ['GUILDS', 'GUILD_MESSAGES', 'DIRECT_MESSAGES', 'GUILD_MEMBERS', 'GUILD_EMOJIS_AND_STICKERS']})
const SlashClient = new Slash.Client(config.DISCORD_TOKEN, '933441984704692265')
const database = firebase.database()

const commandsFiles = fs.readdirSync('./comandos').filter(fileName => fileName.endsWith('.js'))
const commands = []
for(const i in commandsFiles) {
    let props = require(`./comandos/${commandsFiles[i]}`)
    commands.push(props)
}

async function saveCommandsInGuild() {
    const commandsSaved = await SlashClient.getCommands({guildID: ''})
    console.log(commandsSaved)
    // const emb = new Discord.MessageEmbed().setAuthor({''}).setFooter({''})
    // commandsSaved[0]
    // for (const i in commandsSaved) {
        // }
        // for (const i in commandsSaved) {
            //     if (commandsSaved[i].name == 'pay') await SlashClient.deleteCommand(commandsSaved[i].id, '878343931585265684')
            // }
            // for (const i in commandsSaved) {
        // if (commandsSaved[i].name == 'pay') await SlashClient.editCommand(require('./comandos/pay').data, commandsSaved[i].id, '878343931585265684')
        // if (commandsSaved[i].name == 'comprar') await SlashClient.editCommand(require('./comandos/comprar').data, commandsSaved[i].id, '878343931585265684')
    // }
    // await SlashClient.editCommand(require('./comandos/top').data, '980591528638562345', '878343931585265684')
    for (const i in commands) {
        if (!commandsSaved.some(cont => cont.name == commands[i].data.name))
        await SlashClient.createCommand(commands[i].data)
    }
}

saveCommandsInGuild()

process.on('uncaughtException', (err) => {
    // console.log(err)
})


client.on('ready', () => {
    console.log('Online!')
    let configg = require('./config.json')
        configg.BOLSA = {}
        configg.BOLSA.porcent = require('./getRandomPositiveOrNegative')()
        configg.BOLSA.timestamp = Date.now()
        fs.writeFileSync('./config.json', JSON.stringify(configg, null, '\t'))
        const embed = new Discord.MessageEmbed()
        .setTitle('Atualizações | Bolsa de Valores!')
        .setColor('GREEN')
        .setDescription('Agora, a bolsa está no valor de: ' + configg.BOLSA.porcent.replace(/0./g, '') + '%!')
        .setTimestamp()
        client.channels.cache.get('980631913276538881').send({embeds: [embed]}).then(message => {
            message.crosspost()
        })
        setInterval(() => {
        let configg = require('./config.json')
        configg.BOLSA = {}
        configg.BOLSA.porcent = require('./getRandomPositiveOrNegative')()
        configg.BOLSA.timestamp = Date.now()
        fs.writeFileSync('./config.json', JSON.stringify(configg, null, '\t'))
        const embed = new Discord.MessageEmbed()
        .setTitle('Atualizações | Bolsa de Valores!')
        .setColor('GREEN')
        .setDescription('Agora, a bolsa está no valor de: ' + configg.BOLSA.porcent.replace(/0./g, '') + '%!')
        .setTimestamp()
        client.channels.cache.get('980631913276538881').send({embeds: [embed]}).then(message => {
            message.crosspost()
        })
    }, require('ms')('30 minutes'))
})

client.on('interactionCreate', interaction => {
    if (interaction.isCommand()) {
        for (const i in commands) {
            if (interaction.commandName == commands[i].data.name) {
                database.ref(`Usuários/${interaction.user.id}/Inventário`).once('value').then(snap => {
                    const ss = new Object()
                    for (const i in snap.val()) {
                        ss[i] = snap.val()[i]
                    }
                    if (ss.hasOwnProperty('lastTimestamp')) {
                        console.log('verificação feita!')
                        let timestamp = 2629800000
                        // console.log(timestamp)
                        let lastTimestamp = ss.lastTimestamp
                        console.log(lastTimestamp)
                        if (lastTimestamp !== null && timestamp - (Date.now() - lastTimestamp) > 0) {
                            return 
                        } else {
                            let value = 0
                            if (ss.hasOwnProperty('terreno')) value = value + (6250 * ss.terreno)
                            if (ss.hasOwnProperty('terreno_loteado')) value = value + (3125 * ss.terreno_loteado)
                            if (ss.hasOwnProperty('terreno_com_casa')) value = value + (9315 * ss.terreno_com_casa)
                            if (ss.hasOwnProperty('terreno_loteado_com_casa')) value = value + (7500 * ss.terreno_loteado_com_casa)
                            if (ss.hasOwnProperty('terreno_com_apartamento')) value = value + (12500 * ss.terreno_com_apartamento)
                            if (ss.hasOwnProperty('terreno_com_loja')) value = value + (11875 * ss.terreno_com_loja)
                            if (ss.hasOwnProperty('terreno_loteado_com_loja')) value = value + (9375 * ss.terreno_loteado_com_loja)
                            if (value < 0) {
                                database.ref(`Usuários/${interaction.user.id}`).once('value').then(money => {
                                    database.ref(`Usuários/${interaction.user.id}`).update({
                                        saldo: money.val().saldo + value
                                    })
                                    interaction.channel.send({content: `<@!${interaction.user.id}>, você coletou **G$ ` + value + '** de aluguel!', ephemeral: true})
                                })
                            }
                        }
                    }
                })
                commands[i].execute(interaction, client, database)
            }
        }
    }
})

client.login(config.DISCORD_TOKEN)