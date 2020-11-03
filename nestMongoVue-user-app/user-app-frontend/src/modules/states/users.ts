import UserInterface from '@/modules/types/IUser'
import { ref, Ref, watch } from 'vue'
import { getAllUsers, getAllUsersSorted, postNewUser, deleteUser, getOneUser, putUpdatedUser } from '@/modules/services/users-service'

const user = ref({} as UserInterface)
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
  const response = await getAllUsers()
  setState(response.data)
  return getState()
}

async function loadSortedUsers (column: string, direction: string): Promise<Ref<UserInterface[]>> {
  const response = await getAllUsersSorted({ column, direction })
  setState(response.data)
  return getState()
}

async function getStateUser (id: string): Promise<UserInterface> {
  const response = await getOneUser(id)
  return response.data
}

async function updateStateUser (newUser: UserInterface): Promise<Ref<UserInterface[]>> {
  await putUpdatedUser(newUser)
  const allUsers = await getAllUsers()
  setState(allUsers.data)
  return getState()
}

async function addStateUser (newUser: UserInterface): Promise<Ref<UserInterface[]>> {
  await postNewUser(newUser)
  const allUsers = await getAllUsers()
  setState(allUsers.data)
  return getState()
}

async function removeStateUser (userId: string): Promise<Ref<UserInterface[]>> {
  await deleteUser(userId)
  const allUsers = await getAllUsers()
  setState(allUsers.data)
  return getState()
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
watch([user, users], ([user, users], [prevUser, prevUsers]) => {
  history.push(users)
  console.log('from users state watcher -- on users')
  console.log(users)
  history.push(user)
  console.log('from users state watcher -- on user')
  console.log(user)
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
