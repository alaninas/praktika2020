<template>
  <div id="nav" class="row" v-show="!creds.isAuthenticated">
    <div class="col-lg-11 col-md-10 col-sm-9">
      <router-link to="/users">All Users</router-link>
    </div>
    <div class="col-lg-1 col-md-2 col-sm-3">
      <router-link to="/login">Login</router-link>
    </div>
  </div>
  <div id="nav" class="row" v-show="creds.isAuthenticated">
    <div class="col-lg-10 col-md-10 col-sm-7">
      <router-link to="/users">All Users</router-link>
    </div>
    <div class="col-lg-2 col-md-2 col-sm-5">
      <router-link to="/login" @click="logoutUser()">Logout</router-link> |
      <router-link :to="{ name: 'Edit', params: { id: userLoginData._id || '#' } }">
        {{userLoginData.email}}
      </router-link>
    </div>
  </div>
  <router-view/>
</template>

<script lang="ts">
import { useLogin } from './modules/features/useLogin'

export default {
  setup () {
    const { userLoginData, creds, logoutUser } = useLogin({})
    return { creds, userLoginData, logoutUser }
  }
}
</script>

<style lang="scss" src="@/assets/csss/app.scss">
</style>
