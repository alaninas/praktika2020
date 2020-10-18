import addressesJson from '@/assets/addresses.json'
import AddressInterface from '@/modules/IAddress'
import { zipcodeFirst, housenumberFirst, streetFirst } from '@/modules/Regex'

export default function useUsers () {
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
        parsedAddress = { street: patternMatch[2] ? patternMatch[2].trim() : '', number: patternMatch[5] ? patternMatch[5].trim() : '', zipcode: patternMatch[1].trim(), city: '' }
      }
    }
    if (housenumberFirst.test(searchStr)) {
      patternMatch = searchStr.match(housenumberFirst)
      if (patternMatch) {
        parsedAddress = { street: patternMatch[2] ? patternMatch[2].trim() : '', number: patternMatch[1].trim(), zipcode: '', city: '' }
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
    const zipcodeL = zipcode.length
    const streetL = street.length
    const numberL = number.length
    const matchedStreet = matchStreet(savedAddress, street)
    const matchedNumber = matchNumber(savedAddress, number)
    const matchedZipcode = matchZipcode(savedAddress, zipcode)
    const res = (streetL > 0 && numberL > 0) ? ((matchedStreet && matchedNumber && matchedZipcode) || (matchedStreet && matchedNumber))
      : (
        streetL > 0 ? ((matchedStreet && matchedZipcode) || (matchedStreet && !zipcodeL))
          : (numberL > 0 ? ((matchedNumber && matchedZipcode) || (matchedNumber && !zipcodeL)) : matchedZipcode)
      )
    return res
  }

  function searchAddresses (parsedAddress: AddressInterface, matchString: string | null): AddressInterface[] {
    const matchedAddresses = matchString && matchString.length > 0 ? addresses.filter(address => matchAddressFields(address, parsedAddress)) : []
    return matchedAddresses
  }

  return { addresses, parseSearchString, searchAddresses }
}
