<template>
  <div id="nav" v-show="!isLoggedIn">
    <router-link to="/login">Login</router-link> |
    <router-link to="/register">Register</router-link> |
    <router-link to="/users">Users</router-link>
  </div>
  <div id="nav" v-show="isLoggedIn">
    <router-link to="/users">Users</router-link> |
    <label role="button" class="button inverse responsive-padding responsive-margin" @click="logoutUser()">Auth Logout</label>
  </div>
  <div class="card fluid success" v-show="isLoggedIn">
    <p>Logged in with email: {{ userLoginData.email }}</p>
  </div>
  <div class="card fluid warning" v-show="!isLoggedIn">
    <p>Please login to edit profile</p>
  </div>
  <router-view/>
</template>

<script lang="ts">
import { useLogin } from './modules/features/useLogin'

export default {
  setup () {
    const { userLoginData, isLoggedIn, logoutUser } = useLogin({})
    return { isLoggedIn, userLoginData, logoutUser }
  }
}
</script>

<style lang="scss" src="@/assets/csss/app.scss">
</style>
