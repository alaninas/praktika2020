<template>
<div>
  <!-- See: https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter/11560180 -->
  <h5>Email: {{ user.email }}</h5>
  <label role="button" class="responsive-padding responsive-margin inverse" v-show="!isDeleteApproved" @click="isDeleteApproved = !isDeleteApproved">Delete profile</label>
  <div class="card fluid warning" v-show="isDeleteApproved">
    <p>Please confirm user {{ user.email }} profile delete
      <label role="button" class="responsive-padding responsive-margin inverse" @click="deleteProfile(user._id)">Delete profile</label>
    </p>
  </div>
  <label role="button" class="button secondary" @click="navigateUp()">Cancel profile update</label>
  <label role="button" class="button tertiary" @click="passwordUpdate(isPswdUpdated)">{{ isPswdUpdated ? 'Choose old password' : 'Set new password' }}</label>
  <form @submit.prevent="onSubmit(validationErrors)" onkeydown="return event.key != 'Enter';" id="userForm">
    <Suspense>
      <EditLogin v-bind:isPswdUpdated="isPswdUpdated" />
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
import { ref } from 'vue'
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
    const isPswdUpdated = ref(false)
    const isDeleteApproved = ref(false)
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
        preparePasswordForServer(isPswdUpdated.value)
        editUser(user.value)
        // clearUserData()
      }
    }
    function navigateUp () {
      router.push({ name: 'Users' })
      clearUserData()
    }
    function passwordUpdate (updateFlag: boolean) {
      isPswdUpdated.value = !updateFlag
      updateUserPassword(isPswdUpdated.value)
    }
    async function deleteProfile (param: string) {
      await removeUser(param)
      logoutUser()
      navigateUp()
    }

    return { user, onSubmit, validationErrors, userErrors, navigateUp, isPswdUpdated, passwordUpdate, deleteProfile, isDeleteApproved }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
