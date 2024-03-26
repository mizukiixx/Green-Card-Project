const url = 'https://api-go-wash-efc9c9582687.herokuapp.com/api/user';

const formCadastro = document.querySelector("#cadastro-form")
formCadastro.addEventListener("submit", cadastroUsuario)

async function cadastroUsuario(e) {
    e.preventDefault()
    const formData = Object.fromEntries(new FormData(e.target))

    let resposta = await fetch(url, {
        method: "POST",
        body: JSON.stringify(
            {
                "name": formData.name,
                "email": formData.email,
                "user_type_id": Number(formData.user_type_id),
                "password": formData.password,
                "cpf_cnpj": formData.cpf_cnpj,
                "terms": formData.termos === "sim",
                "birthday": formData.birthday,
                // "avatar": formData.avatar,
                // "attachment": formData.attachment
            }
        ),
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let response = await resposta.json();

    console.log(response)
    
    
    if (!response.ok) {
        if (typeof response.data.errors === "object") {
            const erros = Object.entries(response.data.errors);
            erros.forEach(([_, erro]) => {
                alert(erro)
            });
            return;
        };

        if (response.data.errors) {
            alert(response.data.errors)
        }
    }

    alert("Cadastro feito com sucesso");
    window.location.href = "login.html";
}