let users = [];
let nextId = 0;

module.exports = class userController {
  static async createUser(req, res) {
    const { id_organizador, nome, email, senha, telefone} = req.body;

    if (!id_organizador || !email || !senha || !nome || !telefone) {
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    } else if (isNaN(telefone) || telefone.length !== 11) {
      return res.status(400).json({
        error: "Telefone inválido. Deve conter exatamente 11 dígitos numéricos",
      });
    } else if (!email.includes("@")) {
      return res.status(400).json({ error: "Email inválido. Deve conter @" });
    }

    // Verifica se já existe um usuário com o mesmo CPF
    const existingUser = users.find((user) => user.id_organizador === id_organizador);
    if (existingUser) {
      return res.status(400).json({ error: "telefone já cadastrado" });
    }

    // Cria e adiciona novo usuário
    const newUser = { id_organizador, email, senha, nome, telefone};
    users.push(newUser);

    return res
      .status(201)
      .json({ message: "Usuário criado com sucesso", user: newUser });
  }

  static async getAllUsers(req, res) {
    return res
      .status(200)
      .json({ message: "Obtendo todos os usuários", users });
  }

  static async updateUser(req, res) {
    // desestrutura e recupera os dados enviados via corpo da requisição
    const { id_organizador, email, senha, nome, telefone} = req.body;
    if (!id_organizador || !email || !senha || !nome || !telefone) {
      // valida se todos os campos foram preenchidos
      return res
        .status(400)
        .json({ error: "Todos os campos devem ser preenchidos" });
    }
    // procura indice do user no Array 'users' pelo cpf
    const userIndex = users.findIndex((user) => user.id_organizador === id_organizador);
    // se não for encontrado o 'userIndex' equivale a -1
    if (userIndex === -1) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    // atualiza os dados do usuario na Array 'users'
    users[userIndex] = { id_organizador, email, senha, email, nome, telefone };
    return res
      .status(200)
      .json({ message: "Usuário atualizado", user: users[userIndex] });
  }

  static async deleteUser(req, res) {
    const userId = req.params.id_organizador;
    const userIndex = users.findIndex((user) => user.id_organizador === userId);
    // se não for encontrado o 'userIndex' equivale a -1
    if (userIndex === -1) {
      return res.status(400).json({ error: "Usuário não encontrado" });
    }
    // removendo usuário da array 'users'
    users.splice(userIndex, 1); // começa no indice 'userIndex', e apaga somente '1'
    return res.status(200).json({ message: "Usuário apagado", users });
  }
};
