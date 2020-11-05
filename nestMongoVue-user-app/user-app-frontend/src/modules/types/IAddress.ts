import addressesJson from '@/assets/jsons/addresses.json'

export default interface AddressInterface {
  zipCode: string;
  houseNumber: string;
  street: string;
  city: string;
}

// TODO: fill up adresses.json with real data, instead of dummy slots, add atleast 20 addresses
export const addresses: AddressInterface[] = addressesJson
