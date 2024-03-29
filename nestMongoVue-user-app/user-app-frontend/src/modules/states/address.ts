import AddressInterface, { addresses } from '@/modules/types/IAddress'
import { matchAddress } from '@/modules/utilities/matchAddress/matchAddress-utility'
import { parseSearchString } from '@/modules/utilities/matchAddress/parseString'
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
  let matchedStringAddresses = computed(() => matchedAddresses.value.map<string>(el => Object.values(el).join(', ')))

  watchEffect(() => {
    matchedAddresses = computed(() => searchAddresses(user.value.address))
    matchedStringAddresses = computed(() => matchedAddresses.value.map<string>(el => Object.values(el).join(', ')))
  })

  return { matchedAddresses, matchedStringAddresses }
}
