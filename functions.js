// Load files
const config = require('./config');

// Load modules
const axios = require('axios');

module.exports = {

    // Request api
    functions_request_url: async function(msg,url){
        try {
            let request_reply = await axios.post('https://ws.marble.cards/task/page/check_page_task', {
                url: url
            });
            return request_reply.data;
        } catch (error) {
            if(error.response.status == 500){
                msg.reply(config.messages.no_valid_url).catch(function(e) {});
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