import UserInterface from '@/modules/types/IUser'
import { ref, Ref, watch } from 'vue'
import { server } from '@/backend-server'
import axios, { AxiosResponse } from 'axios'

// ***********************************************
// TODO: move into separate module: axiosResponses
async function getAllUsers (): Promise<AxiosResponse<UserInterface[]>> {
  console.log('state calls unsorted users')
  return await axios.get(`${server.baseURL}/users`)
}

async function getAllUsersSorted ({ column, direction }: { column: string; direction: string }): Promise<AxiosResponse<UserInterface[]>> {
  console.log(`state calls sorted users by column: ${column} in order: ${direction}`)
  return await axios.get(`${server.baseURL}/users/sort/${column}/${direction}`)
}

async function postNewUser (newUser: UserInterface): Promise<AxiosResponse<UserInterface>> {
  console.log(`state calls createNewUser email: ${newUser.email}`)
  return await axios.post(`${server.baseURL}/users`, newUser)
}

async function deleteUser (userId: string): Promise<AxiosResponse<UserInterface>> {
  console.log(`state calls deleteUser id: ${userId}`)
  return await axios.delete(`${server.baseURL}/users/${userId}`)
}

// *******************************************
// TODO: move into separate module: usersState
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

// **********************************************
// TODO: move into separate module: useUsersState
export async function useUsers () {
  function searchByEmail ({ pattern = '' }: { pattern?: string }): UserInterface[] {
    const re = new RegExp(pattern, 'i')
    const myUsers = getState()
    return pattern ? myUsers.value.filter(el => el.email && re.test(el.email)) : []
  }

  function getDirection (reverse: boolean): 'dsc' | 'asc' {
    const direction = reverse ? 'dsc' : 'asc'
    return direction
  }

  async function unsorted (): Promise<Ref<UserInterface[]>> {
    return await loadUnsortedUsers()
  }

  async function sortByEmail (reverse: boolean): Promise<Ref<UserInterface[]>> {
    return await loadSortedUsers('email', getDirection(reverse))
  }

  async function sortByAge (reverse: boolean): Promise<Ref<UserInterface[]>> {
    return await loadSortedUsers('age', getDirection(reverse))
  }

  async function sortByAddress (reverse: boolean): Promise<Ref<UserInterface[]>> {
    return await loadSortedUsers('address', getDirection(reverse))
  }

  async function sortByFullname (reverse: boolean): Promise<Ref<UserInterface[]>> {
    return await loadSortedUsers('fullname', getDirection(reverse))
  }

  async function sortByPassword (reverse: boolean): Promise<Ref<UserInterface[]>> {
    return await loadSortedUsers('password', getDirection(reverse))
  }

  async function sortById (reverse: boolean): Promise<Ref<UserInterface[]>> {
    return await loadSortedUsers('id', getDirection(reverse))
  }

  async function addUser (newUser: UserInterface): Promise<Ref<UserInterface[]>> {
    return await addStateUser(newUser)
  }

  async function removeUser (userId: string): Promise<Ref<UserInterface[]>> {
    return await removeStateUser(userId)
  }
  return { unsorted, sortByEmail, sortByAge, sortByAddress, sortByFullname, sortByPassword, sortById, searchByEmail, removeUser, addUser }
}
