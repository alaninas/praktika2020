<template>
  <div class="row" v-show="isUpdated">
    <div class="col-lg-6 col-md-6 col-sm-12">
      <label for="userPassword">Pswd1</label>
      <input type="password" id="userPassword" name="password" v-model="user.password" :class="userErrors.password ? 'invalid' : ''" minlength="4" required v-validate />
      <div class="error">{{ validationErrors.password }} {{ userErrors.password }}</div>
    </div>
    <div class="col-lg-6 col-md-6 col-sm-12">
      <label for="userPasswordConfirm">Pswd2</label>
      <input type="password" id="userPasswordConfirm" name="passwordConfirm" v-model="user.passwordConfirm" :class="userErrors.passwordConfirm ? 'invalid' : ''" minlength="4" required v-validate />
      <div class="error">{{ validationErrors.passwordConfirm }} {{ userErrors.passwordConfirm }}</div>
    </div>
  </div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import { useUser } from '@/modules/features/useUser'
import { userErrors, validationErrors } from '@/modules/states/formErrors'
import { computed } from 'vue'

export default {
  props: {
    isPswdUpdated: {
      type: Boolean,
      required: true
    }
  },
  directives: {
    validate: validate
  },
  async setup (props: Readonly<{isPswdUpdated: boolean} & {}>) {
    const isUpdated = computed(() => props.isPswdUpdated)
    const { user } = await useUser({})
    return { user, validationErrors, userErrors, isUpdated }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
