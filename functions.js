// Load files
const config = require('./config');

// Load modules
const axios = require('axios');

module.exports = {

    // Reply message/embed
    function_reply: async function(msg,message_type,message_channel,reply_message){
        if(message_type == 'normal' && message_channel == 'dm'){
            reply_message = reply_message.charAt(0).toUpperCase() + reply_message.slice(1);
            msg.channel.send(reply_message).catch(function(e) {
                msg.reply(config.messages.error+' '+e.message).catch(function(e) {});
                console.log(e.message);
                return;
            });
        }else{
            msg.reply(reply_message).catch(function(e){
                msg.reply(config.messages.error+' '+e.message).catch(function(e) {});
                console.log(e.message);
                return;
            });
        }
    },

    // Request card marble api
    functions_request_url: async function(msg,message_channel,url){
        try {
            let request_reply = await axios.post('https://ws.marble.cards/task/page/check_page_task', {
                url: url
            });
            return request_reply.data;
        } catch (error) {
            if(error.response.status == 500){
                this.function_reply(msg,'normal',message_channel,config.messages.api_down);
                return;
            }
            msg.reply(config.messages.error+' '+error.message).catch(function(e) {});
            console.log(error.message);
            return;
        }
        return;
    },

    // Request market api
    functions_request_market: async function(msg,message_channel,phrase = false, page = 1){
        let requestHeaders = {ascending: false};
        if(phrase){
            requestHeaders.search = {title: phrase};
            requestHeaders.page = page;
            requestHeaders.limit = 100;
        }
        try {
            // normal to get latest card it
            let request_reply = await axios.post('https://ws.marble.cards/task/card_index/get_cards_task', requestHeaders);
            return request_reply.data;
        } catch (error) {
            if(error.response.status == 500){
                this.function_reply(msg,'normal',message_channel,config.messages.api_down);
                return;
            }
            msg.reply(config.messages.error+' '+error.message).catch(function(e) {});
            console.log(error.message);
            return;
        }
        return;
    }

}