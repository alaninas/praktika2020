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

    function findMatches () {
      matches.data = suggestions.filter(str => str.substr(0, search.data.length).toUpperCase() === search.data.toUpperCase())
    }
    function openMatches () {
      openDropDown.data = search.data !== '' && matches.data.length !== 0 && openDropDown.data === true
    }
    function matchesClick (index: number) {
      search.data = matches.data[index]
      openDropDown.data = false
    }
    function enter () {
      search.data = matches.data[currentIdx.data]
      openDropDown.data = false
    }
    function up () {
      if (currentIdx.data > 0) currentIdx.data--
    }
    function down () {
      if (currentIdx.data < matches.data.length - 1) currentIdx.data++
    }
    function inputChange () {
      if (openDropDown.data === false) {
        openDropDown.data = true
        currentIdx.data = 0
      }
    }
    watchEffect(() => {
      openMatches()
      findMatches()
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
