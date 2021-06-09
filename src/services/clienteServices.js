import axios from "axios";

export async function list() {
  try {
    let respuesta = await axios.get("http://localhost:3005/cliente");
    return respuesta;
  } catch (error) {
    console.log(error)
  }
}

export async function get(cliente) {
    try {
      let respuesta = await axios.get(`http://localhost:3005/cliente/${cliente}`);
      return respuesta;
    } catch (error) {
      console.log(error)
    }
}

export async function create(cliente) {
    try {
      let respuesta = await axios.post("http://localhost:3005/cliente", cliente);
      return respuesta;
    } catch (error) {
      console.log(error)
    }
}

export async function remove(cliente) {
    try {
        let respuesta = await axios.delete(`http://localhost:3005/cliente/${cliente}`);
        return respuesta
    } catch(error){
        console.log(error)
    }
}

export async function put(cliente){
    try{
        let respuesta = await axios.patch(`http://localhost:3005/cliente/${cliente.id}`, cliente)
        return respuesta
    } catch(error){
        console.log(error)
    }
}


