export const humanizeVideoDuration = (seconds) => {
  const [begin, end] = seconds >= 3600 ? [11, 8] : [14, 5]
  const date = new Date(0)

  date.setSeconds(seconds)
  return date.toISOString().substr(begin, end)
}

export const noop = () => {}
