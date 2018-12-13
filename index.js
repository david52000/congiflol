const Discord = require("discord.js");
const YTDL = require("ytdl-core");
const PREFIX = "*";
const queue = new Map();
const EVERYONE = "@";

var client = new Discord.Client();

var bot = new Discord.Client();

var servers = {};

function play(connection, message) {
 var server = servers[message.guild.id];

    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));

    server.queue.shift();

    server.dispatcher.on("end", function() {
     if (server.queue[0]) play(connection, message);
     else connection.disconnect();
    });
}

bot.on("ready", function() {
    bot.user.setGame("DYCode | *aide");
    console.log("Le Bot DaVid est connecté")
});

bot.on("guildMemberAdd", function(member) {
    let role = member.guild.roles.find("name", "Viewers");
    member.guild.channels.find("name", "bienvenue").sendMessage(member.toString() + " Bienvenue sur CodingLife | Hebergeur, installe toi tranquillement ! :wink: :wink:  ");
    member.addRole(role);
});

bot.on("message", async function(message) {
    if (message.author.equals(bot.user)) return;

    if (!message.content.startsWith(PREFIX)) return;

    var args = message.content.substring(PREFIX.length).split (" ");

    var args2 = message.content.split(" ").slice(1);

    var suffix = args2.join(" ");

    var reason = args2.slice(1).join(" ");
    
    var reasontimed = args2.slice(2).join(' ')

    var user = message.mentions.users.first();
    
    var guild = message.guild;
    
    var member = message.member;
   
    var modlog = member.guild.channels.find("name", "logs")
    
    var user = message.mentions.users.first();

    switch (args[0].toLowerCase()) {
        case "aide":
            var embed = new Discord.RichEmbed()
                .addField("*ping", "C'est pour savoir mon ping en ce moment")
                .addField("*musique", "Jouer une musique !")
                .addField("*membres", "Permet de savoir le nombre de personnes sur le Discord")
                .addField("*google", "Faite cette commande + (la recherche que vous souhaitez faire) !")
                .addField("*youtube", "Faite cette commande + (la recherche que vous souhaitez faire)")
                .addField("*twitch", "Pour avoir la chaine Twitch de CodingLife ARRIVE !")
                .addField("*partenaire1", " 🔰 Partenaire Discord 🔰")
                .addField("*arrive", "???")
                .setColor("#00a1ff")
                .setAuthor("❔ Aide ❓")
                .setDescription("Voici les commandes")
                .setTimestamp()
                message.delete()
                message.channel.sendEmbed(embed)
            break;
      
        case "ping":
        message.channel.sendMessage("Pong! J'ai actuellement `" + bot.ping + " ms !`");
        message.delete();
        break;

        case "purge":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu ne peux exécuter cette commande. ❌");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
                        message.delete()
            var embed = new Discord.RichEmbed()
            .addField("Commande :", "Purge d'un Channel")
            .addField("Modérateur :", message.author.username)
            .addField("Message supprimé", messagecount)
            .addField("Heure:", message.channel.createdAt)
            .setColor("#00ff11")
            .setFooter("Ouf ! Sa as fait un bon ménage dans le serveur ! ^^")
            message.delete()
            member.guild.channels.find("name", "logs").sendEmbed(embed);
            break;

        case "membres":
     message.reply("Nous sommes actuellement ``" + message.guild.memberCount + " membres`` sur ``" + message.guild.name + "`` !");
     message.delete();
     break;
      
      case "membresadmin":
     message.channel.send("@everyone  Nous sommes actuellement ``" + message.guild.memberCount + " membres`` sur ``"📲 + message.guild.name + "`` 📲 !");
     message.delete();
     break;

        case "google":
    let glg = message.content.split(' ');
    glg.shift();
    console.log("J'ai rechercher sur Google!" + message.author.username + " !!");
    message.reply('https://www.google.fr/#q=' + glg.join('%20'));
    message.delete();
    break;

        case "youtube":
    let ytb = message.content.split(' ');
    ytb.shift();
    console.log("J'ai rechercher sur Youtube!" + message.author.username + " !!");
    message.reply('https://m.youtube.com/results?search_query=' + ytb.join('+'));
    message.delete();
    break;

    case "tuto":
     message.reply("Voilà la Chaine Youtube de Evoria: https://www.youtube.com/channel/UC_QFfWt3GnIv2CyixrtWw1g :ok_hand:");
     message.delete();
    break;
      
     case "ts":
     message.reply("TS : hebergeur-codinglife.tk he :ok_hand:");
     message.delete();
    break;
      
      case "partenaire1":
     message.reply(":unlock: Voilà le partenaire Discord #1 :unlock: : https://discord.gg/DveQCp4");
     message.delete();
    break;

    case "twitch":
     message.reply("Voilà sa Chaine: https://www.twitch.tv/  Bon Live :wink: ");
     message.delete();
    break;

    case "evoria":
     message.reply("Voilà le discord: https://discord.gg/cSTeY7y  :ok_hand:");
     message.delete();
    break;
      
      case "serveur":

     message.reply("Serveur arrive dans quelque temps");

     message.delete();

    break;
      
      case "arrive":

     message.reply("Site en maitnenence et machine prochainement");

     message.delete();

    break;
      
      case "musique":
     message.reply("Voie avec l'administration !");
     message.delete();
    break;
        
      
     case "collection":
     message.reply("Collection arrive bientôt Bon Jeux :wink: ");
     message.delete();
    break;
     
       case "admin":

            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu ne peux exécuter cette commande. ❌");

            var messagecount = parseInt(args2.join(" "));

            message.channel.fetchMessages({

            limit: messagecount

            }).then(messages => message.channel.bulkDelete(messagecount));

                    message.delete()

            var embed = new Discord.RichEmbed()

                .addField("c.purge", "Pour supprimer les messages, faites c.purge + (le nombre de message à supprimer dans le channel)")

                .addField("c.annonce", "Met un message dans Information, faites a.annonce + (le message à mettre dans information)")

                .addField("c.@annonce", "Met un message dans information avec une mention dans lequel vous avez écrit, faites c.@annonce (dans un channel) + le texte que vous voulez mettre")

                .addField("c.warn", "Pour l'utiliser, faite la commande + mention de la personne + raison")

                .setColor("#00fff6")

                .setFooter("Idée de commandes ? Proposez des commandes à DaVid en MP !")

                .setAuthor("Panel d'Aide Admin")

                .setDescription("Voici mes commandes d'Admin")

                .setTimestamp()

                message.delete()

                message.channel.sendEmbed(embed)

            break;

    case "annonce":
         if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.sendMessage("Tu ne peux exécuter cette commande. ❌");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
                        message.delete()
     let sondage = message.content.split(" ");
     sondage.shift();
   var embed = new Discord.RichEmbed()
   .addField("Nouvauté!", " "+ sondage.join(" "))
   .setColor("#fcff00")
   .setTimestamp()
   message.delete();
   member.guild.channels.find("name", "information").sendEmbed(embed);
   break;

        case "@annonce":
         if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.sendMessage("Tu ne peux exécuter cette commande. :x:");
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
                        message.delete()
       let newi = message.content.split(" ");
       newi.shift();
     var embed = new Discord.RichEmbed()
     .addField("Annonces !", " "+ newi.join(" "))
     .setColor("#fcff00")
     .setTimestamp()
     message.delete();
     message.channel.send("@everyone Du nouveau sur le serveur, regardez dans #information !")
     member.guild.channels.find("name", "information").sendEmbed(embed);
     break;
      
       case "warn":
            if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.sendMessage("Tu n'as pas la permission d'exécuter cette commande. :x:");
            if (reason.length < 1) return message.reply("Tu as oublié la raison ! :D");
            if (message.mentions.users.size < 1) return message.reply("Tu n'as pas mis son pseudo au complet ! :o")
            message.channel.send(user.toString() + " a été averti pour " + reason + " :white_check_mark:")
            var messagecount = parseInt(args2.join(" "));
            message.channel.fetchMessages({
                limit: messagecount
            }).then(messages => message.channel.bulkDelete(messagecount));
                        message.delete()
            var embed = new Discord.RichEmbed()
            .addField("Commande :", "Warn")
            .addField("Modérateur :", message.author.username)
            .addField("Raison", reason)
            .addField("Heure:", message.channel.createdAt)
            .setColor("#990000")
            .setFooter("Le warn a été réalisé avec succès ! ^^")
            message.delete()
            member.guild.channels.find("name", "liste-warn").sendEmbed(embed);
            member.guild.channels.find("name", "logs").sendEmbed(embed);
            break;

      
       default:
            message.channel.sendMessage("Commande invalide Fait c.aide pour voir toutes les commandes disponibles !")
            message.delete();
    }
});


bot.login(process.env.TOKEN);
