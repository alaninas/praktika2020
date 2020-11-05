import UserInterface from '@/modules/types/IUser'
import { ref, Ref, watch } from 'vue'
import { getAllUsers, getAllUsersSorted, postNewUser, deleteUser, getOneUser, putUpdatedUser, getOneUserByEmail, postUserLogin } from '@/modules/services'
import LoginInterface from '@/modules/types/ILogin'

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
  const response = await getAllUsers()
  setState(response.data)
  return getState()
}

async function loadSortedUsers (column: string, direction: string): Promise<Ref<UserInterface[]>> {
  const response = await getAllUsersSorted({ column, direction })
  setState(response.data)
  return getState()
}

async function getUsersStateUser (id: string): Promise<UserInterface> {
  const response = await getOneUser(id)
  console.log('<<-- answer from the server')
  console.log(response.data)
  return response.data
}

async function updateUsersStateUser (newUser: UserInterface): Promise<Ref<UserInterface[]>> {
  await putUpdatedUser(newUser)
  const allUsers = await getAllUsers()
  setState(allUsers.data)
  return getState()
}

async function addUsersStateUser (newUser: UserInterface): Promise<Ref<UserInterface[]>> {
  await postNewUser(newUser)
  const allUsers = await getAllUsers()
  setState(allUsers.data)
  return getState()
}

async function removeUsersStateUser (userId: string): Promise<Ref<UserInterface[]>> {
  await deleteUser(userId)
  const allUsers = await getAllUsers()
  setState(allUsers.data)
  return getState()
}

async function getUserIdByEmail (email: string): Promise<string> {
  const u = await getOneUserByEmail(email)
  return u.data._id || ''
}

async function loginUsersStateUser (data: LoginInterface): Promise<LoginInterface> {
  const id = await getUserIdByEmail(data.email)
  data._id = id
  const token = await postUserLogin(data)
  console.log('>>>>>> my login response')
  console.log(token)
  return data
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
  updateUsersStateUser,
  loginUsersStateUser
}
