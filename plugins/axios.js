export default function ({ app, $axios, redirect }) {
  $axios.onRequest((config) => {
    const user = app.$cookiz.get("SASTaskUserInfoCookie");
    if (!user) return config;

    return (config = {
      ...config,
      headers: {
        Authorization: `Bearer ${user.access_token}`,
      },
    });
  });

  $axios.onError((error) => {
    if (error.response.status > 400) {
      redirect("/login");
    }
  });
}
