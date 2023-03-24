<template>
  <div class="h-screen grid place-items-center">
    <main
      class="flex-col gap-8 w-80 py-12 px-8 m-auto shadow-md shadow-slate-600 rounded bg-gray-800 flex items-start justify-center"
    >
      <h1 class="text-gray-200 font-bold text-2xl grandient-text-light">
        Hey, wellcome back to my task app, please signin here.
      </h1>

      <form class="flex flex-col gap-2 items-start justify-center w-full">
        <input
          v-model="userInfo.email"
          class="border-none rounded text-lg px-3 py-2 w-full"
          type="email"
          name="email"
          id="email"
          placeholder="Typer your email"
        />
        <input
          v-model="userInfo.password"
          class="border-none rounded text-lg px-3 py-2 w-full"
          type="password"
          name="password"
          id="password"
          placeholder="Typer your password"
        />

        <span v-if="hasError" class="text-red-500 font-semibold">
          {{ errorMessage }}
        </span>

        <button
          @click.prevent="onSubmit"
          type="submit"
          class="mt-4 px-6 py-3 bg-gray-900 text-white font-semibold rounded tex-lg"
        >
          {{ isLoading ? "Signing" : "Signin" }}
          <span
            v-if="isLoading"
            class="ml-2 h-[25] w-[25] border-2 border-l-0 animate-spin"
          />
        </button>
      </form>
    </main>
  </div>
</template>

<script>
export default {
  layout: "empty",
  data() {
    return {
      userInfo: {
        email: "",
        password: "",
      },
      errorMessage: "",
      isLoading: false,
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
        const { data } = await this.$axios.post("/login_json", {
          login: this.userInfo,
        });
        this.isLoading = true;

        setTimeout(() => {
          this.isLoading = false;
        }, 1000);

        this.$cookiz.set("SASTaskUserInfoCookie", data.data.result);
        this.$router.push("/");
      } catch (e) {
        this.errorMessage = "User or password invalid or inexistent";
      }
    },
  },
};
</script>
