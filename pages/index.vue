<template>
  <main class="h-[calc(100vh-80px)] w-screen grid place-content-center gap-8">
    <h1 class="text-white font-bold text-4xl">Home page authenticated</h1>

    <ul>
      <li v-for="rule of houseRules" class="text-white">
        {{ rule.name }}
        <span class="ml-2 text-bold">
          {{ rule.active ? "active" : "inactive" }}
        </span>
      </li>
    </ul>

    <div class="flex gap-2 items-center justify-center">
      <button
        class="text-white"
        @click="paginationInfos.actualPage = n"
        v-for="n in paginationInfos.totalPages"
      >
        Page {{ n }}
      </button>
    </div>
  </main>
</template>

<script>
export default {
  async mounted() {
    this.getHouseRules();
  },
  data() {
    return {
      houseRules: [],
      paginationInfos: {
        actualPage: 1,
        itemsPerPage: 3,
        totalPages: null, // comes from back end
        totalItems: null, // comes from back end
      },
    };
  },
  methods: {
    async getHouseRules() {
      try {
        const { data } = await this.$axios.get(
          `/house_rules?per_page=${this.paginationInfos.itemsPerPage}&page=${this.paginationInfos.actualPage}`
        );

        this.houseRules = data.data.entities;
        this.paginationInfos.totalItems = data.data.pagination.total;
        this.paginationInfos.totalPages = data.data.pagination.total_pages;
      } catch (e) {
        console.log(e);
      }
    },
  },
  watch: {
    paginationInfos: {
      deep: true,
      handler(newInfos, oldInfos) {
        this.getHouseRules();
      },
    },
  },
};
</script>
