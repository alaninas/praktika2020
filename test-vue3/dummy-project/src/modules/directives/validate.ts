/* eslint-disable @typescript-eslint/no-explicit-any */
function updateErrorObject ({ el, vm }: { el: any; vm: any }) {
  vm.validationErrors = Object.assign({}, vm.validationErrors, {
    [el.name]: el.validationMessage
  })
}

function initRequiredError ({ el, vm }: { el: any; vm: any }) {
  const index = Object.keys(vm.validationErrors).findIndex(key => key === el.name)
  if (index < 0) {
    // console.log(el.name)
    // console.log(el.validationMessage)
    updateErrorObject({ el, vm })
  }
}

// See
// https://logaretm.com/blog/2019-05-03-html-aided-vuejs-form-validation/
// https://v3.vuejs.org/guide/migration/custom-directives.html#edge-case-accessing-the-component-instance
export default {
  mounted (el: any, binding: any) {
    const vm = binding.instance
    if (el.validity.valueMissing) initRequiredError({ el, vm })
    el.addEventListener('input', () => {
      updateErrorObject({ el, vm })
    })
  },
  updated (el: any, binding: any) {
    const vm = binding.instance
    if (el.validity.valueMissing) initRequiredError({ el, vm })
  }
}
