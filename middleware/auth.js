export default ({ app, redirect }) => {
  const user = app.$cookiz.get("SASTaskUserInfoCookie");
  if (!user) redirect("/login");
};
