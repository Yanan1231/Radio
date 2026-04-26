import type { Station } from '../types'

// Maps common words/feelings to station mood tags
const moodExpansions: Record<string, string[]> = {
  // Feelings
  happy:      ['happy', 'upbeat', 'energetic', 'groovy', 'eclectic'],
  sad:        ['sad', 'emotional', 'mellow', 'calm', 'lonely', 'soft'],
  angry:      ['angry', 'intense', 'rock', 'energetic', 'drive', 'powerful'],
  anxious:    ['calm', 'peaceful', 'ambient', 'mellow', 'relax', 'soft'],
  lonely:     ['lonely', 'emotional', 'vocal', 'mellow', 'ambient'],
  excited:    ['excited', 'energetic', 'upbeat', 'party', 'dance'],
  bored:      ['bored', 'eclectic', 'varied', 'creative', 'experimental'],
  romantic:   ['romantic', 'jazz', 'vocal', 'mellow', 'french', 'sophisticated', 'beautiful'],
  nostalgic:  ['mellow', 'vocal', 'folk', 'emotional', 'soft', 'beautiful'],
  peaceful:   ['peaceful', 'calm', 'ambient', 'mellow', 'relax', 'soft'],
  cozy:       ['cozy', 'mellow', 'jazz', 'coffee', 'morning', 'soft', 'peaceful'],

  // Activities
  work:       ['work', 'focus', 'study', 'ambient', 'drone', 'calm'],
  study:      ['study', 'focus', 'work', 'ambient', 'drone', 'calm', 'instrumental'],
  focus:      ['focus', 'study', 'ambient', 'drone', 'calm', 'peaceful'],
  sleep:      ['sleep', 'drone', 'ambient', 'calm', 'soft', 'peaceful'],
  meditation: ['meditation', 'ambient', 'drone', 'calm', 'peaceful', 'deep'],
  yoga:       ['meditation', 'calm', 'ambient', 'peaceful', 'world', 'soft'],
  party:      ['party', 'dance', 'energetic', 'night', 'electronic', 'upbeat'],
  dance:      ['dance', 'energetic', 'party', 'electronic', 'upbeat', 'night'],
  drive:      ['drive', 'energetic', 'rock', 'eclectic', 'alternative', 'upbeat'],
  coffee:     ['coffee', 'jazz', 'morning', 'sophisticated', 'french', 'cozy'],
  gym:        ['energetic', 'intense', 'fast', 'dance', 'dnb', 'upbeat', 'powerful'],
  cooking:    ['happy', 'groovy', 'eclectic', 'world', 'upbeat', 'morning'],
  reading:    ['calm', 'ambient', 'mellow', 'jazz', 'peaceful', 'soft', 'focus'],

  // Times / Places
  morning:    ['morning', 'mellow', 'coffee', 'jazz', 'peaceful', 'soft', 'calm'],
  afternoon:  ['afternoon', 'chill', 'groovy', 'ambient', 'mellow'],
  evening:    ['evening', 'jazz', 'mellow', 'ambient', 'romantic', 'sophisticated'],
  night:      ['night', 'electronic', 'dark', 'ambient', 'experimental', 'cool'],
  rainy:      ['rainy', 'ambient', 'calm', 'mellow', 'drone', 'peaceful', 'soft'],
  sunny:      ['sunny', 'happy', 'upbeat', 'groovy', 'energetic'],
  weekend:    ['weekend', 'eclectic', 'happy', 'groovy', 'varied', 'upbeat'],

  // Vibes / Genres
  chill:      ['chill', 'ambient', 'downtempo', 'relax', 'mellow', 'calm', 'peaceful'],
  relax:      ['relax', 'chill', 'calm', 'mellow', 'ambient', 'peaceful', 'soft'],
  calm:       ['calm', 'peaceful', 'mellow', 'ambient', 'relax', 'soft'],
  ambient:    ['ambient', 'chill', 'focus', 'meditation', 'drone', 'deep'],
  jazz:       ['jazz', 'sophisticated', 'coffee', 'romantic', 'morning', 'calm', 'cool'],
  rock:       ['rock', 'alternative', 'energetic', 'drive', 'intense', 'powerful'],
  indie:      ['indie', 'alternative', 'eclectic', 'creative', 'cool'],
  electronic: ['electronic', 'dance', 'night', 'energetic', 'techno', 'cool'],
  techno:     ['techno', 'dance', 'night', 'electronic', 'dark', 'intense'],
  house:      ['house', 'dance', 'night', 'electronic', 'party', 'energetic'],
  world:      ['world', 'cultural', 'fusion', 'ethnic', 'global', 'creative'],
  classical:  ['classical', 'sophisticated', 'calm', 'focus', 'morning', 'beautiful'],
  folk:       ['folk', 'mellow', 'acoustic', 'morning', 'cozy', 'peaceful'],
  space:      ['space', 'ambient', 'experimental', 'mysterious', 'deep', 'cosmic'],
  dnb:        ['dnb', 'fast', 'energetic', 'intense', 'drive', 'dance'],
  deep:       ['deep', 'ambient', 'drone', 'dark', 'space', 'experimental'],
  dark:       ['dark', 'drone', 'experimental', 'night', 'electronic', 'deep'],
  cool:       ['cool', 'indie', 'eclectic', 'underground', 'creative', 'sophisticated'],
  warm:       ['warm', 'cozy', 'mellow', 'acoustic', 'jazz', 'vocal', 'soft'],
  upbeat:     ['upbeat', 'happy', 'energetic', 'groovy', 'dance', 'excited'],
  intense:    ['intense', 'energetic', 'rock', 'electronic', 'dance', 'fast'],
  creative:   ['creative', 'experimental', 'eclectic', 'world', 'indie', 'cool'],
  groovy:     ['groovy', 'happy', 'dance', 'upbeat', 'eclectic', 'world'],
  mysterious: ['mysterious', 'space', 'dark', 'ambient', 'experimental', 'deep'],
  powerful:   ['powerful', 'intense', 'rock', 'energetic', 'drive', 'angry'],
  beautiful:  ['beautiful', 'mellow', 'vocal', 'emotional', 'classical', 'romantic'],
}

function shuffleWithSeed<T>(arr: T[], seed: string): T[] {
  const copy = [...arr]
  let h = seed.split('').reduce((a, c) => (Math.imul(31, a) + c.charCodeAt(0)) | 0, 0)
  for (let i = copy.length - 1; i > 0; i--) {
    h = (Math.imul(h ^ (h >>> 15), 0x2c1b3c6d)) >>> 0
    const j = h % (i + 1);
    [copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

export function matchStationsByMood(stations: Station[], rawMood: string): Station[] {
  const words = rawMood.toLowerCase().split(/\s+/).filter(Boolean)

  // Build the full set of query tags by expanding each word
  const queryTags = new Set<string>()
  for (const word of words) {
    queryTags.add(word)
    const expanded = moodExpansions[word] ?? []
    for (const tag of expanded) queryTags.add(tag)
  }

  // Score each station
  const scored = stations.map(station => {
    let score = 0
    for (const tag of station.moodTags) {
      if (queryTags.has(tag)) score += 10
      // Partial word match bonus
      for (const q of queryTags) {
        if (tag.includes(q) || q.includes(tag)) score += 3
      }
    }
    return { station, score }
  })

  const matched = scored.filter(s => s.score > 0)

  if (matched.length === 0) {
    // No matches — return a random shuffle of all stations as a "surprise"
    return shuffleWithSeed(stations, rawMood).slice(0, 4)
  }

  // Group by score tier and shuffle within each tier for the "surprise" feel
  const maxScore = Math.max(...matched.map(s => s.score))
  const tiers: Array<typeof matched> = []
  const tierSize = maxScore / 3

  tiers[0] = matched.filter(s => s.score > tierSize * 2)
  tiers[1] = matched.filter(s => s.score > tierSize && s.score <= tierSize * 2)
  tiers[2] = matched.filter(s => s.score <= tierSize)

  return tiers
    .flatMap(tier => shuffleWithSeed(tier, rawMood).map(s => s.station))
}

export const MOOD_SUGGESTIONS = [
  { label: '😴 Sleep', value: 'sleep' },
  { label: '☕ Coffee', value: 'coffee' },
  { label: '💼 Focus', value: 'focus' },
  { label: '🌙 Night', value: 'night' },
  { label: '🎉 Party', value: 'party' },
  { label: '🚗 Drive', value: 'drive' },
  { label: '💕 Romantic', value: 'romantic' },
  { label: '🌿 Chill', value: 'chill' },
  { label: '🚀 Space', value: 'space' },
  { label: '😊 Happy', value: 'happy' },
  { label: '🎷 Jazz', value: 'jazz' },
  { label: '🌧️ Rainy', value: 'rainy' },
]
