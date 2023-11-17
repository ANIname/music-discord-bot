const { DISCORD_BOT_TOKEN: BASE_TOKEN, BOT_CHANEL_ID } = process.env

const TOKEN_BY_ID = process.env[`DISCORD_BOT_TOKEN_${BOT_CHANEL_ID}`]

/**
 * Because we have to separate the bot to multiple channels - we need to get the token by the channel id
 * But if we deploy the bot - we are storing the token in the DISCORD_BOT_TOKEN env variable
 * So we need to check if we have a token for the channel id - if not - we will use the base token
 * @returns {string} The token
 */
export default function getToken() {
  return TOKEN_BY_ID || BASE_TOKEN
}