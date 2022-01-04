<template>
<div class="developer-tools-page">
  <h1 class="page-header">Developer Tools</h1>
<div class="w-full p-1 rounded-md ">
  <div class="p-4">
    <div class="bg-white p-4 rounded-md ">
        <div class="flex justify-between  bg-pale-yellow rounded-md py-2 px-4 text-pale-gray font-bold text-md">
        <div>
          <span>Name</span>
        </div>
        <div>
          <span>Email</span>
        </div>
        <div>
          <span>Role</span>
        </div>
        <div>
          <span>Time</span>
        </div>
        <div>
          <span>Edit</span>
        </div>
      </div>
      <div class="box-text">
        <div class="px-2 flex">
          <span>Bhattarapong</span>
        </div>
        <div>
          <span>Bhattarapongs@nu.ac.th</span>
        </div>
        <div class="px-2">
          <span>Admin</span>
        </div>
        <div class="px-2">
          <span>28/12/2021</span>
        </div>
        <div class="px-2">
          <select>
            <option>Admin</option>
            <option>User</option>
          </select>
        </div>
        </div>
        <div class="box-text">
          <div class="px-2">
            <span>John Deo</span>
          </div>
          <div>
            <span>johndeo@gmail.com</span>
          </div>
          <div class="px-2">
            <span>Admin</span>
          </div>
          <div class="px-2">
            <span>28/12/2021</span>
          </div>
          <div class="px-2">
            <select>
              <option>Admin</option>
              <option>User</option>
            </select>
          </div>
        </div>
        <div class="box-text">
          <div class="px-2">
            <span>John Deo</span>
          </div>
          <div>
            <span>johndeo@gmail.com</span>
          </div>
          <div class="px-2">
            <span>Admin</span>
          </div>
          <div class="px-2">
            <span>28/12/2021</span>
          </div>
          <div class="px-2">
            <select>
              <option>Admin</option>
              <option>User</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'developer-tools'
})
</script>

<style scoped lang="scss">
.page-header {
  @apply text-4xl font-semibold text-white;
}

.box-text {
  @apply flex justify-between border-t text-sm font-normal text-pale-gray mt-4 space-x-4;
}

</style>
