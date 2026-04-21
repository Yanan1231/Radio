interface Props {
  isPlaying: boolean
  color: string
}

export function Visualizer({ isPlaying, color }: Props) {
  const bars = [
    { delay: '0s',    height: isPlaying ? 'animate-bar1' : '' },
    { delay: '0.2s',  height: isPlaying ? 'animate-bar2' : '' },
    { delay: '0.1s',  height: isPlaying ? 'animate-bar3' : '' },
    { delay: '0.3s',  height: isPlaying ? 'animate-bar4' : '' },
    { delay: '0.15s', height: isPlaying ? 'animate-bar5' : '' },
  ]

  return (
    <div className="flex items-end gap-[3px] h-8">
      {bars.map((bar, i) => (
        <div
          key={i}
          className={`w-[4px] rounded-full origin-bottom transition-all duration-300 ${bar.height}`}
          style={{
            backgroundColor: color,
            height: isPlaying ? '100%' : '20%',
            opacity: isPlaying ? 1 : 0.4,
          }}
        />
      ))}
    </div>
  )
}
