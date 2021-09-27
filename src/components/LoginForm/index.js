import "./style.css";
import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

import axios from "axios";

function LoginForm() {
  const history = useHistory();

  const formSchema = yup.object().shape({
    email: yup.string().email("Email inválido").required("E-mail obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleForm = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/sessions", data)
      .then((response) => {
        console.log(response);
        localStorage.clear();
        localStorage.setItem("token", response.data.token);
        history.push("/home");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container">
      <h6>Fazer login:</h6>
      <form onSubmit={handleSubmit(handleForm)}>
        <div>
          <TextField
            label="E-mail"
            margin="normal"
            variant="standard"
            size="small"
            color="primary"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        </div>
        <div>
          <TextField
            label="Senha"
            margin="normal"
            variant="standard"
            size="small"
            color="primary"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </div>
        <div className="buttonContainer">
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </div>
      </form>
      <p>
        Novo usuário?{" "}
        <Link className="link" to="/signup">
          Cadastre-se
        </Link>
      </p>
    </div>
  );
}
export default LoginForm;
