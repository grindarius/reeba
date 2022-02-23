<template>
  <div class="error-page">
    <div class="background">
      <img src="@/assets/not-found.png" class="w-full">
      <div class="whitespace-nowrap button">
        <router-link to="/" class="not-found">
          <button class="py-2 px-6 mx-6 w-60 tracking-wide rounded-lg outline-none bg-pale-yellow hover:bg-yellow-hover focus:ring-pale-gray">
            Go home
          </button>
        </router-link>
      </div>
    </div>
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
