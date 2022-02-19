<template>
  <div class="users-page">
    <div class="users-page-content">
      <section class="profile-descriptions">
        <img src="@/assets/user.png" alt="user-image" class="user-image">
        <div class="user-info">
          <div class="text-4xl font-bold mt-3 text-white">
            grindarius
            <v-mdi name="mdi-check-decagram" fill="#D5A755" />
          </div>
        </div>
        <div class="text-white text-md mt-3 mb-5">
          I love going all out on people I don't know
        </div>
        <div class="social-icons">
          <a href="https://www.facebook.com/grindarius" target="_blank" rel="noopener">
            <v-mdi name="mdi-facebook" fill="#D5A755" />
          </a>
          <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank" rel="noopener">
            <v-mdi name="mdi-google" fill="#D5A755" />
          </a>
          <a href="https://www.instagram.com/jawedkarimofficial/" target="_blank" rel="noopener">
            <v-mdi name="mdi-instagram" fill="#D5A755" />
          </a>
        </div>
        <button class="follow-button hover:bg-yellow-hover">
          Follow
        </button>
        <div class="user-stats">
          <h1>3 events created</h1>
          <h1>122 events attended</h1>
          <h1>3,344 followers</h1>
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
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'users'
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
  @apply flex flex-row justify-center gap-1 text-center  text-white;
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
  @apply flex flex-col items-center mt-6 w-11/12 md:flex-row md:justify-evenly;

  & h1 {
    @apply text-lg text-white;
  }
}

.follow-button {
  @apply px-3 mt-6 h-10 rounded-lg bg-pale-yellow text-pale-gray;
}
</style>
