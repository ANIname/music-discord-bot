import { joinVoiceChannel } from '@discordjs/voice'
import { Client } from 'discord.js'

const { BOT_CHANEL_ID } = process.env

/**
 * Ready event
 * @param {Client} client - Discord Client
 */
export default async function ready (client: Client) {
  const guild = client.guilds.cache.first()
  const channel = client.channels.cache.get(BOT_CHANEL_ID as string)

  if (!channel) throw new Error(`Channel not found!`)
  if (!guild) throw new Error(`Guild not found!`)

  joinVoiceChannel({
    channelId: channel.id,
    guildId: guild.id,
    adapterCreator: guild.voiceAdapterCreator
  })

  console.log(`${client.user?.username} bot is ready!`)
}
