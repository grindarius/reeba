<template>
<div class="login-page">
<div class="w-full h-screen flex items-center justify-center">
<form class="w-full md:w-1/3 rounded-lg  ">
<div class="bg-neutral-700 shadow-xl rounded px-8 pt-6 pb-8 mb-4 flex flex-col">
	<div class="flex font-bold justify-center scroll-mt-50">
		<img class="h-64 w-64 mb-3" src="@/assets/reeba-logo.png" alt="logo-reeba">
	</div>
	<div class="mb-4">
      <label class="block text-white text-sm font-sans mb-2" for="username">
        Username
      </label>
      <input class=" shadow-lg shadow-slate-900 appearance-none border rounded-full w-full py-2 px-3 text-grey-darker" id="username" type="text" placeholder="Username">
    </div>
	 <div class="mb-6">
      <label class="block text-white text-sm font-sans mb-2" for="password">
        Password
      </label>
      <input class="shadow-lg shadow-slate-900  appearance-none border border-red rounded-full w-full py-2 px-3 text-grey-darker mb-3" id="password" type="password" placeholder="password">
    </div>
		<div class="flex items-center justify-between">
      <button class="bg-pale-yellow text-gray font-sans py-2 px-8 rounded-full" type="button">
        Sign In
      </button>
      <a class="inline-block align-baseline font-bold text-sm text-blue hover:text-blue-darker" href="#">
        Forgot Password?
      </a>
    </div>
</div>
</form>
</div>
</div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'login'
})
</script>

<style lang="scss">
.login-page {
  @apply w-full h-screen bg-pale-gray;
}
</style>
