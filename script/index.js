const url = 'https://api-go-wash-efc9c9582687.herokuapp.com/api/login';

document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(window.localStorage.getItem("user") ?? "{}")

    if (user.access_token) {
        window.location.href = "/view/home.html"
    }
});