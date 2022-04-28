<template>
  <nav class="navbar bg-primary">
    <div class="navbar-start">
      <router-link to="/">
        <img src="@/assets/reeba-logo-2.png" alt="Reeba logo" width="35" class="cursor-pointer">
      </router-link>
    </div>
    <div class="navbar-center">
      <div class="form-control">
        <div class="input-group">
          <input type="text" placeholder="Search" class="lg:w-96 input input-bordered" v-model="searchText" @keyup.enter="$router.push({ name: 'Search', query: { ...$route.query, ...{ q: searchText } } })">
          <button class="btn btn-square bg-warning" @click="$router.push({ name: 'Search', query: { ...$route.query, ...{ q: searchText } } })">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
    <div class="navbar-end">
      <router-link to="/create" custom v-slot="{ navigate }">
        <button class="hidden mr-6 lg:block btn btn-secondary" @click="navigate">
          Create Event
        </button>
      </router-link>
      <router-link to="/signin" custom v-slot="{ navigate }">
        <button v-show="!isAuthenticated" @click="navigate" class="btn btn-secondary">
          Sign in
        </button>
      </router-link>
      <div v-show="isAuthenticated" class="dropdown dropdown-end">
        <label tabindex="0" class="btn btn-ghost btn-circle avatar">
          <div class="w-10 rounded-full">
            <img :src="getUserAvatarEndpoint({ username: userData.username }).url">
          </div>
        </label>
        <ul tabindex="0" class="p-2 mt-3 w-52 font-bold shadow menu menu-compact dropdown-content bg-primary text-base-100 rounded-box">
          <li class="block lg:hidden">
            <router-link to="/create">
              Create event
            </router-link>
          </li>
          <li>
            <router-link :to="`/${userData.username}`">
              Profile
            </router-link>
          </li>
          <li>
            <router-link to="/account">
              Settings
            </router-link>
          </li>
          <li>
            <button @click="signout" class="font-bold">
              Sign out
            </button>
          </li>
        </ul>
      </div>
    </div>
  </nav>
  <router-view :key="$route.fullPath" />
  <footer class="p-10 bg-white footer text-neutral-content">
    <div>
      <span class="footer-title">Follow us</span>
      <div class="grid grid-flow-col gap-4">
        <a class="block p-0 rounded-full bg-pale-yellow">
          <a rel="noopener noreferrer" href="https://facebook.com/grindarius" target="_blank" title="Facebook" class="flex items-center p-1">
            <v-mdi name="mdi-facebook" size="40" fill="#FFFFFF" />
          </a>
        </a>
        <a class="block p-0 rounded-full bg-pale-yellow">
          <a rel="noopener noreferrer" href="https://https://twitter.com/elonmusk" target="_blank" title="Twitter" class="flex items-center p-1">
            <v-mdi name="mdi-twitter" size="40" fill="#FFFFFF" />
          </a>
        </a>
        <a class="block p-0 rounded-full bg-pale-yellow">
          <a rel="noopener noreferrer" href="https://instagram.com/padpongz_" target="_blank" title="Instagram" class="flex items-center p-1">
            <v-mdi name="mdi-instagram" size="40" fill="#FFFFFF" />
          </a>
        </a>
      </div>
    </div>
    <div>
      <span class="footer-title">Contribution</span>
      <a class="link link-hover" href="https://github.com/grindarius/reeba/blob/main/LICENSE" rel="noopener norrferrer" target="_blank">License</a>
      <a class="link link-hover" href="https://github.com/grindarius/reeba/blob/main/docs/CONTRIBUTING.md" rel="noopener noreferrer" target="_blank">How to contribute</a>
    </div>
  </footer>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent, ref } from 'vue'
import { useRouter } from 'vue-router'

import { getUserAvatarEndpoint } from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'

export default defineComponent({
  name: 'app',
  setup () {
    const authStore = useAuthStore()
    const searchText = ref('')
    const { isAuthenticated, userData } = storeToRefs(authStore)

    const router = useRouter()

    const signout = (): void => {
      authStore.signout()
      router.push('/')
    }

    return {
      getUserAvatarEndpoint,
      signout,
      searchText,
      isAuthenticated,
      userData
    }
  }
})
</script>
