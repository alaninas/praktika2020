/* eslint-disable no-useless-catch */
import { getOneUserByEmail, postUserLogin, putTemporaryPassword } from '../services'
import LoginInterface from '@/modules/types/ILogin'
import { to } from '@/modules/utilities/index-utility'

async function getUserIdByEmail (email: string): Promise<string> {
  const [error, result] = await to(getOneUserByEmail(email))
  if (error) throw error
  return result.data._id || ''
}

async function getUserPswdByEmail (email: string): Promise<string> {
  const [error, result] = await to(getOneUserByEmail(email))
  if (error) throw error
  return result.data.password || ''
}

async function loginUser (data: LoginInterface): Promise<LoginInterface> {
  try {
    console.log(data)
    data._id = await getUserIdByEmail(data.email)
    if (!data._id) throw new Error(`Can not find user: ${data.email}`)
    await postUserLogin(data)
    console.log('>>>>>> my login response')
    console.log(data)
    return data
  } catch (err) {
    throw err
  }
}

async function resetUserPassword (data: LoginInterface): Promise<LoginInterface> {
  try {
    const newp = (await getUserPswdByEmail(data.email)).substr(18)
    if (!newp) throw new Error(`Can not find user: ${data.email}`)
    await putTemporaryPassword(data.email, newp)
    console.log('>>>>>> forget password response')
    console.log(data)
    console.log(`>> new password: ${newp}`)
    return data
  } catch (err) {
    throw err
  }
}

export {
  loginUser,
  resetUserPassword
}
