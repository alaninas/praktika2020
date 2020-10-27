import { validationErrors } from '@/modules/states/validationErrors'

export function getValidationErrors () {
  return validationErrors
}

export function resetValidationErrors () {
  validationErrors.value = {}
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function clearAddressValidationError (valErr: any) {
  validationErrors.value = Object.assign({}, valErr, {
    address: ''
  })
}
