import { defineStore } from 'pinia'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'

const auth = getAuth()
const googleProvider = new GoogleAuthProvider()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.user,
  },
  actions: {
    async signInWithGoogle() {
      try {
        const result = await signInWithPopup(auth, googleProvider)
        this.user = result.user
      } catch (error) {
        console.error('Erro ao fazer login com Google:', error)
      }
    },
    async signOut() {
      try {
        await signOut(auth)
        this.user = null
      } catch (error) {
        console.error('Erro ao fazer logout:', error)
      }
    },
  },
})