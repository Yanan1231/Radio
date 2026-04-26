import { useEffect, useRef } from 'react'

interface Star {
  x: number; y: number; r: number
  baseOpacity: number; phase: number; speed: number
  warm: boolean
}

function paintGalaxy(ctx: CanvasRenderingContext2D, W: number, H: number) {
  // ── Base fill ──────────────────────────────────────────────────────
  ctx.fillStyle = '#020108'
  ctx.fillRect(0, 0, W, H)

  // ── Nebula body ────────────────────────────────────────────────────
  // 520 overlapping circles build up a photo-like texture.
  // CSS gradients produce smooth blurry bands; many small painted blobs look
  // like the actual Spitzer infrared photo of the galactic centre.
  for (let i = 0; i < 520; i++) {
    const inBand = Math.random() < 0.72
    const x      = Math.random() * W
    const y      = inBand ? H * 0.18 + Math.random() * H * 0.64 : Math.random() * H
    const r      = 35 + Math.random() * 220

    // Crimson family — slight hue variation so it never looks flat
    const rVal  = 110 + Math.floor(Math.random() * 130)
    const gVal  = 8   + Math.floor(Math.random() * 55)
    const bVal  = 12  + Math.floor(Math.random() * 45)
    const alpha = 0.012 + Math.random() * 0.055

    const g = ctx.createRadialGradient(x, y, 0, x, y, r)
    g.addColorStop(0,   `rgba(${rVal},${gVal},${bVal},${alpha})`)
    g.addColorStop(0.5, `rgba(${rVal},${gVal},${bVal},${alpha * 0.45})`)
    g.addColorStop(1,   'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(x, y, r, 0, Math.PI * 2)
    ctx.fill()
  }

  // ── Star-cluster hot-spots ─────────────────────────────────────────
  const clusters: Array<{ fx: number; fy: number; fr: number }> = [
    { fx: 0.55, fy: 0.50, fr: 0.14  },  // galactic centre — brightest
    { fx: 0.28, fy: 0.51, fr: 0.055 },
    { fx: 0.70, fy: 0.49, fr: 0.050 },
    { fx: 0.42, fy: 0.46, fr: 0.045 },
    { fx: 0.15, fy: 0.53, fr: 0.040 },
    { fx: 0.63, fy: 0.53, fr: 0.040 },
    { fx: 0.85, fy: 0.48, fr: 0.035 },
  ]
  for (const c of clusters) {
    const cx = c.fx * W, cy = c.fy * H, cr = c.fr * W
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, cr)
    if (c.fr > 0.1) {
      g.addColorStop(0,    'rgba(255,245,225,0.92)')
      g.addColorStop(0.07, 'rgba(255,215,195,0.68)')
      g.addColorStop(0.20, 'rgba(245,130,110,0.40)')
      g.addColorStop(0.45, 'rgba(200,55,55,0.18)')
      g.addColorStop(1,    'rgba(0,0,0,0)')
    } else {
      g.addColorStop(0,    'rgba(255,205,165,0.52)')
      g.addColorStop(0.30, 'rgba(220,90,75,0.22)')
      g.addColorStop(1,    'rgba(0,0,0,0)')
    }
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }

  // ── Dust lanes — dark rifts cutting through the red ───────────────
  const dust = [
    { fx: 0.48, fy: 0.54, fr: 0.090 },
    { fx: 0.24, fy: 0.47, fr: 0.080 },
    { fx: 0.61, fy: 0.44, fr: 0.072 },
    { fx: 0.76, fy: 0.54, fr: 0.078 },
    { fx: 0.37, fy: 0.42, fr: 0.055 },
    { fx: 0.83, fy: 0.56, fr: 0.065 },
    { fx: 0.10, fy: 0.58, fr: 0.060 },
    { fx: 0.53, fy: 0.40, fr: 0.050 },
    { fx: 0.68, fy: 0.60, fr: 0.060 },
  ]
  for (const d of dust) {
    const dx = d.fx * W, dy = d.fy * H, dr = d.fr * W
    const g = ctx.createRadialGradient(dx, dy, 0, dx, dy, dr)
    g.addColorStop(0,   'rgba(0,0,0,0.72)')
    g.addColorStop(0.4, 'rgba(1,0,2,0.45)')
    g.addColorStop(0.7, 'rgba(2,0,3,0.18)')
    g.addColorStop(1,   'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.beginPath()
    ctx.arc(dx, dy, dr, 0, Math.PI * 2)
    ctx.fill()
  }

  // ── Corner vignette ────────────────────────────────────────────────
  for (const [cx, cy] of [[0, 0], [W, 0], [0, H], [W, H]] as [number, number][]) {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, W * 0.50)
    g.addColorStop(0, 'rgba(3,2,12,0.82)')
    g.addColorStop(1, 'rgba(0,0,0,0)')
    ctx.fillStyle = g
    ctx.fillRect(0, 0, W, H)
  }

  // ── Bright resolved giant stars (orange/gold, as in Spitzer image) ─
  for (let i = 0; i < 30; i++) {
    const inBand = Math.random() < 0.75
    const sx = Math.random() * W
    const sy = inBand ? H * 0.18 + Math.random() * H * 0.64 : Math.random() * H
    const sr = 1.5 + Math.random() * 1.8
    const gg = Math.floor(180 + Math.random() * 60)
    const gb = Math.floor(80  + Math.random() * 60)
    ctx.beginPath()
    ctx.arc(sx, sy, sr, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(255,${gg},${gb},${0.7 + Math.random() * 0.3})`
    ctx.fill()
  }

  // ── Dense background star field ────────────────────────────────────
  for (let i = 0; i < 560; i++) {
    const inBand = Math.random() < 0.65
    const sx = Math.random() * W
    const sy = inBand ? H * 0.18 + Math.random() * H * 0.64 : Math.random() * H
    ctx.beginPath()
    ctx.arc(sx, sy, Math.random() * 0.65 + 0.12, 0, Math.PI * 2)
    ctx.fillStyle = `rgba(235,240,255,${Math.random() * 0.55 + 0.18})`
    ctx.fill()
  }
}

export function GalaxyBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let animId: number
    let stars: Star[] = []
    let bgCanvas: HTMLCanvasElement | null = null

    const init = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
      const W = canvas.width, H = canvas.height

      // Paint the static galaxy once to an offscreen canvas
      const bg = document.createElement('canvas')
      bg.width = W; bg.height = H
      paintGalaxy(bg.getContext('2d')!, W, H)
      bgCanvas = bg

      // Twinkling foreground stars (animated on top each frame)
      stars = Array.from({ length: 220 }, () => {
        const inBand = Math.random() < 0.62
        const x = Math.random() * W
        const y = inBand ? H * 0.18 + Math.random() * H * 0.64 : Math.random() * H
        return {
          x, y,
          r:           Math.random() * 1.1 + 0.2,
          baseOpacity: Math.random() * 0.6 + 0.25,
          phase:       Math.random() * Math.PI * 2,
          speed:       Math.random() * 0.5 + 0.15,
          warm:        Math.random() < 0.22,
        }
      })
    }

    let t = 0
    const draw = () => {
      if (!bgCanvas) return
      ctx.drawImage(bgCanvas, 0, 0)
      t += 0.007

      for (const s of stars) {
        const op = s.baseOpacity * (0.5 + 0.5 * Math.sin(t * s.speed + s.phase))
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fillStyle = s.warm
          ? `rgba(255,205,130,${op})`
          : `rgba(235,240,255,${op})`
        ctx.fill()
      }

      animId = requestAnimationFrame(draw)
    }

    const onResize = () => init()
    init()
    draw()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        zIndex: 0, pointerEvents: 'none',
      }}
    />
  )
}
