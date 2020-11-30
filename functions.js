// Load files
const config = require('./config');
const functions = require("./functions");

// Load modules
const axios = require('axios');

module.exports = {

    // Error handler
    functions_error: function(msg,e) {
        msg.reply(config.messages.error+' '+e.message).catch(function(e) {});
        console.log(e.message);
        return;
    },

    // Reply message/embed
    function_reply: async function(msg,message_type,message_channel,reply_message){
        if(message_type == 'normal' && message_channel == 'dm'){
            reply_message = reply_message.charAt(0).toUpperCase() + reply_message.slice(1);
            msg.channel.send(reply_message).catch(function(e) {
                this.functions_error(msg,e);
            });
        }else{
            msg.reply(reply_message).catch(function(e){
                this.functions_error(msg,e);
            });
        }
    },

    // Request api
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
            this.functions_error(msg,error);
            return;
        }
        return;
    }

}