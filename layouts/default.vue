<template>
  <div>
    <div class="w-screen p-3 bg-gray-700 text-white shadow-md">
      <nav
        class="m-auto max-w-[1120px] font-semibold text-lg flex items-center justify-center gap-4"
      >
        <NuxtLink
          class="relative py-2 px-4 after:absolute after:left-0 after:bottom-[-2px] after:h-1 firs after:w-full after:translate-x-[-90px] first:hover:after:translate-x-[0px] after:transition after:bg-gray-300 after:rounded overflow-hidden"
          to="/create"
        >
          Create
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
