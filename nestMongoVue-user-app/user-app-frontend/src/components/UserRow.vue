<template>
  <tr v-for="user in users" :key="user" :class="isGivenUserAuthorised(user._id) ? 'is-authorised' : ''">
    <td data-label="Id" :title="user._id">
      <router-link
        :to="{ name: 'Edit', params: { id: user._id } }"
        @click="loadUserEdit(user._id, $route.params.id !== user._id)"
        :class="isGivenUserAuthorised(user._id) ? '' : 'disabled'"
      >
          {{ user._id.substr(18) }}
      </router-link>
    </td>
    <td data-label="Gallery">
      <span v-html="getGalleryLinkText(user.images, user._id)" />
    </td>
    <td data-label="Age">{{ user.age }}</td>
    <td data-label="Website">{{ user.website }}</td>
    <td data-label="Email">{{ user.email }}</td>
    <td data-label="Fullname">{{ user.fullname }}</td>
    <td data-label="Country">{{ user.country }}</td>
    <td data-label="Address">{{ user.address }}</td>
  </tr>
</template>

<script lang="ts">
import { useUsers } from '@/modules/features/useUsers'
import { useUser } from '@/modules/features/useUser'
import { useLogin } from '@/modules/features/useLogin'

export default {
  async setup () {
    const { unsorted } = await useUsers()
    const users = await unsorted()
    const { isGivenUserAuthorised } = useLogin({})

    async function loadUserEdit (id: string, onFirstLoad: boolean) {
      if (onFirstLoad) await useUser({ userId: id, noDataReload: false })
    }
    function getGalleryLinkText (images: string[] | undefined, id: string): string {
      const length = images?.length
      return length ? `<a href="#/users/gallery/${id}">${length} image${length > 1 ? 's' : ''}</a>` : ''
    }

    return { users, loadUserEdit, isGivenUserAuthorised, getGalleryLinkText }
  }
}
</script>

<style scoped lang="scss">
table tr {
  text-align: left;
}
</style>
