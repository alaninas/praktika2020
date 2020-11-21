import UserInterface from '@/modules/types/IUser'
import { ref, Ref, watch } from 'vue'
import { getAllUsers, getAllUsersSorted, postNewUser, deleteUser, getOneUser, putUpdatedUser } from '@/modules/services'
import { to } from '../utilities/index-utility'

const users = ref([{} as UserInterface])
const history = []
history.push(users.value)

function setState (data: UserInterface[]) {
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [error, result] = await to(postNewUser(newUser))
  if (error) throw error
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
