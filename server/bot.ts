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
        const user = await storage.getUserByDiscordId(interaction.user.id);
        if (!user) {
          await interaction.reply({ content: "You haven't linked your account yet! Visit the site to login with Discord.", ephemeral: true });
          return;
        }

        const domain = process.env.REPLIT_DEV_DOMAIN || process.env.REPLIT_DOMAINS?.split(',')[0] || "localhost:5000";
        await interaction.reply({ 
          content: `🔗 **${user.displayName || user.username}'s Profile**\nhttps://${domain}/${user.username}`
        });
      } catch (error) {
        console.error("Error fetching profile link:", error);
        await interaction.reply({ content: "An error occurred while fetching your profile link.", ephemeral: true });
      }
    }
  });

  await client.login(token);
}
