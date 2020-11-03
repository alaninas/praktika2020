import { Ref, watchEffect } from 'vue'
import UserInterface from '@/modules/types/IUser'
import { setStateAddress } from '@/modules/states/user'
import { addressAutocomplete } from '@/modules/types/IAddressAutocomplete'
import { useAddresses } from '@/modules/features/useAddresses'

export function useAddressAutocomplete (user: Ref<UserInterface>) {
  const { matchedAddresses, matchedAddressesToString } = useAddresses(user)

  function setOpenDropDown (dropdown: boolean) {
    addressAutocomplete.value.openDropDown = dropdown
  }

  function setCurrentIdx (idx: number) {
    addressAutocomplete.value.currentIdx = idx
  }

  function setAutocomplete ({ dropdown, idx }: { dropdown: boolean; idx: number }) {
    setOpenDropDown(dropdown)
    setCurrentIdx(idx)
  }

  function resetDropDown (dropdown: boolean) {
    setAutocomplete({ dropdown, idx: 0 })
  }

  function openMatches (matchedAddressesToStringArray: string[]) {
    const newVal = user.value.address !== undefined && user.value.address !== '' && matchedAddressesToStringArray.length !== 0 && addressAutocomplete.value.openDropDown === true
    setOpenDropDown(newVal)
  }

  function up () {
    const i = addressAutocomplete.value.currentIdx
    if (i > 0 && addressAutocomplete.value.openDropDown) setCurrentIdx(i - 1)
  }

  function down () {
    const i = addressAutocomplete.value.currentIdx
    if (i < matchedAddressesToString.value.length - 1 && addressAutocomplete.value.openDropDown) setCurrentIdx(i + 1)
  }

  function inputChange () {
    if (addressAutocomplete.value.openDropDown === false) resetDropDown(true)
  }

  function matchesClick (index: number) {
    if (addressAutocomplete.value.openDropDown) setCurrentIdx(index)
    setStateAddress({ inputAddress: matchedAddresses.value[addressAutocomplete.value.currentIdx] })
    resetDropDown(false)
  }

  function enter () {
    setStateAddress({ inputAddress: matchedAddresses.value[addressAutocomplete.value.currentIdx] })
    resetDropDown(false)
  }

  watchEffect(() => {
    openMatches(matchedAddressesToString.value)
  })

  return { addressAutocomplete, enter, up, down, inputChange, matchesClick, matchedAddressesToString, matchedAddresses }
}
