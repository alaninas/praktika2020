<template>
  <table class="hoverable" id="userTable">
    <thead>
      <tr>
        <th>Nr | Del</th>
        <th>Name
          <div class="sort-arrows">
            <span class="arrow" @click="sortByName()"></span>
            <span class="arrow down" @click="sortByName(true)"></span>
          </div>
        </th>
        <th>Age
          <div class="sort-arrows">
            <span class="arrow" @click="sortByAge()"></span>
            <span class="arrow down" @click="sortByAge(true)"></span>
          </div>
        </th>
        <th>Email
          <div class="sort-arrows">
            <span class="arrow" @click="sortByEmail()"></span>
            <span class="arrow down" @click="sortByEmail(true)"></span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <UserRow
        v-bind:users="users"
        v-bind:removeUser="removeUser"
      />
    </tbody>
  </table>
</template>

<script lang="ts">
import UserRow from '@/components/UserRow.vue'

export default {
  name: 'UserTable',
  el: '#userTable',
  components: {
    UserRow
  },
  props: {
    users: Array,
    sortByName: Function,
    sortByEmail: Function,
    sortByAge: Function,
    removeUser: Function
  },
  setup () { return { } }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
// Table
table tr {
  text-align: left;
}
table:not(.horizontal) {
  max-height: 100%;
}
// Sort
.arrow {
  width: 0;
  height: 0;
  border-left: .475rem solid transparent;
  border-right: .475rem solid transparent;
  border-bottom: .825rem solid #7d7d7d;
  display: inline-block;
}
.down {
  transform: rotate(180deg);
  -webkit-transform: rotate(180deg);
}
span.arrow {
  cursor: pointer;
}
span.arrow:hover {
  border-bottom-color: #3b4146;
}
.sort-arrows {
  display: inline;
  padding: .125rem;
}
.sort-arrows span ~ span {
  margin-left: .0125rem;
}
</style>
