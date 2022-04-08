<template>
  <metainfo>
    <template #title="{ content }">
      {{ content }} | ReebA: Ticket booking. Redefined.
    </template>
  </metainfo>
  <div class="users-page">
    <div class="users-page-content">
      <section class="profile-descriptions">
        <img :src="`${getUserAvatar({ username: $route.params.username as string }).url}`" alt="user-image" class="user-image">
        <div class="user-info">
          <div class="mt-3 text-4xl font-bold text-white" :title="($route.params.username as string)">
            {{ $route.params.username }}
            <v-mdi v-if="isVerified" name="mdi-check-decagram" fill="#D5A755" title="Verified" />
            <v-mdi v-if="isAdmin" name="mdi-crown" title="Admin" size="30" fill="#D5A755" />
          </div>
        </div>
        <template v-if="authStore.isAuthenticated && authStore.userData.username === $route.params.username">
          <a v-if="!isEditing" class="link" @click="isEditing = true">
            Edit
          </a>
          <div class="flex flex-row gap-x-4">
            <a v-if="isEditing" class="link" @click="patchUserProfileDescription">
              Save
            </a>
            <a v-if="isEditing" class="link" @click="isEditing = false">
              Cancel
            </a>
          </div>
        </template>
        <div v-if="isEditing" class="form-control">
          <label class="label">Profile description</label>
          <textarea class="text-black bg-white textarea w-[350px] textarea-bordered" rows="5" v-model="descriptionText" />
        </div>
        <div v-if="isEditing" class="form-control">
          <label class="label">Facebook</label>
          <input type="text" class="text-black bg-white input input-bordered w-[350px]" v-model="facebookLink">
        </div>
        <div v-if="isEditing" class="form-control">
          <label class="label">Instagram</label>
          <input type="text" class="text-black bg-white input input-bordered w-[350px]" v-model="instagramLink">
        </div>
        <div v-if="isEditing" class="form-control">
          <label class="label">Twitter</label>
          <input type="text" class="text-black bg-white input input-bordered w-[350px]" v-model="twitterLink">
        </div>
        <div v-if="isEditing" class="form-control">
          <label class="label">Tiktok</label>
          <input type="text" class="text-black bg-white input input-bordered w-[350px]" v-model="tiktokLink">
        </div>
        <div v-if="isEditing" class="form-control">
          <label class="label">Email</label>
          <input type="text" class="text-black bg-white input input-bordered w-[350px]" v-model="emailLink">
        </div>
        <div v-if="isEditing" class="form-control">
          <label class="label">Website</label>
          <input type="text" class="text-black bg-white input input-bordered w-[350px]" v-model="websiteLink">
        </div>

        <div v-if="!isEditing" class="mt-3 mb-5 text-white whitespace-pre-line text-md">
          {{ userData?.profileDescription ?? '' }}
        </div>
        <div v-if="!isEditing" class="social-icons">
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
          <a v-show="userData?.socialMedias.email == null ? false : userData.socialMedias.email === '' ? false : true" :href="userData?.socialMedias.email == null ? '#' : `mailto:${userData?.socialMedias.email}`" target="_blank" rel="noopener">
            <v-mdi name="mdi-email-plus" fill="#D5A755" />
          </a>
        </div>
        <button
          :disabled="userData?.username == null || userData?.username === authStore.userData.username"
          class="my-4 disabled:text-white btn btn-primary hover:bg-yellow-hover disabled:bg-red-disabled"
          @click="followUser">
          {{ isFollowing ? 'Following' : 'Follow' }}
        </button>
        <div class="user-stats">
          <h1>{{ relatedEvents?.created.length ?? '0' }} events created</h1>
          <h1>{{ relatedEvents?.attended.length ?? '0' }} events attended</h1>
          <h1>{{ userData?.followersAmount || '0' }} followers</h1>
        </div>
      </section>
      <section>
        <div class="event-section">
          <h1 class="text-main-event-name">
            Events {{ $route.params.username ?? '' }} went to
          </h1>
          <div v-if="relatedEvents.attended.length === 0" class="mt-6 w-full text-center">
            <span class="text-4xl text-white">{{ $route.params.username }} hasn't gone to any events.</span>
          </div>
          <div v-else class="event-grid-box">
            <div class="event" v-for="({ username: attendedUsername, id: eventId, name: eventName, venueName }, i) in (relatedEvents?.attended ?? [])" :key="`user-page-attended-event-${i}`">
              <router-link :to="{ name: 'Event', params: { username: attendedUsername, eventId }}">
                <div class="event-image-box">
                  <img class="event-image" :src="`${getEventImage({ eventId }).url}`" :alt="eventName">
                </div>
                <div class="event-info">
                  <div>
                    <h3 class="event-name">
                      {{ eventName }}
                    </h3>
                    <p class="event-location">
                      {{ venueName }}
                    </p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
        <div class="event-section">
          <h1 class="text-main-event-name">
            Events {{ $route.params.username ?? '' }} created
          </h1>
          <div v-if="relatedEvents.created.length === 0" class="mt-6 w-full text-center">
            <span class="text-4xl text-white">{{ $route.params.username }} hasn't created any events.</span>
          </div>
          <div v-else class="event-grid-box">
            <div class="event" v-for="({ username: createdUsername, id: eventId, name: eventName, venueName }, i) in (relatedEvents?.created ?? [])" :key="`user-page-created-event-${i}`">
              <router-link :to="{ name: 'Event', params: { username: createdUsername, eventId }}" :key="$route.path">
                <div class="event-image-box">
                  <img class="event-image" :src="`${getEventImage({ eventId }).url}`" :alt="eventName">
                </div>
                <div class="event-info">
                  <div>
                    <h3 class="event-name">
                      {{ eventName }}
                    </h3>
                    <p class="event-location">
                      {{ venueName }}
                    </p>
                  </div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script lang="ts">
import ky from 'ky'
import { computed, defineComponent, onMounted, Ref, ref } from 'vue'
import { useMeta } from 'vue-meta'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'vue-toastification'

import { GetUserRelatedEventsReply, GetUserReply, PostFollowReply } from '@reeba/common'

import {
  getEventImage,
  getUser,
  getUserAvatar,
  getUserRelatedEvents,
  patchUserProfileDescription as patchUserProfileDescriptionEndpoint,
  postFollow
} from '@/api/endpoints'
import { useAuthStore } from '@/store/use-auth-store'

export default defineComponent({
  name: 'users',
  setup () {
    const route = useRoute()
    const router = useRouter()
    const authStore = useAuthStore()
    const toast = useToast()

    const isEditing = ref(false)

    const descriptionText = ref('')
    const facebookLink = ref('')
    const instagramLink = ref('')
    const twitterLink = ref('')
    const tiktokLink = ref('')
    const emailLink = ref('')
    const websiteLink = ref('')

    const userData: Ref<GetUserReply | undefined> = ref(undefined)
    const relatedEvents: Ref<GetUserRelatedEventsReply> = ref({
      created: [],
      attended: []
    })
    const isFollowing = ref(false)
    const isVerified = computed(() => {
      return userData.value?.verificationStatus ?? false
    })
    const isAdmin = computed(() => {
      return userData.value?.isAdmin ?? false
    })

    useMeta({
      title: route.params.username
    })

    onMounted(async (): Promise<void> => {
      try {
        const { method: getUserMethod, url: getUserUrl } = getUser({ username: route.params.username as string })

        const userDataResponse = await ky(getUserUrl, {
          method: getUserMethod,
          searchParams: [
            ['u', authStore.userData.username ?? '']
          ]
        }).json<GetUserReply>()

        const { method: getUserRelatedEventsMethod, url: getUserRelatedEventsUrl } = getUserRelatedEvents({ username: route.params.username as string })

        const userRelatedEvents = await ky(getUserRelatedEventsUrl, {
          method: getUserRelatedEventsMethod,
          searchParams: [
            ['u', authStore.userData.username ?? '']
          ]
        }).json<GetUserRelatedEventsReply>()

        userData.value = userDataResponse
        descriptionText.value = userDataResponse.profileDescription
        facebookLink.value = userDataResponse.socialMedias.facebook
        instagramLink.value = userDataResponse.socialMedias.instagram
        twitterLink.value = userDataResponse.socialMedias.twitter
        tiktokLink.value = userDataResponse.socialMedias.tiktok
        emailLink.value = userDataResponse.socialMedias.email
        websiteLink.value = userDataResponse.socialMedias.website

        isFollowing.value = userDataResponse.isCurrentUserFollowing
        relatedEvents.value.created = userRelatedEvents.created
        relatedEvents.value.attended = userRelatedEvents.attended
      } catch (error) {
        // @ts-expect-error error unknown
        const code = error?.response?.status

        if (code == null) {
          toast.error('Unexpected error')
          router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
          return
        }

        router.push({ name: 'Not Found', params: { pathMatch: route.path.substring(1).split('/') }, query: route.query, hash: route.hash })
      }
    })

    const followUser = async (): Promise<void> => {
      if (!authStore.isAuthenticated) {
        toast.error('Unauthenticated')
        router.push({ name: 'Signin' })
        return
      }

      const { method, url } = postFollow

      try {
        const response = await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          json: {
            anotherUsername: route.params.username as string ?? ''
          }
        }).json<PostFollowReply>()

        isFollowing.value = response.isFollowingCurrentUser
      } catch (error) {
        // @ts-expect-error error is unknown
        const response = error?.response

        if (response?.status === 401) {
          toast.error('Unauthenticated')
          router.push({ name: 'Signin' })
        }

        toast.error('Unexpected error')
      }
    }

    const patchUserProfileDescription = async (): Promise<void> => {
      try {
        const { method, url } = patchUserProfileDescriptionEndpoint({ username: authStore.userData.username })

        await ky(url, {
          method,
          headers: {
            Authorization: `Bearer ${authStore.userData.token}`
          },
          json: {
            description: descriptionText.value,
            facebook: facebookLink.value,
            instagram: instagramLink.value,
            twitter: twitterLink.value,
            tiktok: tiktokLink.value,
            website: websiteLink.value,
            email: emailLink.value
          }
        })

        if (userData.value != null) {
          userData.value.profileDescription = descriptionText.value
          userData.value.socialMedias.facebook = facebookLink.value
          userData.value.socialMedias.instagram = instagramLink.value
          userData.value.socialMedias.twitter = twitterLink.value
          userData.value.socialMedias.tiktok = tiktokLink.value
          userData.value.socialMedias.website = websiteLink.value
          userData.value.socialMedias.email = emailLink.value
        }

        isEditing.value = false
      } catch (error) {
        // @ts-expect-error error is unknown
        const response = error?.response

        if (response?.status === 401) {
          toast.error('Unauthenticated')
          router.push({ name: 'Signin' })
        }

        toast.error('Unexpected error')
      }
    }

    return {
      isEditing,
      userData,
      getUserAvatar,
      authStore,
      followUser,
      relatedEvents,
      getEventImage,
      isFollowing,
      isAdmin,
      isVerified,
      descriptionText,
      facebookLink,
      instagramLink,
      twitterLink,
      tiktokLink,
      emailLink,
      patchUserProfileDescription,
      websiteLink
    }
  }
})
</script>

<style scoped lang="scss">
.event-location {
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

.users-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.user-info {
  @apply flex flex-row gap-1 justify-center text-center text-white;
}

.users-page-content {
  @apply container grid gap-6 mt-6;
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
  @apply flex mb-6;

  & svg {
    @apply mx-2;
  }
}

.user-stats {
  @apply flex flex-col gap-x-14 items-center w-11/12 md:flex-row md:justify-center;

  & h1 {
    @apply text-lg text-white;
  }
}

.text-main-event-name {
  @apply font-sans text-4xl font-bold text-white;
}

.event-section {
  @apply py-10 px-10 mx-auto max-w-3xl sm:py-12 sm:px-6 lg:px-8 lg:max-w-7xl;
}

.event-grid-box {
  @apply grid grid-cols-1 gap-x-6 gap-y-10 mt-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8;
}

.event {
  @apply rounded-lg shadow-xl transition duration-200 ease-in-out delay-100 cursor-pointer hover:scale-105 hover:-translate-y-1;
}

.bio {
  @apply bg-gray-200 input input-bordered input-md;
}

.confirm {
  @apply inline-flex pl-80 font-sans cursor-pointer hover:text-pale-yellow;
}

.confirmtwo {
  @apply inline-flex flex-row px-14 font-sans cursor-pointer hover:text-pale-yellow;
}
</style>
