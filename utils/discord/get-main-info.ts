import { Client, Guild,VoiceChannel } from 'discord.js'

const { BOT_CHANEL_ID } = process.env

export interface MainInfo {
  guild: Guild
  channel: VoiceChannel
}

/**
 * Get main info from discord client
 * @param {Client} client - Discord Client
 * @returns {MainInfo} - Main info
 */
export default function getMainInfo (client: Client): MainInfo  {
  const guild = client.guilds.cache.first()
  const channel = client.channels.cache.get(BOT_CHANEL_ID as string)

  if (!channel) throw new Error(`Channel not found!`)
  if (!guild) throw new Error(`Guild not found!`)

  return { guild, channel: channel as VoiceChannel }
}