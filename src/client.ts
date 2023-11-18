import { Client, GatewayIntentBits } from 'discord.js'

import { DISCORD_BOT_TOKEN } from '../constants/discord'

const { Guilds, GuildVoiceStates, GuildMessages } = GatewayIntentBits

export const client = new Client({ intents: [Guilds, GuildVoiceStates, GuildMessages] })

client.login(DISCORD_BOT_TOKEN)
