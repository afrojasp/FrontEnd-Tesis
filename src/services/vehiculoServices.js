import axios from "axios";

export async function list() {
  try {
    let respuesta = await axios.get("http://localhost:3005/vehiculo");
    return respuesta;
  } catch (error) {
    console.log(error)
  }
}

export async function get(vehiculo) {
    try {
      let respuesta = await axios.get(`http://localhost:3005/vehiculo/${vehiculo}`);
      return respuesta;
    } catch (error) {
      console.log(error)
    }
}

export async function create(vehiculo) {
    try {
      let respuesta = await axios.post("http://localhost:3005/vehiculo", vehiculo);
      return respuesta;
    } catch (error) {
      console.log(error)
    }
}

export async function remove(vehiculo) {
    try {
        let respuesta = await axios.delete(`http://localhost:3005/vehiculo/${vehiculo}`);
        return respuesta
    } catch(error){
        console.log(error)
    }
}

export async function put(vehiculo){
    try{
        let respuesta = await axios.patch(`http://localhost:3005/vehiculo/${vehiculo.id}`, vehiculo)
        return respuesta
    } catch(error){
        console.log(error)
    }
}


