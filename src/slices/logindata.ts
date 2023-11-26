import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import store from '../store'

// Описываем тип информации о пользователе
export type loginDataType = { Name: string; Mail: string } | undefined

// создаем в хранилище раздел для информации о пользователе
const loginDataSlice = createSlice({
  name: 'loginData',
  initialState: { loginData: undefined } as {
    loginData: loginDataType
  },
  reducers: {
    // Редюсер присвоения информации о пользователе
    setLoginData(state, action: PayloadAction<loginDataType>) {
      state.loginData = action.payload
    },
    // Редюсер сброса информации о пользователе
    clearLoginData(state) {
      state.loginData = undefined
    },
  },
})

// Возвращаем построители действий (Action Creator)
export const { setLoginData, clearLoginData } = loginDataSlice.actions
export default loginDataSlice.reducer
// Возвращаем функцию выборки информации о пользователе
export const loginDataSelector = (state: ReturnType<typeof store.getState>) => {
  return state.Reducer.loginDataReducer.loginData
}
