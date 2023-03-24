<template>
  <div>
    <div class="w-screen p-3 bg-gray-800 text-white shadow-md shadow-slate-600">
      <nav
        class="m-auto max-w-[1120px] font-semibold text-lg flex items-center gap-6"
      >
        <NuxtLink
          :class="[
            'relative transition ease-out duration-300 py-2 px-4 overflow-hidden after:absolute after:left-0 after:bottom-[2px] after:h-[2px] after:w-full after:transition after:ease-out after:bg-gradient-to-r after:from-indigo-500 after:via-purple-500 after:to-pink-500 after:rounded hover:-translate-y-1 hover:after:-translate-y-[2px] hover:scale-105 hover:after:scale-90',
            this.$route.name === 'index'
              ? 'after:bg-gradient-to-r after:from-indigo-500 after:via-purple-500 after:to-pink-500 hover:-translate-y-1 hover:after:-translate-y-[2px] hover:scale-105 hover:after:scale-90'
              : 'after:-translate-x-[101%] hover:after:translate-x-0 ',
          ]"
          to="/"
        >
          List of house rules
        </NuxtLink>

        <NuxtLink
          :class="[
            'relative transition ease-out duration-300 py-2 px-4 overflow-hidden after:absolute after:left-0 after:bottom-[2px] after:h-[2px] after:w-full after:transition after:ease-out after:bg-gradient-to-r after:from-indigo-500 after:via-purple-500 after:to-pink-500 after:rounded hover:-translate-y-1 hover:after:-translate-y-[2px] hover:scale-105 hover:after:scale-90',
            this.$route.name === 'create'
              ? 'after:bg-gradient-to-r after:from-indigo-500 after:via-purple-500 after:to-pink-500 hover:-translate-y-1 hover:after:-translate-y-[2px] hover:scale-105 hover:after:scale-90'
              : 'after:-translate-x-[101%] hover:after:translate-x-0 ',
          ]"
          to="/create"
        >
          Create new house rule
        </NuxtLink>
      </nav>
    </div>
    <Nuxt />
  </div>
</template>

<script>
export default {
  middleware: "auth",
};
</script>
