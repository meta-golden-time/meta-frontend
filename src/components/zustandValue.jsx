import { create } from 'zustand'

const useStore = create(set => ({
  isLogin: false,
  setLogin: (loginState) => set({ isLogin: loginState }),
}))

export default useStore
