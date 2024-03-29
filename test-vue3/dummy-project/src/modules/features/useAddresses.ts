import addressesJson from '@/assets/jsons/addresses.json'
import AddressInterface from '@/modules/types/IAddress'
import { zipcodeFirst, housenumberFirst, streetFirst } from '@/modules/utilities/regex'

// TODO: fill up adresses.json with real data, instead of dummy slots, add atleast 20 addresses
const addresses: AddressInterface[] = addressesJson

function substituteStringSeparators (searchStr: string): string {
  return searchStr.replace(/ g.| g.,| ,|,/ig, ' ').trim()
}

function parseSearchString (searchStr: string) {
  searchStr = substituteStringSeparators(searchStr)
  let patternMatch: RegExpMatchArray | null = null
  let parsedAddress: AddressInterface = { street: '', number: '', zipcode: '', city: '' }
  if (zipcodeFirst.test(searchStr)) {
    patternMatch = searchStr.match(zipcodeFirst)
    if (patternMatch) {
      parsedAddress = { zipcode: patternMatch[1].trim(), street: patternMatch[2] ? patternMatch[2].trim() : '', number: patternMatch[5] ? patternMatch[5].trim() : '', city: '' }
    }
  }
  if (housenumberFirst.test(searchStr)) {
    patternMatch = searchStr.match(housenumberFirst)
    if (patternMatch) {
      parsedAddress = { number: patternMatch[1].trim(), street: patternMatch[2] ? patternMatch[2].trim() : '', zipcode: '', city: '' }
    }
  }
  if (streetFirst.test(searchStr)) {
    patternMatch = searchStr.match(streetFirst)
    if (patternMatch) {
      parsedAddress = { street: patternMatch[1].trim(), number: patternMatch[4] ? patternMatch[4].trim() : '', zipcode: '', city: '' }
    }
  }
  return { matchString: patternMatch ? patternMatch[0] : null, parsedAddress }
}

function matchZipcode (savedAddress: AddressInterface, zipcode: string): boolean {
  if (zipcode.length < 1) return false
  return savedAddress.zipcode.substr(0, zipcode.length) === zipcode
}

function matchStreet (savedAddress: AddressInterface, street: string): boolean {
  if (street.length < 1) return false
  return savedAddress.street.substr(0, street.length).toUpperCase() === street.toUpperCase()
}

function matchNumber (savedAddress: AddressInterface, number: string): boolean {
  if (number.length < 1) return false
  return savedAddress.number.substr(0, number.length) === number
}

function matchAddressFields (savedAddress: AddressInterface, parsedAddress: AddressInterface): boolean {
  const { street, number, zipcode } = parsedAddress
  const matchedStreet = matchStreet(savedAddress, street)
  const matchedNumber = matchNumber(savedAddress, number)
  const matchedZipcode = matchZipcode(savedAddress, zipcode)
  const res = (street.length > 0 && number.length > 0) ? ((matchedStreet && matchedNumber && matchedZipcode) || (matchedStreet && matchedNumber))
    : (
      street.length > 0 ? ((matchedStreet && matchedZipcode) || (matchedStreet && !zipcode.length))
        : (number.length > 0 ? ((matchedNumber && matchedZipcode) || (matchedNumber && !zipcode.length)) : matchedZipcode)
    )
  return res
}

function searchAddresses (parsedAddress: AddressInterface, matchString: string | null): AddressInterface[] {
  const matchedAddresses = matchString && matchString.length > 0 ? addresses.filter(address => matchAddressFields(address, parsedAddress)) : []
  return matchedAddresses
}

function performStringSearch (searchStr: string | undefined): AddressInterface[] {
  if (!searchStr) return []
  const { matchString, parsedAddress } = parseSearchString(searchStr)
  return searchAddresses(parsedAddress, matchString)
}

export default performStringSearch
