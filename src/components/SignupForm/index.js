import "./style.css";
import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";
import axios from "axios";

function SignupForm() {
  const history = useHistory();

  const formSchema = yup.object().shape({
    name: yup
      .string()
      .matches(/^[A-Za-z\s]+$/, "Nome deve ter apenas letras")
      .required("Nome obrigatório"),
    course_module: yup.string().required("Módulo obrigatório"),
    bio: yup.string().required("Bio obrigatória"),
    contact: yup.string().required("Contato obrigatório"),
    email: yup.string().email("Email inválido").required("E-mail obrigatório"),
    password: yup
      .string()
      .min(8, "Mínimo 8 caracteres")
      .matches(
        /^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-zA-Z]){1}).*$/,
        "Senha deve conter letras, números e ao menos um caracter especial"
      )
      .required("Senha obrigatória"),
    passwordconfirm: yup
      .string()
      .min(8, "Mínimo 8 caracteres")
      .matches(
        /^((?=.*[!@#$%^&*()\-_=+{};:,<.>]){1})(?=.*\d)((?=.*[a-zA-Z]){1}).*$/,
        "Senha deve conter letras, números e ao menos um caracter especial"
      )
      .oneOf([yup.ref("password"), null], "As senhas devem ser iguais")
      .required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleForm = (data) => {
    console.log(data);
    axios
      .post("https://kenziehub.herokuapp.com/users", data)
      .then((response) => {
        history.push(`/`);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="container">
      <h6>Fazer cadastro:</h6>
      <form onSubmit={handleSubmit(handleForm)}>
        <div>
          <TextField
            label="Nome:"
            margin="normal"
            variant="standard"
            size="small"
            color="primary"
            {...register("name")}
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        </div>
        <div>
          <TextField
            label="Módulo:"
            margin="normal"
            variant="standard"
            size="small"
            color="primary"
            {...register("course_module")}
            error={!!errors.course_module}
            helperText={errors.course_module?.message}
          />
        </div>
        <div>
          <TextField
            label="Bio:"
            margin="normal"
            variant="standard"
            size="small"
            color="primary"
            {...register("bio")}
            error={!!errors.bio}
            helperText={errors.bio?.message}
          />
        </div>
        <div>
          <TextField
            label="Contato:"
            margin="normal"
            variant="standard"
            size="small"
            color="primary"
            {...register("contact")}
            error={!!errors.contact}
            helperText={errors.contact?.message}
          />
        </div>
        <div>
          <TextField
            label="E-mail:"
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
            label="Senha:"
            margin="normal"
            variant="standard"
            size="small"
            color="primary"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
          />
        </div>
        <div>
          <TextField
            label="Confirmar senha:"
            margin="normal"
            variant="standard"
            size="small"
            color="primary"
            {...register("passwordconfirm")}
            error={!!errors.passwordconfirm}
            helperText={errors.passwordconfirm?.message}
          />
        </div>
        <div className="buttonContainer">
          <Button type="submit" variant="contained" color="primary">
            Enviar
          </Button>
        </div>
      </form>
    </div>
  );
}
export default SignupForm;
