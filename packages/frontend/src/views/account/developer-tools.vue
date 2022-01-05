<template>
<div class="developer-tools-page">
  <h1 class="page-header">Developer Tools</h1>
  <div class="mt-4">
    <div class="flex flex-wrap -mx-6 object-center">
      <div class="w-full px-6 sm:w-1/2 xl:w-1/3">
        <div class="box-bg-text-header">
          <div class="mx-5">
            <h4 class="box-text-secondary">8,282</h4>
            <div class="text-pale-gray">New Users</div>
          </div>
        </div>
      </div>
      <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 sm:mt-0">
        <div class="box-bg-text-header">
          <div class="mx-5">
            <h4 class="box-text-secondary">200,521</h4>
          <div class="text-pale-gray">Total Orders</div>
          </div>
        </div>
      </div>
      <div class="w-full mt-6 px-6 sm:w-1/2 xl:w-1/3 xl:mt-0">
        <div class="box-bg-text-header">
          <div class="mx-5">
            <h4 class="box-text-secondary">215,542</h4>
            <div class="text-pale-gray">Available Products</div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="flex flex-col mt-8">
    <div class="-my-2 py-2 overflow-x-auto sm:-mx-6 sm:px-6 lg:-mx-8 lg:px-8">
      <div class="align-middle inline-block min-w-full shadow overflow-hidden sm:rounded-lg border-b border-gray-200">
        <table class="min-w-full">
          <thead>
            <tr>
              <th class="box-bg">
                Name
              </th>
              <th class="box-bg">
                Title
              </th>
              <th class="box-bg">
                Status
              </th>
              <th class="box-bg">
                Role
              </th>
              <th class="px-6 py-3 border-b border-pale-gray bg-pale-yellow"></th>
            </tr>
          </thead>
          <tbody class="bg-pale-yellow">
            <tr>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src="@/assets/user.png" alt="">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm leading-5 font-medium text-pale-gray">
                      John Doe
                    </div>
                    <div class="text-sm leading-5 text-gray-500">john@example.com</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray">
                <div class="text-sm leading-5 text-pale-gray">Software Engineer</div>
                <div class="text-sm leading-5 text-gray-500">Web dev</div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                  Active
                </span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray text-sm leading-5 text-pale-gray">
                Owner
              </td>
              <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-pale-gray text-sm leading-5 font-medium">
                <a href="#" class="text-pale-gray hover:text-gray-hover">
                  Edit
                </a>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full"
                      src="@/assets/user.png"
                      alt="">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm leading-5 font-medium text-pale-gray">John Doe
                    </div>
                    <div class="text-sm leading-5 text-gray-500">john@example.com</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray">
                <div class="text-sm leading-5 text-pale-gray">Software Engineer</div>
                <div class="text-sm leading-5 text-gray-500">Web dev</div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray text-sm leading-5 text-pale-gray">
                Owner
              </td>
              <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-pale-gray text-sm leading-5 font-medium">
                <a href="#" class="text-pale-gray hover:text-gray-hover">Edit</a>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full"
                      src="@/assets/user.png"
                      alt="">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm leading-5 font-medium text-pale-gray">John Doe
                    </div>
                    <div class="text-sm leading-5 text-gray-500">john@example.com</div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray">
                <div class="text-sm leading-5 text-pale-gray">Software Engineer</div>
                <div class="text-sm leading-5 text-gray-500">Web dev</div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray">
                <span
                  class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
              </td>
              <td
                class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray text-sm leading-5 text-pale-gray">
                Owner</td>
              <td
                class="px-6 py-4 whitespace-no-wrap text-right border-b border-pale-gray text-sm leading-5 font-medium">
                <a href="#" class="text-pale-gray hover:text-gray-hover">Edit</a>
              </td>
            </tr>
            <tr>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray">
                <div class="flex items-center">
                  <div class="flex-shrink-0 h-10 w-10">
                    <img class="h-10 w-10 rounded-full" src="@/assets/user.png" alt="">
                  </div>
                  <div class="ml-4">
                    <div class="text-sm leading-5 font-medium text-pale-gray">
                      John Doe
                    </div>
                    <div class="text-sm leading-5 text-gray-500">
                      john@example.com
                    </div>
                  </div>
                </div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray">
                <div class="text-sm leading-5 text-pale-gray">Software Engineer</div>
                <div class="text-sm leading-5 text-gray-500">Web dev</div>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray">
                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
              </td>
              <td class="px-6 py-4 whitespace-no-wrap border-b border-pale-gray text-sm leading-5 text-pale-gray">
                Owner
              </td>
              <td class="px-6 py-4 whitespace-no-wrap text-right border-b border-pale-gray text-sm leading-5 font-medium">
                <a href="#" class="text-pale-gray hover:text-gray-hover">
                  Edit
                </a>
              </td>
            </tr>
          </tbody>
        </table>
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

.box-bg {
  @apply px-6 py-3 border-b border-pale-gray bg-pale-yellow text-left text-xs leading-4 font-medium text-pale-gray uppercase tracking-wider;
}

.box-bg-text-header {
  @apply flex items-center px-5 py-6 shadow-sm rounded-md bg-pale-yellow text-pale-gray;
}

.box-text-secondary {
  @apply text-2xl font-semibold text-pale-gray;
}
</style>
