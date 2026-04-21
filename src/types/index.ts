export interface Station {
  id: string
  name: string
  tagline: string
  genre: string
  streamUrl: string
  color: string
  accentColor: string
  emoji: string
}

export type PlayerStatus = 'idle' | 'loading' | 'playing' | 'paused' | 'error'
