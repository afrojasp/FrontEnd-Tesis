import axios from "axios";

export async function login(user) {
  try {
    let respuesta = await axios.post("http://localhost:3005/usuario/login", user);
    return respuesta;
  } catch (error) {
    console.log(error)
  }
}

export async function create(user) {
    try {
      let respuesta = await axios.post("http://localhost:3005/usuario", user);
      return respuesta;
    } catch (error) {
      console.log(error)
    }
  }


