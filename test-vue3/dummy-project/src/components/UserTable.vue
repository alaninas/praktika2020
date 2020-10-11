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
      <tr v-for="(kuser, i) in users" :key="kuser">
        <td data-label="Nr | Del">{{i}} <label role="button" class="responsive-padding responsive-margin inverse" @click="removeUser(kuser)">Del</label></td>
        <td data-label="Name">{{ kuser.name }}</td>
        <td data-label="Age">{{ kuser.age }}</td>
        <td data-label="Email">{{ kuser.email }}</td>
      </tr>
    </tbody>
  </table>
</template>

<script lang="ts">

export default {
  name: 'UserTable',
  el: '#userTable',
  props: {
    users: {
      type: Array
    },
    sortByName: {
      type: Function
    },
    sortByEmail: {
      type: Function
    },
    sortByAge: {
      type: Function
    },
    removeUser: {
      type: Function
    }
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
