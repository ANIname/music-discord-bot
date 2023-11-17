import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js'

export const data = new SlashCommandBuilder()
  .setName('play')
  .setDescription('Plays a music from youtube')
  
/**
 * Plays a music from youtube
 * @param {ChatInputCommandInteraction} interaction - Discord Interaction
 */
export async function execute (interaction: ChatInputCommandInteraction) {
  await interaction.reply({ content: 'Playing music from youtube', ephemeral: true })
}