import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useState } from "react";
import { Navigate } from "react-router-dom";
// Axios
import Axios from 'axios'

// Router
import { Link } from "react-router-dom";

// Style
import './style.css'

// Images
import imageDescribe from '../../Assets/img/register/bussines-idea.png'

// Component
import ModalLoginRegisterMessage from "../../Component/Modals/MessageLoginRegister";

// Function
import { messageLoginRegister } from "../../Assets/js/public/message.login_register";

export default function RegisterPage(props) {
  

  const validationRegister = yup.object().shape({
    firstName: yup
    .string()
    .min(3, "Nome: quantidade de caracteres insuficiente")
    .required("Nome é obrigatório"),

    lastName: yup
    .string()
    .min(2, "Sobrenome: quantidade de caracteres insuficiente")
    .required("Sobrenome é obrigatório"),

    email: yup
      .string()
      .email("Coloque um E-mail válido")
      .required("E-mail é obrigatório"),

    password: yup
      .string()
      .min(8, "Sua senha deve conter no mínimo 8 caracteres")
      .required("Senha é obrigatória"),

      confirmPassword: yup
      .string()
      .oneOf([yup.ref("password"), null],  "As senhas devem ser iguais")
      .required("Senha é obrigatória"),
  });

  const handleSubmitRegister = (values) => {
    Axios.post("http://localhost:3001/register", {
      first_name: values.firstName,
      last_name: values.lastName,
      email: values.email,
      password: values.password
    }).then( response =>{

      let isRedirect = false;
      console.log(response); //Dados
      isRedirect = messageLoginRegister(response.data.msg, response.data.isSucess);
      // Depois que verificar se o cadastro foi aprovado, será redirecionado para a página de login
      if (isRedirect){
        setTimeout(()=>{
          navigate("/login")
        }, 3000)
      };
    })
  };

  return (
    <section id="register">
      <div className="container">
        <div className="image-box">
            <img src={imageDescribe} alt=""/>
        </div>

        <div className="form-box">
            <h3>WELCOME</h3>
          <h1>Register</h1>
          <Formik
            initialValues={{}}
            onSubmit={handleSubmitRegister}
            validationSchema={validationRegister}
          >
            <Form className="register-forms">
            <div className="register-form-group name">
                <Field
                  name="firstName"
                  placeholder="Nome"
                  className="form-field"
                />
                <Field
                  name="lastName"
                  placeholder="Sobrenome"
                  className="form-field"
                />
              </div>
              <div className="register-form-group">
                <Field
                  name="email"
                  placeholder="E-mail"
                  className="form-field"
                />
                <Field
                  name="password"
                  placeholder="Senha"
                  className="form-field"
                />
                 <Field
                  name="confirmPassword"
                  placeholder="Confirme sua senha"
                  className="form-field"
                />
              </div>
              
              <button className="btn-submit-register" type="submit">
                Register
              </button>

              <Link to="/login" className="links">I have already account</Link>

              <div className="container-error-message">
                <ErrorMessage
                  component="span"
                  className="form-error-message"
                  name="email"
                />
                <ErrorMessage
                  component="span"
                  className="form-error-message"
                  name="password"
                />
                <ErrorMessage
                  component="span"
                  className="form-error-message"
                  name="lastName"
                />
                <ErrorMessage
                  component="span"
                  className="form-error-message"
                  name="firstName"
                />

                <ErrorMessage
                  component="span"
                  className="form-error-message"
                  name="confirmPassword"
                />
              </div>


            </Form>
          </Formik>
        </div>
      </div>
      <ModalLoginRegisterMessage />
    </section>
  );
}
