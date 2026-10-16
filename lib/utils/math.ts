export function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v))
}

export function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t
}

export function seededRandom(seed: number): number {
  const x = Math.sin(seed * 9999) * 10000
  return x - Math.floor(x)
}

export function hashString(str: string): number {
  let h = 0
  for (let i = 0; i < str.length; i++) {
    h = ((h << 5) - h + str.charCodeAt(i)) | 0
  }
  return Math.abs(h)
}

/** CSS aspect-ratio with one side kept at 1 (avoids large W/H numbers). */
export function aspectRatioCss(ratio: number): string {
  return ratio >= 1 ? `${ratio} / 1` : `1 / ${1 / ratio}`
}
