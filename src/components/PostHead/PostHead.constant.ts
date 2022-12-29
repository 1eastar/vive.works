export const CONTAINER_ANIMATION_VARIANTS = {
  initial: {
    opacity: 0,
  },
  mounting: {
    opacity: 1,
    transition: {
      when: "beforeChildren",
      staggerChildren: 0.2
    },
  },
  exit: {
    opacity: 0,
    transition: {
      staggerChildren: 0.1
    },
  },
}

export const ITEM_ANIMATION_VARIANTS = {
  initial: { opacity: 0, x: -100 },
  mounting: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -300 },
}
