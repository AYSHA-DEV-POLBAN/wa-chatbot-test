const { Client } = require('whatsapp-web.js');
var qrcode = require('qrcode-terminal');
const axios = require('axios'); // Import axios module
 
const client = new Client();
 
client.on('authenticated', (session) => {
    console.log('AUTHENTICATED', session);
});
 
 
client.on('qr', (qr) => {
        console.log('QR RECEIVED', qr);
 
    qrcode.generate(qr, {small: true}, function (qrcode) {
            console.log(qrcode)
    });
 
});
 
client.on('ready', () => {
    console.log('Client is ready!');
});
 
client.on('message', async  msg => {
    if (msg.body == '!ping') {
        msg.reply('pong');
    }
    
    else if (msg.body.toLocaleLowerCase() == "selamat pagi") {
        client.sendMessage(msg.from, 'selamat pagi juga');
    }

    else{
        try {
            const response = await axios.post('http://127.0.0.1:8000/ask_question/', { question: msg.body });
            console.log('Response:', response.data);
            client.sendMessage(msg.from, response.data.response);
            // Handle the response as needed
        } catch (error) {
            console.error('Error:', error);
            // Handle errors
        }
    }

 
});
 
client.initialize();