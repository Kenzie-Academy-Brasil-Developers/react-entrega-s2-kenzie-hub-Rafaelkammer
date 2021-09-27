import "./style.css";
import axios from "axios";
import { useState, useEffect } from "react";
import { Button, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useHistory } from "react-router";

function Home() {
  const [user, setUser] = useState({});

  const [token, setToken] = useState(() => {
    const localToken = localStorage.getItem("token") || "";
    return localToken;
  });

  useEffect(() => {
    axios
      .get("https://kenziehub.herokuapp.com/profile", {
        headers: { Authorization: `Bearer: ${token}` },
      })
      .then((response) => {
        setUser(response.data);
        // console.log(user);
      });
  });

  const history = useHistory();

  const formSchema = yup.object().shape({
    title: yup.string().required("campo obrigatório"),
    status: yup.string().required("campo obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(formSchema) });

  const handleForm = (data) => {
    axios
      .post("https://kenziehub.herokuapp.com/users/techs", data, {
        headers: { Authorization: `Bearer: ${token}` },
      })
      .then((response) => {
        console.log(response);
        setToken(() => {
          const localToken = localStorage.getItem("token") || "";
          return localToken;
        });
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (data) => {
    axios
      .delete(`https://kenziehub.herokuapp.com/users/techs/${data}`)
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };

  return (
    <>
      <div className="container">
        <h6>Bem vindo {user.name}</h6>
      </div>
      <div className="formulario">
        <form onSubmit={handleSubmit(handleForm)}>
          <div>
            <TextField
              label="Tecnologia"
              margin="none"
              variant="standard"
              size="small"
              color="primary"
              {...register("title")}
              error={!!errors.title}
              helperText={errors.title?.message}
            />
          </div>
          <div>
            <TextField
              label="Status"
              margin="none"
              variant="standard"
              size="small"
              color="primary"
              {...register("status")}
              error={!!errors.status}
              helperText={errors.status?.message}
            />
          </div>
          <div className="buttonContainer">
            <Button type="submit" variant="contained" color="primary">
              Adicionar
            </Button>
          </div>
        </form>
      </div>
      <div className="container">
        <table>
          <tr>
            <th>Tecnologia</th>
            <th>Status/Nível</th>
          </tr>

          {user.techs?.map((tech) => {
            return (
              <>
                <tr key={tech.id}>
                  <td>{tech.title}</td>
                  <td>{tech.status}</td>
                  <td>
                    <Button
                      type="submit"
                      size="small"
                      variant="contained"
                      color="secondary"
                    >
                      X
                    </Button>
                  </td>
                </tr>
              </>
            );
          })}
        </table>
      </div>
    </>
  );
}

export default Home;
