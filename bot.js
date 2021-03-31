var Discord = require('discord.io');
var axios = require('axios');
var logger = require('winston');
var auth = require('./auth.json');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', async function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];

        args = args.splice(1);

        switch(cmd) {
            // !ping
            case 'TeamLeon':
                bot.sendMessage({
                    to: channelID,
                    message: 'The best in the west!'
                });
                break;

                case 'joke':
                let getJoke = async () => {
                  let response = await axios.get('https://official-joke-api.appspot.com/random_joke')
                  let joke = response.data;

                  return joke
                };
                let jokeValue = await getJoke();
                //console.log(jokeValue);
                bot.sendMessage({
                  to: channelID,
                  message: jokeValue.setup + " \n\n " + jokeValue.punchline
                });
                //msg.reply(`Here's your joke /n ${jokeValue.setup} /n/n ${jokeValue.punchline}`);
              break;
              case 'kayne':
              let getQuote = async () => {
                let response = await axios.get('https://api.kanye.rest')
                let quote = response.data;

                return quote;
              };
              let kayneQuote = await getQuote();
              //console.log('Kayne West: "' + kayneQuote.quote + '"');
              bot.sendMessage({
                to: channelID,
                message: 'Kanye West: "' + kayneQuote.quote + '"'
              });
              break;

            break;
            // Just add any case commands if you want to..
         }
     }
});
