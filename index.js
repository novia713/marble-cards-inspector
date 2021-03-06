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
    var message_channel = msg.channel.type;
    let message_content = msg.content;
    let user_bot = msg.author.bot;
    var channel_ID = msg.channel.id;
    // Ignor if message comes from a bot
    if(user_bot) 
        return;

    // Anti scam (delete messages and user ban)
    let anti_scam = config.anti_scam;
    let message_scam = message_content.toLowerCase();
    if (anti_scam.some(v => message_scam.includes(v))) {
        msg.delete();
        try {
            var ban_user = msg.guild.members.cache.find(user => user.id === user_ID);
            ban_user.ban({days:7,reason:"SCAM!"}).then(function(user) {
                //functions.function_reply(msg,'normal',message_channel,config.messages.banned);
                console.log('User banned!');
                // Delete other bot start message that was for the banned
                msg.channel.messages.fetch({limit: 10}).then(collected => { //collected is a Collection
                    collected.forEach(msg => {
                        if (msg.content.startsWith("Welcome")) msg.delete();
                    });
                });
            });
        } catch (e) {
            console.log(e);
        }
        return;
    }

    // Check if the message is a command and uses the correct prefix
    if(message_content.charAt(0) != config.bot.prefix)
        return;   

    // Remove double spaces and make command lowercase in case the user used uppercase letters
    message_content = message_content.toLowerCase().split(/ +/);

    // Anti spam
    if(cooldown_times[user_ID] > (current_timestamp-config.bot.anti_spam_time) && cooldown_times[user_ID] !== undefined){
        functions.function_reply(msg,'normal',message_channel,config.messages.anti_spam+' '+config.bot.anti_spam_time+' '+config.messages.anti_spam_2);
        return;
    }
    cooldown_times[user_ID] = current_timestamp;

    // Fire command
    commands.fire_command(msg,message_content,message_channel);

});

client.login(config.bot.token);