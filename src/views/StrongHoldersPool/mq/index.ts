// TODO: move it to uikit and use it everywhere in the project???

const gap = 1

export const breakpoints = {
  xs: 0,
  sm: 768,
  md: 1024,
  lg: 1440,
  xl: 1920,
}

export function up(value: number) {
  return `(min-width: ${value}px)`
}

export function down(value: number) {
  return `(max-width: ${value - gap}px)`
}

export function between(min: number, max: number) {
  return `${up(min)} and ${down(max)}`
}
