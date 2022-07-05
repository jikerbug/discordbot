const { MessageAttachment, MessageEmbed } = require("discord.js");



const { SlashCommandBuilder } = require('@discordjs/builders');

module.exports = {
	data: new SlashCommandBuilder()
		.setName('image')
		.setDescription('Replies with Pong!'),
	async execute(interaction) {
		const drawing = new MessageAttachment("out.png");

        const embed = new MessageEmbed()
            .setDescription('s kicked out from the cookout f')
            .setColor("#5104DB")
            .setFooter({ text: "Kick Member" })
            .setTimestamp();

        await interaction.deferReply()
        await interaction.followUp({files: [drawing], embeds: [embed]});
	},
};
