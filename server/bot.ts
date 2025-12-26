import { Client, GatewayIntentBits, SlashCommandBuilder, REST, Routes, AttachmentBuilder } from "discord.js";
import { storage } from "./storage";
import { log } from "./index";
import canvacord from "canvacord";

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages],
});

const commands = [
  new SlashCommandBuilder()
    .setName("ping")
    .setDescription("Replies with Pong!"),
  new SlashCommandBuilder()
    .setName("stats")
    .setDescription("Shows your profile stats"),
  new SlashCommandBuilder()
    .setName("profile")
    .setDescription("Get your profile card"),
].map(command => command.toJSON());

export async function setupBot() {
  const token = process.env.DISCORD_BOT_TOKEN;
  const clientId = process.env.DISCORD_CLIENT_ID;

  if (!token || !clientId) {
    log("Discord bot token or client ID missing, skipping bot setup", "bot");
    return;
  }

  const rest = new REST({ version: "10" }).setToken(token);

  try {
    log("Started refreshing application (/) commands.", "bot");
    await rest.put(Routes.applicationCommands(clientId), { body: commands });
    log("Successfully reloaded application (/) commands.", "bot");
  } catch (error) {
    console.error(error);
  }

  client.once("clientReady", () => {
    log(`Logged in as ${client.user?.tag}!`, "bot");
  });

  client.on("interactionCreate", async (interaction) => {
    if (!interaction.isChatInputCommand()) return;

    const { commandName } = interaction;

    if (commandName === "ping") {
      await interaction.reply("Pong!");
    } else if (commandName === "stats") {
      const user = await storage.getUserByDiscordId(interaction.user.id);
      if (!user) {
        await interaction.reply("You haven't linked your account yet! Visit the site to login with Discord.");
        return;
      }
      await interaction.reply(`📊 **Stats for ${user.username}**\nLevel: ${user.level}\nXP: ${user.xp}\nViews: ${user.views}`);
    } else if (commandName === "profile") {
      try {
        await interaction.deferReply();
        
        const user = await storage.getUserByDiscordId(interaction.user.id);
        if (!user) {
          await interaction.editReply("You haven't linked your account yet!");
          return;
        }

        const avatar = interaction.user.displayAvatarURL({ extension: "png", size: 256 });
        const accentColor = user.accentColor || "#7c3aed";

        const card = new canvacord.Rank()
          .setAvatar(avatar)
          .setCurrentXP(user.xp)
          .setRequiredXP(user.level * 1000) // Estimate required XP based on level
          .setStatus("online")
          .setProgressBar(accentColor, "COLOR")
          .setUsername(user.displayName || user.username)
          .setDiscriminator("0000")
          .setLevel(user.level)
          .setRank(1, "RANK", false);

        const image = await card.build();
        const attachment = new AttachmentBuilder(image, { name: "profile.png" });
        
        const domain = process.env.REPLIT_DEV_DOMAIN || "localhost:5000";
        await interaction.editReply({ 
          content: `🔗 View full profile: https://${domain}/${user.username}`,
          files: [attachment] 
        });
      } catch (error) {
        console.error("Error generating profile card:", error);
        await interaction.editReply("An error occurred while generating your profile card.");
      }
    }
  });

  await client.login(token);
}
