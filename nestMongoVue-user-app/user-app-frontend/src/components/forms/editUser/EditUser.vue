<template>
<div>
  <!-- See: https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter/11560180 -->
  <h5>Email: {{ user.email }}</h5>
  <button class="button secondary" v-on:click="navigate()">Cancel profile update</button>
  <button class="button tertiary" v-on:click="passwordUpdate(updatePswd.data)">{{ updatePswd.data ? 'Choose old password' : 'Set new password' }}</button>
  <form @submit.prevent="onSubmit(validationErrors)" onkeydown="return event.key != 'Enter';" id="userForm">
    <Suspense>
      <EditLogin v-bind:updatePswd="updatePswd.data" />
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
import validate from '@/modules/directives/validate'
import EditAddress from '@/components/forms/editUser/formRows/EditAddress.vue'
import EditLogin from '@/components/forms/editUser/formRows/EditLogin.vue'
import EditPersonal from '@/components/forms/editUser/formRows/EditPersonal.vue'
import { useUser } from '@/modules/features/useUser'
import { useUsers } from '@/modules/features/useUsers'
import { useRoute } from 'vue-router'
import { reactive, ref } from 'vue'
import router from '@/router'
import { userErrors, validationErrors } from '@/modules/states/formErrors'

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
    const updatePswd = reactive({ data: false })
    const route = useRoute()
    const { editUser } = await useUsers()
    const userId = ref(route.params.id.toString())
    const { user, clearUserData, clearUserPassword, sendUserPasswordToServer } = await useUser(userId.value ? { userId: userId.value, noDataReload: false } : {})

    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      const userErrorsCount = Object.values(userErrors.value).filter(el => !!el).length
      if (!validationErrorsCount && !userErrorsCount) {
        sendUserPasswordToServer(updatePswd.data)
        console.log(`send update user to server, forgetPswd flag: ${updatePswd.data}`)
        console.log(user.value)
        editUser(user.value)
        // router.push({ name: 'Edit', params: { id: route.params.id } })
        // clearUserData()
      }
    }
    function navigate () {
      router.push({ name: 'Users' })
      clearUserData()
    }
    function passwordUpdate (update: boolean) {
      updatePswd.data = !update
      clearUserPassword(updatePswd.data)
    }

    return { user, onSubmit, validationErrors, userErrors, navigate, updatePswd, passwordUpdate }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
