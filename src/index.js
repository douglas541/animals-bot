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

let apostaIniciada = false;
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
    const user = userMention(message.author.id);

    // filtros
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;

    // rotas
    if (message.content.toLocaleLowerCase() === `${prefix}`) {
        message.channel.send("comandos:");
        message.channel.send("\"apostar\": inicia uma aposta");
        message.channel.send("\"fechar aposta\": fecha uma aposta e realiza o sorteio");
    }

    if (message.content.toLocaleLowerCase() === `${prefix} apostar`) {
        message.channel.send("Digite o nome do bicho e o valor da aposta que deseja efetuar (ex: \"!bicho Cachorro 100\")");
        message.channel.send({ files: [bichoImgURL] });
        apostaIniciada = true;
    }

    const aposta = message.content.split(' ');

    if (aposta.length >= 2) {
        const animal = aposta[1].toLocaleLowerCase();
        const valor = Number(aposta[2]);

        if (animals.includes(animal)) {

            if (isNaN(valor)) {
                message.reply(`${user} aposta inválida`);
                return;
            }

            apostas.push({
                animal,
                valor,
                userId: message.author.id
            });

            message.reply(`${user} apostou R$ ${valor} no(a) ${animal}`);

            console.log(apostas);
        }
    }

    if (message.content.toLocaleLowerCase() === `${prefix} fechar aposta`) {
        const sorteio = Math.trunc(Math.random() * 8999 + 1000);

        const cauda = sorteio % 100;

        message.channel.send(`número sorteado: ${sorteio}`);

        if (cauda >= 0 && cauda <= 100) {
            if (cauda >= 1 && cauda <= 4) {
                message.channel.send('Avestruz');
            }
            if (cauda >= 5 && cauda <= 8) {
                message.channel.send('Águia');
            }
            if (cauda >= 9 && cauda <= 12) {
                message.channel.send('Burro');
            }
            if (cauda >= 13 && cauda <= 16) {
                message.channel.send('Borboleta');
            }
            if (cauda >= 17 && cauda <= 20) {
                message.channel.send('Cachorro');
            }
            if (cauda >= 21 && cauda <= 24) {
                message.channel.send('Cabra');
            }
            if (cauda >= 25 && cauda <= 28) {
                message.channel.send('Carneiro');
            }
            if (cauda >= 29 && cauda <= 32) {
                message.channel.send('Camelo');
            }
            if (cauda >= 33 && cauda <= 36) {
                message.channel.send('Cobra');
            }
            if (cauda >= 37 && cauda <= 40) {
                message.channel.send('Coelho');
            }
            if (cauda >= 41 && cauda <= 44) {
                message.channel.send('Cavalo');
            }
            if (cauda >= 45 && cauda <= 48) {
                message.channel.send('Elefante');
            }
            if (cauda >= 49 && cauda <= 52) {
                message.channel.send('Galo');
            }
            if (cauda >= 53 && cauda <= 56) {
                message.channel.send('Gato');
            }
            if (cauda >= 57 && cauda <= 60) {
                message.channel.send('Jacaré');
            }
            if (cauda >= 61 && cauda <= 64) {
                message.channel.send('Leão');
            }
            if (cauda >= 65 && cauda <= 68) {
                message.channel.send('Macaco');
            }
            if (cauda >= 69 && cauda <= 72) {
                message.channel.send('Porco');
            }
            if (cauda >= 73 && cauda <= 76) {
                message.channel.send('Pavão');
            }
            if (cauda >= 77 && cauda <= 80) {
                message.channel.send('Peru');
            }
            if (cauda >= 81 && cauda <= 84) {
                message.channel.send('Touro');
            }
            if (cauda >= 85 && cauda <= 88) {
                message.channel.send('Tigre');
            }
            if (cauda >= 89 && cauda <= 92) {
                message.channel.send('Urso');
            }
            if (cauda >= 93 && cauda <= 96) {
                message.channel.send('Veado');
            }
            if ((cauda >= 97 && cauda <= 99) || 0) {
                message.channel.send('Vaca');
            }
        }

        console.log(cauda);
        console.log(sorteio);

        apostas = [];
        apostaIniciada = false;
    }
});

// Login to Discord with your client's token
client.login(token);