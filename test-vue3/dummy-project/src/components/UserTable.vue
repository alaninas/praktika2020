<template>
  <table class="hoverable" id="userTable">
    <thead>
      <tr>
        <th>Nr | Del</th>
        <th>Name
          <div class="sort-arrows">
            <span class="arrow" @click="sortByName()"></span><span class="arrow down" @click="sortByName(true)"></span>
          </div>
        </th>
        <th>Age
          <div class="sort-arrows">
            <span class="arrow" @click="sortByAge()"></span><span class="arrow down" @click="sortByAge(true)"></span>
          </div>
        </th>
        <th>Email
          <div class="sort-arrows">
            <span class="arrow" @click="sortByEmail()"></span><span class="arrow down" @click="sortByEmail(true)"></span>
          </div>
        </th>
      </tr>
    </thead>
    <tbody>
      <UserRow v-bind:pusers="pusers"/>
    </tbody>
  </table>
</template>

<script lang="ts">
import UserRow from '@/components/UserRow.vue'
import Users from '@/modules/Users'
import usersFactory from '@/modules/UsersFactory'

export default {
  name: 'UserTable',
  el: '#userTable',
  components: {
    UserRow
  },
  props: {
    pusers: {
      type: Users,
      required: true
    }
  },
  setup (props: Readonly<{pusers: Users} & {}>) {
    const { usersSortByName, usersSortByAge, usersSortByEmail } = usersFactory(props.pusers)
    function sortByName (reverse?: boolean) {
      return usersSortByName({ reverse })
    }
    function sortByEmail (reverse?: boolean) {
      return usersSortByEmail({ reverse })
    }
    function sortByAge (reverse?: boolean) {
      return usersSortByAge({ reverse })
    }
    return { sortByName, sortByEmail, sortByAge }
  }
}
</script>

<style scoped lang="scss">
table tr {
  text-align: left;
}
table:not(.horizontal) {
  max-height: 100%;
}
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
