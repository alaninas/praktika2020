<template>
  <div id="nav" class="row" v-show="!isLoggedIn">
    <div class="col-lg-10 col-md-9 col-sm-7">
      <router-link to="/login">Login</router-link> |
      <router-link to="/register">Register</router-link> |
      <router-link to="/users">Users</router-link>
    </div>
    <div class="col-lg-2 col-md-3 col-sm-5">
      <span>User: anonymous</span>
    </div>
  </div>
  <div id="nav" class="row" v-show="isLoggedIn">
    <div class="col-lg-10 col-md-8 col-sm-6">
      <router-link to="/users">Users</router-link>
    </div>
    <div class="col-lg-2 col-md-4 col-sm-6">
      <router-link to="" @click="logoutUser()">Logout</router-link> |
      <span>User: {{userLoginData.email}}</span>
    </div>
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
