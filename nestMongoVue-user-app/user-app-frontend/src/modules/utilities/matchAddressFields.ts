import AddressInterface from '@/modules/types/IAddress'
import { matchCity, matchNumber, matchStreet, matchZipcode } from '@/modules/utilities/matchField'

type fieldName = 'street' | 'houseNumber' | 'city' | 'zipCode'
type fieldEval = 'hasLength' | 'isMatch'
type hasALengthTable = Record<fieldName, boolean>
type isAMatchTable = Record<fieldName, boolean>
type fieldEvalPair = Record<fieldEval, boolean>
const fields: fieldName[] = ['street', 'houseNumber', 'city', 'zipCode']

function fillHasALengthTable (parsedAddress: AddressInterface): hasALengthTable {
  const { street, houseNumber, zipCode, city } = parsedAddress
  const lengthsTable = {
    street: street.length > 0,
    houseNumber: houseNumber.length > 0,
    city: city.length > 0,
    zipCode: zipCode.length > 0
  }
  return lengthsTable
}

function fillIsAMatchTable (savedAddress: AddressInterface, parsedAddress: AddressInterface): isAMatchTable {
  const { street, houseNumber, zipCode, city } = parsedAddress
  const matchesTable = {
    street: matchStreet(savedAddress, street),
    houseNumber: matchNumber(savedAddress, houseNumber),
    city: matchCity(savedAddress, city),
    zipCode: matchZipcode(savedAddress, zipCode)
  }
  return matchesTable
}

function getSingles (lengthsTable: hasALengthTable, isAMatchTable: isAMatchTable): fieldEvalPair[] {
  const res: fieldEvalPair[] = []
  for (const key of fields) {
    res.push({ hasLength: lengthsTable[key], isMatch: isAMatchTable[key] })
    // console.log(`-> Singles: key: ${key} valueL: ${lengthsTable[key]} valueM: ${isAMatchTable[key]}`)
  }
  return res
}

function getDoubles (lengthsTable: hasALengthTable, isAMatchTable: isAMatchTable): fieldEvalPair[] {
  const res: fieldEvalPair[] = []
  for (let i = 0; i < fields.length - 1; i++) {
    for (let j = i + 1; j < fields.length; j++) {
      const key1 = fields[i]
      const key2 = fields[j]
      res.push({ hasLength: lengthsTable[key1] && lengthsTable[key2], isMatch: isAMatchTable[key1] && isAMatchTable[key2] })
      // console.log(`-> Doubles: keys: ${key1} ${key2} valueL: ${resL} valueM: ${resM}`)
    }
  }
  return res
}

function getTriples (lengthsTable: hasALengthTable, isAMatchTable: isAMatchTable): fieldEvalPair[] {
  const res: fieldEvalPair[] = []
  for (let i = 0; i < fields.length - 2; i++) {
    for (let j = i + 1; j < fields.length - 1; j++) {
      for (let k = j + 1; k < fields.length; k++) {
        const key1 = fields[i]
        const key2 = fields[j]
        const key3 = fields[k]
        res.push({ hasLength: lengthsTable[key1] && lengthsTable[key2] && lengthsTable[key3], isMatch: isAMatchTable[key1] && isAMatchTable[key2] && isAMatchTable[key3] })
        // console.log(`-> Triples: keys: ${key1} ${key2} ${key3} valueL: ${resL} valueM: ${resM}`)
      }
    }
  }
  return res
}

function getQuads (lengthsTable: hasALengthTable, isAMatchTable: isAMatchTable): fieldEvalPair {
  const resL = lengthsTable.city && lengthsTable.street && lengthsTable.zipCode && lengthsTable.houseNumber
  const resM = isAMatchTable.city && isAMatchTable.street && isAMatchTable.zipCode && isAMatchTable.houseNumber
  // console.log(`-> Quads: len: ${resL} match: ${resM}`)
  return { hasLength: resL, isMatch: resM }
}

function matchAddressFields (savedAddress: AddressInterface, parsedAddress: AddressInterface): boolean {
  let result = false
  const ltable = fillHasALengthTable(parsedAddress)
  const mtable = fillIsAMatchTable(savedAddress, parsedAddress)
  const singleFieldComparisons = getSingles(ltable, mtable)
  const dualFieldComparisons = getDoubles(ltable, mtable)
  const tripleFieldComparisons = getTriples(ltable, mtable)
  const quadFieldComparisons = getQuads(ltable, mtable)
  if (quadFieldComparisons.hasLength) {
    // console.log('by quad')
    return quadFieldComparisons.isMatch
  }
  if (tripleFieldComparisons.some(el => { if (el.hasLength) { result = el.isMatch; return true } })) {
    // console.log('by triple')
    return result
  }
  if (dualFieldComparisons.some(el => { if (el.hasLength) { result = el.isMatch; return true } })) {
    // console.log('by double')
    return result
  }
  if (singleFieldComparisons.some(el => { if (el.hasLength) { result = el.isMatch; return true } })) {
    // console.log('by single')
    return result
  }
  return result
}

export {
  matchAddressFields
}
