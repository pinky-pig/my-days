// Import the createSlice API from Redux Toolkit
import { createSlice } from '@reduxjs/toolkit'

// slice 的初始值
const initialState = {
  value: 0,
}

export const balanceSlice = createSlice({
  name: 'balance', // 切片的名字，在 store 注册的时候需要用到
  initialState, // 这个是状态的初始值
  reducers: {
    // 在这里定义 reducer function
    deposit: (state, action) => {
      // This is the reducer function for the deposit action
      state.value += action.payload
    },
    withdraw: (state, action) => {
      // This is the reducer function for the withdraw action
      state.value -= action.payload
    },
  },
})

// 给每一个 reducer function 创建 Action 并导出
export const { deposit, withdraw } = balanceSlice.actions

// 这里默认导出为了能在 store 中注册
export default balanceSlice.reducer
