<template>
  <div>
    <div class="w-screen p-3 bg-gray-800 text-white shadow-md shadow-slate-600">
      <nav
        class="m-auto max-w-[1120px] font-semibold text-lg flex items-center justify-between gap-4"
      >
        <NuxtLink
          class="relative py-2 px-4 overflow-hidden after:absolute after:left-0 after:bottom-[-2px] after:h-1 after:w-full after:transition after:bg-gray-300 after:rounded"
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
