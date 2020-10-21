<template>
  <div class="row">
    <div class="col-lg-3 col-md-6 col-sm-12">
      <label for="userName">User name</label>
      <input type="text" id="userName" name="userName" v-model="user.userName" :class="userErrors.userName ? 'invalid' : ''" required v-validate />
      <div class="error">{{ validationErrors.userName }} {{ userErrors.userName }}</div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12">
      <label for="emailInput">Email</label>
      <input type="email" id="emailInput" name="email" v-model="user.email" required v-validate />
      <div class="error">{{ validationErrors.email }}</div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12">
      <label for="userPassword">Pswd1</label>
      <input type="password" id="userPassword" name="password" v-model="user.password" :class="userErrors.password ? 'invalid' : ''" required v-validate />
      <div class="error">{{ validationErrors.password }} {{ userErrors.password }}</div>
    </div>
    <div class="col-lg-3 col-md-6 col-sm-12">
      <label for="userPasswordConfirm">Pswd2</label>
      <input type="password" id="userPasswordConfirm" name="passwordConfirm" v-model="user.passwordConfirm" :class="userErrors.password ? 'invalid' : ''" required v-validate />
      <div class="error">{{ validationErrors.passwordConfirm }} {{ userErrors.password }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import validate from '@/modules/directives/validate'
import { user } from '@/modules/features/useUser'
import { validationErrors, userErrors } from '@/modules/features/useErrors'

export default {
  name: 'SigninInfo',
  directives: {
    validate: validate
  },
  setup () {
    return { user, validationErrors, userErrors }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
