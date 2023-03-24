<template>
  <div class="h-[calc(100vh-80px)] grid place-items-center">
    <main
      class="flex-col gap-8 w-80 py-12 px-8 m-auto shadow-md shadow-slate-600 rounded bg-gray-800 flex items-start justify-center"
    >
      <h1 class="text-gray-200 font-bold text-2xl grandient-text-light">
        Create a new house rule
      </h1>

      <form class="flex flex-col gap-2 items-start justify-center w-full">
        <input
          v-model="houseRules.name"
          class="border-none rounded text-lg px-3 py-2 w-full bg-gray-500 font-semibold text-gray-300"
          type="text"
          name="house"
          id="house"
          placeholder="Type the new house name"
        />

        <span v-if="hasError" class="text-red-500 font-semibold">
          {{ errorMessage }}
        </span>

        <div class="flex items-center gap-2">
          <input
            v-model="houseRules.active"
            class="relative float-left mt-[0.15rem] h-[1.125rem] w-[1.125rem] appearance-none rounded-[0.25rem] border-[0.125rem] border-solid border-neutral-300 outline-none before:pointer-events-none before:absolute before:h-[0.875rem] before:w-[0.875rem] before:scale-0 before:rounded-full before:bg-transparent before:opacity-0 before:shadow-[0px_0px_0px_13px_transparent] before:content-[''] checked:border-primary checked:bg-primary checked:before:opacity-[0.16] checked:after:absolute checked:after:ml-[0.25rem] checked:after:-mt-px checked:after:block checked:after:h-[0.8125rem] checked:after:w-[0.375rem] checked:after:rotate-45 checked:after:border-[0.125rem] checked:after:border-t-0 checked:after:border-l-0 checked:after:border-solid checked:after:border-white checked:after:bg-transparent checked:after:content-[''] hover:cursor-pointer hover:before:opacity-[0.04] hover:before:shadow-[0px_0px_0px_13px_rgba(0,0,0,0.6)]"
            type="checkbox"
            name="active"
            id="active"
          />
          <label for="active" class="grandient-text-light">active house</label>
        </div>

        <button
          @click.prevent="onSubmit"
          type="submit"
          class="mt-4 px-6 py-3 bg-gray-900 text-white font-semibold rounded tex-lg hover:shadow-md hover:shadow-slate-600 transition hover:translate-y-1.5"
        >
          Create
        </button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      houseRules: {
        name: "",
        active: false,
      },
      errorMessage: "",
    };
  },
  computed: {
    hasError() {
      if (this.errorMessage.length > 0) return true;

      return false;
    },
  },
  methods: {
    async onSubmit() {
      try {
        if (this.houseRules.name.trim() === "")
          throw "Name field cannot be empty";

        const { data } = await this.$axios.post("/house_rules", {
          house_rules: {
            name: this.houseRules.name,
            active: this.houseRules.active ? 1 : 0,
          },
        });

        this.$toast.success(data.message);

        this.$router.push("/");
      } catch (e) {
        this.errorMessage = e.response.data.errors.message;
      }
    },
  },
};
</script>
