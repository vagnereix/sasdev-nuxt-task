<template>
  <main
    class="h-[calc(100vh-80px)] w-screen flex items-center justify-center gap-8 p-4"
  >
    <div class="max-w-[1120px] w-full">
      <h1
        class="text-white font-bold text-4xl text-center grandient-text-light"
      >
        List of all house rules
      </h1>

      <table
        class="my-6 text-gray-400 w-full max-w-[1120px] rounded-md overflow-hidden"
      >
        <thead>
          <tr class="p-4 bg-gray-800 text-lg">
            <th class="p-2 hover:opacity-80 transition">Rule name</th>
            <th class="p-2 hover:opacity-80 transition">Current active</th>
            <th class="p-2 hover:opacity-80 transition"></th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="rule of houseRules" class="p-4 even:bg-gray-800">
            <td class="p-4 text-center">{{ rule.name }}</td>
            <td class="p-4 text-center hover:opacity-80 transition">
              {{ rule.active ? "Yes" : "No" }}
            </td>
            <td
              title="Delete this house rule"
              class="p-4 text-center hover:opacity-80 transition w-full flex items-end justify-center hover:cursor-pointer"
              @click="deleteHouseRule(rule.id)"
            >
              <DeleteIcon />
            </td>
          </tr>
        </tbody>
      </table>

      <div class="flex gap-2 items-center justify-center">
        <button
          :class="[
            'w-10 h-10 rounded-full text-gray-600 font-semibold hover:-translate-y-1 transition ease-out duration-300',
            pageNumber == paginationInfos.actualPage
              ? 'bg-gray-500'
              : 'bg-gray-800',
          ]"
          class="text-white"
          @click="changeActualPage(pageNumber)"
          v-for="pageNumber in paginationInfos.totalPages"
        >
          {{ pageNumber }}
        </button>
      </div>
    </div>
  </main>
</template>

<script>
import DeleteIcon from "~/components/DeleteIcon.vue";

export default {
  components: {
    DeleteIcon,
  },
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

        if (
          data.data.pagination.total_pages < this.paginationInfos.actualPage
        ) {
          this.changeActualPage(data.data.pagination.total_pages);
        }

        this.houseRules = data.data.entities;
        this.paginationInfos.totalItems = data.data.pagination.total;
        this.paginationInfos.totalPages = data.data.pagination.total_pages; // 1
      } catch (e) {
        this.$toast.error(e.toString());
      }
    },
    async deleteHouseRule(id) {
      // 2
      try {
        const { data } = await this.$axios.delete(`/house_rules/${id}`);

        this.$toast.success(data.message);
        this.getHouseRules();
      } catch (e) {
        this.$toast.error(e.toString());
      }
    },
    changeActualPage(page) {
      this.paginationInfos.actualPage = page;
      this.getHouseRules();
    },
  },
};
</script>
