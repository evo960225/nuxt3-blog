<template>
  <q-layout view="lHh Lpr lFf" class="bg-grey-9 text-white">
    <q-header elevated class="bg-grey-6">
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          @click="toggleLeftDrawer"
          aria-label="Menu"
          :icon="matMenu"
        />
        <NuxtLink to="/backstage">
          <q-toolbar-title>
            邊緣宅後面
          </q-toolbar-title>
        </NuxtLink>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      class="bg-grey-8"
    >
      <q-list dark>
        <q-item-section>
          <q-item clickable>
            <q-item-section>
              <q-item-label>首頁編輯</q-item-label>
              <q-menu v-model="showingMenuHome">
                <q-list style="min-width: 100px">
                  <NuxtLink to="/backstage/home">
                   <q-item clickable v-close-popup>
                      <q-item-section>輪播</q-item-section>
                    </q-item>
                  </NuxtLink>
                  <q-item clickable v-close-popup>
                    <q-item-section>圖示</q-item-section>
                  </q-item>
                  <q-separator />
                </q-list>
              </q-menu>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label>文章</q-item-label>
              <q-menu v-model="showingMenuBlog">
                <q-list style="min-width: 100px">
                  <NuxtLink to="/backstage/blog/create">
                    <q-item clickable v-close-popup>
                      <q-item-section>新增</q-item-section>
                    </q-item>
                  </NuxtLink>
                  <NuxtLink to="/backstage/blog/list">
                    <q-item clickable v-close-popup>
                      <q-item-section>文章清單</q-item-section>
                    </q-item>
                  </NuxtLink>
                  <q-separator />
                </q-list>
              </q-menu>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label>成員管理</q-item-label>
              <q-menu v-model="showingMenuAdmin">
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>新增</q-item-section>
                  </q-item>
                  <q-item clickable v-close-popup>
                    <q-item-section>修改密碼</q-item-section>
                  </q-item>
                  <q-separator />
                </q-list>
              </q-menu>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label>會員管理</q-item-label>
              <q-menu v-model="showingMenuMember">
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>會員清單</q-item-section>
                  </q-item>
                  <q-separator />
                </q-list>
              </q-menu>
            </q-item-section>
          </q-item>

          <q-item clickable>
            <q-item-section>
              <q-item-label>帳號</q-item-label>
              <q-menu v-model="showingMenuAccount">
                <q-list style="min-width: 100px">
                  <q-item clickable v-close-popup>
                    <q-item-section>登出</q-item-section>
                  </q-item>
                  <q-separator />
                </q-list>
              </q-menu>
            </q-item-section>
          </q-item>


        </q-item-section>
      </q-list>
    </q-drawer>

    <q-page-container>
      <slot />
    </q-page-container>
  </q-layout>
</template>

<script>
import { ref } from 'vue'
import { matMenu, matSchool } from '@quasar/extras/material-icons'

export default {
  name: 'MyLayout',

  setup () {
    const leftDrawerOpen = ref(false)
    const showingMenuHome = ref(false)
    const showingMenuBlog = ref(false)
    const showingMenuAdmin = ref(false)
    const showingMenuMember = ref(false)
    const showingMenuAccount = ref(false)



    function toggleLeftDrawer () {
      leftDrawerOpen.value = !leftDrawerOpen.value
    }

    return {
      leftDrawerOpen,
      toggleLeftDrawer,
      showingMenuHome,
      showingMenuBlog,
      showingMenuAdmin,
      showingMenuMember,
      showingMenuAccount,
    }
  }
}


</script>