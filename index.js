const Discord = require("discord.js");
const config = require("./Storage/config.json");

const bot = new Discord.Client({
    disableEveryone: true,
    autoReconnect: true,
    disabledEvents: ["TYPING_START"],
    partials: ['MESSAGE', 'CHANNEL', 'GUILD_MEMBER', 'REACTION']
});

const activities_list = [
    "Coded By IccY#2265", 
    "Ticket Bot",
    "Use ?help",
    ]; 

bot.on('ready', () => {
    console.log(`Bot Amade Shod!`);
    setInterval(() => {
        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1);
        bot.user.setActivity(activities_list[index]); 
    }, 10000); 
});

bot.commands = new Discord.Collection();
bot.aliases = new Discord.Collection();
bot.event = new Discord.Collection();

const loadCommands = require("./functions/commands.js");
const loadEvents = require("./functions/events.js");

const load = async () => {
    await loadCommands.run(bot);
    await loadEvents.run(bot);
}

load();
bot.login(config.token);
