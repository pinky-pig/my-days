// Import the createSlice API from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit'
import type { ThemeName } from 'tamagui'

// slice 的初始值
const initialState: {
  value: number
  themeName: ThemeName
  isFellowDeviceColorScheme: boolean
} = {
  value: 0,
  themeName: 'light',
  isFellowDeviceColorScheme: true,
}

export type ThemeStoreType = keyof typeof initialState

export const balanceSlice = createSlice({
  name: 'balance', // 切片的名字，在 store 注册的时候需要用到
  initialState, // 这个是状态的初始值
  reducers: {
    // 在这里定义 reducer function
    deposit: (state, action) => {
      state.value += action.payload
    },
    withdraw: (state, action) => {
      state.value = action.payload
    },
    setThemeName: (state, action) => {
      state.themeName = action.payload
    },
    setFellowDeviceColorScheme: (state, action) => {
      state.isFellowDeviceColorScheme = action.payload
    },
  },
})

// 给每一个 reducer function 创建 Action 并导出
export const { deposit, withdraw, setThemeName, setFellowDeviceColorScheme } = balanceSlice.actions

// 这里默认导出为了能在 store 中注册
export default balanceSlice.reducer
