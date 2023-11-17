import { directoryImport } from 'directory-import'
import { Client, ClientEvents, GatewayIntentBits } from 'discord.js'
import camelCase from 'lodash/camelCase'

import getToken from '../utils/discord/get-token'
import { EventData } from './types.d'

const token = getToken()

export const client = new Client({ intents: [GatewayIntentBits.Guilds] })

client.login(token)

// Import all events from the events directory and add them to the client
// Example: ./events/ready.ts => client.on('ready', () => { ... })
// Example: ./events/message-create.ts => client.on('messageCreate', () => { ... })
directoryImport('./events', (moduleName, _, moduleData) => {
  const eventName = camelCase(moduleName) as keyof ClientEvents
  const listener = (moduleData as EventData).default

  if (typeof listener !== 'function') return

  client.on(eventName, (...arguments_) => listener(client, ...arguments_))
})
