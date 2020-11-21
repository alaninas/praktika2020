import { Ref, ref } from 'vue'
import { GalleryInterface } from '../types/IUser'

const pictureToEdit: Ref<GalleryInterface> = ref({} as GalleryInterface)
const isEditFormVisible = ref(false)
const pictureedit: Ref<HTMLElement> = ref(document.createElement('div'))

function setState (data: GalleryInterface) {
  pictureToEdit.value = data
}

function displayPictureEdit (picture: GalleryInterface) {
  setState(picture)
  if (pictureedit.value) pictureedit.value.scrollIntoView(false)
  if (!isEditFormVisible.value) isEditFormVisible.value = !isEditFormVisible.value
}
function closePictureEdit () {
  isEditFormVisible.value = !isEditFormVisible.value
  setState({} as GalleryInterface)
}

export {
  pictureToEdit,
  isEditFormVisible,
  pictureedit,
  setState,
  displayPictureEdit,
  closePictureEdit
}
