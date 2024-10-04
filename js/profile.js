const loadProfile = () =>{
    const userId = localStorage.getItem('user_id')
    console.log(userId);
    fetch(`http://127.0.0.1:8000/chat/profile/`)
    .then(res => res.json())
    .then(data => data.forEach(item=>{
        if (item.user.id == userId) {
            console.log(item.image);
            document.getElementById('profile-picture').src = item.image || './assets/banner-a.jpg';
            document.getElementById('username').value = item.user.username;
            document.getElementById('full_name').value = item.full_name;
            document.getElementById('first_name').value = item.user.first_name;
            document.getElementById('last_name').value = item.user.last_name;
            document.getElementById('email').value = item.user.email;
            document.getElementById('user_id').value = item.user.id;
        }
    }))
}

loadProfile()