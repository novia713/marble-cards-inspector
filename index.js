// Load files
const config = require('./config');
const commands = require("./commands");
const functions = require("./functions");   

// Load modules
const { Client } = require('discord.js');
const client = new Client({autoReconnect:true});

// Variables
let cooldown_times = {}; // Anti-Spam by user, id and timestamp

// Discord.js error
client.on('error', error => {

    console.log('Error: '+error);

});

// Discord.js ready
client.on('ready', () => {

    console.log(`Logged in as ${client.user.tag}!`);

    if(config.bot.set_status)
      client.user.setActivity(config.messages.status);

});

// Discord.js message
client.on('message', msg => {

    let current_timestamp = Math.floor(Date.now() / 1000);
    let user_ID = msg.author.id;
    let message_content = msg.content;
    let user_bot = msg.author.bot;

    // Ignor if message comes from a bot
    if(user_bot) 
        return;

    // Check if the message is a command and uses the correct prefix
    if(message_content.charAt(0) != config.bot.prefix)
        return;    

    // Remove double spaces and make command lowercase in case the user used uppercase letters
    message_content = message_content.toLowerCase().split(/ +/);

    // Anti spam
    if(cooldown_times[user_ID] > (current_timestamp-config.bot.anti_spam_time) && cooldown_times[user_ID] !== undefined){
        msg.reply(config.messages.anti_spam+' '+config.bot.anti_spam_time+' '+config.messages.anti_spam_2).catch(function(e) {
            functions.functions_error(msg,e);
        });
        return;
    }
    cooldown_times[user_ID] = current_timestamp;

    // Fire command
    commands.fire_command(msg,message_content);

});

client.login(config.bot.token);