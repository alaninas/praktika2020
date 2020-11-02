<template>
<div>
  <!-- See: https://stackoverflow.com/questions/895171/prevent-users-from-submitting-a-form-by-hitting-enter/11560180 -->
  <h5>Email: {{ user.email }}</h5>
  <form @submit.prevent="onSubmit(validationErrors)" onkeydown="return event.key != 'Enter';" id="userForm">
    <Suspense>
      <EditLogin />
    </Suspense>
    <Suspense>
      <EditPersonal />
    </Suspense>
    <Suspense>
      <EditAddress />
    </Suspense>
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
import { useUsers } from '@/modules/features/useUsers'
import { useRoute } from 'vue-router'
import { ref } from 'vue'
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
    const route = useRoute()
    const { editUser } = await useUsers()
    const userId = ref(route.params.id.toString())
    const { user, clearUserData } = await useUser(userId.value ? { userId: userId.value, noDataReload: false } : {})

    function onSubmit (valErrs: never[]) {
      validationErrors.value = valErrs
      const validationErrorsCount = Object.values(validationErrors.value).filter(el => !!el).length
      const userErrorsCount = Object.values(userErrors.value).filter(el => !!el).length
      if (!validationErrorsCount && !userErrorsCount) {
        console.log('send update user to server')
        console.log(user.value)
        // editUser(user.value)
        // clearUserData()
      }
    }
    function navigate () {
      // router.go(-1)
      router.push({ name: 'Users' })
      clearUserData()
    }

    return { user, onSubmit, validationErrors, userErrors, navigate }
  }
}
</script>

<style src="@/assets/csss/userForm.css">
</style>
