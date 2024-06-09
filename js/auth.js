const switchers = [...document.querySelectorAll(".switcher")];
switchers.forEach((item) => {
  item.addEventListener("click", function () {
    switchers.forEach((item) => item.parentElement.classList.remove("is-active"));
    this.parentElement.classList.add("is-active");
  });
});

const navBar = () => {
  const login = document.getElementById('login-control')
  const token = localStorage.getItem("tokens");
  const tokens = JSON.parse(token);
  if (tokens) {
    login.innerHTML = `
    <a href="" class="btn text-white" style="background-color: #77574c">Profile</a>
    `
  } 
  else {
    login.innerHTML = `
    <a href="./auth.html" class="btn text-white" style="background-color: #77574c">Login</a>
    `
  }
};

const login = (event) => {
  event.preventDefault();
  const email = getValue("email");
  const password = getValue("password");
  const info = {
    email,
    password,
  };
  fetch("https://recipehub-backend-ya12.onrender.com/auth/token/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.access && data.refresh) {
        const tokens = {
          access: data.access,
          refresh: data.refresh,
        };
        localStorage.setItem("tokens", JSON.stringify(tokens));
        const token_seizer = data.access.split(".");
        const tokenPayload = JSON.parse(atob(token_seizer[1]));
        console.log(tokenPayload.username);
        window.location.href = "index.html";
      } else {
        throw new Error("Access or refresh token missing in the response");
      }
    });
};

const getToken = () => {
  const token = localStorage.getItem("tokens");
  const tokens = JSON.parse(token);
  return tokens ? tokens.refresh : null;
};

const updateToken = (refresh) => {
  const info = {
    refresh,
  };
  fetch("https://recipehub-backend-ya12.onrender.com/auth/token/refresh/", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(info),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.access && data.refresh) {
        const tokens = {
          access: data.access,
          refresh: data.refresh,
        };
        localStorage.setItem("tokens", JSON.stringify(tokens));
        const token_seizer = data.access.split(".");
        const tokenPayload = JSON.parse(atob(token_seizer[1]));
        // console.log(tokenPayload.username);
      }
    });
};

const interval = setInterval(() => {
  const refresh = getToken();
  if (refresh) {
    updateToken(refresh);
  } else {
    stopTokenUpdater();
  }
}, 2000);

const stopTokenUpdater = () => {
  clearInterval(interval);
  return stopTokenUpdater;
};

const getValue = (id) => {
  const value = document.getElementById(id).value;
  return value;
};

navBar();