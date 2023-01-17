import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToFeed, goToLogin } from "../../routes/coordinator";
import { FormContainer, InputContainer } from "./styled";

function SignUpPage() {
  const [cadastro, setCadastro] = useState({name: "", email: "", senha: ""})
  const navigate = useNavigate();

  const cadastrar = () => {
    const body = {
      name: cadastro.name,
      email: cadastro.email,
      password: cadastro.senha
    }

    axios.post("https://api-cookenu.onrender.com/user/signup", body)
    .then((res)=>{
      console.log(res.data.token)
      localStorage.setItem("token", res.data.token)
      goToFeed(navigate)
    })
    .catch((e)=> {
      console.log(e.message)
    })
  }

  const onChange = (e) => {
    const {name,value} = e.target
    setCadastro({...cadastro, [name]: value})
  }

  const submitForm = (e) => {
    e.preventDefault()
  }

  return (
    <main>
      <h1>Cadastro</h1>
      <FormContainer onSubmit={submitForm}>
        <InputContainer>
          <label htmlFor="name">Nome:</label>
          <input
            id="name"
            name="name"
            type="text"            
            value={cadastro.name}
            onChange={onChange}
            required
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={cadastro.email}
            onChange={onChange}
            required
          />
        </InputContainer>
        <InputContainer>
          <label htmlFor="password">Senha:</label>
          <input
            id="password"
            name="senha"
            type="password"
            value={cadastro.senha}
            onChange={onChange}
            required
          />
        </InputContainer>

        <button onClick={() => cadastrar()}>Cadastrar</button>
        <button onClick={() => goToLogin(navigate)}>Já sou cadastrado</button>
      </FormContainer>
    </main>
  );
}

export default SignUpPage;