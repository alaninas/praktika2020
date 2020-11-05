<template>
<div>
  <!-- See: https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter/11560180 -->
  <form @submit.prevent="onSubmit(validationErrors)" onkeydown="return event.key != 'Enter';" id="userForm">
    <Suspense>
      <NewLogin />
    </Suspense>
    <Suspense>
      <NewPersonal />
    </Suspense>
    <Suspense>
      <NewAddress />
    </Suspense>
    <input type="submit" value="Submit" class="button primary responsive-padding responsive-margin" />
  </form>
</div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import NewAddress from '@/components/forms/newUser/formRows/NewAddress.vue'
import NewLogin from '@/components/forms/newUser/formRows/NewLogin.vue'
import NewPersonal from '@/components/forms/newUser/formRows/NewPersonal.vue'
import { useUser } from '@/modules/features/useUser'
import { useUsers } from '@/modules/features/useUsers'
import { userErrors, validationErrors } from '@/modules/states/formErrors'

export default {
  components: {
    NewLogin,
    NewPersonal,
    NewAddress
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
      const userErrorsCount = Object.values(userErrors.value).filter(el => !!el).length
      if (!validationErrorsCount && !userErrorsCount) {
        addUser(user.value)
        clearUserData()
      }
    }

    return { user, onSubmit, validationErrors, userErrors }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
