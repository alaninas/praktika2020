import UserInterface from '@/modules/types/IUser'
import { ref, Ref, watch } from 'vue'
import { getAllUsers, getAllUsersSorted, postNewUser, deleteUser, getOneUser, putUpdatedUser } from '@/modules/services'

const users = ref([{} as UserInterface])
const history = []
history.push(users.value)

function setState (data: UserInterface[]) {
  console.log('from users setState')
  users.value = data
}

function getState (): Ref<UserInterface[]> {
  return users
}

async function loadUnsortedUsers (): Promise<Ref<UserInterface[]>> {
  setState((await getAllUsers()).data)
  return getState()
}

async function loadSortedUsers (column: string, direction: string): Promise<Ref<UserInterface[]>> {
  const response = await getAllUsersSorted({ column, direction })
  setState(response.data)
  return getState()
}

async function getUsersStateUser (id: string): Promise<UserInterface> {
  const response = await getOneUser(id)
  return response.data
}

async function updateUsersStateUser (newUser: UserInterface): Promise<Ref<UserInterface[]>> {
  await putUpdatedUser(newUser)
  setState((await getAllUsers()).data)
  return getState()
}

async function addUsersStateUser (newUser: UserInterface): Promise<Ref<UserInterface[]>> {
  await postNewUser(newUser)
  setState((await getAllUsers()).data)
  return getState()
}

async function removeUsersStateUser (userId: string): Promise<Ref<UserInterface[]>> {
  await deleteUser(userId)
  setState((await getAllUsers()).data)
  return getState()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch(users, (users, prevUsers) => {
  history.push(users)
  console.log('>> from users state watcher -- on users')
  console.log(history.length)
})

export {
  setState,
  getState,
  loadUnsortedUsers,
  loadSortedUsers,
  addUsersStateUser,
  removeUsersStateUser,
  getUsersStateUser,
  updateUsersStateUser
}
