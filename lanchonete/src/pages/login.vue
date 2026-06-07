<template>
  <v-app>
    <v-main class="bg-brown-darken-3">
      <v-container fluid class="fill-height">
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5" lg="4">

            <v-card
              color="brown-lighten-5"
              rounded="xl"
              elevation="8"
              class="pa-6"
            >

              <!-- Topo -->
              <v-card-item class="text-center pb-2">
                <div class="text-h2 mb-2">🍔</div>
                <v-card-title class="text-h5 font-weight-black text-brown-darken-4">
                  Big Bang Burguer
                </v-card-title>
                <v-card-subtitle class="text-brown-darken-1">
                  Faça login ou cadastre-se para continuar
                </v-card-subtitle>
              </v-card-item>

              <v-card-text>

                <!-- E-mail -->
                <v-text-field
                  v-model="email"
                  label="E-mail"
                  type="email"
                  prepend-inner-icon="mdi-email-outline"
                  variant="outlined"
                  color="brown-darken-2"
                  base-color="brown"
                  rounded="lg"
                  class="mb-2"
                  hide-details="auto"
                />

                <!-- Senha -->
                <v-text-field
                  v-model="password"
                  label="Senha"
                  :type="showPassword ? 'text' : 'password'"
                  prepend-inner-icon="mdi-lock-outline"
                  :append-inner-icon="showPassword ? 'mdi-eye-off' : 'mdi-eye'"
                  @click:append-inner="showPassword = !showPassword"
                  variant="outlined"
                  color="brown-darken-2"
                  base-color="brown"
                  rounded="lg"
                  hide-details="auto"
                />

                <!-- Esqueci a senha -->
                <div class="text-right mt-2 mb-4">
                  <v-btn
                    variant="text"
                    color="brown-darken-1"
                    size="small"
                    class="text-caption"
                  >
                    Esqueceu a senha?
                  </v-btn>
                </div>

                <!-- Botão Entrar -->
                <v-btn
                  color="brown-darken-3"
                  variant="flat"
                  size="large"
                  block
                  rounded="lg"
                  :loading="loading"
                  @click="handleLogin"
                  class="text-white mb-4"
                >
                  Entrar
                </v-btn>

                <!-- Divisor -->
                <v-row align="center" class="mb-4" no-gutters>
                  <v-col><v-divider color="brown-lighten-1" /></v-col>
                  <v-col cols="auto">
                    <v-chip
                      color="brown-lighten-3"
                      size="small"
                      class="mx-2 text-brown-darken-2"
                    >
                      ou
                    </v-chip>
                  </v-col>
                  <v-col><v-divider color="brown-lighten-1" /></v-col>
                </v-row>

                <!-- Botão Google -->
                <v-btn
                  variant="outlined"
                  color="brown-darken-1"
                  size="large"
                  block
                  rounded="lg"
                  @click="signInWithGoogle"
                >
                  <template #prepend>
                    <svg width="20" height="20" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                  </template>
                  Continuar com Google
                </v-btn>

              </v-card-text>

              <!-- Rodapé -->
              <v-card-actions class="justify-center pt-0">
                <span class="text-caption text-brown-darken-1">Não tem uma conta?</span>
                <v-btn
                  variant="text"
                  color="brown-darken-3"
                  size="small"
                  class="font-weight-bold"
                >
                  Cadastre-se
                </v-btn>
              </v-card-actions>

            </v-card>

          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const loading = ref(false)

const handleLogin = () => {
  loading.value = true
  // await signInWithEmailAndPassword(auth, email.value, password.value)
  setTimeout(() => { loading.value = false }, 1500)
}

const signInWithGoogle = async () => {
  loading.value = true
  try {
    const auth = getAuth()
    const provider = new GoogleAuthProvider()
    const result = await signInWithPopup(auth, provider)
    // const credential = GoogleAuthProvider.credentialFromResult(result)
    // const token = credential.accessToken
    const user = result.user
    console.log('Google sign-in success:', user)
  } catch (error) {
    console.error('Google sign-in error:', error)
  } finally {
    loading.value = false
  }
}

</script>