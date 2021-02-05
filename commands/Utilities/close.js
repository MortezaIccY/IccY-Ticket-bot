const Discord = require("discord.js");
const fs = require("fs");
const db = require("quick.db");
const dateFormat = require("dateformat");
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

exports.run = async (bot, message, args, functions) => {

    let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));

    if(!message.channel.name.startsWith(`ticket-`)) return;
    
    if(message.author.id === db.get(`ticket.${message.channel.name}.user`)) {
    
      let userEmbed = new Discord.MessageEmbed()
      .setAuthor(`🗑️ | Ticket Delete Shod`)
      .setColor(color.none)
      .setDescription(`User Ticket Khod Ra Baraye Delete Shodan Taiid Kard Va Delete Shod`)
      .setTimestamp()
      .setFooter("Coded By IccY#2265", `https://cdn.discordapp.com/attachments/626444990620499978/807146734069350400/iccy.gif`)
      .addField(`Etelat`, `**Tavasote :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Dar Tarikhe :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);
    
      db.delete(`ticket.${message.channel.name}`);
      if(logsChannel) await logsChannel.send(userEmbed);
      await message.channel.delete();
    } else {
    
      let support = message.guild.roles.cache.find(r => r.name === "Ticket Support");
      if(!support) return functions.errorEmbed(message, message.channel, "Le rôle `Ticket Support` n'existe pas, veuillez le créer.");
      if(message.deletable) message.delete();
    
      if(args[0] === "force"){
    
        let forceEmbed = new Discord.MessageEmbed()
        .setAuthor(`🗑️ | Ticket Delete Shod`)
        .setColor(color.none)
        .setDescription(`Yek Shakhs Ba Role ${support} Ticket Ra Bast Va Delete Kard`)
        .setTimestamp()
        .setFooter("Coded By IccY#2265", `https://cdn.discordapp.com/attachments/626444990620499978/807146734069350400/iccy.gif`)
        .addField(`Etelat`, `**Tavasote :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Dar Tarikhe :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);
    
        let embed1 = new Discord.MessageEmbed()
        .setAuthor(`📥 | Ticket Delete Shod`)
        .setColor(color.blue)
        .setFooter("Coded By IccY#2265", `https://cdn.discordapp.com/attachments/626444990620499978/807146734069350400/iccy.gif`)
        .setDescription(`\`${message.author.tag}\` Ticket Khod Ra Bast`);
        db.delete(`ticket.${message.channel.name}`);
        if(logsChannel) await logsChannel.send(forceEmbed);
        if(bot.users.cache.get(db.get(`ticket.${message.channel.name}.user`))) bot.users.cache.get(db.get(`ticket.${message.channel.name}.user`)).send(embed1).catch(e => {console.log(e)})
        message.channel.delete();
        
    
      } else {
    
        let staffEmbed = new Discord.MessageEmbed()
      .setAuthor(`🗑️| Dar Khast Delete Shodan Ticket`)
      .setColor(color.none)
      .setDescription(`Yek User Ba Role ${support} Darkhast Bastn Va Delete Krdan Ticket Kard`)
      .setTimestamp()
      .setFooter("Coded By IccY#2265", `https://cdn.discordapp.com/attachments/626444990620499978/807146734069350400/iccy.gif`)
      .addField(`Etelat`, `**Utilisateur :** \`${message.author.tag}\`\n**ID :** \`${message.author.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Dar Tarikhe :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);
    
        if(!message.guild.member(message.author).roles.cache.has(support.id)) return functions.errorEmbed(message, message.channel, "Désolé, vous n'avez pas le rôle `Ticket Support`.");
        let embed2 = new Discord.MessageEmbed()
        .setColor(color.green)
        .setTitle(`🎟️ | Ticket Kamel Shod`)
        .setDescription(`baraye Bastane Ticket Az \\🗑️ Estefade Konid Va Dar Gheyre In Sorat Hich Vakoneshi Anjam Nadid.`);
        if(logsChannel) await logsChannel.send(staffEmbed);
        message.channel.send(embed2).then(m => m.react(`🗑️`));
      }
    
    }

}

exports.help = {
    name: "close",
    aliases: []
}