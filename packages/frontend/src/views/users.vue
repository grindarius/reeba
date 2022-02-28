<template>
  <div class="users-page">
    <metainfo>
      <template #title="{ content }">
        {{ content }} | ReebA: Ticket booking. Redefined.
      </template>
    </metainfo>
    <div class="users-page-content">
      <section class="profile-descriptions">
        <img :src="`${getUserAvatar.url}/${$route.params.username}`" alt="user-image" class="user-image">
        <div class="user-info">
          <div class="mt-3 text-4xl font-bold text-white">
            {{ userData?.username ?? '' }}
            <v-mdi v-show="userData?.verificationStatus" name="mdi-check-decagram" fill="#D5A755" />
          </div>
        </div>
        <div class="mt-3 mb-5 text-white text-md">
          {{ userData?.profileDescription ?? '' }}
        </div>
        <div class="social-icons">
          <a v-show="userData?.socialMedias.facebook == null ? false : userData.socialMedias.facebook === '' ? false : true" :href="userData?.socialMedias.facebook || '#'" target="_blank" rel="noopener">
            <v-mdi name="mdi-facebook" fill="#D5A755" />
          </a>
          <a v-show="userData?.socialMedias.instagram == null ? false : userData.socialMedias.instagram === '' ? false : true" :href="userData?.socialMedias.instagram || '#'" target="_blank" rel="noopener">
            <v-mdi name="mdi-instagram" fill="#D5A755" />
          </a>
          <a v-show="userData?.socialMedias.twitter == null ? false : userData.socialMedias.twitter === '' ? false : true" :href="userData?.socialMedias.twitter || '#'" target="_blank" rel="noopener">
            <v-mdi name="mdi-twitter" fill="#D5A755" />
          </a>
          <a v-show="userData?.socialMedias.tiktok == null ? false : userData.socialMedias.tiktok === '' ? false : true" :href="userData?.socialMedias.twitter || '#'" target="_blank" rel="noopener">
            <svg
              role="img" viewBox="0 0 24 24"
              fill="#D5A755" height="24"
              width="24"
              xmlns="http://www.w3.org/2000/svg">
              <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
            </svg>
          </a>
          <a v-show="userData?.socialMedias.website == null ? false : userData.socialMedias.website === '' ? false : true" :href="userData?.socialMedias.website || '#'" target="_blank" rel="noopener">
            <v-mdi name="mdi-web" fill="#D5A755" />
          </a>
          <a v-show="userData?.socialMedias.email == null ? false : userData.socialMedias.email === '' ? false : true" :href="userData?.socialMedias.email || '#'" target="_blank" rel="noopener">
            <v-mdi name="mdi-email-plus" fill="#D5A755" />
          </a>
        </div>
        <button
          :disabled="userData?.username == null ? true : userData.username === authStore.userData.username ? true : false"
          class="follow-button hover:bg-yellow-hover disabled:bg-red-disabled disabled:text-white"
          @click="followUser">
          Follow
        </button>
        <div class="user-stats">
          <h1>{{ userData?.eventsCreatedAmount || '0' }} events created</h1>
          <h1>{{ userData?.eventsAttendedAmount || '0' }} events attended</h1>
          <h1>{{ userData?.followersAmount || '0' }} followers</h1>
        </div>
      </section>
      <section class="profile-events">
        <h1 class="text-2xl text-white">
          Events grindarius went to
        </h1>
        <div class="event-grid-box">
          <div class="event">
            <router-link to="/event">
              <div class="event-image-box">
                <img class="event-image" src="@/assets/TK-2-BTS.png" alt="event-image">
              </div>
              <div class="event-info">
                <div>
                  <h3 class="event-name">
                    BTS World Tour 'Love Yourself' Bangkok
                  </h3>
                  <p class="event-time">
                    6 - 7 Apr 2021 | 21:00
                  </p>
                  <p class="event-location">
                    Rajamangkala National
                  </p>
                </div>
              </div>
            </router-link>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import ky from 'ky'
import { defineComponent, onMounted, Ref, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { GetUserReply } from '@reeba/common'

import { getUser, getUserAvatar } from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'

export default defineComponent({
  name: 'users',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    const toast = useToast()

    useMeta({
      title: route.params.username
    })

    const userData: Ref<GetUserReply | undefined> = ref(undefined)

    onMounted(async () => {
      try {
        const response = await ky(`${getUser.url}/${route.params.username}`, {
          method: getUser.method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          }
        }).json<GetUserReply>()

        userData.value = response
      } catch (error) {
        // @ts-expect-error error unknown
        const code = error?.response.statusCode

        if (code == null) {
          toast.error('Unexpected error')
          router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
          return
        }

        if (code === 401) {
          toast.error('Token expired')
          router.push('/signin')
        }

        router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
      }
    })

    const followUser = (): void => {
      if (route.params.username !== authStore.userData.username) {
        console.log('following this guy')
      }
    }

    return {
      userData,
      getUserAvatar,
      authStore,
      followUser
    }
  }
})
</script>

<style scoped lang="scss">
.event-location {
  @apply mt-1 text-sm font-normal text-white truncate;
}

.event-time {
  @apply mt-1 text-sm font-normal text-white truncate;
}

.event-name {
  @apply mt-0.5 text-lg font-medium text-black truncate;
}

.event-info {
  @apply flex object-cover flex-col justify-self-start pl-2 h-24 rounded-b-lg bg-pale-yellow;
}

.event-image {
  @apply object-cover w-full h-96;
}

.event-image-box {
  @apply overflow-hidden bg-gray-200 rounded-t-lg group-hover:opacity-75;
}

.event-grid-box {
  @apply grid grid-cols-1 gap-x-6 gap-y-10 mt-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8;
}

.users-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.user-info {
  @apply flex flex-row gap-1 justify-center text-center text-white;
}

.users-page-content {
  @apply container grid grid-rows-2 gap-6 mt-6;
}

.user-image {
  width: 300px;
  height: 300px;
  @apply rounded-full;
}

.profile-descriptions {
  @apply flex flex-col justify-start items-center;

  & h1, p {
    @apply mb-6;
  }
}

.social-icons {

  & svg {
    @apply mx-2;
  }
}

.user-stats {
  @apply flex flex-col items-center mt-6 w-11/12 md:flex-row md:justify-center gap-x-14;

  & h1 {
    @apply text-lg text-white;
  }
}

.follow-button {
  @apply px-3 mt-6 h-10 rounded-lg bg-pale-yellow text-pale-gray;
}
</style>
