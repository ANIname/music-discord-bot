import { joinVoiceChannel } from '@discordjs/voice'
import { Client } from 'discord.js'

import getMainInfo from '../../utils/discord/get-main-info'

/**
 * Ready event
 * @param {Client} client - Discord Client
 */
export default async function ready (client: Client) {
  const { guild, channel } = getMainInfo(client)
  const { id: channelId } = channel
  const { id: guildId, voiceAdapterCreator } = guild

  joinVoiceChannel({ channelId, guildId, adapterCreator: voiceAdapterCreator })

  client.user?.setStatus('invisible')

  console.log(`${client.user?.username} bot is ready!`)
}
