/** Shared hero slide reveal — keep GSAP media + CSS color transitions in sync */
export const HOME_SLIDE_REVEAL_DURATION = 1.75

export const HOME_SLIDE_REVEAL_EASE = 'power3.inOut'

/** CSS approximation of GSAP power3.inOut */
export const HOME_SLIDE_REVEAL_EASE_CSS = 'cubic-bezier(0.65, 0, 0.35, 1)'

export const homeSlideRevealTransitionStyle = {
  transitionDuration: `${HOME_SLIDE_REVEAL_DURATION}s`,
  transitionTimingFunction: HOME_SLIDE_REVEAL_EASE_CSS,
} as const
