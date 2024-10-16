//Acessa o objeto "document" que representa a página html


//Seleciona o elemento com o id indicado do formulário
document
  .getElementById("formulario-registro")
  //Adiciona o ouvinte de evento (submit) para capturar o envio do formulário
  .addEventListener("submit", function (event) {
    //Previne o comportamento padrão do formulário, ou seja, impede que ele seja enviado e recarregue a página
    event.preventDefault();

    //Captura os valores dos campos do formulario
    const name = document.getElementById("nome").value;
    const cpf = document.getElementById("cpf").value;
    const email = document.getElementById("email").value;
    const password = document.getElementById("senha").value;

    //Requisição HTTP para o endpoint de cadastro de usuário
    fetch("http://localhost:5000/api/v1/user", {
      //Realiza uma chamada http para o servidor (a rota definida)
      method: "POST",
      headers: {
        //A requisição será em formato JSON
        "Content-Type": "application/json",
      },
      //Transforma os dados do formulário em uma string JSON para serem enviados no corpo da requisição
      body: JSON.stringify({ name, cpf, password, email }),
    })
      .then((response) => {
        //Tratamento da resposta do servidor / API
        if (response.ok) {
          //Verifaca se a resposta foi bem sucedida status (2xx, duzentos e alguma coisa)
          return response.json();
        }
        //Convertendo o erro em formato JSON
        return response.json().then((err) => {
          //Mensagem retornada do servidor, acessada pela chave "error"
          throw new Error(err.error);
        });
      }) //Fechamento da then(response)
      .then((data) => {
        //Executa a resposta de sucesso - retorna ao usuário final

        //Exibe um alerta com o nome do usuario que acabou de ser cadastrado
        alert("Usuario cadastrado com sucesso!");

        //Exibe o log no terminal
        console.log("Usuario criado: ", data.user);

        //Reseta os campos do formulario após o sucesso do cadastro
        document.getElementById
        ("formulario-registro").reset();
      })
      .catch((error) => {
        //Captura qualquer erro que ocorra durante o processo de requisição / resposta
        alert("Erro no cadastrado: " + error.message);

        console.error("Erro:", error.message);
      });
  });
