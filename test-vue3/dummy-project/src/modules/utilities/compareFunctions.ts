export function compareStrings (paramA: string | undefined, paramB: string | undefined, reverse: boolean): 1 | -1 | 0 {
  if (!paramA || !paramB) return 0
  const aIsLower = reverse ? 1 : -1
  const aIsHigher = reverse ? -1 : 1
  const a = paramA.toUpperCase() // ignore upper and lowercase
  const b = paramB.toUpperCase() // ignore upper and lowercase
  if (a < b) {
    return aIsLower
  }
  if (a > b) {
    return aIsHigher
  }
  return 0
}

export function compareNumbers (paramA: number | undefined, paramB: number | undefined, reverse: boolean): number {
  if (!paramA || !paramB) return 0
  const a = reverse ? paramB : paramA
  const b = reverse ? paramA : paramB
  return a - b
}
