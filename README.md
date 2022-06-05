# Ground Bot - O bot de manutenção, compra e venda de terrenos! 



## `1`. Essa é uma versão REDUZIDA do Ground Bot.

Para não haver problemas de copias de Grounds por aí no Discord. Trouzemos essa versão reduzida do Ground Bot.
Essa, no caso: Tem apenas alguns comandos que constituem o bot. Tenho sim alguns planos de como liberar totalmente o Ground no GitHub, porém, por enquanto. Não será possível.

---

Mais um bot de economia para seu servidor Discord. Porém, com uma proposta diferente. Terrenos!

Com o Ground, você pode comprar, vender, analisar a bolsa de valores, disputar no ranking global, melhorar suas posses entre outros!?

Sabe como tive a ideia? Estava na OLX querendo vender um serviço meu. Quando no primeiro anúncio, apareceu um terreno a venda. E aí, veio a ideia: "Por que não fazer um bot de manutenção de terrenos?" e aí está!


## `2`. Quero adicionar o Ground em meu servidor!

Se você quiser adicionar o Ground em seu servidor, use [esse link](https://discord.com/api/oauth2/authorize?client_id=933441984704692265&permissions=0&scope=applications.commands%20bot) *(lembrando que o bot não pede nenhuma permissão especial. Já que ele é de economia!)*

## `3`. Estrutura - Explicação de arquivos do projeto.

* Base - API e Códigos
> Como estão vendo, o bot foi feito em JavaScript usando principalmente a biblioteca [Discord.JS](https://discord.js.org) e sua sub-biblioteca. Que é **[@discordjs/builders](https://npmjs.com/package/@discordjs/builders)**

> Porém, também foi utilizada as bibliotecas: **[discord-slash-commands-client](https://npmjs.com/package/discord-slash-commands-client), [Firebase@8.10.0](https://npmjs.com/package/firebase/v/8.10.0), [ms@2.1.2](https://npmjs.com/package/ms/v/2.1.2) e [parse-ms@2.1.0](https://npmjs.com/package/parse-ms/v/2.1.0)**

> Utilizando os principais métodos de login em todos os exemplos de bibliotecas. Usando "command-handler", detectando os comandos não salvos no Discord, e calculando os timestamps de compras de terrenos. O ***index.js*** é o arquivo principal do projeto.

* Firebase - Banco de Dados
> Usando o Firebase como "Banco de Dados em Nuvem", dá o benefício de "Não perder facilmente os dados do usuário". É lá onde está todas as informações de saldo, terreno, timestamps e etc.

* Gerador de Valores da Bolsa.
> O arquivo ***getRandomPositiveOrNegative.js*** gera números aleatórios independente do valor (positivo ou negativo). O valor sendo positivo ou negativo é aleatório também. O mesmo não usa bibliotecas externas.

* Pasta "comandos"
> Onde fica todos os comandos do bot. Função principal do mesmo, o mesmo pode alterar as execuções, nomes e etc nos arquivos da pasta

> Para alterar o nome da pasta, modifique no ***index.js***

## `4.` Compilação
Antes de tudo, respeite o trabalho dos desenvolvedores. Não apague o nome dos criadores.

### `4.1` Preparando o Foguete

* CMD (PowerShell, Prompt de Comando, etc) ou Terminal(Linux)

* Você precisa do [NodeJS](https://nodejs.org/en/) instalado no seu computador para rodar o bot. Sem ele, o bot não liga
* Você precisa do Git instalado em sua máquina

### `4.2` Ajeitando o "computador" do foguete
Com o Git já instalado, clone este repositório.
```
git clone https://github.com/renato425/groundiscord.git
```

### `4.3` Instalando os plugins do foguete (como o inicializador da turbina... por exemplo?)
Bem simples. Com o node já instalado, e com o repositório clonado. Apenas entre na pasta do projeto pelo cmd e utilize o comando
```
npm install  -y
```
Isso irá instalar todas as bibliotecas necessários pro bot funcionar.

### `4.4` Iniciando a contagem regressiva
Para funcionar, você precisa editar algumas informações contidas no arquivo `config.json` e `index.js`
```json
{
    "DISCORD_TOKEN": "Token do seu Discord Bot",
    "BOLSA":{
        "porcent": "valor da bolsa. Gerado Automaticamente",
        "timestamp": "número da bolsa. Gerado Automaticamente"
    }
}
```

```js
//Tem uma parte da conexão com o banco de dados do Firebase. Coloque suas informações do seu projeto do Firebase nessa parte!. Ex:
firebase.initializeApp({ //crie um projeto no firebase e coloque as informações passadas lá aqui!
    apiKey: 'x',
    authDomain: 'x',
    projectId: 'x',
    storageBucket: 'x',
    messagingSenderId: 'x',
    appId: 'x'
}) //troque o "x" pelas informações passadas pelo Firebase!

//Caso deseje criar comandos globais, deixe o código como está.Caso não, modifique a função "saveCommandsInDiscord"

async function saveCommandsInDiscord() {
    const commandsSaved = await SlashClient.getCommands({guildId: 'x'})
    for (const i in commands) {
        if (!commandsSaved.some(cont => cont.name == commands[i].data.name))
        await SlashClient.createCommand(commands[i].data, 'x')
    }
} //troque o "x" pelo id do seu servidor! Caso deseje utilizar os comandos em apenas um servidor!
```
## `4.5` 5, 4, 3, 2, 1!!!!
No seu console, execute o comando `node .` e verifique se o bot funcionou.

Caso apareça no console, o nome `Online!`, é por que o bot está funcionando. Viva!

Caso não, envie uma solicitação de revisão aqui no GitHub!

## `5` Revisões de Bugs feitas por Usuários!

Caso encontre algum bug (o que é a coisa mais fácil do mundo) por favor, envie para nós nesse repositório!

#### Issues
Antes de abrir uma issue, considere algumas coisas:
* Dê uma descrição detalhada sobre o bug. É bom que entendemos o que está ocorrendo
* Fale como reproduzir o bug. Seria legal (mas claro, se for possível) você enviar fotos sobre o bug


#### Pull Requests
##### Corrigindo algum bug/falha
* Dê uma descrição detalhada sobre o bug. É bom que entendemos o que está ocorrendo
* Fale como reproduzir o bug. Seria legal (mas claro, se for possível) você enviar fotos sobre o bug
* Dê uma descrição detalhada sobre sua correção

##### Melhorando um trecho do código.
* Dê uma descrição detalhada sobre o que você melhorou.
* Explique o motivo da sua correção ser melhor que o código atual, se puder, mostre o máximo de comparações
