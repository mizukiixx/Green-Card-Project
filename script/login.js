const url = 'https://api-go-wash-efc9c9582687.herokuapp.com/api/login';

// async significa que a função roda de forma assincrona, sem esperar o navegador processar outras tarefas
async function loginUsuario() {
    // pega o email do usuario pelo id do elemento
    const email = document.getElementById('email').value;
    // pega o tipo de usuario pelo id do elemento
    const user_type_id = document.getElementById('user_type_id').value;
    // pega a senha pelo id do elemento
    const password = document.getElementById('password').value;

    // Conversando com api
    /*
        fetch   = Função pra se comunicar com outro sistema
        url     = Quem sera chamado
        method  = Como sera chamado
        headers = O que o servidor precisa entender
        body    = Os dados a serem enviados
    */
    const resposta = await fetch(url, {
        method: "POST",
        headers:{
            'Content-Type': 'application/json'
        },
        // JSON.stringify = Transforma o JSON em Texto para enviar ao servidor
        body: JSON.stringify({
            email,
            user_type_id,
            password
        })
    })
    
    // Resposta da API
    // resposta.json transforma a resposta no formato de dados JSON
    const response = await resposta.json();

    // resposta.ok significa que o servidor respondeu no codigo 2xx (Status do tipo valido que significa OK)
    // nesse caso é uma negativa validando os erros
    if (!resposta.ok) {
        // verifica se a api retornou erros de alguma especie caso sim, mostra um alerta na tela
        if (typeof response.data.errors === "object") {
            // Pega as entradas do errors e navega por dentro dela mostrando alertas pra cada erro
            Object.entries(response.data.errors).forEach(([_, erro]) => {
                alert(erro)
            });
            return;
        } else if (typeof response.data.errors === 'string') {
            alert(response.data.errors)
            return;
        }
    } else { 
        alert("Login feito com sucesso");
        window.localStorage.setItem("user", JSON.stringify(response));
        // altera o local do navegador para home caso o login seja bem succedido
        window.location.href = "/view/home.html";
    }
}