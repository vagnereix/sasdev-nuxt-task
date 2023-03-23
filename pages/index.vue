<template>
  <main
    class="h-[calc(100vh-80px)] w-screen flex items-center justify-center gap-8"
  >
    <div class="max-w-[1120px] w-full">
      <h1 class="text-white font-bold text-4xl text-center">
        List of all house rules
      </h1>

      <table
        class="my-6 text-gray-400 w-full max-w-[1120px] rounded-md overflow-hidden"
      >
        <tr class="p-4 odd:bg-gray-800">
          <th class="p-2">Rule name</th>
          <th class="p-2">Current active</th>
          <th class="p-2">Delete house</th>
        </tr>
        <!-- <NuxtLink :to="{ path: '/edit', query: { id: rule.id } }"> -->
        <tr v-for="rule of houseRules" class="p-4 odd:bg-gray-800">
          <td class="p-4 text-center">{{ rule.name }}</td>
          <td class="p-4 text-center">
            {{ rule.active ? "Yes" : "No" }}
          </td>
          <td class="p-4 text-center" @click="deleteHouseRule(rule.id)">
            Delete
          </td>
        </tr>
        <!-- </NuxtLink> -->
      </table>

      <div class="flex gap-2 items-center justify-center">
        <button
          :class="[
            'w-10 h-10 rounded-full text-gray-600 font-semibold',
            pageNumber == paginationInfos.actualPage
              ? 'bg-gray-500'
              : 'bg-gray-800',
          ]"
          class="text-white"
          @click="paginationInfos.actualPage = pageNumber"
          v-for="pageNumber in paginationInfos.totalPages"
        >
          {{ pageNumber }}
        </button>
      </div>
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
        itemsPerPage: 4,
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
        if (e.response.status === 409) {
          this.$toast.error(
            "Unauthenticated! Your access token has expired, please signin again"
          );
          this.$router.replace("/login");
        }
      }
    },
    async deleteHouseRule(id) {
      try {
        const { data } = await this.$axios.delete(`/house_rules/${id}`);

        this.$toast.success(data.message);
        this.getHouseRules();
      } catch (e) {
        this.$toast.error(e.response.data.errors.message);
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
