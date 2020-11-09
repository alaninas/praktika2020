/* eslint-disable @typescript-eslint/no-explicit-any */
/**
* @param { Promise } promise
* @param { Object } improved - If you need to enhance the error.
* @return { Promise }
* @usage            const [error, result] = await this.to(this.personModel.findById(id).exec());
*/
function to (promise: Promise<any>, improved?: any) {
  return promise
    .then((data: any) => [null, data])
    .catch((err: any) => {
      if (improved) {
        Object.assign(err, improved)
      }
      return [err] // which is same as [err, undefined];
    })
}

export {
  to
}
