const { ModalSubmitInteraction, EmbedBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const Component = require("../../structure/Component");
const config = require("../../config");

module.exports = new Component({
    customId: 'new-app-modal',
    type: 'modal',
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ModalSubmitInteraction} interaction 
     */
    run: async (client, interaction) => {

        const username = interaction.fields.getTextInputValue('username');
        const software = interaction.fields.getTextInputValue('software');
        const reason = interaction.fields.getTextInputValue('reason');
        const logo = interaction.fields.getTextInputValue('logo');
        const edit = interaction.fields.getTextInputValue('edit');

        if (!client.database.has(["guilds", interaction.guildId, "appTargetChannel"])) {
            await interaction.reply({
                content: "Something went wrong, please try again.",
                ephemeral: true
            });
            (await client.users.fetch(config.users.ownerId)).send("Oops! Something went wrong with your application. It looks like the target channel is missing, please set it again.");
            return;
        }

        const targetChannel = client.database.get(["guilds", interaction.guildId, "appTargetChannel"]);
        
        const embed = new EmbedBuilder()
            .setColor(0xfdfdfd)
            .setTitle("Septum Application")
            .addFields(
                { name: "Discord username", value: username },
                { name: "What program/software do you use?", value: software },
                { name: "Why do you want to join septum?", value: reason },
                { name: "Would you use our logo?", value: logo },
                { name: "Edit link", value: edit },
            )

        await interaction.reply({
            content: "Your application has been submitted!",
            ephemeral: true
        });

        const channel = await client.channels.fetch(targetChannel);
        if (channel) {
            channel.send({
                content: "<@&1099356160441724998> A new application has been submitted!",
                embeds: [embed]
            });
        }

    }
}).toJSON();