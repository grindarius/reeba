<template>
  <div class="error-page">
    <!-- <section class="w-full h-screen">
      <img src="@/assets/error404.png" class="object-cover w-full h-full"> -->
    <div class="background">
      <section class="container">
        <img src="@/assets/not-found.png" class="object-cover w-full h-full">
        <div class="whitespace-nowrap button">
          <router-link to="/" class="not-found">
            <button
              type="submit"
              class="flex-row justify-center py-2 px-6 mx-6 w-60 tracking-wide rounded-lg outline-none bg-pale-yellow hover:bg-yellow-hover focus:ring-pale-gray disabled:bg-red-disabled">
              Go Home
            </button>
          </router-link>
          <!-- <button
            type="submit"
            class="flex-row justify-center py-2 px-6 mx-6 w-40 tracking-wide rounded-lg outline-none bg-pale-yellow hover:bg-yellow-hover focus:ring-pale-gray disabled:bg-red-disabled">
            conect again
          </button> -->
        </div>
      </section>
    </div>
    <!-- </section> -->
  </div>
</template>

<style scoped lang="scss">
.error-page {
  @apply flex flex-row justify-center pb-48 w-full min-h-screen bg-pale-gray;
}

.background {
  @apply container px-6 mt-12 lg:px-0;
}

.button {
  @apply flex justify-center items-center;
}
</style>
