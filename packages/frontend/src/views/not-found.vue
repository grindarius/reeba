<template>
  <div class="error-page">
    <!-- <section class="w-full h-screen">
      <img src="@/assets/error404.png" class="object-cover w-full h-full"> -->
    <div class="background">
      <section class="contrainer">
        <img src="@/assets/error-c.png" class="object-cover w-full h-full">
        <div class="botton whitespace-nowrap">
          <button
            type="submit"
            class=" flex-row justify-center py-2 px-6 mx-6 w-40 tracking-wide rounded-lg outline-none bg-pale-yellow hover:bg-yellow-hover focus:ring-pale-gray disabled:bg-red-disabled">
            go home
          </button>
          <button
            type="submit"
            class=" flex-row justify-center py-2 px-6 mx-6 w-40 tracking-wide rounded-lg outline-none bg-pale-yellow hover:bg-yellow-hover focus:ring-pale-gray disabled:bg-red-disabled">
            conect again
          </button>
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

.botton {
  @apply flex items-center justify-center;
}
</style>
