import UserInterface from '@/modules/types/IUser'
import { ref, Ref, watch } from 'vue'
import { getAllUsers, getAllUsersSorted, postNewUser, deleteUser, getOneUser, putUpdatedUser } from '@/modules/httpRequests'

const users = ref([{} as UserInterface])
const history = []
history.push(users.value)

function setState (data: UserInterface[]) {
  console.log('>>> inside state setState')
  users.value = data
}

function getState (): Ref<UserInterface[]> {
  return users
}

async function loadUnsortedUsers (): Promise<Ref<UserInterface[]>> {
  const c = await getAllUsers()
  setState(c.data)
  return getState()
}

async function loadSortedUsers (column: string, direction: string): Promise<Ref<UserInterface[]>> {
  const c = await getAllUsersSorted({ column, direction })
  setState(c.data)
  return getState()
}

async function getStateUser (id: string): Promise<UserInterface> {
  const c = await getOneUser(id)
  return c.data
}

async function updateStateUser (newUser: UserInterface): Promise<Ref<UserInterface[]>> {
  const c = await putUpdatedUser(newUser)
  const all = getState()
  const index = all.value.findIndex(el => el.email === c.data.email)
  all.value[index] = c.data
  setState(all.value)
  return getState()
}

async function addStateUser (newUser: UserInterface): Promise<Ref<UserInterface[]>> {
  const c = await postNewUser(newUser)
  const all = getState()
  all.value.push(c.data)
  setState(all.value)
  return getState()
}

async function removeStateUser (userId: string): Promise<Ref<UserInterface[]>> {
  const c = await deleteUser(userId)
  const all = getState()
  const index = all.value.findIndex(el => el.email === c.data.email)
  all.value.splice(index, 1)
  setState(all.value)
  return getState()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(users, (newUsers, oldUsers) => {
  history.push(newUsers)
  console.log('from state watcher')
  console.log(newUsers)
  console.log(history.length)
})

export {
  setState,
  getState,
  loadUnsortedUsers,
  loadSortedUsers,
  addStateUser,
  removeStateUser,
  getStateUser,
  updateStateUser
}
