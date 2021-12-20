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

const animalRow = (cauda) => {
    if (cauda >= 0 && cauda <= 100) {
        if (cauda >= 1 && cauda <= 4)
            return ('Avestruz');
        if (cauda >= 5 && cauda <= 8)
            return ('Águia');
        if (cauda >= 9 && cauda <= 12)
            return ('Burro');
        if (cauda >= 13 && cauda <= 16)
            return ('Borboleta');
        if (cauda >= 17 && cauda <= 20)
            return ('Cachorro');
        if (cauda >= 21 && cauda <= 24)
            return ('Cabra');
        if (cauda >= 25 && cauda <= 28)
            return ('Carneiro');
        if (cauda >= 29 && cauda <= 32)
            return ('Camelo');
        if (cauda >= 33 && cauda <= 36)
            return ('Cobra');
        if (cauda >= 37 && cauda <= 40)
            return ('Coelho');
        if (cauda >= 41 && cauda <= 44)
            return ('Cavalo');
        if (cauda >= 45 && cauda <= 48)
            return ('Elefante');
        if (cauda >= 49 && cauda <= 52)
            return ('Galo');
        if (cauda >= 53 && cauda <= 56)
            return ('Gato');
        if (cauda >= 57 && cauda <= 60)
            return ('Jacaré');
        if (cauda >= 61 && cauda <= 64)
            return ('Leão');
        if (cauda >= 65 && cauda <= 68)
            return ('Macaco');
        if (cauda >= 69 && cauda <= 72)
            return ('Porco');
        if (cauda >= 73 && cauda <= 76)
            return ('Pavão');
        if (cauda >= 77 && cauda <= 80)
            return ('Peru');
        if (cauda >= 81 && cauda <= 84)
            return ('Touro');
        if (cauda >= 85 && cauda <= 88)
            return ('Tigre');
        if (cauda >= 89 && cauda <= 92)
            return ('Urso');
        if (cauda >= 93 && cauda <= 96)
            return ('Veado');
        if ((cauda >= 97 && cauda <= 99) || 0)
            return ('Vaca');
    }
}

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

    if (message.content.toLocaleLowerCase() === `${prefix} fechar aposta` && apostaIniciada) {
        let apostasTotais = 0, apostasVencedoras = 0;
        const sorteio = Math.trunc(Math.random() * 8999 + 1000);
        const cauda = sorteio % 100;
        const animalSorteado = animalRow(cauda);

        const vencedores = apostas.filter((aposta) => {
            if (aposta.animal === animalSorteado.toLocaleLowerCase) {
                return aposta;
            }
        });

        apostas.forEach((aposta) => {
            apostasTotais += Number(aposta.valor);
        });

        vencedores.forEach((aposta) => {
            apostasVencedoras += Number(aposta.valor);
        });

        message.channel.send(`número sorteado: ${sorteio}`);
        message.channel.send(`animal sorteado na cauda: ${animalRow(cauda)}`);

        if (vencedores.length === 0) {
            message.channel.send(`Não houve ganhador da aposta!`);
        } else {
            vencedores.forEach((aposta) => {
                const ganho = apostasTotais * (Number(aposta.valor) / apostasVencedoras);
                message.reply(`${user} ganhou R$ ${ganho}`);
            });
        }
        
        apostas = [];
        apostaIniciada = false;
        apostasTotais = 0;
        apostasVencedoras = 0;
    }
});

// Login to Discord with your client's token
client.login(token);