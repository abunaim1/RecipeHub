const userId = localStorage.getItem("user_id");
var profile_id = 1;
const loadProfile = () => {
  fetch(`http://127.0.0.1:8000/chat/profile/`)
    .then((res) => res.json())
    .then((data) => {
      data.forEach((item) => {
        if (item.user.id == userId) {
          profile_id = item.id;
          displayProfileContent(item);
        }
      });
    });
};
const displayProfileContent = (item) => {
  document.getElementById("profile-picture").src = item.image || "./assets/banner-a.jpg";
  document.getElementById("username").value = item.user.username;
  document.getElementById("full_name").value = item.full_name;
  document.getElementById("email").value = item.user.email;

  if (item.verified == true) {
    document.getElementById("varification").value = "Verified";
  } else {
    document.getElementById("varification").value = "Not Verified";
  }
  document.getElementById("creation_date").value = item.user_creation_date;
  document.getElementById("user_id").value = item.user.id;
};

const profileUpdate = (event) => {
  event.preventDefault();
  const fullName = document.getElementById("full_name").value;
  const profilePicture = document.querySelector('input[name="profile_picture"]').files[0];
  const formData = new FormData();
  formData.append("full_name", fullName);
  if (profilePicture) {
    formData.append("image", profilePicture);
  }
  fetch(`http://127.0.0.1:8000/chat/profile/${profile_id}/`, {
    method: "PATCH",
    body: formData,
  })
    .then((res) => res.json())
    .then((data) => {
      console.log("Profile updated successfully:", data);
      alert("Profile updated successfully!");
      loadProfile();
    })
    .catch((error) => {
      console.error("Error updating profile:", error);
      alert("Failed to update profile. Please try again.");
    });
};
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
navBar();
loadProfile();
