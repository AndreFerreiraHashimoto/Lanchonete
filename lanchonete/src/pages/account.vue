<template>
  <v-app>

    <!-- App Bar -->
    <v-app-bar color="brown-darken-3">
      <v-app-bar-nav-icon
        color="white"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <v-app-bar-title class="text-white font-weight-bold">
        🍔 Big Bang Burguer
      </v-app-bar-title>
    </v-app-bar>

    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item prepend-icon="mdi-home" title="Início" to="/menu"></v-list-item>
        <v-list-item prepend-icon="mdi-account" title="Meu Perfil" to="/account"></v-list-item>
        <v-list-item prepend-icon="mdi-cart" title="Meu Pedido"></v-list-item>
        <v-divider class="my-2"></v-divider>
        <v-list-item
          prepend-icon="mdi-logout"
          title="Sair"
          base-color="red"
          @click="handleLogout"
        ></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <!-- Conteúdo -->
    <v-main class="bg-grey-lighten-2">
      <v-container class="py-6">
        <v-row justify="center">
          <v-col cols="12" md="8" lg="6">

            <!-- Carregando -->
            <div v-if="loading" class="text-center py-10">
              <v-progress-circular
                indeterminate
                color="brown-darken-2"
                size="48"
              ></v-progress-circular>
            </div>

            <template v-else>

              <!-- Card Header do Perfil -->
              <v-card
                color="brown-darken-3"
                rounded="xl"
                class="mb-4 pa-6 text-center"
                elevation="3"
              >
                <v-avatar size="90" class="mb-3" color="brown-lighten-3">
                  <v-img
                    v-if="user?.photoURL"
                    :src="user.photoURL"
                    alt="Foto de perfil"
                  ></v-img>
                  <span
                    v-else
                    class="text-h4 font-weight-bold text-brown-darken-4"
                  >
                    {{ initials }}
                  </span>
                </v-avatar>

                <v-card-title class="text-white text-h6 font-weight-bold pb-0 justify-center">
                  {{ user?.displayName || 'Sem nome' }}
                </v-card-title>

                <v-card-subtitle class="text-brown-lighten-3 pb-3">
                  {{ user?.email || '' }}
                </v-card-subtitle>

                <v-btn
                  variant="tonal"
                  color="brown-lighten-3"
                  size="small"
                  rounded="lg"
                  prepend-icon="mdi-camera"
                  @click="openEdit('photo')"
                >
                  Alterar foto
                </v-btn>
              </v-card>

              <!-- Informações Pessoais -->
              <v-card color="brown-lighten-5" rounded="xl" class="mb-4" elevation="2">
                <v-card-title class="text-brown-darken-3 pa-4 pb-2">
                  <v-icon color="brown-darken-2" class="mr-2">mdi-account-circle-outline</v-icon>
                  Informações pessoais
                </v-card-title>

                <v-divider color="brown-lighten-3"></v-divider>

                <v-list bg-color="transparent" lines="two">
                  <v-list-item
                    prepend-icon="mdi-account-outline"
                    title="Nome completo"
                    :subtitle="user?.displayName || 'Não informado'"
                  >
                    <template #append>
                      <v-btn icon="mdi-pencil-outline" variant="text" color="brown-darken-1" size="small" @click="openEdit('name')"></v-btn>
                    </template>
                  </v-list-item>

                  <v-divider inset color="brown-lighten-3"></v-divider>

                  <v-list-item
                    prepend-icon="mdi-email-outline"
                    title="E-mail"
                    :subtitle="user?.email || 'Não informado'"
                  >
                    <template #append>
                      <v-btn icon="mdi-pencil-outline" variant="text" color="brown-darken-1" size="small" @click="openEdit('email')"></v-btn>
                    </template>
                  </v-list-item>

                  <v-divider inset color="brown-lighten-3"></v-divider>

                  <v-list-item
                    prepend-icon="mdi-phone-outline"
                    title="Telefone"
                    :subtitle="user?.phoneNumber || 'Não informado'"
                  >
                    <template #append>
                      <v-btn icon="mdi-pencil-outline" variant="text" color="brown-darken-1" size="small" @click="openEdit('phone')"></v-btn>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>

              <!-- Segurança -->
              <v-card color="brown-lighten-5" rounded="xl" class="mb-4" elevation="2">
                <v-card-title class="text-brown-darken-3 pa-4 pb-2">
                  <v-icon color="brown-darken-2" class="mr-2">mdi-shield-account-outline</v-icon>
                  Segurança
                </v-card-title>

                <v-divider color="brown-lighten-3"></v-divider>

                <v-list bg-color="transparent">
                  <v-list-item
                    prepend-icon="mdi-lock-outline"
                    title="Alterar senha"
                    subtitle="Redefina sua senha de acesso"
                    @click="openEdit('password')"
                  >
                    <template #append>
                      <v-icon color="brown-darken-1">mdi-chevron-right</v-icon>
                    </template>
                  </v-list-item>

                  <v-divider inset color="brown-lighten-3"></v-divider>

                  <v-list-item
                    prepend-icon="mdi-google"
                    title="Conta Google"
                    :subtitle="isGoogleLinked ? user?.email ?? '' : 'Não vinculada'"
                  >
                    <template #append>
                      <v-chip
                        :color="isGoogleLinked ? 'green-darken-1' : 'grey'"
                        size="x-small"
                        variant="tonal"
                      >
                        {{ isGoogleLinked ? 'Vinculada' : 'Não vinculada' }}
                      </v-chip>
                    </template>
                  </v-list-item>
                </v-list>
              </v-card>

              <!-- Botão Sair -->
              <v-btn
                color="brown-darken-3"
                variant="outlined"
                size="large"
                block
                rounded="lg"
                prepend-icon="mdi-logout"
                @click="handleLogout"
              >
                Sair da conta
              </v-btn>

            </template>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <!-- Dialog de Edição -->
    <v-dialog v-model="editDialog" max-width="400">
      <v-card color="brown-lighten-5" rounded="xl">
        <v-card-title class="text-brown-darken-3 pa-4">
          Editar {{ fieldLabels[editField] }}
        </v-card-title>

        <v-divider color="brown-lighten-3"></v-divider>

        <v-card-text class="pa-4">
          <v-text-field
            v-model="editValue"
            :label="fieldLabels[editField]"
            :type="editField === 'password' ? 'password' : 'text'"
            variant="outlined"
            color="brown-darken-2"
            base-color="brown"
            rounded="lg"
            hide-details
          ></v-text-field>
        </v-card-text>

        <v-card-actions class="pa-4 pt-0">
          <v-btn variant="text" color="brown" @click="editDialog = false" block>
            Cancelar
          </v-btn>
          <v-btn
            color="brown-darken-3"
            variant="flat"
            class="text-white"
            :loading="saving"
            @click="saveEdit"
            block
          >
            Salvar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import {
  getAuth,
  onAuthStateChanged,
  updateProfile,
  updateEmail,
  updatePassword,
  signOut,
  GoogleAuthProvider,
  type User
} from 'firebase/auth'

const auth = getAuth()
const router = useRouter()

const drawer = ref<boolean>(false)
const loading = ref<boolean>(true)
const saving = ref<boolean>(false)
const editDialog = ref<boolean>(false)
type FieldKey = 'name' | 'email' | 'phone' | 'password' | 'photo'

const editField = ref<FieldKey>('name')
const editValue = ref<string>('')
const user = ref<User | null>(null)

const fieldLabels: Record<FieldKey, string> = {
  name: 'Nome completo',
  email: 'E-mail',
  phone: 'Telefone',
  password: 'Nova senha',
  photo: 'URL da foto',
}

const initials = computed<string>(() => {
  const name = user.value?.displayName || ''
  return name
    .split(' ')
    .map((n: string) => n[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() || '?'
})

const isGoogleLinked = computed<boolean>(() => {
  return user.value?.providerData?.some(
    p => p.providerId === GoogleAuthProvider.PROVIDER_ID
  ) ?? false
})

onMounted(() => {
  onAuthStateChanged(auth, (firebaseUser) => {
    user.value = firebaseUser
    loading.value = false
  })
})

const openEdit = (field: FieldKey) => {
  editField.value = field
  editValue.value = ''
  editDialog.value = true
}

const saveEdit = async () => {
  saving.value = true
  try {
    const currentUser = auth.currentUser
    if (!currentUser) return

    if (editField.value === 'name') {
      await updateProfile(currentUser, { displayName: editValue.value })
    } else if (editField.value === 'email') {
      await updateEmail(currentUser, editValue.value)
    } else if (editField.value === 'password') {
      await updatePassword(currentUser, editValue.value)
    } else if (editField.value === 'photo') {
      await updateProfile(currentUser, { photoURL: editValue.value })
    }

    user.value = { ...currentUser } as User
    editDialog.value = false
  } catch (error) {
    console.error('Erro ao salvar:', error)
  } finally {
    saving.value = false
  }
}

const handleLogout = async () => {
  await signOut(auth)
  router.push('/login')
}
</script>