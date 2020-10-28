<template>
<div class="row">
  <div class="col-lg-3 col-md-4 col-sm-12">
  <label for="addressInput">Address</label>
  <input
    class="address-input" type="text" id="addressInput" v-model="user.address" placeholder="your address" name="address" pattern="([,A-z\s]+.,[0-9\s]+){2}" required v-validate
    @keydown.enter="enter()"
    @keydown.down="down()"
    @keydown.up="up()"
    @input="inputChange()"
    @click="enter()"
  />
  <div v-show="!openDropDown.data" class="error">{{ validationErrors.address }}</div>
  <ul class="dropdown-menu" v-show="openDropDown.data">
    <li v-for="(match, i) in matchedAddressesToString" :key="i" v-bind:class="{'autocomplete-active': i === currentIdx.data}" @click="matchesClick(i)">
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
        <label for="houseNumberInput">Number</label>
        <input type="text" id="houseNumberInput" name="houseNumber" :value="user.houseNumber ? user.houseNumber : ''" />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="cityInput">City</label>
        <input type="text" id="cityInput" name="city" :value="user.city ? user.city : ''" />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="zipCodeInput">Zipcode</label>
        <input type="text" id="zipCodeInput" name="zipCode" :value="user.zipCode ? user.zipCode : ''" />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { watchEffect, reactive } from 'vue'
import validate from '@/modules/directives/validate'
import { getValidationErrors } from '@/modules/features/useValidationErrors'
import { useAddresses } from '@/modules/features/useAddresses'
import { useUser } from '@/modules/features/useUser'

export default {
  directives: {
    validate: validate
  },
  setup () {
    const { getUser, setUserAddress } = useUser({})
    const user = getUser()
    const currentIdx = reactive({ data: 0 })
    const openDropDown = reactive({ data: false })
    const { matchedAddresses, matchedAddressesToString } = useAddresses(user)
    const validationErrors = getValidationErrors()

    function openMatches (matchedAddressesToStringArray: string[]): boolean {
      openDropDown.data = user.value.address !== undefined && user.value.address !== '' && matchedAddressesToStringArray.length !== 0 && openDropDown.data === true
      return openDropDown.data
    }
    function resetDropDown (dropdDownListAction: boolean) {
      openDropDown.data = dropdDownListAction
      currentIdx.data = 0
    }
    function up () {
      if (currentIdx.data > 0 && openDropDown.data) currentIdx.data--
    }
    function down () {
      if (currentIdx.data < matchedAddressesToString.value.length - 1 && openDropDown.data) currentIdx.data++
    }
    function inputChange () {
      if (openDropDown.data === false) resetDropDown(true)
    }
    function matchesClick (index: number) {
      if (openDropDown.data) {
        setUserAddress(matchedAddresses.value[index])
        resetDropDown(false)
      }
    }
    function enter () {
      if (openDropDown.data) {
        if (matchedAddressesToString.value[currentIdx.data]) setUserAddress(matchedAddresses.value[currentIdx.data])
        resetDropDown(false)
      }
    }
    watchEffect(() => {
      openMatches(matchedAddressesToString.value)
    })

    return { enter, up, down, inputChange, matchesClick, matchedAddressesToString, openDropDown, currentIdx, matchedAddresses, validationErrors, user }
  }
}
</script>

<style scoped src="@/assets/csss/addressAutocomplete.css">
</style>
