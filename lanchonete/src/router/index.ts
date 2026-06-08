// Composables
import { createRouter, createWebHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
})

router.beforeEach(async (to, from, next) => {
  // Importação dinâmica para evitar uso do store antes do Pinia ser registrado
  const { useAuthStore } = await import('@/stores/auth')
  const authStore = useAuthStore()

  if (to.path !== '/login' && !authStore.isAuthenticated) {
    next('/login')
    return
  }

  next()
})

export default router
