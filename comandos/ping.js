const builders = require('@discordjs/builders')
const command = new builders.SlashCommandBuilder()
.setName('ping')
.setDescription('Retorna o tempo de resposta do bot em ms')

module.exports = {
    data: command.toJSON(),
    execute: (interaction, client, db) => {
        // interaction.reply({content: 'Estou online!'})
        const dbInitialMS = Date.now()
        db.ref(`Servidores`).once('value').then(() => {
            const dbFinalMS = Date.now() - dbInitialMS
            interaction.reply({content: 'Tempo da API (Discord): ' + client.ws.ping + ' MS\nTempo de Resposta do Banco de Dados: ' + dbFinalMS + ' MS'})
        })
    }
}