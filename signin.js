
window.addEventListener("DOMContentLoaded", () => {
  const form      = document.getElementById("loginForm");
  const emailIn   = document.getElementById("email");
  const passIn    = document.getElementById("password");

  form.addEventListener("submit", e => {
    e.preventDefault();

    const emailVal = emailIn.value.trim();
    const passVal  = passIn.value.trim();

    showMsg("");

    if (!emailVal || !passVal) {
      return showMsg("Please fill in both e‑mail and password.", "red");
    }


    if (emailVal === "user@example.com" && passVal === "123456") {
      showMsg("Login successful! Redirecting…", "green");
      setTimeout(() => location.href = "index.html", 1000);
    } else {
      showMsg("Incorrect e‑mail or password.", "red");
    }
  });


  function showMsg(text, color = "inherit") {
    let p = document.getElementById("loginMsg");
    if (!p) {
      p = document.createElement("p");
      p.id = "loginMsg";
      form.appendChild(p);
    }
    p.style.color   = color;
    p.textContent   = text;
  }
});
function handleCredentialResponse(response) {
  const user = parseJwt(response.credential);

  console.log("Google user:", user);
  alert("Signed in as: " + user.name);
  location.href = "index.html";
}
function parseJwt(token) {
  const base64Url = token.split('.')[1];
  const base64    = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const json      = decodeURIComponent(atob(base64).split('').map(c =>
                    '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2)).join(''));
  return JSON.parse(json);
}
