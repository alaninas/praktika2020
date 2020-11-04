import AddressInterface from '../IAddress'

function matchZipcode (savedAddress: AddressInterface, zipCode: string): boolean {
  if (zipCode.length < 1) return false
  return savedAddress.zipCode.substr(0, zipCode.length) === zipCode
}

function matchStreet (savedAddress: AddressInterface, street: string): boolean {
  if (street.length < 1) return false
  return savedAddress.street.substr(0, street.length).toUpperCase() === street.toUpperCase()
}

function matchNumber (savedAddress: AddressInterface, houseNumber: string): boolean {
  if (houseNumber.length < 1) return false
  return savedAddress.houseNumber.substr(0, houseNumber.length) === houseNumber
}

function matchCity (savedAddress: AddressInterface, city: string): boolean {
  if (city.length < 1) return false
  return savedAddress.city.substr(0, city.length).toUpperCase() === city.toUpperCase()
}

export {
  matchCity,
  matchNumber,
  matchStreet,
  matchZipcode
}
