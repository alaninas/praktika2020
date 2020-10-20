<template>
<div class="row">
  <div class="col-lg-3 col-md-4 col-sm-12">
  <label for="addressInput">Address</label>
  <input class="address-input" type="text" id="addressInput" v-model="search.data" placeholder="your address" name="address" required v-validate
    @keydown.enter="enter()"
    @keydown.down="down()"
    @keydown.up="up()"
    @input="inputChange()"
    @click="enter()"
  />
  <div class="error">{{ validationErrors.address }}</div>
  <ul class="dropdown-menu" v-if="openDropDown.data">
    <li v-for="(match, i) in matches.data" :key="i" v-bind:class="{'autocomplete-active': i === currentIdx.data}" @click="matchesClick(i)">
      {{ match }}
    </li>
  </ul>
  </div>
  <div class="matches col-lg-9 col-md-8 col-sm-12">
    <!-- TODO: spans -> divs: rows & cols -->
    <div class="row">
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="streetInput">Street</label>
        <input type="text" id="streetInput" name="street" :value="matchedAddresses[currentIdx.data] ? matchedAddresses[currentIdx.data].street : ''" />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="numberInput">Number</label>
        <input type="text" id="numberInput" name="number" :value="matchedAddresses[currentIdx.data] ? matchedAddresses[currentIdx.data].number : ''" />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="cityInput">City</label>
        <input type="text" id="cityInput" name="city" :value="matchedAddresses[currentIdx.data] ? matchedAddresses[currentIdx.data].city : ''" />
      </div>
      <div class="col-lg-3 col-md-6 col-sm-12">
        <label for="zipcodeInput">Zipcode</label>
        <input type="text" id="zipcodeInput" name="zipcode" :value="matchedAddresses[currentIdx.data] ? matchedAddresses[currentIdx.data].zipcode : ''" />
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { watchEffect, reactive, computed, ComputedRef } from 'vue'
import useAddresses from '@/modules/features/useAddresses'
import AddressInterface from '@/modules/types/IAddress'
import useErrors from '@/modules/features/useErrors'
import validate from '@/modules/directives/validate'

export default {
  name: 'AddressAutocomplete',
  directives: {
    validate: validate
  },
  setup () {
    const { validationErrors } = useErrors()
    const currentIdx = reactive({ data: 0 })
    const search = reactive({ data: '' })
    const matches = reactive({ data: [''] })
    const openDropDown = reactive({ data: false })
    const { performStringSearch } = useAddresses()
    const matchedAddresses = computed(() => performStringSearch(search.data))

    function findMatches (addr: ComputedRef<AddressInterface[]>): string[] {
      matches.data = addr.value.map<string>(el => Object.values(el).join(', '))
      return matches.data
    }
    function openMatches (matchesArray: string[]): boolean {
      openDropDown.data = search.data !== '' && matchesArray.length !== 0 && openDropDown.data === true
      return openDropDown.data
    }
    function resetDropDown (dropdDownListAction: boolean) {
      openDropDown.data = dropdDownListAction
      currentIdx.data = 0
    }
    function matchesClick (index: number) {
      search.data = matches.data[index]
      resetDropDown(false)
    }
    function enter () {
      search.data = matches.data[currentIdx.data] ? matches.data[currentIdx.data] : search.data
      resetDropDown(false)
    }
    function up () {
      if (currentIdx.data > 0) currentIdx.data--
    }
    function down () {
      if (currentIdx.data < matches.data.length - 1) currentIdx.data++
    }
    function inputChange () {
      if (openDropDown.data === false) {
        resetDropDown(true)
      }
    }
    watchEffect(() => {
      openMatches(findMatches(computed(() => performStringSearch(search.data))))
    })
    return { enter, up, down, inputChange, matchesClick, search, matches, openDropDown, currentIdx, matchedAddresses, validationErrors }
  }
}
</script>

<style scoped src="../assets/csss/addressAutocomplete.css">
</style>
