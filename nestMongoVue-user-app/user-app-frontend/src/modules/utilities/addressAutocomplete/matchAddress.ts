import AddressInterface from '@/modules/types/IAddress'
import { fieldEval, fields, fillHoldsValueTable, fillIsAMatchTable, holdsValueTable, isAMatchTable } from '@/modules/utilities/addressAutocomplete/fieldLookUps'

function getSingles (valuesTable: holdsValueTable, matchesTable: isAMatchTable): fieldEval[] {
  const res: fieldEval[] = []
  for (const key of fields) {
    res.push({ holdsValue: valuesTable[key], isMatch: matchesTable[key] })
  }
  return res
}

function getDoubles (valuesTable: holdsValueTable, matchesTable: isAMatchTable): fieldEval[] {
  const res: fieldEval[] = []
  for (let i = 0; i < fields.length - 1; i++) {
    for (let j = i + 1; j < fields.length; j++) {
      const key1 = fields[i]
      const key2 = fields[j]
      res.push({ holdsValue: valuesTable[key1] && valuesTable[key2], isMatch: matchesTable[key1] && matchesTable[key2] })
    }
  }
  return res
}

function getTriples (valuesTable: holdsValueTable, matchesTable: isAMatchTable): fieldEval[] {
  const res: fieldEval[] = []
  for (let i = 0; i < fields.length - 2; i++) {
    for (let j = i + 1; j < fields.length - 1; j++) {
      for (let k = j + 1; k < fields.length; k++) {
        const key1 = fields[i]
        const key2 = fields[j]
        const key3 = fields[k]
        res.push({ holdsValue: valuesTable[key1] && valuesTable[key2] && valuesTable[key3], isMatch: matchesTable[key1] && matchesTable[key2] && matchesTable[key3] })
      }
    }
  }
  return res
}

function getQuads (valuesTable: holdsValueTable, matchesTable: isAMatchTable): fieldEval {
  const resL = valuesTable.city && valuesTable.street && valuesTable.zipCode && valuesTable.houseNumber
  const resM = matchesTable.city && matchesTable.street && matchesTable.zipCode && matchesTable.houseNumber
  return { holdsValue: resL, isMatch: resM }
}

function getFieldComparisons ({ vtable, mtable }: { vtable: holdsValueTable; mtable: isAMatchTable }) {
  const singleFieldComparisons = getSingles(vtable, mtable)
  const dualFieldComparisons = getDoubles(vtable, mtable)
  const tripleFieldComparisons = getTriples(vtable, mtable)
  const quadFieldComparisons = getQuads(vtable, mtable)
  return { singleFieldComparisons, dualFieldComparisons, tripleFieldComparisons, quadFieldComparisons }
}

function matchAddress (savedAddress: AddressInterface, parsedAddress: AddressInterface): boolean {
  let result = false
  const vtable = fillHoldsValueTable(parsedAddress)
  const mtable = fillIsAMatchTable(savedAddress, parsedAddress)
  const { singleFieldComparisons, dualFieldComparisons, tripleFieldComparisons, quadFieldComparisons } = getFieldComparisons({ vtable, mtable })
  if (quadFieldComparisons.holdsValue) return quadFieldComparisons.isMatch
  if (tripleFieldComparisons.some(el => { if (el.holdsValue) { result = el.isMatch; return true } })) return result
  if (dualFieldComparisons.some(el => { if (el.holdsValue) { result = el.isMatch; return true } })) return result
  if (singleFieldComparisons.some(el => { if (el.holdsValue) { result = el.isMatch; return true } })) return result
  return result
}

export {
  matchAddress
}
