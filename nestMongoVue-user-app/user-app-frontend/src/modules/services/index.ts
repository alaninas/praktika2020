import { AxiosRequestConfig, AxiosResponse } from 'axios'

const reqInterceptor = (req: AxiosRequestConfig) => {
  console.log(`>> Request: ${req.method} ${req.url} ${JSON.stringify(req.headers)}`)
  // Important: request interceptors **must** return the request.
  // patikrini ar yra tokenas, jei ne redirectini i login
  // jei yra pridedi prie requesto headeriu
  // sąrašas puslapių ant kurių reikia daryt redirect
  // tikrinam req.url, ar jis nepriklauso šitam sąrašui
  // dedam headerius ir redirectinam tik jei priklauso šitam sąrašui
  // routerio logikos galime netaikyti: būtų aktualu jei turėtume dauigau rolių
  return req
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const resInterceptor = (res: AxiosResponse<any>) => {
  console.log(`>> Response: ${res.status} ${JSON.stringify(res.headers)}`)
  // Important: response interceptors **must** return the response.
  // ant 401 redirectink i logina
  // priklausyma public puslapiu sarasui galime netikrinti
  return res
}

export {
  reqInterceptor,
  resInterceptor
}
