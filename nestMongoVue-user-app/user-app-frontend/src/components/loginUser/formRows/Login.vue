<template>
  <div class="row">
    <div class="col-lg-6 col-md-6 col-sm-12">
      <label for="emailInput">Email</label>
      <input
        type="email"
        id="emailInput"
        name="email"
        :class="httpErrors.email ? 'invalid' : ''"
        v-model="userLoginData.email"
        required
        v-validate
      />
      <div class="error">{{ validationErrors.email }} {{ httpErrors.email }}</div>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12">
      <label for="userPassword">Pswd1</label>
      <input
        type="password"
        id="userPassword"
        name="password"
        :class="httpErrors.email ? 'invalid' : ''"
        v-model="userLoginData.password"
        v-validate
      />
      <div class="error">{{ validationErrors.password }} {{ httpErrors.password  }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import { validationErrors, httpErrors } from '@/modules/states/formErrors'
import { useLogin } from '@/modules/features/useLogin'
import { routerRedirect } from '@/modules/utilities/router-utility'

export default {
  directives: {
    validate: validate
  },
  async setup () {
    const { userLoginData } = useLogin({})
    return { userLoginData, validationErrors, httpErrors, routerRedirect }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
