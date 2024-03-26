const url = 'https://api-go-wash-efc9c9582687.herokuapp.com/api/login';

// objeto global contendo informacoes do usuario
window.user = {}

// rotina que executa a cada 100ms para verificar o usuario
// caso o access_token nao existe voltar para a index.html
// caso contrario usar os dados do usuario para montar a pagina
let verifica_timer = setInterval(() => {
    window.user = JSON.parse(window.localStorage.getItem("user") ?? "{}")

    if (!user.access_token) {
        window.location.href = "/index.html"
    }

    document.querySelector("#user_welcome").innerText = `Olá, ${user.user.name}`;
}, 250);

document.addEventListener("DOMContentLoaded", () => {
    const sair_btn = document.querySelector("#sair_btn");
    if (sair_btn) {
        sair_btn.addEventListener("click", () => {
            clearInterval(verifica_timer);
            window.localStorage.setItem("user", "{}")
            
            setTimeout(() => window.location.href = "/index.html", 500)
        })
    }
})