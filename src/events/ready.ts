import { AudioPlayer, AudioPlayerStatus,createAudioPlayer, createAudioResource, joinVoiceChannel, StreamType } from '@discordjs/voice'
import { Client } from 'discord.js'
import getPlaylistInfo from 'youtube-playlist-info'
import ytdl from 'ytdl-core'

import { AVAILABLE_BOTS_BY_CHANNELS } from '../../constants/discord'
import { YOUTUBE_MUSIC_PLAYLIST_ID } from '../../constants/youtube'
import getMainInfo from '../../utils/discord/get-main-info'

// TODO добавить оптимизацию что если на канале никого нет - то ставим бота на паузу 
// TODO и когда кто-то заходит - продолжаем играть
// TODO можно так-же отключать его от комнаты если никого нет
// TODO и возвращать на канал если кто-то заходит

// TODO добавить возможность пропускать песни
// TODO добавить возможность включать песни по запросу
// TODO добавить возможность включать песни по ссылке
// TODO добавить возможность регулировать громкость

// TODO если кто-то входит на канал впервые - приглушать бота

const { BOT_CHANEL_ID, GOOGLE_API_KEY } = process.env

/**
 * Ready event
 * @param {Client} client - Discord Client
 */
export default async function ready (client: Client) {
  if (!client.user) throw new Error('Client user is not defined')

  const { guild, channel } = getMainInfo(client)
  const { id: channelId, name: channelName } = channel
  const { id: guildId, voiceAdapterCreator } = guild

  await client.user.setStatus('invisible')
  await client.user.setUsername(`Music | ${channelName}`)

  if (BOT_CHANEL_ID === AVAILABLE_BOTS_BY_CHANNELS['внутренний круг']) {
    const connection = joinVoiceChannel({ channelId, guildId, adapterCreator: voiceAdapterCreator })

    const player = createAudioPlayer()

    connection.subscribe(player)

    await playSong(player)
  }

  console.log(`${client.user?.username} bot is ready!`)
}

/**
 * Play song
 * @param {AudioPlayer} player - Audio player
 */
async function playSong(player: AudioPlayer) {
  try {

  const playlistInfo = await getPlaylistInfo(GOOGLE_API_KEY as string, YOUTUBE_MUSIC_PLAYLIST_ID)

  const songIndex = Math.floor(Math.random() * playlistInfo.length)

  // eslint-disable-next-line security/detect-object-injection
  const item = playlistInfo[songIndex]

  console.log(`Playing ${item?.title}`)

  if (!item) throw new Error('Item is not defined')

  const stream = ytdl(`https://www.youtube.com/watch?v=${item.resourceId.videoId}`, {
    filter: 'audioonly',
    highWaterMark: 1<<25
  })

  const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true, })

  resource.volume?.setVolume(0.05)

  player.play(resource)

  player.on(AudioPlayerStatus.Idle, () => playSong(player))

  player.on('error', console.error)
  } catch (error) {
    if ((error as { code: string }).code !== 'ECONNRESET') {
      console.warn(new Date().toLocaleString(), error)

      playSong(player)
    }

    console.error('Error', error)
  }
}