const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

// const url = "https://main-dalle-server-scy6500.endpoint.ainize.ai/generate"
const url = "https://main-rudalle-jikerbug.endpoint.ainize.ai/generate"
var request = require('request');

async function getDrawing(text) {
    const options = {
        headers: {'content-type' : 'application/json'},
        url:     url,
        body:    JSON.stringify({
          'text': text,
          'num_images': 1,
        })
      };
      
    console.log(text);
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
    .setName('dalle')
    .setDescription('Replies with ai generated drawing')
        .addStringOption((option)=> option
                                    .setName('description')
                                    .setDescription("원하는 그림의 설명을 적어주세요")
                                    )
                                    ,
  async execute(interaction) {

        //await interaction.reply("body");
        await interaction.deferReply()


        const description = interaction.options.getString('description');
        console.log("description : " + description);

        var body = await getDrawing(description);

        var base64Data = body.replace(/^data:image\/png;base64,/, "");

        require("fs").writeFile("out.png", base64Data, 'base64', function(err) {
          
          if(err){
            console.log(err);
          }
          const drawing = new MessageAttachment("out.png");
        
          const embed = new MessageEmbed()
            .setDescription('description : ' + description)
            .setColor("#5104DB")
            .setFooter({ text: "drew by ai" })
            .setTimestamp();
          interaction.followUp({files: [drawing], embeds: [embed]});
        });     
  },
};




