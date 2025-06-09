const { ButtonInteraction } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const Component = require("../../structure/Component");

module.exports = new Component({
    customId: 'new-app-button',
    type: 'button',
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ButtonInteraction} interaction 
     */
    run: async (client, interaction) => {
        await interaction.showModal({
            custom_id: "new-app-modal",
            title: "Septum Modal",
            components: [
                {
                    type: 1,
                    components: [{
                        type: 4,
                        custom_id: "username",
                        label: "Discord username",
                        placeholder: "e.g. ch4rlzki",
                        style: 1,
                        required: true
                    }]
                },
                {
                    type: 1,
                    components: [{
                        type: 4,
                        custom_id: "software",
                        label: "What program/software do you use?",
                        style: 1,
                        placeholder: "e.g. After Effects, Alight Motion, Premiere Pro, Capcut, etc.",
                        required: true
                    }]
                },
                {
                    type: 1,
                    components: [{
                        type: 4,
                        custom_id: "reason",
                        label: "Why do you want to join septum?",
                        style: 2,
                        required: true
                    }]
                },
                {
                    type: 1,
                    components: [{
                        type: 4,
                        custom_id: "logo",
                        label: "Would you use our logo?",
                        style: 1,
                        placeholder: "Yes or No",
                        required: true
                    }]
                },
                {
                    type: 1,
                    components: [{
                        type: 4,
                        custom_id: "edit",
                        label: "Edit link",
                        style: 1,
                        placeholder: "e.g. https://www.youtube.com/@charlzk4845",
                        required: true
                    }]
                },
            ]
        });
    }
}).toJSON();