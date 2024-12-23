<template>
  <div class="container mx-auto">
    <div class="text-lg breadcrumbs">
      <ul>
        <li>
          <router-link :to="{ name: 'Organizer Statistics Overview' }">
            Overview
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Organizer Statistics Orders' }">
            Orders
          </router-link>
        </li>
        <li>
          <router-link :to="{ name: 'Organizer Statistics Edit Event' }">
            Edit event
          </router-link>
        </li>
      </ul>
    </div>
    <router-view />
  </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
  name: "organizer-tool-navigator"
})
</script>
