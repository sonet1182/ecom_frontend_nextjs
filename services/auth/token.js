const ID_TOKEN_KEY = 'api_token'


export const getToken = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(ID_TOKEN_KEY)
  }
}

export const getData = () => {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem('user_data')
  }
}

export const saveToken = (token) => {
  window.localStorage.setItem(ID_TOKEN_KEY, token)
}

export const saveData = (data, notification, user_type) => {
  window.localStorage.setItem('user_data', data)
  window.localStorage.setItem('user_type', user_type)
  window.localStorage.setItem('notification', notification)
}

export const saveData2 = (data) => {
  window.localStorage.setItem('user_data2', data)
}

export const destroyToken = () => {
  window.localStorage.removeItem(ID_TOKEN_KEY)
  window.localStorage.removeItem('user_type')
  window.localStorage.removeItem('user_data')
  window.localStorage.removeItem('otp_time')
  window.localStorage.removeItem('notification')
}

export const destroyNote = () => {
  window.localStorage.removeItem('notification')
}


export default { getToken, saveToken, getData, saveData, destroyToken }
