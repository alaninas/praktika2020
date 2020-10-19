import { Ref, ref } from 'vue'

export let errors = ref([])

export function getErrors (): Ref<never[]> {
  return errors
}

export function setErrors (obj: never[]): never[] {
  errors = Object.assign(errors, obj)
  console.log(errors)
  return errors.value
}
