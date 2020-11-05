<template>
<div>
  <!-- See: https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter/11560180 -->
  <h5>Email: {{ user.email }}</h5>
  <label role="button" class="responsive-padding responsive-margin inverse" @click="deleteProfile(user._id)">Delete profile</label>
  <label role="button" class="button secondary" v-on:click="navigateUp()">Cancel profile update</label>
  <label role="button" class="button tertiary" v-on:click="passwordUpdate(isPswdUpdated.data)">{{ isPswdUpdated.data ? 'Choose old password' : 'Set new password' }}</label>
  <form @submit.prevent="onSubmit(validationErrors)" onkeydown="return event.key != 'Enter';" id="userForm">
    <Suspense>
      <EditLogin v-bind:isPswdUpdated="isPswdUpdated.data" />
    </Suspense>
    <Suspense>
      <EditPersonal />
    </Suspense>
    <Suspense>
      <EditAddress />
    </Suspense>
    <input type="submit" value="Submit" class="button primary responsive-padding responsive-margin"/>
  </form>
</div>
</template>

<script lang="ts">
import validate from '@/directives/validate'
import EditAddress from '@/components/forms/editUser/formRows/EditAddress.vue'
import EditLogin from '@/components/forms/editUser/formRows/EditLogin.vue'
import EditPersonal from '@/components/forms/editUser/formRows/EditPersonal.vue'
import { useUser } from '@/modules/features/useUser'
import { useUsers } from '@/modules/features/useUsers'
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import router from '@/router'
import { userErrors, validationErrors } from '@/modules/states/formErrors'
import { useLogin } from '@/modules/features/useLogin'

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
    const isPswdUpdated = reactive({ data: false })
    const route = useRoute()
    const { editUser, removeUser } = await useUsers()
    const { logoutUser } = useLogin({})
    const userId = ref(route.params.id?.toString() || '')
    const { user, clearUserData, updateUserPassword, preparePasswordForServer } = await useUser(userId.value ? { userId: userId.value, noDataReload: false } : {})

    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      const userErrorsCount = Object.values(userErrors.value).filter(el => !!el).length
      if (!validationErrorsCount && !userErrorsCount) {
        preparePasswordForServer(isPswdUpdated.data)
        editUser(user.value)
        // clearUserData()
      }
    }
    function navigateUp () {
      router.push({ name: 'Users' })
      clearUserData()
    }
    function passwordUpdate (update: boolean) {
      isPswdUpdated.data = !update
      updateUserPassword(isPswdUpdated.data)
    }
    async function deleteProfile (param: string) {
      await removeUser(param)
      logoutUser()
      navigateUp()
    }

    return { user, onSubmit, validationErrors, userErrors, navigateUp, isPswdUpdated, passwordUpdate, deleteProfile }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
