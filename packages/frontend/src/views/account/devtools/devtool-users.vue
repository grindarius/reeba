<template>
  <div class="devtool-users-page">
    <div class="container">
      <h1 class="text-4xl font-semibold text-white">
        Users
      </h1>
      <div class="flex flex-col mt-8">
        <div class="overflow-x-auto py-2 -my-2 sm:px-6 sm:-mx-6 lg:px-8 lg:-mx-8">
          <div class="inline-block overflow-hidden min-w-full align-middle border-b border-gray-200 shadow sm:rounded-lg">
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
                  <th class="py-3 px-6 border-b border-pale-gray bg-pale-yellow" />
                </tr>
              </thead>
              <tbody class="bg-pale-yellow">
                <tr>
                  <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img class="w-10 h-10 rounded-full" src="@/assets/user.png" alt="">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium leading-5 text-pale-gray">
                          John Doe
                        </div>
                        <div class="text-sm leading-5 text-gray-500">
                          john@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                    <div class="text-sm leading-5 text-pale-gray">
                      Software Engineer
                    </div>
                    <div class="text-sm leading-5 text-gray-500">
                      Web dev
                    </div>
                  </td>
                  <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                    <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                      Active
                    </span>
                  </td>
                  <td class="py-4 px-6 text-sm leading-5 whitespace-nowrap border-b border-pale-gray text-pale-gray">
                    Owner
                  </td>
                  <td class="py-4 px-6 text-sm font-medium leading-5 text-right whitespace-nowrap border-b border-pale-gray">
                    <a href="#" class="text-pale-gray hover:text-gray-hover">
                      Edit
                    </a>
                  </td>
                </tr>
                <tr>
                  <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img
                          class="w-10 h-10 rounded-full"
                          src="@/assets/user.png"
                          alt="">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium leading-5 text-pale-gray">
                          John Doe
                        </div>
                        <div class="text-sm leading-5 text-gray-500">
                          john@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                    <div class="text-sm leading-5 text-pale-gray">
                      Software Engineer
                    </div>
                    <div class="text-sm leading-5 text-gray-500">
                      Web dev
                    </div>
                  </td>
                  <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                    <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                  </td>
                  <td class="py-4 px-6 text-sm leading-5 whitespace-nowrap border-b border-pale-gray text-pale-gray">
                    Owner
                  </td>
                  <td class="py-4 px-6 text-sm font-medium leading-5 text-right whitespace-nowrap border-b border-pale-gray">
                    <a href="#" class="text-pale-gray hover:text-gray-hover">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img
                          class="w-10 h-10 rounded-full"
                          src="@/assets/user.png"
                          alt="">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium leading-5 text-pale-gray">
                          John Doe
                        </div>
                        <div class="text-sm leading-5 text-gray-500">
                          john@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                    <div class="text-sm leading-5 text-pale-gray">
                      Software Engineer
                    </div>
                    <div class="text-sm leading-5 text-gray-500">
                      Web dev
                    </div>
                  </td>
                  <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                    <span
                      class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                  </td>
                  <td
                    class="py-4 px-6 text-sm leading-5 whitespace-nowrap border-b border-pale-gray text-pale-gray">
                    Owner
                  </td>
                  <td
                    class="py-4 px-6 text-sm font-medium leading-5 text-right whitespace-nowrap border-b border-pale-gray">
                    <a href="#" class="text-pale-gray hover:text-gray-hover">Edit</a>
                  </td>
                </tr>
                <tr>
                  <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                    <div class="flex items-center">
                      <div class="flex-shrink-0 w-10 h-10">
                        <img class="w-10 h-10 rounded-full" src="@/assets/user.png" alt="">
                      </div>
                      <div class="ml-4">
                        <div class="text-sm font-medium leading-5 text-pale-gray">
                          John Doe
                        </div>
                        <div class="text-sm leading-5 text-gray-500">
                          john@example.com
                        </div>
                      </div>
                    </div>
                  </td>
                  <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                    <div class="text-sm leading-5 text-pale-gray">
                      Software Engineer
                    </div>
                    <div class="text-sm leading-5 text-gray-500">
                      Web dev
                    </div>
                  </td>
                  <td class="py-4 px-6 whitespace-nowrap border-b border-pale-gray">
                    <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                  </td>
                  <td class="py-4 px-6 text-sm leading-5 whitespace-nowrap border-b border-pale-gray text-pale-gray">
                    Owner
                  </td>
                  <td class="py-4 px-6 text-sm font-medium leading-5 text-right whitespace-nowrap border-b border-pale-gray">
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
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'devtool-users'
})
</script>

<style scoped lang="scss">
.devtool-users-page {
  @apply flex flex-row justify-center w-full min-h-screen bg-pale-gray;
}

.box-bg {
  @apply py-3 px-6 text-xs font-medium tracking-wider leading-4 text-left uppercase border-b border-pale-gray bg-pale-yellow text-pale-gray;
}
</style>
