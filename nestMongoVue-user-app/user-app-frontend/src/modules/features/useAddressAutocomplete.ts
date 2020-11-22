import { Ref, watchEffect } from 'vue'
import UserInterface from '@/modules/types/IUser'
import { setStateAddress } from '@/modules/states/user'
import { addressAutocomplete } from '@/modules/types/IAddressAutocomplete'
import { runAddressMatch } from '@/modules/states/address'

export function useAddressAutocomplete (user: Ref<UserInterface>) {
  const { matchedAddresses, matchedStringAddresses } = runAddressMatch(user)

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

  function openMatches (matchedStringAddressesArray: string[]) {
    const newVal =
      user.value.address !== undefined &&
      user.value.address !== '' &&
      matchedStringAddressesArray.length !== 0 &&
      addressAutocomplete.value.openDropDown === true
    setOpenDropDown(newVal)
  }

  function createAddressId (idx: number): string {
    return `address-${idx}`
  }

  function scrollIntoViewActiveAddress () {
    const elTag = createAddressId(addressAutocomplete.value.currentIdx)
    const el = document.getElementById(elTag)
    if (el) el.scrollIntoView(false)
  }

  function up () {
    const i = addressAutocomplete.value.currentIdx
    if (i > 0 && addressAutocomplete.value.openDropDown) setCurrentIdx(i - 1)
    scrollIntoViewActiveAddress()
  }

  function down () {
    const i = addressAutocomplete.value.currentIdx
    if (i < matchedStringAddresses.value.length - 1 &&
        addressAutocomplete.value.openDropDown) setCurrentIdx(i + 1)
    scrollIntoViewActiveAddress()
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

  function isIndexActive (idx: number): boolean {
    return idx === addressAutocomplete.value.currentIdx
  }

  watchEffect(() => {
    openMatches(matchedStringAddresses.value)
  })

  return { addressAutocomplete, enter, up, down, inputChange, matchesClick, matchedStringAddresses, matchedAddresses, isIndexActive, createAddressId }
}
