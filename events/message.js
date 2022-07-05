
const { SlashCommandBuilder } = require('@discordjs/builders'); 
const url = 'https://train-bfwduo1j45469v5ok3wc-gpt2-train-teachable-ainize.endpoint.ainize.ai/predictions/gpt-2-ko-small-finetune'


var request = require('request');
var startLyricsOption = 'startlyrics';
var lengthLyricsOption = 'lengthlyrics';


function processLyrics(body){
    body = body.slice(1,-1);
    var words = body.split('\\n');
    var lyrics = "";
    for(let i = 0; i < words.length; i++){
        lyrics += words[i];
        lyrics += " ";
    }

    return lyrics;
}

async function getLyrics(text, length) {
    const options = {
        headers: {'content-type' : 'application/json'},
        url:     url,
        body:    JSON.stringify({
          'text': text,
          'num_samples': 1,
          'length': length
        })
      };
  
    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      request.post(options, function(err, resp, body) {
        if (err) {
          reject(err);
        } else {
          resolve(body);
        }
      })
    })
  }


module.exports = {
	name: 'messageCreate',
	async execute(message) {
        if (!message.content.startsWith(';') || message.author.bot)
			return;
		console.log(`Message from ${message.author.tag} in #${message.channel.name} : ${message.content}`);


        var length = 30;
        var body = await getLyrics(message.content.substring(1) ,length);
        lyrics = processLyrics(body)
        message.reply(lyrics);
	},
};



  