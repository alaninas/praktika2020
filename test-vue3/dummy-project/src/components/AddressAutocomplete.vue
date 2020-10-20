<template>
<div class="row">
  <div class="col-lg-4 col-md-5 col-sm-12">
  <input class="form-control" type="text" v-model="search.data" placeholder="your address" name="address" required v-validate
    @keydown.enter="enter()"
    @keydown.down="down()"
    @keydown.up="up()"
    @input="inputChange()"
  />
  <span class="error"> {{ errors.address }} </span>
  <ul class="dropdown-menu" v-if="openDropDown.data">
    <li v-for="(match, i) in matches.data" :key="i" v-bind:class="{'autocomplete-active': i === currentIdx.data}" @click="matchesClick(i)">
      {{ match }}
    </li>
  </ul>
  </div>
  <div class="matches col-lg-8 col-md-7 col-sm-12" v-if="matchedAddresses[0] && !openDropDown.data">
    <!-- <div> {{ matchedAddresses[0] }} </div> -->
    <!-- TODO: spans -> divs: rows & cols -->
    <span class="col-lg-6 col-md-12 col-sm-12">
      <label for="streetInp">Street</label><input type="text" id="streetInp" name="street" :value="matchedAddresses[0].street" />
    </span>
    <span class="col-lg-6 col-md-12 col-sm-12">
      <label for="numberInp">Number</label><input type="text" id="numberInp" name="number" :value="matchedAddresses[0].number" />
    </span>
    <span class="col-lg-6 col-md-12 col-sm-12">
      <label for="cityInp">City</label><input type="text" id="cityInp" name="city" :value="matchedAddresses[0].city" />
    </span>
    <span class="col-lg-6 col-md-12 col-sm-12">
      <label for="zipcodeInp">Zipcode</label><input type="text" id="zipcodeInp" name="zipcode" :value="matchedAddresses[0].zipcode" />
    </span>
  </div>
</div>
</template>

<script lang="ts">
import { watchEffect, reactive, computed, ComputedRef } from 'vue'
import useAddresses from '@/modules/features/useAddresses'
import AddressInterface from '@/modules/types/IAddress'
import { getErrors } from '@/modules/utilities/errors'
import validate from '@/modules/directives/validate'

export default {
  name: 'AddressAutocomplete',
  directives: {
    validate: validate
  },
  setup () {
    const errors = getErrors()
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
    return { enter, up, down, inputChange, matchesClick, search, matches, openDropDown, currentIdx, matchedAddresses, errors }
  }
}
</script>

<style scoped src="../assets/csss/addressAutocomplete.css">
</style>
