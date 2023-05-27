// ** React Imports
import { createContext, useEffect, useState } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Axios
import axios from 'axios'

// ** Config
import jwt_decode from "jwt-decode";
import authConfig from 'src/configs/auth'

import { csrftoken , config } from "src/configs/Config"
// ** Defaults
const defaultProvider = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
  register: () => Promise.resolve()
}
const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
  // ** States
  const [user, setUser] = useState(defaultProvider.user)
  const [loading, setLoading] = useState(defaultProvider.loading)
  const RequestOptions = {...config.requestOptions}
  // ** Hooks
  const router = useRouter()
  
  useEffect(() => {
    const initAuth = async () => {
      const storedToken = window.localStorage.getItem(authConfig.storageTokenKeyName)
      if (storedToken) {
        setLoading(true)
        RequestOptions["method"] = "POST"
        RequestOptions["body"]= JSON.stringify({token: storedToken})
        await  fetch(authConfig.meEndpoint,RequestOptions).
        then( response =>  {
            console.log(response.statusText)
            setLoading(false)
            let userData =  jwt_decode(storedToken).userData
            setUser(userData)
          })
          .catch((err) => {
            localStorage.removeItem('userData')
            localStorage.removeItem('refresh')
            localStorage.removeItem('access')
            setUser(null)
            setLoading(false)
            if (authConfig.onTokenExpiration === 'logout' && !router.pathname.includes('login')) {
              router.replace('/login')
            }
          })
      } else {
        setLoading(false)
      }
    }
    initAuth()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const handleLogin = (params, errorCallback) => {
    RequestOptions["method"] = "POST"
    RequestOptions["body"] = JSON.stringify({username: params.username ,password: params.password})
    fetch(authConfig.loginEndpoint,RequestOptions).
    then(response => response.json()).
    then(data => {
     // params.rememberMe
         window.localStorage.setItem(authConfig.storageTokenKeyName, data.access)
       // : null
      const returnUrl = router.query.returnUrl
      let userData =  jwt_decode(data.access).userData

          //userData.email = "admin@vuexy.com"

      setUser(userData)
      params.rememberMe ? window.localStorage.setItem('userData',  JSON.stringify(userData)) : null
      const redirectURL = returnUrl && returnUrl !== '/' ? returnUrl : '/'
      router.replace(redirectURL)
  }).catch(err => {
    console.log(err)
    if (errorCallback) errorCallback(err)
  })
     
  }

  const handleLogout = () => {
    setUser(null)
    window.localStorage.removeItem('userData')
    window.localStorage.removeItem(authConfig.storageTokenKeyName)
    router.push('/login')
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
