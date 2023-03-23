export default function ({ app, $axios, $toast, redirect }) {
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

  $axios.onResponse((response) => {
    if (response.status === 409) {
      $toast.error("Your access token has expired, pleas signin again");

      redirect("/");
    }
  });
}
