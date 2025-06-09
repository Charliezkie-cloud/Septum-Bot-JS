const { ChatInputCommandInteraction, EmbedBuilder } = require("discord.js");
const DiscordBot = require("../../client/DiscordBot");
const ApplicationCommand = require("../../structure/ApplicationCommand");

module.exports = new ApplicationCommand({
    command: {
        name: 'startapplication',
        description: 'Starts the application',
        type: 1,
        options: [
            {
                "name": "target",
                "description": "The channel where the applications are sent",
                "type": 7,
                "required": true
            }
        ]
    },
    options: {
        cooldown: 5000
    },
    /**
     * 
     * @param {DiscordBot} client 
     * @param {ChatInputCommandInteraction} interaction 
     */
    run: async (client, interaction) => {
        const target = interaction.options.getChannel("target");

        client.database.set(["guilds", interaction.guildId, "appTargetChannel"], target.id);

        const imageEmbed = new EmbedBuilder()
            .setColor(0xf5f5f5)
            .setImage('https://i.imgur.com/sjVSAiE.jpeg');

        const mainEmbed = new EmbedBuilder()
            .setColor(0xf5f5f5)
            .setTitle('𝚂𝚎𝚙𝚝𝚞𝚖 𝙰𝚙𝚙𝚕𝚒𝚌𝚊𝚝𝚒𝚘𝚗')
            .addFields({
            name: 'ʏᴏᴜ ᴄᴀɴ ᴛᴀᴋᴇ ᴀᴅᴠᴀɴᴛᴀɢᴇ ᴏꜰ ᴏᴜʀ ꜱᴜᴘᴘᴏʀᴛ ꜱᴇʀᴠɪᴄᴇꜱ ʙʏ ᴜꜱɪɴɢ ᴛʜᴇ ʙᴜᴛᴛᴏɴꜱ ʙᴇʟᴏᴡ!',
            value: '```Create Unit Application by clicking the New Application button below```'
        });

        const channel = await client.channels.fetch(interaction.channelId);
        if (channel) {
            await channel.send({
                embeds: [imageEmbed, mainEmbed],
                components: [
                    {
                        type: 1,
                        components: [{
                            type: 2,
                            custom_id: `new-app-button`,
                            label: "New application",
                            style: 1
                        }]
                    }
                ]
            });
        }

        await interaction.reply({
            content: "Application has been started!",
            ephemeral: true,
        });
    }
}).toJSON();