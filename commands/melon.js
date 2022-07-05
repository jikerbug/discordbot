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
	data: new SlashCommandBuilder()
		.setName('melon')
		.setDescription('Replies with melon chat top 100 style lyrics')
        .addStringOption((option)=> option
                                    .setName(startLyricsOption)
                                    .setDescription("원하는 시작 가사를 써주세요")
                                    )
                                    .addStringOption((option)=> option
                                    .setName(lengthLyricsOption)
                                    .setDescription("write song lyrics you want")
                                    )
                                    ,
	async execute(interaction) {

        const startLyrics = interaction.options.getString(startLyricsOption);
        const lengthLyrics = interaction.options.getString(lengthLyricsOption);
        
        if (!startLyrics) {
			const embed = new MessageEmbed()
				.setTitle('Please, enter a start lyrics to activate')
				.setColor(0xD0312D);
			return interaction.reply({ embeds: [embed] });
		}
        var length = 30;

        if(lengthLyrics){
            newLeng = parseInt(lengthLyrics);

            if(newLeng > 90){
                length = 80;
            }else{
                length = newLeng;
            }
        }

        var body = await getLyrics(startLyrics ,length);
        lyrics = processLyrics(body)
        await interaction.reply(lyrics);

	},
};