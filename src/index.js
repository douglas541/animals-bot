// Require the necessary discord.js classes
const { Client, Intents } = require('discord.js');
const { prefix, token, bichoImgURL } = require('../config.json');
const { userMention } = require('@discordjs/builders');

// Create a new client instance
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES, Intents.FLAGS.GUILD_MESSAGE_REACTIONS] });

// When the client is ready, run this code (only once)
client.once('ready', () => {
    console.log('Ready!');
});

let apostas = [];
const animals = [
    'avestruz',
    'águia',
    'burro',
    'borboleta',
    'cachorro',
    'cabra',
    'carneiro',
    'camelo',
    'cobra',
    'coelho',
    'cavalo',
    'elefante',
    'galo',
    'gato',
    'jacaré',
    'leão',
    'macaco',
    'porco',
    'pavão',
    'peru',
    'touro',
    'tigre',
    'urso',
    'veado',
    'vaca'
];

client.on('messageCreate', (message) => {
    // filtros
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // rotas
    if (message.content.toLocaleLowerCase() === `${prefix}`) {
        message.channel.send("comandos:");
        message.channel.send("\"jogar\": inicia uma aposta");
    }

    if (message.content.toLocaleLowerCase() === `${prefix} jogar`) {
        message.channel.send("Digite o nome do bicho e o valor da aposta que deseja efetuar (ex: \"Cachorro 100\")");
        message.channel.send({ files: [bichoImgURL] });

        client.on('messageCreate', (message) => {
            // filtros
            if (!message.guild) return;
            // if (!message.content.startsWith(prefix)) return;

            const animal = message.content.split(' ')[0].toLocaleLowerCase();

            if (animals.includes(animal)) {
                const aposta = message.content.split(' ');
                apostas.push({
                    animal: aposta[0],
                    value: aposta[1],
                    user: message.author.id
                });

                const user = userMention(message.author.id);

                message.channel.send(`${user} apostou o valor de ${aposta[1]} no(a) ${aposta[0]}`);
            } else {
                return;
            }

            console.log(apostas);
            return;
        });

        return;
    }

    if (message.content.toLocaleLowerCase() === `${prefix} fechar aposta`) {
        const sorteio = Math.trunc(Math.random() * 8999 + 1000);
        console.log(sorteio);
        message.channel.send(`número sorteado: ${sorteio}`);
        apostas = [];
    }
});

// Login to Discord with your client's token
client.login(token);