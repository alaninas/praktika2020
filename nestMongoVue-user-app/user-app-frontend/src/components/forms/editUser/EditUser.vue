<template>
<div>
  <!-- See: https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter/11560180 -->
  <h5>Email: {{ user.email }}</h5>
  <form @submit.prevent="onSubmit(validationErrors)" onkeydown="return event.key != 'Enter';" id="userForm">
    <EditLogin />
    <EditPersonal />
    <EditAddress />
    <input type="submit" value="Submit" class="button primary responsive-padding responsive-margin" />
  </form>
  <button class="button secondary" v-on:click="navigate()">Cancel update</button>
</div>
</template>

<script lang="ts">
import validate from '@/modules/directives/validate'
import EditAddress from '@/components/forms/editUser/formRows/EditAddress.vue'
import EditLogin from '@/components/forms/editUser/formRows/EditLogin.vue'
import EditPersonal from '@/components/forms/editUser/formRows/EditPersonal.vue'
import { useUser } from '@/modules/features/useUser'
import { getValidationErrors } from '@/modules/features/useValidationErrors'
import { useUsers } from '@/modules/features/useUsers'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
import router from '@/router'

export default {
  components: {
    EditLogin,
    EditPersonal,
    EditAddress
  },
  directives: {
    validate: validate
  },
  async setup () {
    const route = useRoute()
    const { getUserById, editUser } = await useUsers()
    const userB = ref(await getUserById(route.params.id))

    const { getUser, getUserErrors, clearUserState } = useUser({ myUser: userB, noDataReload: false })
    const user = getUser()
    const userErrors = getUserErrors()
    const validationErrors = getValidationErrors()

    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      const userErrorsCount = Object.values(userErrors.value).filter(el => !!el).length
      if (!validationErrorsCount && !userErrorsCount) {
        editUser(user.value)
        clearUserState(user)
      }
    }
    function navigate () {
      router.go(-1)
      clearUserState(user)
    }

    return { user, onSubmit, validationErrors, userErrors, navigate }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
