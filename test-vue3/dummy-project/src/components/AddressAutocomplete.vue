<template>
<div class="card fluid">
<div>
  <input class="form-control" type="text" v-model="search.data" placeholder="your address"
    @keydown.enter="enter()"
    @keydown.down="down()"
    @keydown.up="up()"
    @input="inputChange()"
  />
  <ul class="dropdown-menu" v-if="openDropDown.data">
    <li v-for="(match, i) in matches.data" :key="i" v-bind:class="{'autocomplete-active': i === currentIdx.data}" @click="matchesClick(i)">
      {{ match }}
    </li>
  </ul>
</div>
</div>
</template>

<script lang="ts">
import { watchEffect, reactive } from 'vue'
import useAddresses from '@/features/useAddresses'

export default {
  name: 'AddressAutocomplete',
  setup () {
    const currentIdx = reactive({ data: 0 })
    const search = reactive({ data: '' })
    const matches = reactive({ data: [''] })
    const openDropDown = reactive({ data: false })
    const { parseSearchString, searchAddresses } = useAddresses()

    function findMatches (searchStr: string): string[] {
      const { matchString, parsedAddress } = parseSearchString(searchStr)
      const matchedAddresses = searchAddresses(parsedAddress, matchString)
      matches.data = matchedAddresses.map<string>(el => Object.values(el).join(', '))
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
      openMatches(findMatches(search.data))
    })
    return { enter, up, down, inputChange, matchesClick, search, matches, openDropDown, currentIdx }
  }
}
</script>

<style scoped src="../assets/addressAutocomplete.css">
</style>
