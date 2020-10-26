import { ref } from 'vue'

export const validationErrors = ref({})

export function resetValidationErrors () {
  validationErrors.value = {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function clearAddressValidationError (valErr: any) {
  validationErrors.value = Object.assign({}, valErr, {
    address: ''
  })
}
