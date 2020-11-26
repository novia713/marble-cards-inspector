// Load files
const config = require('./config');
const functions = require("./functions");

// Load modules
const { MessageEmbed } = require('discord.js');

module.exports = {

    // command_help
    command_help: async function(msg) {
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
        msg.channel.send(embed).catch(function(e) {
            functions.functions_error(msg,e);
        });
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
            msg.reply(result_message).catch(function(e) {
                functions.functions_error(msg,e);
            });
        }
        return;
    },

    // command_donate
    command_donate: async function(msg) {
        msg.reply(config.messages.donate).catch(function(e) {
            functions.functions_error(msg,e);
        });
        return; 
    },

    // Commands
    fire_command: async function(msg,message_content){

        switch(message_content[0].substr(1)) {
            case "h":
            case "help":
                this.command_help(msg);
                return;
            case "c":
            case "check":
                this.command_check(msg,message_content);
                return;
            case "d":
            case "donate":
                this.command_donate(msg);
                return;
            default:
                msg.reply(config.messages.not_valid).catch(function(e) {
                    functions.functions_error(msg,e);
                });
                return; 
        }

    }

};