
export default {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  mounted (el: any, binding: any) {
    // console.log(vnode)
    const vm = binding.instance
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    el.addEventListener('input', () => {
      vm.errors = Object.assign({}, vm.errors, {
        [el.name]: el.validationMessage
      })
    })
  }
}
