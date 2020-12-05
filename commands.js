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
    command_check: async function(msg,message_channel,message_content) {
        const request_reply = await functions.functions_request_url(msg,message_channel,message_content[1]);
        if(request_reply){
            // Can be marbled
            if(request_reply.result.is_valid){
                result_message = config.messages.not_marbled_url + ' `' + message_content[1] + '` ' + config.messages.not_marbled_url_2;
            }else{
                let not_valid_message = request_reply.result.msg;
                // Already marbled
                if(not_valid_message == 'ALREADY_CREATED'){
                    let card_url = '';
                    if(request_reply.result.additional_data.nft_id){
                        card_url =  ' -> https://marble.cards/card/'+request_reply.result.additional_data.nft_id;
                    }
                    result_message = config.messages.marbled_url + ' `' + message_content[1] + '` ' + config.messages.marbled_url_2 + card_url;
                }
                // Domain not allowed
                if(not_valid_message == 'DOMAIN_NOT_ALLOWED_FOR_MARBLING'){
                    result_message = config.messages.not_allowed + ' `' + message_content[1] + '` ' + config.messages.not_allowed_2;
                }
            }
            functions.function_reply(msg,'normal',message_channel,result_message);
        }
        return;
    },

    // command_donate
    command_donate: async function(msg,message_channel) {
        functions.function_reply(msg,'normal',message_channel,config.messages.donate);
        return; 
    },

    // command_wiki
    command_wiki: async function(msg,message_channel) {
        functions.function_reply(msg,'normal',message_channel,config.messages.wiki);
        return; 
    },

    // Commands
    fire_command: async function(msg,message_content,message_channel){

        switch(message_content[0].substr(1)) {
            case "h":
            case "help":
                this.command_help(msg,message_channel);
                return;
            case "w":
            case "wiki"
                this.command_wiki(msg,message_channel)
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