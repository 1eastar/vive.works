export const POST_SUB_PANEL_ANIMATION_VARIANTS = {
  initial: { opacity: 0 },
  mounting: { opacity: 1 },
  exit: { opacity: 0 },
}

export const POST_MAIN_PANEL_ANIMATION_VARIANTS = {
  initial: { opacity: 0, y: 300 },
  mounting: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 300 },
}

export const HOME_SUB_PANEL_ANIMATION_VARIANTS = {
  initial: { opacity: 0 },
  mounting: {  opacity: 1 },
  exit: { opacity: 0 },
}

export const HOME_MAIN_PANEL_ANIMATION_VARIANTS = {
  initial: { opacity: 0 },
  mounting: { opacity: 1 },
  exit: { opacity: 0 },
}

export const MAIN_PANEL_TRANSITION = {
  type: 'spring',
  bounce: 0.1,
  duration: 0.5,
}
