import { ref } from 'vue'

const errors = ref([])

const uErrors = ref({ name: '' })

export default function getErrors () {
  return { errors, uErrors }
}
