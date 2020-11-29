module.exports = {
    bot:{
        set_status: false, // When enabled it sets a new activity status for the Discord bot
        token: "DISCORD_BOT_TOKEN", // Discord bot token
        anti_spam_time: 5, // Cooldown time in seconds between requests
        prefix: ".", // Bot command prefix
    },
    commands:{
        c: ".check <url> # Check an URL for MarbleCards.",
        donate: ".donate # Bot creator donation info."
    },
    anti_scam: ["uniswap is","uniswap is doing","uniswap airdrop"], // ALL LOWERCASE! -> If a record has one of the specified contents, the message is deleted by the bot.
    messages: {
        status: "Commands: .help",
        error: "please contact the bot developer. The command has triggered an error:",
        not_valid: "this is not a valid command. Type .help for a list of commands.",
        anti_spam: "please wait",
        anti_spam_2: "seconds between your requests!",
        bot_commands: "Bot commands",
        no_bot_commands: "There is no command available.",
        donate: "If you want to support the developer use the following Ethereum (ETC) address: `0xfDb4FDc4Eb9F7158B9Cae46f78357f3cBC8107C3`. Thank you!",
        no_valid_url: "The given domain does not seem to be valid. Please check the list of allowed domains at `https://marble.cards/allowed-domains` and do not forget to put `https://` in front of the domain.",
        not_marbled_url: "the url",
        not_marbled_url_2: "can be marbled.",
        marbled_url: "the url",
        marbled_url_2: "is already marbled.",
    }
};