<template>
<div>
  <!-- See: https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter/11560180 -->
  <form @submit.prevent="onSubmit(validationErrors)" onkeydown="return event.key != 'Enter';" id="userForm">
    <Suspense>
      <Login />
    </Suspense>
    <input type="submit" value="Submit" class="button primary responsive-padding responsive-margin" />
  </form>
</div>
<label role="button" class="button tertiary responsive-padding responsive-margin" @click="test()">Test auth login</label>
</template>

<script lang="ts">
import validate from '@/modules/directives/validate'
import Login from '@/components/forms/loginUser/formRows/Login.vue'
import { useUser } from '@/modules/features/useUser'
import { useUsers } from '@/modules/features/useUsers'
import { validationErrors } from '@/modules/states/formErrors'

export default {
  components: {
    Login
  },
  directives: {
    validate: validate
  },
  async setup () {
    const { user, clearUserData } = await useUser({ noDataReload: false })
    const { addUser } = await useUsers()

    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      if (!validationErrorsCount) {
        addUser(user.value)
        clearUserData()
      }
    }

    function test () {
      return true
    }

    return { user, onSubmit, validationErrors, test }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
