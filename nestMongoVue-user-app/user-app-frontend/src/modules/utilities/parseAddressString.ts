import AddressInterface from '@/modules/types/IAddress'

const zipCodeFirst = /^([\d+-?\d+]{4,6})\s*([A-Za-z- ]+(\s+[0-9]{1,3} g.)?|( g.)?)?(\s+[0-9]{1,4})?$/

const houseNumberFirst = /^([0-9]{1,3})\s*([A-Za-z- ]+(\s+[0-9]{1,3} g.)?)?$/

const streetFirst = /^([A-Za-z- ]+(\s+[0-9]{1,3} g.)?|( g.)?)(\s+[0-9]{1,4})?(\s+[A-Za-z]+)?(\s+[\d+-?\d+]{1,6})?$/

function substituteStringSeparators (searchStr: string): string {
  return searchStr.replace(/ g.| g.,| ,|,/ig, ' ').trim()
}

// function setAddress ({ street = '', houseNumber = '', zipCode = '', city = '' }: { street?: string; houseNumber?: string; zipCode?: string; city?: string }): AddressInterface {
//   return { street, houseNumber, zipCode, city }
// }

function parseSearchString (searchStr: string) {
  searchStr = substituteStringSeparators(searchStr)
  let patternMatch: RegExpMatchArray | null = null
  let parsedAddress: AddressInterface = { street: '', houseNumber: '', zipCode: '', city: '' }
  if (zipCodeFirst.test(searchStr)) {
    patternMatch = searchStr.match(zipCodeFirst)
    if (patternMatch) {
      parsedAddress = { zipCode: patternMatch[1].trim(), street: patternMatch[2] ? patternMatch[2].trim() : '', houseNumber: patternMatch[5] ? patternMatch[5].trim() : '', city: '' }
    }
  }
  if (houseNumberFirst.test(searchStr)) {
    patternMatch = searchStr.match(houseNumberFirst)
    if (patternMatch) {
      parsedAddress = { houseNumber: patternMatch[1].trim(), street: patternMatch[2] ? patternMatch[2].trim() : '', zipCode: '', city: '' }
    }
  }
  if (streetFirst.test(searchStr)) {
    patternMatch = searchStr.match(streetFirst)
    if (patternMatch) {
      parsedAddress = { street: patternMatch[1].trim(), houseNumber: patternMatch[4] ? patternMatch[4].trim() : '', zipCode: patternMatch[6] ? patternMatch[6].trim() : '', city: patternMatch[5] ? patternMatch[5].trim() : '' }
    }
  }
  return { matchString: patternMatch ? patternMatch[0] : null, parsedAddress }
}

export {
  parseSearchString
}
