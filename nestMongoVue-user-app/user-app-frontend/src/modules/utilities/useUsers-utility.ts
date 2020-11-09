function getDirection (reverse: boolean): 'dsc' | 'asc' {
  const direction = reverse ? 'dsc' : 'asc'
  return direction
}

export {
  getDirection
}
