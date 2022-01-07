<template>
<div class="users-page">
  <div class="users-page-content">
    <section class="profile-descriptions">
      <img src="@/assets/user.png" alt="user-image" class="user-image">
      <h1 class="text-white text-4xl font-bold">grindarius</h1>
      <p class="text-white text-md">I love going all out on people I don't know</p>
      <div class="social-icons">
        <a href="https://www.facebook.com/grindarius" target="_blank" rel="noopener">
          <v-mdi name="mdi-facebook" fill="#D5A755"></v-mdi>
        </a>
        <a href="https://youtu.be/dQw4w9WgXcQ" target="_blank" rel="noopener">
          <v-mdi name="mdi-google" fill="#D5A755"></v-mdi>
        </a>
        <a href="https://www.instagram.com/jawedkarimofficial/" target="_blank" rel="noopener">
          <v-mdi name="mdi-instagram" fill="#D5A755"></v-mdi>
        </a>
      </div>
      <button class="follow-button">Follow</button>
      <div class="user-stats">
        <h1>3 events created</h1>
        <h1>122 events attended</h1>
        <h1>3,344 followers</h1>
      </div>
    </section>
    <section class="profile-events">
      <h1 class="text-white text-2xl">
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
                <p class="event-time">6 - 7 Apr 2021 | 21:00 </p>
                <p class="event-location">Rajamangkala National</p>
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
  @apply truncate mt-1 text-sm font-normal text-white;
}

.event-time {
  @apply truncate mt-1 text-sm font-normal text-white;
}

.event-name {
  @apply truncate mt-0.5 text-lg font-medium text-black;
}

.event-info {
  @apply pl-2 object-cover flex flex-col h-24 rounded-b-lg justify-self-start bg-pale-yellow;
}

.event-image {
  @apply object-cover h-96 w-full;
}

.event-image-box {
  @apply bg-gray-200 rounded-t-lg overflow-hidden group-hover:opacity-75;
}

.event-grid-box {
  @apply mt-6 grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8;
}

.users-page {
  @apply w-full min-h-screen flex flex-row justify-center bg-pale-gray;
}

.users-page-content {
  @apply mt-6 container grid grid-rows-2 gap-6;
}

.user-image {
  @apply w-[300px] h-[300px] rounded-full;
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
  @apply flex flex-col md:flex-row items-center md:justify-evenly w-11/12 mt-6;

  & h1 {
    @apply text-white text-lg;
  }
}

.follow-button {
  @apply px-3 h-10 mt-6 bg-pale-yellow text-pale-gray rounded-lg;
}
</style>
