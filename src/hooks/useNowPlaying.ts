import { useState, useEffect, useRef } from 'react'
import type { Station } from '../types'

export interface TrackInfo {
  artist: string
  title: string
}

const somafmChannelMap: Record<string, string> = {
  'groove-salad':   'groovesalad',
  'space-station':  'spacestation',
  'deep-space':     'deepspaceone',
  'drone-zone':     'dronezone',
  'lush':           'lush',
  'suburbs-of-goa': 'suburbsofgoa',
  'beat-blender':   'beatblender',
  'fluid':          'fluid',
}

async function fetchSomaTrack(channelId: string): Promise<TrackInfo | null> {
  const res = await fetch(`https://api.somafm.com/songs/${channelId}.json`)
  if (!res.ok) return null
  const data = await res.json()
  const song = data.songs?.[0]
  if (!song?.artist) return null
  return { artist: song.artist, title: song.title ?? '' }
}

async function fetchItunesArt(artist: string, title: string): Promise<string | null> {
  const term = encodeURIComponent(`${artist} ${title}`)
  const res = await fetch(
    `https://itunes.apple.com/search?term=${term}&media=music&limit=1&entity=song`
  )
  if (!res.ok) return null
  const data = await res.json()
  const url: string | undefined = data.results?.[0]?.artworkUrl100
  if (!url) return null
  return url.replace('100x100bb', '500x500bb')
}

export function useNowPlaying(station: Station | null) {
  const [trackInfo, setTrackInfo] = useState<TrackInfo | null>(null)
  const [albumArt, setAlbumArt]   = useState<string | null>(null)
  const lastKey = useRef('')

  useEffect(() => {
    if (!station) { setTrackInfo(null); setAlbumArt(null); return }

    const channelId = somafmChannelMap[station.id]
    if (!channelId) { setTrackInfo(null); setAlbumArt(null); return }

    let cancelled = false

    const refresh = async () => {
      try {
        const track = await fetchSomaTrack(channelId)
        if (cancelled || !track) return
        setTrackInfo(track)

        const key = `${track.artist}::${track.title}`
        if (key === lastKey.current) return
        lastKey.current = key
        setAlbumArt(null)

        const art = await fetchItunesArt(track.artist, track.title)
        if (!cancelled) setAlbumArt(art)
      } catch {
        // network / CORS — show station fallback silently
      }
    }

    refresh()
    const id = setInterval(refresh, 30_000)
    return () => { cancelled = true; clearInterval(id) }
  }, [station?.id])

  return { trackInfo, albumArt }
}
