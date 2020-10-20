// eslint-disable-next-line @typescript-eslint/no-explicit-any
function updateErrorObject ({ el, vm }: { el: any; vm: any }) {
  vm.validationErrors = Object.assign({}, vm.validationErrors, {
    [el.name]: el.validationMessage
  })
}

// See
// https://logaretm.com/blog/2019-05-03-html-aided-vuejs-form-validation/
// https://v3.vuejs.org/guide/migration/custom-directives.html#edge-case-accessing-the-component-instance
export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mounted (el: any, binding: any) {
    const vm = binding.instance
    // Set messages in error object for required fields
    if (el.validity.valueMissing) updateErrorObject({ el, vm })
    el.addEventListener('input', () => {
      updateErrorObject({ el, vm })
    })
  }
}
