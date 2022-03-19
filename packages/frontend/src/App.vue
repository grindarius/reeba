<template>
  <nav class="navbar bg-primary">
    <div class="navbar-start">
      <router-link to="/">
        <img src="@/assets/reeba-logo-2.png" alt="Reeba logo" width="35" class="cursor-pointer">
      </router-link>
    </div>
    <div class="navbar-center">
      <div class="form-control">
        <input type="text" placeholder="Search" class="lg:w-96 input input-bordered">
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
            <img :src="getUserAvatar({ username: userData.username }).url">
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
          <a rel="noopener noreferrer" href="#" title="Twitter" class="flex items-center p-1">
            <v-mdi name="mdi-twitter" size="40" fill="#FFFFFF" />
          </a>
        </a>
        <a class="block p-0 rounded-full bg-pale-yellow">
          <a rel="noopener noreferrer" href="#" title="Instagram" class="flex items-center p-1">
            <v-mdi name="mdi-Instagram" size="40" fill="#FFFFFF" />
          </a>
        </a>
      </div>
    </div>
    <div>
      <span class="footer-title">Need help?</span>
      <a class="link link-hover">How to buy tickets?</a>
      <a class="link link-hover">Where are my tickets?</a>
      <a class="link link-hover">How to use e-ticket?</a>
      <a class="link link-hover">Help Center</a>
    </div>
    <div>
      <span class="footer-title">Customer Support</span>
      <a class="link link-hover">Contact</a>
      <a class="link link-hover">Jobs</a>
      <a class="link link-hover">Press kit</a>
    </div>
    <div>
      <span class="footer-title">Contribution</span>
      <a class="link link-hover">License</a>
      <a class="link link-hover">How to contribute</a>
    </div>
  </footer>
</template>

<script lang="ts">
import { storeToRefs } from 'pinia'
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'

import { getUserAvatar } from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'

export default defineComponent({
  name: 'app',
  setup () {
    const authStore = useAuthStore()
    const { isAuthenticated, userData } = storeToRefs(authStore)

    const router = useRouter()

    const signout = (): void => {
      authStore.signout()
      router.push('/')
    }

    return {
      getUserAvatar,
      signout,
      isAuthenticated,
      userData
    }
  }
})
</script>
