<template>
  <div id="nav" v-show="!loggedIn">
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/users">Users</router-link> |
    <!-- <label role="button" class="button inverse responsive-padding responsive-margin" @click="testOut()">Test auth logout</label> -->
  </div>
  <div id="nav" v-show="loggedIn">
    <router-link to="/users">Users</router-link> |
    <label role="button" class="button inverse responsive-padding responsive-margin" @click="testOut()">Test auth logout</label>
    <!-- <label role="button" class="button inverse responsive-padding responsive-margin" @click="testOut()">Test auth logout</label> -->
  </div>
  <div class="card fluid success" v-show="loggedIn">
    <p>Logged in with email: {{ userLogin.email }}</p>
  </div>
  <div class="card fluid warning" v-show="!loggedIn">
    <p>Please login</p>
  </div>
  <!-- <label role="button" class="button responsive-padding responsive-margin">{{ loggedIn }}</label>
  <label role="button" class="button responsive-padding responsive-margin">User email in cache: {{ userLogin.email }}</label> -->
  <!-- <label role="button" class="button inverse responsive-padding responsive-margin" @click="testOut()">Test auth logout</label> -->
  <router-view/>
</template>

<script lang="ts">
import { useLogin } from './modules/features/useLogin'

export default {
  setup () {
    // const { userLogin, loggedIn, loginUser, logoutUser } = useLogin({})
    const { userLogin, loggedIn, logoutUser } = useLogin({})
    function testOut () {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const c = logoutUser()
      return true
    }
    return { loggedIn, userLogin, testOut }
  }
}
</script>

<style lang="scss" src="@/assets/csss/app.scss">
</style>
