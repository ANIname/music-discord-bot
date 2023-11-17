import { Client, GatewayIntentBits } from 'discord.js'

import { DISCORD_BOT_TOKEN } from '../constants/discord'

export const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.login(DISCORD_BOT_TOKEN)
