<template>
<div class="card fluid">
<div class="" v-bind:class="{'open': openDropDown.data}">
  <input class="form-control" type="text" v-model="search.data"
    @keydown.enter="enter()"
    @keydown.down="down()"
    @keydown.up="up()"
    @input="change()"
  />
  <ul class="dropdown-menu" v-if="openDropDown.data">
    <li v-for="(match, i) in matches.data" :key="i" v-bind:class="{'autocomplete-active': isActive(i, currentIdx.data)}" @click="matchesClick(i)">
      <strong>{{ displaySearchSubstring(match, search.data) }}</strong>{{ displayTailSubstring(match, search.data) }}
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

    function findMatches () {
      console.log('in matches')
      matches.data = suggestions.filter(str => str.substr(0, search.data.length).toUpperCase() === search.data.toUpperCase())
      return matches
    }
    function openSuggestion () {
      console.log('im in openSuggestion')
      openDropDown.data = search.data !== '' && matches.data.length !== 0 && openDropDown.data === true
      // console.log(openDropDown.data)
      return openDropDown
    }
    function enter () {
      search.data = matches.data[currentIdx.data]
      openDropDown.data = false
    }
    function up () {
      console.log('in up')
      if (currentIdx.data > 0) currentIdx.data--
    }
    function down () {
      console.log('in down')
      if (currentIdx.data < matches.data.length - 1) currentIdx.data++
    }
    function isActive (index: number, active: number) {
      console.log('im in active')
      return index === active
    }
    function change () {
      console.log('im in change()')
      if (openDropDown.data === false) {
        openDropDown.data = true
        currentIdx.data = 0
      }
    }
    function matchesClick (index: number) {
      console.log('im in click')
      search.data = matches.data[index]
      openDropDown.data = false
    }
    function displaySearchSubstring (found: string, stringToSearch: string) {
      return found.substr(0, stringToSearch.length)
    }
    function displayTailSubstring (found: string, stringToSearch: string) {
      return found.substr(stringToSearch.length)
    }
    watchEffect(() => {
      openSuggestion()
      findMatches()
    })
    return { enter, up, down, change, matchesClick, displaySearchSubstring, displayTailSubstring, search, matches, openDropDown, isActive, currentIdx }
  }
}
</script>

<style scoped lang="scss">
body {
  font-family: Helvetica, sans-serif;
}
.autocomplete-active {
  background-color: red !important;
  color: #ffffff;
}
.open > .dropdown-menu {
  display: block;
}
.form-control,
li {
  width: 100%;
  margin: 0;
  text-align: left;
}
a {
  text-decoration: none;
}
nav {
  font-family: monospace;
}
ul {
  background: darkorange;
  list-style: none;
  margin: 0;
  padding-left: 0;
}
li {
  color: #fff;
  background: darkorange;
  display: block;
  float: left;
  padding: 1rem;
  position: relative;
  text-decoration: none;
  transition-duration: 0.5s;
}
li a {
  color: #fff;
}
li:hover,
li:focus-within {
  background: red;
  cursor: pointer;
}
li:focus-within a {
  outline: none;
}
ul li ul {
  background: orange;
  visibility: hidden;
  opacity: 0;
  min-width: 5rem;
  position: absolute;
  transition: all 0.5s ease;
  margin-top: 1rem;
  left: 0;
  display: none;
}
ul li:hover > ul,
ul li:focus-within > ul,
ul li ul:hover,
ul li ul:focus {
   visibility: visible;
   opacity: 1;
   display: block;
}
ul li ul li {
  clear: both;
  width: 100%;
}
</style>
