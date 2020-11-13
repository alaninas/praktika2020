<template>
  <ul class="row gallery">
    <li class="col-lg-3 col-md-6 col-sm-12" v-for="image in user.images" :key="image">
      <figure>
        <!-- <label role="button" class="responsive-padding responsive-margin inverse">Delete</label> -->
        <img :src="require(`@/assets/uploads/${$route.params.id}/${image}`)" />
        <figcaption>{{ image }}</figcaption>
      </figure>
    </li>
  </ul>
</template>

<script lang="ts">
import { useUser } from '@/modules/features/useUser'
import { useRoute } from 'vue-router'
import { ref } from 'vue'

export default {
  async setup () {
    const route = useRoute()
    const userId = ref(route.params.id?.toString())
    const { user } = await useUser(userId.value ? { userId: userId.value, noDataReload: false } : {})
    return { user }
  }
}
</script>

<style scoped lang="scss">
ul.gallery {
  list-style: none;
  padding-left: 0;
}
.gallery > li {
  padding-bottom: calc(var(--universal-padding) / 2);
}
.gallery > li figure {
  background: lightgrey;
  margin: 0;
  padding: calc(var(--universal-padding) / 2) calc(var(--universal-padding) / 1.5);
  border: calc(var(--universal-border-radius) / 2) solid #f8f8f8;
}
</style>
