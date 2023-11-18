import { AudioPlayer, AudioPlayerStatus,createAudioPlayer, createAudioResource, joinVoiceChannel, StreamType } from '@discordjs/voice'
import { Client } from 'discord.js'
import getPlaylistInfo from 'youtube-playlist-info'
import ytdl from 'ytdl-core'

import { AVAILABLE_BOTS_BY_CHANNELS } from '../../constants/discord'
import { YOUTUBE_MUSIC_PLAYLIST_ID } from '../../constants/youtube'
import getMainInfo from '../../utils/discord/get-main-info'

type Thumbnail = {
  url: string;
  width: number;
  height: number;
}

type PlaylistItem = {
  publishedAt: string;
  channelId: string;
  title: string;
  description: string;
  thumbnails?: {
    default?: Thumbnail, 
    medium?: Thumbnail, 
    high?: Thumbnail, 
    standard?: Thumbnail, 
    maxres?: Thumbnail
  };
  channelTitle: string;
  playlistId: string;
  position: number;
  resourceId: {
    kind: string;
    videoId: string;
  };
}

const { BOT_CHANEL_ID, GOOGLE_API_KEY } = process.env

/**
 * Ready event
 * @param {Client} client - Discord Client
 */
export default async function ready (client: Client) {
  if (!client.user) throw new Error('Client user is not defined')

  const { guild, channel } = getMainInfo(client)
  const { id: channelId } = channel
  const { id: guildId, voiceAdapterCreator } = guild

  await client.user.setStatus('invisible')
  await client.user.setUsername(`Music | ${BOT_CHANEL_ID}`)

  if (BOT_CHANEL_ID === AVAILABLE_BOTS_BY_CHANNELS['внутренний круг']) {
    const connection = joinVoiceChannel({ channelId, guildId, adapterCreator: voiceAdapterCreator })

    const player = createAudioPlayer()

    connection.subscribe(player)

    const playlistInfo = await getPlaylistInfo(GOOGLE_API_KEY as string, YOUTUBE_MUSIC_PLAYLIST_ID)

    const songIndex = Math.floor(Math.random() * playlistInfo.length)
    
    playSong(player, playlistInfo, songIndex)
  }

  console.log(`${client.user?.username} bot is ready!`)
}

/**
 * Play song
 * @param {AudioPlayer} player - Audio player
 * @param {PlaylistItem[]} playlistInfo - Playlist info
 * @param {number} songIndex - Song index
 */
function playSong(player: AudioPlayer, playlistInfo: PlaylistItem[], songIndex: number) {
  // eslint-disable-next-line security/detect-object-injection
  const item = playlistInfo[songIndex]

  if (!item) throw new Error('Item is not defined')

  const stream = ytdl(`https://www.youtube.com/watch?v=${item.resourceId.videoId}`, { filter: 'audioonly' })
  const resource = createAudioResource(stream, { inputType: StreamType.Arbitrary, inlineVolume: true, })

  resource.volume?.setVolume(0.05)

  player.play(resource)

  player.on(AudioPlayerStatus.Idle, () => {
    const nextSongIndex = Math.floor(Math.random() * playlistInfo.length)

    playSong(player, playlistInfo, nextSongIndex)
  })

  player.on('error', console.error)
}