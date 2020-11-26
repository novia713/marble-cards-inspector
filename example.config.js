module.exports = {
    bot:{
        set_status: true, // When enabled it sets a new activity status for the Discord bot
        token: "DISCORD_BOT_TOKEN", // Discord bot token
        anti_spam_time: 10, // Cooldown time in seconds between requests
        prefix: ".", // Bot command prefix
    },
    commands:{
        c: ".c <url> # Check an URL for MarbleCards",
        donate: ".donate # Get bot creator donation info"
    },
    messages: {
        status: "Commands: .help",
    }
};