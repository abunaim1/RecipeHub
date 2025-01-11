const navBar = () => {
  const login = document.getElementById("login-control");
  const token = localStorage.getItem("tokens");
  const tokens = JSON.parse(token);
  if (tokens) {
    login.innerHTML = `
        <a href="profile.html" class="btn text-white" style="background-color: #77574c">Profile</a>
        <a onclick="logout()" class="btn text-white" style="background-color: #77574c">Logout</a>
        `;
  } else {
    login.innerHTML = `
        <a href="./auth.html" class="btn text-white" style="background-color: #77574c">Login</a>
        `;
  }
};

const logout = () => {
  alert("Logout Successfully");
  localStorage.removeItem("tokens");
  localStorage.removeItem("user_id");
  window.location.href = "auth.html";
};

const loadChef = (event) =>{
    event.preventDefault()
    const humanPrompt = document.getElementById('humanText').value;
    const info = {
        text: humanPrompt,
        user: 1,
    }
    fetch('http://127.0.0.1:8000/ai/chef/', {
        method:"POST",
        headers:{"content-type":"application/json"},
        body:JSON.stringify(info)
    })
    .then(res=>res.json())
    .then(data=>displayResponse(data))
}
const displayResponse =(data)=>{
    document.getElementById("ai_response").innerText = `
    ${data.ai_response}
    `
}
navBar();
