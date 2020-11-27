// Load files
const config = require('./config');
const functions = require("./functions");

// Load modules
const { MessageEmbed } = require('discord.js');

module.exports = {

    // command_help
    command_help: async function(msg,message_channel) {
        let valid_commands = "";
        // Add commands for manager
        Object.keys(config.commands).forEach(function(k){
            valid_commands += "**"+config.commands[k].split('#')[0]+"**\n"+config.commands[k].split('#')[1]+"\n";
        });
        // Check if empty and replace
        if(!valid_commands)
            valid_commands = config.messages.no_bot_commands;
        // Build embed
        const embed = new MessageEmbed().setTitle(config.messages.bot_commands.toUpperCase()).setColor(0xFFFFFF).setDescription(valid_commands);
        // Send commands
        functions.function_reply(msg,'embed',message_channel,embed);
        return;
    },

    // command_check
    command_check: async function(msg,message_content) {
        const request_reply = await functions.functions_request_url(msg,message_content[1]);
        if(request_reply){
            let result_message;
            if(request_reply.result.is_valid){
                result_message = config.messages.not_marbled_url + ' `' + message_content[1] + '` ' + config.messages.not_marbled_url_2;
            }else{
                result_message = config.messages.marbled_url + ' `' + message_content[1] + '` ' + config.messages.marbled_url_2;
            }
            functions.function_reply(msg,'normal',message_channel,result_message);
        }
        return;
    },

    // command_donate
    command_donate: async function(msg) {
        functions.function_reply(msg,'normal',message_channel,config.messages.donate);
        return; 
    },

    // Commands
    fire_command: async function(msg,message_content,message_channel){

        switch(message_content[0].substr(1)) {
            case "h":
            case "help":
                this.command_help(msg,message_channel);
                return;
            case "c":
            case "check":
                this.command_check(msg,message_channel,message_content);
                return;
            case "d":
            case "donate":
                this.command_donate(msg,message_channel);
                return;
            default:
                functions.function_reply(msg,'normal',message_channel,config.messages.not_valid);
                return; 
        }

    }

};