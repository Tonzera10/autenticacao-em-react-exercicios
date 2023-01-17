import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { goToFeed, goToSignUp } from "../../routes/coordinator.js";
import { FormContainer, InputContainer } from "./styled.js";


function LoginPage() {
  const [form, setForm] = useState({ email: "", senha: ""})
  const navigate = useNavigate();

  const onChange = (e) => {
    const { name, value } = e.target;
    setForm({...form, [name]: value});
  };

  const login = () => {
    const body = {
      email: form.email,
      password: form.senha
    }

    axios.post("https://api-cookenu.onrender.com/user/login",body)
    .then((res)=>{
      console.log(res.data)
      localStorage.setItem("token", res.data.token)
      goToFeed(navigate)
    })
    .catch((e)=>{
      console.log(e.message)
    })
  }

  const submitForm = (e) => {
    e.preventDefault()
  }
 
  return (
    <main>
      <h1>Login</h1>
      <FormContainer onSubmit={submitForm}>
        <InputContainer>
          <label htmlFor="email">E-mail:</label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
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
            value={form.senha}
            onChange={onChange}
            required
          />
        </InputContainer>
        <button onClick={() => login()}>Entrar</button>
        <button onClick={() => goToSignUp(navigate)}>Não tenho cadastro</button>
      </FormContainer>
    </main>
  );
}

export default LoginPage;
