import { Client } from 'discord.js'

/**
 * Ready event
 * @param {Client} client - Discord Client
 */
export default async function ready (client: Client) {
  console.log(`${client.user?.username} bot is ready!`)
}
