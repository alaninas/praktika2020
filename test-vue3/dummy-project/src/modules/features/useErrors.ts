import { ref } from 'vue'

const validationErrors = ref([])

const userErrors = ref({ name: '' })

export default function getErrors () {
  return { validationErrors, userErrors }
}
