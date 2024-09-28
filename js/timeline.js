const getUser = () => {
    const token = localStorage.getItem("tokens");
    if (token) {
      const tokens = JSON.parse(token);
      const token_seizer = tokens.access.split(".");
      const tokenPayload = JSON.parse(atob(token_seizer[1]));
    //   document.getElementById("username").value = tokenPayload.username;
    }
    else{
      alert('Are you authenticate? You have logIn first!')
      window.location.href = "auth.html"
    }
  };
  
  getUser();