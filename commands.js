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

    // command_random
    command_random: async function(msg,message_channel) {
        const request_reply = await functions.functions_request_market(msg,message_channel);
        if(request_reply){
            if(request_reply.cards[0]){
                if(request_reply.cards[0].nft_id){
                    let random_card_number = Math.floor(Math.random() * (request_reply.cards[0].nft_id - 1 + 1) + 1);
                    //functions.function_reply(msg,'normal',message_channel,'https://marble.cards/card/'+random_card_number);
                    msg.channel.send('https://marble.cards/card/'+random_card_number)
                }
            }
        }
        return; 
    },

    // command_card
    command_card: async function(msg,message_channel,message_content) {
        const request_reply = await functions.functions_request_market(msg,message_channel);
        let max_number = 0;
        if(request_reply){
            max_number = request_reply.cards[0].nft_id;
        }else{
            return;
        }
        const request_number = message_content[1];
        // Check if integer
        if (!(request_number+"").match(/^\d+$/) ) {
            functions.function_reply(msg,'normal',message_channel,config.messages.card_number_not_valid);
            return;
        }
        // Check smaller as min and bigger as max card number
        if(request_number < 1){
            functions.function_reply(msg,'normal',message_channel,config.messages.card_number_to_low);
            return;
        }
        if(request_number > max_number){
            functions.function_reply(msg,'normal',message_channel,config.messages.card_number_to_high+ ' ' + max_number + config.messages.card_number_to_high_2);
            return;
        }
        //functions.function_reply(msg,'normal',message_channel,'https://marble.cards/card/'+request_number);
        msg.channel.send('https://marble.cards/card/'+request_number)
        return; 
    },

    // command_search
    command_search: async function(msg,message_channel,message_content) {
        let request_cards = [];
        let request_phrase = message_content[1];
        let request_reply = await functions.functions_request_market(msg,message_channel,request_phrase);
        if(request_reply){
            request_reply.cards.forEach(function(item){
                request_cards.push(item);
            });
            let request_reply_total_count = request_reply.paging.total_count;
            let request_paging = 1;
            if(request_reply.paging.max_page > 1){
                while (request_paging < request_reply.paging.max_page) {
                    request_paging++;
                    let request_reply = await functions.functions_request_market(msg,message_channel,request_phrase, request_paging);
                    request_reply.cards.forEach(function(item){
                        request_cards.push(item);
                    });
                }
            }
            if(request_reply_total_count == 0){
                functions.function_reply(msg,'normal',message_channel,config.messages.no_search_result);
                return;
            }else{
                let random_number = Math.floor(Math.random() * (request_cards.length - 1 + 1) + 1);
                let reply_card = request_cards[random_number].nft_id;
                msg.channel.send('https://marble.cards/card/'+reply_card)
                return;
            }
            return;
        }
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
            case "wiki":
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
            case "r":
            case "random":
                this.command_random(msg,message_channel);
                return;
            case "card":
                this.command_card(msg,message_channel,message_content);
                return;
            case "s":
            case "search":
                this.command_search(msg,message_channel,message_content);
                return;
            default:
                functions.function_reply(msg,'normal',message_channel,config.messages.not_valid);
                return; 
        }

    }

};