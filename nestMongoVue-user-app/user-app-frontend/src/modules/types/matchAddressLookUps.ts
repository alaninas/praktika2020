import AddressInterface from '@/modules/types/IAddress'
import { matchCity, matchNumber, matchStreet, matchZipcode } from '@/modules/utilities/matchSingleField'

type fieldName = 'street' | 'houseNumber' | 'city' | 'zipCode'
type fieldEvalKeys = 'holdsValue' | 'isMatch'
type holdsValueTable = Record<fieldName, boolean>
type isAMatchTable = Record<fieldName, boolean>
type fieldEval = Record<fieldEvalKeys, boolean>
const fields: fieldName[] = ['street', 'houseNumber', 'city', 'zipCode']

function fillHoldsValueTable (parsedAddress: AddressInterface): holdsValueTable {
  const { street, houseNumber, zipCode, city } = parsedAddress
  const valuesTable = {
    street: street.length > 0,
    houseNumber: houseNumber.length > 0,
    city: city.length > 0,
    zipCode: zipCode.length > 0
  }
  return valuesTable
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

export {
  fields,
  fieldEval,
  holdsValueTable,
  isAMatchTable,
  fillHoldsValueTable,
  fillIsAMatchTable
}
