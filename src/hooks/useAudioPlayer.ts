import { useRef, useState, useEffect, useCallback } from 'react'
import type { Station, PlayerStatus } from '../types'

export function useAudioPlayer() {
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const [currentStation, setCurrentStation] = useState<Station | null>(null)
  const [status, setStatus] = useState<PlayerStatus>('idle')
  const [volume, setVolumeState] = useState(0.8)
  const [isMuted, setIsMuted] = useState(false)

  useEffect(() => {
    const audio = new Audio()
    audio.preload = 'none'
    audioRef.current = audio

    const onPlaying = () => setStatus('playing')
    const onWaiting = () => setStatus('loading')
    const onPause = () => setStatus('paused')
    const onError = () => setStatus('error')
    const onStalled = () => setStatus('loading')

    audio.addEventListener('playing', onPlaying)
    audio.addEventListener('waiting', onWaiting)
    audio.addEventListener('pause', onPause)
    audio.addEventListener('error', onError)
    audio.addEventListener('stalled', onStalled)

    audio.volume = 0.8

    return () => {
      audio.removeEventListener('playing', onPlaying)
      audio.removeEventListener('waiting', onWaiting)
      audio.removeEventListener('pause', onPause)
      audio.removeEventListener('error', onError)
      audio.removeEventListener('stalled', onStalled)
      audio.pause()
      audio.src = ''
    }
  }, [])

  const play = useCallback((station: Station) => {
    const audio = audioRef.current
    if (!audio) return

    if (currentStation?.id === station.id && status === 'playing') return

    audio.pause()
    audio.src = station.streamUrl
    setCurrentStation(station)
    setStatus('loading')
    audio.load()
    audio.play().catch(() => setStatus('error'))
  }, [currentStation, status])

  const stop = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.pause()
    audio.src = ''
    setStatus('paused')
  }, [])

  const toggle = useCallback((station: Station) => {
    if (currentStation?.id === station.id && status === 'playing') {
      stop()
    } else {
      play(station)
    }
  }, [currentStation, status, play, stop])

  const setVolume = useCallback((v: number) => {
    const audio = audioRef.current
    if (!audio) return
    const clamped = Math.max(0, Math.min(1, v))
    audio.volume = clamped
    setVolumeState(clamped)
    if (clamped > 0) setIsMuted(false)
  }, [])

  const toggleMute = useCallback(() => {
    const audio = audioRef.current
    if (!audio) return
    if (isMuted) {
      audio.volume = volume
      setIsMuted(false)
    } else {
      audio.volume = 0
      setIsMuted(true)
    }
  }, [isMuted, volume])

  return { currentStation, status, volume, isMuted, play, stop, toggle, setVolume, toggleMute }
}
