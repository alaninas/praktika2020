import AddressInterface from './IAddress'
import { addresses } from './addresses'
import { matchAddress } from './bin/matchAddress'
import { parseSearchString } from './bin/parseString'
import { computed, Ref, watchEffect } from 'vue'
import UserInterface from '@/modules/types/IUser'

export function runAddressMatch (user: Ref<UserInterface>) {
  function searchAddresses (searchString: string | undefined): AddressInterface[] {
    if (!searchString) return []
    const { matchString, parsedAddress } = parseSearchString(searchString)
    const matchedAddresses = matchString && matchString.length > 0 ? addresses.filter(address => matchAddress(address, parsedAddress)) : []
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
