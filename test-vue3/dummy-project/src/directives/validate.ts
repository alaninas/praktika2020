// eslint-disable-next-line @typescript-eslint/no-explicit-any
function updateErrorObject ({ el, vm }: { el: any; vm: any }) {
  vm.errors = Object.assign({}, vm.errors, {
    [el.name]: el.validationMessage
  })
}

export default {
  mounted (el: any, binding: any) {
    const vm = binding.instance
    // Set messages in error object for required fields
    if (el.validity.valueMissing) updateErrorObject({ el, vm })
    // console.log(el.checkValidity())
    // console.log(el.validationMessage)
    el.addEventListener('input', () => {
      updateErrorObject({ el, vm })
    })
  }
}
