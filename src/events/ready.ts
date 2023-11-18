import { joinVoiceChannel } from '@discordjs/voice'
import { Client } from 'discord.js'

import getMainInfo from '../../utils/discord/get-main-info'

const { BOT_CHANEL_ID } = process.env

/**
 * Ready event
 * @param {Client} client - Discord Client
 */
export default async function ready (client: Client) {
  const { guild, channel } = getMainInfo(client)
  const { id: channelId } = channel
  const { id: guildId, voiceAdapterCreator } = guild

  joinVoiceChannel({ channelId, guildId, adapterCreator: voiceAdapterCreator })

  await client.user?.setStatus('invisible')
  await client.user?.setUsername(`Music | ${BOT_CHANEL_ID}`)

  console.log(`${client.user?.username} bot is ready!`)
}
