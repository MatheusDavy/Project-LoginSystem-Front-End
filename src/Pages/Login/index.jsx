import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";

// Axios
import Axios from "axios";

// Router
import { Link } from "react-router-dom";

// Style
import "./style.css";

// Images
import imageDescribe from "../../Assets/img/login/bussines-idea.png";

// Component
import ModalLoginRegisterMessage from "../../Component/Modals/MessageLoginRegister";
// Function
import { messageLoginRegister } from "../../Assets/js/public/message.login_register";

export default function LoginPage(props) {
  const navigate = useNavigate();
  const validationLogin = yup.object().shape({
    email: yup.string().required("E-mail é obrigatório"),

    password: yup.string().required("Senha é obrigatória"),
  });

  const handleSubmitLogin = (values) => {
    Axios.post("http://localhost:3001/login", {
      email: values.email,
      password: values.password,
    }).then((response) => {

      let isRedirect = false;
      console.log(response);
      isRedirect = messageLoginRegister(response.data.msg, response.data.isSucess);
      // Depois que verificar se o login foi aprovado, será redirecionado para a página de dashboard
      if (isRedirect){
        setTimeout(()=>{
          navigate("/dashboard")
        }, 3000)
      };
    });
  };

  return (
    <>
      <section id="login">
        <div className="container">
          <div className="image-box">
            <img src={imageDescribe} alt="" />
          </div>

          <div className="form-box">
            <h3>WELCOME AGAIN</h3>
            <h1>Login</h1>
            <Formik
              initialValues={{}}
              onSubmit={handleSubmitLogin}
              validationSchema={validationLogin}
            >
              <Form className="login-forms">
                <div className="login-form-group">
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
                </div>

                <button className="btn-submit-login" type="submit">
                  Login
                </button>

                <Link to="/recovery-password" className="links">
                  Recovery Password
                </Link>
                <Link to="/register" className="links">
                  I haven`t a account
                </Link>
                {/* Link to register */}

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
                </div>
              </Form>
            </Formik>
          </div>
        </div>
      </section>
      <ModalLoginRegisterMessage />
    </>
  );
}
