import { defineStore } from 'pinia'
import { getAuth, signInWithPopup, GoogleAuthProvider, signOut, signInWithEmailAndPassword } from 'firebase/auth'
import type { User } from 'firebase/auth'
import firebaseApp from '@/plugins/firebase'

// Garante que o Firebase está inicializado antes de chamar getAuth()
const auth = getAuth(firebaseApp)
const googleProvider = new GoogleAuthProvider()

export const useAuthStore = defineStore('auth', {
  state: () => ({
    user: null as User | null,
  }),
  getters: {
    isAuthenticated: (state): boolean => !!state.user,
  },
  actions: {
    async signInWithEmail(email: string, password: string) {
      const result = await signInWithEmailAndPassword(auth, email, password)
      this.user = result.user
    },
    async signInWithGoogle() {
      try {
        const result = await signInWithPopup(auth, googleProvider)
        this.user = result.user
      } catch (error) {
        console.error('Erro ao fazer login com Google:', error)
        throw error
      }
    },
    async signOut() {
      try {
        await signOut(auth)
        this.user = null
      } catch (error) {
        console.error('Erro ao fazer logout:', error)
        throw error
      }
    },
  },
})
