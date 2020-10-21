<template>
<div class="row">
  <div class="col-lg-3 col-md-4 col-sm-12">
  <label for="addressInput">Address</label>
  <input class="address-input" type="text" id="addressInput" v-model="user.addressString" placeholder="your address" name="address" required v-validate
    @keydown.enter="enter()"
    @keydown.down="down()"
    @keydown.up="up()"
    @input="inputChange()"
  />
  <div class="error">{{ validationErrors.address }}</div>
  <ul class="dropdown-menu" v-if="openDropDown.data">
    <li v-for="(match, i) in matchedAddressesToString.data" :key="i" v-bind:class="{'autocomplete-active': i === currentIdx.data}" @click="matchesClick(i)">
      {{ match }}
    </li>
  </ul>
  </div>
  <div class="autofilled-address col-lg-9 col-md-8 col-sm-12">
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="streetInput">Street</label>
        <input type="text" id="streetInput" name="street" :value="user.street ? user.street : ''" />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="numberInput">Number</label>
        <input type="text" id="numberInput" name="number" :value="user.housenumber ? user.housenumber : ''" />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="cityInput">City</label>
        <input type="text" id="cityInput" name="city" :value="user.city ? user.city : ''" />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="zipcodeInput">Zipcode</label>
        <input type="text" id="zipcodeInput" name="zipcode" :value="user.zipcode ? user.zipcode : ''" />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { watchEffect, reactive, computed, ComputedRef } from 'vue'
import validate from '@/modules/directives/validate'
import AddressInterface from '@/modules/types/IAddress'
import { validationErrors } from '@/modules/features/useErrors'
import performStringSearch from '@/modules/features/useAddresses'
import { user, setUserAddress } from '@/modules/features/useUser'

export default {
  name: 'AddressAutocomplete',
  directives: {
    validate: validate
  },
  setup () {
    const currentIdx = reactive({ data: 0 })
    const matchedAddressesToString = reactive({ data: [''] })
    const openDropDown = reactive({ data: false })
    const matchedAddresses = computed(() => performStringSearch(user.value.addressString))

    function findMatches (addr: ComputedRef<AddressInterface[]>): string[] {
      matchedAddressesToString.data = addr.value.map<string>(el => Object.values(el).join(', '))
      return matchedAddressesToString.data
    }
    function openMatches (matchedAddressesToStringArray: string[]): boolean {
      openDropDown.data = user.value.addressString !== undefined && user.value.addressString !== '' && matchedAddressesToStringArray.length !== 0 && openDropDown.data === true
      return openDropDown.data
    }
    function resetDropDown (dropdDownListAction: boolean) {
      openDropDown.data = dropdDownListAction
      currentIdx.data = 0
    }
    function matchesClick (index: number) {
      setUserAddress(matchedAddresses.value[index])
      resetDropDown(false)
    }
    function enter () {
      if (matchedAddressesToString.data[currentIdx.data]) {
        setUserAddress(matchedAddresses.value[currentIdx.data])
      }
      resetDropDown(false)
    }
    function up () {
      if (currentIdx.data > 0) currentIdx.data--
    }
    function down () {
      if (currentIdx.data < matchedAddressesToString.data.length - 1) currentIdx.data++
    }
    function inputChange () {
      if (openDropDown.data === false) {
        resetDropDown(true)
      }
    }
    watchEffect(() => {
      openMatches(findMatches(computed(() => performStringSearch(user.value.addressString))))
    })
    return { enter, up, down, inputChange, matchesClick, matchedAddressesToString, openDropDown, currentIdx, matchedAddresses, validationErrors, user }
  }
}
</script>

<style scoped src="../assets/csss/addressAutocomplete.css">
</style>
