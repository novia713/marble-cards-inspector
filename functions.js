// Load files
const config = require('./config');

// Load modules
const axios = require('axios');

module.exports = {

    // Reply message/embed
    function_reply: async function(msg,message_type,message_channel,reply_message){
        if(message_type == 'normal' && message_channel == 'dm'){
            reply_message = reply_message.charAt(0).toUpperCase() + string.slice(1);
        }
        msg.channel.send(reply_message).catch(function(e) {
            this.functions_error(msg,e);
        });
    },

    // Request api
    functions_request_url: async function(msg,url){
        try {
            let request_reply = await axios.post('https://ws.marble.cards/task/page/check_page_task', {
                url: url
            });
            return request_reply.data;
        } catch (error) {
            if(error.response.status == 500){
                this.function_reply(msg,'normal',config.messages.no_valid_url);
                return;
            }
            this.functions_error(msg,error);
            return;
        }
        return;
    },

    // Error handler
    functions_error: function(msg,e) {
        msg.reply(config.messages.error+' '+e.message).catch(function(e) {});
        console.log(e.message);
        return;
    }

}