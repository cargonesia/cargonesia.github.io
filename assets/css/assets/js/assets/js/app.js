// Cek user & role
(async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) {
    alert("Silakan login dulu");
    window.location.href = "login.html";
    return;
  }

  // Ambil role dari profiles
  const { data: profile, error } = await supabase
    .from("profiles")
    .select("role")
    .eq("id", user.id)
    .single();

  if (error || !profile) {
    alert("Gagal ambil role");
    await supabase.auth.signOut();
    window.location.href = "login.html";
    return;
  }

  // Hanya supervisor & manager boleh masuk
  if (!(profile.role === "supervisor" || profile.role === "manager")) {
    alert("Akses ditolak, hanya untuk supervisor & manager");
    await supabase.auth.signOut();
    window.location.href = "login.html";
    return;
  }

  console.log("Login sebagai:", profile.role);
})();

// Logout
document.getElementById("logout-btn").addEventListener("click", async () => {
  await supabase.auth.signOut();
  window.location.href = "login.html";
});
