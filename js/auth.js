function login(username, password) {
  let role;

  if (username === "admin" && password === "admin123") {
    role = "admin";
  } else {
    return null;
  }

  const session = { username: username, role: role };
  sessionStorage.setItem("session", JSON.stringify(session));
  return session;
}

function getSession() {
  const savedSession = sessionStorage.getItem("session");
  if (!savedSession) {
    return null;
  }

  try {
    const session = JSON.parse(savedSession);
    if (session && session.role === "admin") {
      return session;
    }
  } catch {
    // If the saved text isn't valid JSON, treat it as signed out.
  }

  return null;
}

function requireRole(role) {
  const session = getSession();
  if (!session) {
    window.location.href = "../index.html";
  } else if (session.role !== role) {
    if (session.role === "admin") {
      window.location.href = "admin-dashboard.html";
    } else {
      return null;
    }
  }
}

function logout() {
  sessionStorage.removeItem("session");
  window.location.href = "../index.html";
}
