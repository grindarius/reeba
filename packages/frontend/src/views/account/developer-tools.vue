<template>
  <div class="developer-tools-page">
    <h1 class="page-header">
      Developer Tools
    </h1>
    <div class="mt-4">
      <div class="flex object-center flex-wrap -mx-6">
        <div class="px-6 w-full sm:w-1/2 xl:w-1/3">
          <div class="box-bg-text-header">
            <div class="mx-5">
              <h4 class="box-text-secondary">
                1000
              </h4>
              <div class="box-total">
                total users
              </div>
            </div>
          </div>
        </div>
        <div class="px-6 mt-6 w-full sm:mt-0 sm:w-1/2 xl:w-1/3">
          <div class="box-bg-text-header">
            <div class="mx-5">
              <h4 class="box-text-secondary">
                230
              </h4>
              <div class="box-total">
                total tickets sold
              </div>
            </div>
          </div>
        </div>
        <div class="px-6 mt-6 w-full sm:w-1/2 xl:mt-0 xl:w-1/3">
          <div class="box-bg-text-header">
            <div class="mx-5">
              <h4 class="box-text-secondary">
                500
              </h4>
              <div class="box-total">
                total events created
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
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
                <td class="py-4 px-6 border-b whitespace-no-wrap border-pale-gray">
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
                <td class="py-4 px-6 border-b whitespace-no-wrap border-pale-gray">
                  <div class="text-sm leading-5 text-pale-gray">
                    Software Engineer
                  </div>
                  <div class="text-sm leading-5 text-gray-500">
                    Web dev
                  </div>
                </td>
                <td class="py-4 px-6 border-b whitespace-no-wrap border-pale-gray">
                  <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">
                    Active
                  </span>
                </td>
                <td class="py-4 px-6 text-sm leading-5 border-b whitespace-no-wrap border-pale-gray text-pale-gray">
                  Owner
                </td>
                <td class="py-4 px-6 text-sm font-medium leading-5 text-right border-b whitespace-no-wrap border-pale-gray">
                  <a href="#" class="text-pale-gray hover:text-gray-hover">
                    Edit
                  </a>
                </td>
              </tr>
              <tr>
                <td class="py-4 px-6 border-b whitespace-no-wrap border-pale-gray">
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
                <td class="py-4 px-6 border-b whitespace-no-wrap border-pale-gray">
                  <div class="text-sm leading-5 text-pale-gray">
                    Software Engineer
                  </div>
                  <div class="text-sm leading-5 text-gray-500">
                    Web dev
                  </div>
                </td>
                <td class="py-4 px-6 border-b whitespace-no-wrap border-pale-gray">
                  <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                </td>
                <td class="py-4 px-6 text-sm leading-5 border-b whitespace-no-wrap border-pale-gray text-pale-gray">
                  Owner
                </td>
                <td class="py-4 px-6 text-sm font-medium leading-5 text-right border-b whitespace-no-wrap border-pale-gray">
                  <a href="#" class="text-pale-gray hover:text-gray-hover">Edit</a>
                </td>
              </tr>
              <tr>
                <td class="py-4 px-6 border-b whitespace-no-wrap border-pale-gray">
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
                <td class="py-4 px-6 border-b whitespace-no-wrap border-pale-gray">
                  <div class="text-sm leading-5 text-pale-gray">
                    Software Engineer
                  </div>
                  <div class="text-sm leading-5 text-gray-500">
                    Web dev
                  </div>
                </td>
                <td class="py-4 px-6 border-b whitespace-no-wrap border-pale-gray">
                  <span
                    class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                </td>
                <td
                  class="py-4 px-6 text-sm leading-5 border-b whitespace-no-wrap border-pale-gray text-pale-gray">
                  Owner
                </td>
                <td
                  class="py-4 px-6 text-sm font-medium leading-5 text-right border-b whitespace-no-wrap border-pale-gray">
                  <a href="#" class="text-pale-gray hover:text-gray-hover">Edit</a>
                </td>
              </tr>
              <tr>
                <td class="py-4 px-6 border-b whitespace-no-wrap border-pale-gray">
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
                <td class="py-4 px-6 border-b whitespace-no-wrap border-pale-gray">
                  <div class="text-sm leading-5 text-pale-gray">
                    Software Engineer
                  </div>
                  <div class="text-sm leading-5 text-gray-500">
                    Web dev
                  </div>
                </td>
                <td class="py-4 px-6 border-b whitespace-no-wrap border-pale-gray">
                  <span class="inline-flex px-2 text-xs font-semibold leading-5 text-green-800 bg-green-100 rounded-full">Active</span>
                </td>
                <td class="py-4 px-6 text-sm leading-5 border-b whitespace-no-wrap border-pale-gray text-pale-gray">
                  Owner
                </td>
                <td class="py-4 px-6 text-sm font-medium leading-5 text-right border-b whitespace-no-wrap border-pale-gray">
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
  @apply py-3 px-6 text-xs font-medium tracking-wider leading-4 text-left uppercase border-b border-pale-gray bg-pale-yellow text-pale-gray;
}

.box-bg-text-header {
  @apply flex items-center py-6 px-5 rounded-md shadow-sm bg-pale-yellow text-pale-gray;
}

.box-text-secondary {
  @apply text-2xl font-semibold text-pale-gray;
}

.box-total {
  @apply uppercase text-pale-gray;
}
</style>
