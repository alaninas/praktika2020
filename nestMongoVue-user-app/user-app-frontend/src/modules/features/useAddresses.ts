import addressesJson from '@/assets/jsons/addresses.json'
import AddressInterface from '@/modules/types/IAddress'
import { matchAddressFields } from '@/modules/utilities/matchAddress'
import { parseSearchString } from '@/modules/utilities/parseAddressString'
import { computed, Ref, watchEffect } from 'vue'
import UserInterface from '@/modules/types/IUser'

// TODO: fill up adresses.json with real data, instead of dummy slots, add atleast 20 addresses

export function useAddresses (user: Ref<UserInterface>) {
  const addresses: AddressInterface[] = addressesJson

  function searchAddresses (searchString: string | undefined): AddressInterface[] {
    if (!searchString) return []
    const { matchString, parsedAddress } = parseSearchString(searchString)
    const matchedAddresses = matchString && matchString.length > 0 ? addresses.filter(address => matchAddressFields(address, parsedAddress)) : []
    return matchedAddresses
  }

  let matchedAddresses = computed(() => searchAddresses(user.value.address))
  let matchedAddressesToString = computed(() => matchedAddresses.value.map<string>(el => Object.values(el).join(', ')))

  watchEffect(() => {
    matchedAddresses = computed(() => searchAddresses(user.value.address))
    matchedAddressesToString = computed(() => matchedAddresses.value.map<string>(el => Object.values(el).join(', ')))
    // console.log(user.value.address)
  })

  return { matchedAddresses, matchedAddressesToString }
}
