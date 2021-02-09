const Discord = require('discord.js');
const functions = require("../functions/functions.js");
const dateFormat = require('dateformat');
const db = require('quick.db');
const fs = require('fs');
const color = JSON.parse(fs.readFileSync(`Storage/color.json`, `utf8`));

module.exports = async (bot, reaction, user) => {
  if(reaction.message.partial) await reaction.message.fetch();
  if(reaction.partial) await reaction.fetch();

  let message = reaction.message;
  if(!message) return;
  if(user.bot) return;

  let logsChannel = message.guild.channels.cache.find(c => c.id === db.get(`logs_${message.guild.id}`));

  let already = new Discord.MessageEmbed()
  .setColor(color.red)
  .setAuthor(`⛔ | Error`)
  .setFooter("Coded By IccY#2265", `https://cdn.discordapp.com/attachments/626444990620499978/807146734069350400/iccy.gif`)
  .setDescription(`Shoma Faghat Mitavanid Yek Ticket Baz Konid`);

  let success = new Discord.MessageEmbed()
  .setColor(color.green)
  .setTitle(`🎟️ | Ticket Sakhte Shod`)
  .setFooter("Coded By IccY#2265", `https://cdn.discordapp.com/attachments/626444990620499978/807146734069350400/iccy.gif`)
  .setDescription(`Ticket Shoma Sakhte Shod . Lotfan Motazere Staff Bashid Ta Be Ticket Shoma Pasokh Bedahand`);

  let split = '';
  let usr = user.id.split(split);
  for (var i = 0; i < usr.length; i++) usr[i] = usr[i].trim();

  if(message.embeds.length === 1 && message.embeds[0].title === 'Ticket System' && message.embeds[0].description === 'Baraye Sakhte Ticket Roye 🎟️ Bezanid'){
    if(reaction.emoji.name === "🎟️"){
      if(!message.guild.channels.cache.find(c => c.name === `ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`)){

        let role = message.guild.roles.cache.find(r => r.name === "Ticket Support");
        if(!role) {
          message.guild.roles.create({data:{name: "Ticket Support", permissions: 0}, reason: 'Baraye Didan Ticket Bayad Staff Role Ticket Supporter Dashte Bashand'});
          message.channel.send(`Lotfan Dobare Roye Emoji Click Konid`).then(m => m.delete({timeout: 5000}).catch(e => {}));
          reaction.users.remove(user.id);
          return
        }
        let categoria = message.guild.channels.cache.find(c => c.name == "tickets" && c.type == "category");
        if(!categoria) categoria = await message.guild.channels.create("tickets", {type: "category", position: 1}).catch(e => {return functions.errorEmbed(message, message.channel, "Error")});

        let permsToHave = ['VIEW_CHANNEL', 'SEND_MESSAGES', 'ATTACH_FILES', 'READ_MESSAGE_HISTORY', 'ADD_REACTIONS']

        message.guild.channels.create(`ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, { permissionOverwrites:[
          {
            deny: 'VIEW_CHANNEL',
            id: message.guild.id
          },
          {
            allow: permsToHave,
            id: user.id
          },
          {
            allow: permsToHave,
            id: role.id
          },
        ],
        parent: categoria.id,
        reason: `In User Ticket Baz Kard`,
        topic: `**ID:** ${user.id} -- **Tag:** ${user.tag} | ?close`
      }).then(channel => {

        let createdEmbed = new Discord.MessageEmbed()
        .setAuthor(`📝 | Yek Ticket Sakhte Shod`)
        .setTimestamp()
        .setColor(color.none)
        .setFooter("Coded By IccY#2265", `https://cdn.discordapp.com/attachments/626444990620499978/807146734069350400/iccy.gif`)
        .setDescription(`Yek Fard Ticket Baz Kard Va Motazere Pasokhgoii Staff Hast`)
        .addField(`Etelat`, `**Tavasote :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** ${channel}\n**Dar Tarikhe :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);

        if(logsChannel) logsChannel.send(createdEmbed);
        channel.send(`${user}`, {embed: success});
        db.set(`ticket.ticket-${usr[0]}${usr[1]}${usr[2]}${usr[3]}`, { user: user.id });
      })
      reaction.users.remove(user.id);
      return;
    } else {
      reaction.users.remove(user.id);
      message.reply({embed: already}).then(m => m.delete({timeout: 5000}).catch(e => {}));
    }
    } else {
      reaction.users.remove(user.id);
    }
  }

  // ========================= //

  if(message.embeds.length === 1 && message.embeds[0].title === '🎟️ | Ticket Kamel Shod' && message.embeds[0].description === `baraye Bastane Ticket Az \\🗑️ Estefade Konid Va Dar Gheyre In Sorat Hich Vakoneshi Anjam Nadid.` ){
    if(reaction.emoji.name === "🗑️"){
      if(user.id === db.get(`ticket.${message.channel.name}.user`)){

        let deletedEmbed = new Discord.MessageEmbed()
        .setAuthor(`🗑️ | Ticket Kamel Shod`)
        .setColor(color.none)
        .setDescription(`User Ticket Khod Ra Baraye Delete Shodan Taiid Kard Va Delete Shod`)
        .setTimestamp()
        .setFooter("Coded By IccY#2265", `https://cdn.discordapp.com/attachments/626444990620499978/807146734069350400/iccy.gif`)
        .addField(`Etelat`, `**Tavasote :** \`${user.tag}\`\n**ID :** \`${user.id}\`\n**Ticket :** \`${message.channel.name}\`\n**Dar Tarikhe :** \`${dateFormat(new Date(), "dd/mm/yyyy - HH:MM:ss")}\``);

        if(logsChannel) logsChannel.send(deletedEmbed);

        message.channel.delete();

      }
    }
  }

}
