<template>
  <v-app id="inspire">
    <v-app-bar color="brown-darken-3">
      <v-app-bar-nav-icon @click="drawer = !drawer" color="white"></v-app-bar-nav-icon>
      <v-app-bar-title class="text-white font-weight-bold">🍔 Big Bang Burguer</v-app-bar-title>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" temporary>
      <v-list>
        <v-list-item title="Início" prepend-icon="mdi-home"></v-list-item>
        <v-list-item title="Meu Pedido" prepend-icon="mdi-cart"></v-list-item>
        <v-list-item title="Contato" prepend-icon="mdi-phone"></v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-main class="bg-grey-lighten-2">
      <v-container>
        <v-row>
          <template v-for="category in categories" :key="category.id">
            <!-- Título da Categoria -->
            <v-col class="mt-4" cols="12">
              <strong class="text-h6">{{ category.name }}</strong>
            </v-col>

            <!-- Cards dos Produtos -->
            <v-col
              v-for="item in category.items"
              :key="item.id"
              cols="6"
              md="2"
            >
              <v-card rounded="lg" elevation="2" hover>
                <v-img
                  :src="item.image"
                  height="120"
                  cover
                >
                  <!-- Fallback se imagem não carregar -->
                  <template #error>
                    <v-sheet height="120" color="brown-lighten-4" class="d-flex align-center justify-center">
                      <v-icon size="40" color="brown">mdi-hamburger</v-icon>
                    </v-sheet>
                  </template>
                </v-img>

                <v-card-text class="pa-2">
                  <div class="text-body-2 font-weight-bold text-truncate">{{ item.name }}</div>
                  <div class="text-caption text-green-darken-2 font-weight-bold">
                    R$ {{ item.price.toFixed(2) }}
                  </div>
                </v-card-text>

                <v-card-actions class="pa-2 pt-0">
                  <v-btn
                    color="brown-darken-2"
                    variant="tonal"
                    size="small"
                    block
                    prepend-icon="mdi-plus"
                  >
                    Adicionar
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </template>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script setup>
import { ref } from 'vue'

const drawer = ref(null)

const categories = ref([
  {
    id: 1,
    name: '🍔 Hambúrgueres',
    items: [
      { id: 101, name: 'X-Bacon', price: 32.90, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=300' },
      { id: 102, name: 'X-Salada', price: 28.90, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=300' },
      { id: 103, name: 'X-Tudo', price: 38.90, image: 'https://images.unsplash.com/photo-1561758033-d89a9ad46330?w=300' },
      { id: 104, name: 'Smash Burger', price: 42.90, image: 'https://images.unsplash.com/photo-1586816001966-79b736744398?w=300' },
      { id: 105, name: 'BBQ Burguer', price: 36.90, image: 'https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?w=300' },
      { id: 106, name: 'Veggie', price: 30.90, image: 'https://images.unsplash.com/photo-1520072959219-c595dc870360?w=300' },
    ]
  },
  {
    id: 2,
    name: '🍟 Acompanhamentos',
    items: [
      { id: 201, name: 'Batata Frita', price: 14.90, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=300' },
      { id: 202, name: 'Onion Rings', price: 16.90, image: 'https://images.unsplash.com/photo-1639024471283-03518883512d?w=300' },
      { id: 203, name: 'Fritas c/ Cheddar', price: 19.90, image: 'https://images.unsplash.com/photo-1630431341973-02e1b662ec35?w=300' },
      { id: 204, name: 'Nuggets', price: 18.90, image: 'https://images.unsplash.com/photo-1562967914-608f82629710?w=300' },
      { id: 205, name: 'Batata Rústica', price: 17.90, image: 'https://images.unsplash.com/photo-1518013431117-eb1465fa5752?w=300' },
      { id: 206, name: 'Coleslaw', price: 12.90, image: 'https://images.unsplash.com/photo-1607532941433-304659e8198a?w=300' },
    ]
  },
  {
    id: 3,
    name: '🥤 Bebidas',
    items: [
      { id: 301, name: 'Coca-Cola', price: 8.90, image: 'https://images.unsplash.com/photo-1629203851122-3726ecdf080e?w=300' },
      { id: 302, name: 'Suco de Laranja', price: 10.90, image: 'https://images.unsplash.com/photo-1621506289937-a8e4df240d0b?w=300' },
      { id: 303, name: 'Milkshake', price: 18.90, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=300' },
      { id: 304, name: 'Água', price: 5.00, image: 'https://images.unsplash.com/photo-1548839140-29a749e1cf4d?w=300' },
      { id: 305, name: 'Limonada', price: 12.90, image: 'https://images.unsplash.com/photo-1621263764928-df1444c5e859?w=300' },
      { id: 306, name: 'Cerveja', price: 14.90, image: 'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=300' },
    ]
  },
  {
    id: 4,
    name: '🍰 Sobremesas',
    items: [
      { id: 401, name: 'Brownie', price: 14.90, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?w=300' },
      { id: 402, name: 'Sorvete', price: 12.90, image: 'https://images.unsplash.com/photo-1563805042-7684c019e1cb?w=300' },
      { id: 403, name: 'Cheesecake', price: 16.90, image: 'https://images.unsplash.com/photo-1565958011703-44f9829ba187?w=300' },
      { id: 404, name: 'Pudim', price: 11.90, image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=300' },
      { id: 405, name: 'Açaí', price: 18.90, image: 'https://images.unsplash.com/photo-1615485290382-441e4d049cb5?w=300' },
      { id: 406, name: 'Waffle', price: 20.90, image: 'https://images.unsplash.com/photo-1562376552-0d160a2f238d?w=300' },
    ]
  }
])
</script>