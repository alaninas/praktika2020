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
      <strong>{{ match.substr(0, search.data.length) }}</strong>{{ match.substr(search.data.length) }}
    </li>
  </ul>
</div>
</div>
</template>

<script lang="ts">
import { watchEffect, reactive } from 'vue'

export default {
  name: 'AddressAutocomplete',
  setup () {
    const currentIdx = reactive({ data: 0 })
    const suggestions = ['Bangalore', 'Chennai', 'Cochin', 'Delhi', 'Kolkata', 'Mumbai']
    const search = reactive({ data: '' })
    const matches = reactive({ data: [''] })
    const openDropDown = reactive({ data: false })

    // check if search === numbers --> then search in str NRs or Zipcodes
    // if search starts with letters --> prefer places, cities, squares and so on (i.e. w/o house numbers)
    // in either case : start searching at the start of the appropriate field
    // once complex address string is filled in Input ('street nr, city, zipcode')
    //   perform the appropriate search on data split by comma,
    //   take ctionable search as: 'street nr ..someNewInput..'
    //   (i.e. first field before comma)
    function findMatches (searchStr: string): string[] {
      matches.data = searchStr.length > 0 ? suggestions.filter(str => str.substr(0, searchStr.length).toUpperCase() === searchStr.toUpperCase()) : []
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

<style scoped lang="scss">
.autocomplete-active,
li:hover,
li:focus-within {
  background-color: var(--table-body-hover-back-color);
  color: #f8f8f8;
}
.form-control,
ul,
li {
  width: 100%;
  margin: 0;
  text-align: left;
}
ul,
li {
  background: var(--table-body-back-color);
}
ul {
  list-style: none;
  padding-left: 0;
}
li {
  display: block;
  padding: var(--universal-padding);
  position: relative;
}
li:hover,
li:focus-within {
  cursor: pointer;
}
</style>
