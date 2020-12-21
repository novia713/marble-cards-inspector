module.exports = {
    bot:{
        set_status: false, // When enabled it sets a new activity status for the Discord bot
        token: "DISCORD_BOT_TOKEN", // Discord bot token
        anti_spam_time: 5, // Cooldown time in seconds between requests
        prefix: ".", // Bot command prefix
    },
    commands:{
        check: ".check <url> # Check an URL for MarbleCards.",
        wiki: ".wiki # MarbleCards Wiki.",
        random: ".random # Post a random MarbleCard.",
        card: ".card <number># Display MarbleCard by number.",
        search: ".search <phrase># Find a random MarbleCard that has the search phrase in the title.",
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
        donate: "if you want to support the developer use the following Ethereum (ETH) address: `0xfDb4FDc4Eb9F7158B9Cae46f78357f3cBC8107C3`. Thank you!",
        api_down: "the marble cards api is currently not available. please try again later.",
        not_marbled_url: "the url",
        not_marbled_url_2: "can be marbled. :green_circle:",
        marbled_url: "the url",
        marbled_url_2: "is already marbled. :red_circle:",
        not_allowed: "the url",
        not_allowed_2: "is not allowed or currently disabled. Please check the list of allowed domains at `https://marble.cards/allowed-domains` and do not forget to put `https://` in front of the domain. :yellow_circle:",
        wiki: "if you have questions about Marble cards you are welcome to browse the wiki - https://marblecards.christiangrieger.de - . If you have any further questions, the community is very helpful. So don't be afraid to ask your questions.",
        banned: "you got banned because of scam attempts.",
        card_number_not_valid: "the requested card id is not valid.",
        card_number_to_low: "the requested card number cannot be smaller than the number 1.",
        card_number_to_high: "the requested card number cannot be bigger than the number",
        card_number_to_high_2: ".",
        no_search_result: "unfortunately there are no results for this search term."
    }
};