const { SlashCommandBuilder } = require('@discordjs/builders');
const { MessageAttachment, MessageEmbed } = require('discord.js');

// const url = "https://main-dalle-server-scy6500.endpoint.ainize.ai/generate"
const url = "https://master-ugatit-kmswlee.endpoint.ainize.ai/selfie2anime"
var http = require('http');
const message = require('./events/message');
var FormData = require('form-data');

async function getDrawing(mafu) {

    console.log("1")
   
    console.log(mafu);
    const formData = new FormData();
    console.log("1")
    const image =  {
        url: mafu,
        type:'image/jpeg',
        name:'input.jpeg'
    }
    console.log("2")
    formData. append('file', image);
    console.log("3")
    
    const options = {
        method: 'post',
        headers: {'Accept':'images/*', 'content-type' : 'multipart/form-data'},
        url:     url,
        body:   formData
      };

    
      console.log("3")
    console.log(text);
    // Return new promise
    return new Promise(function(resolve, reject) {
      // Do async job
      http.request(options, function(err, resp, body) {
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


        let mafu = message.attachments.first().url;
        var body = await getDrawing(mafu);

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



