export default function ({ app, $axios }) {
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
}
