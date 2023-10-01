import axios from "axios";
import  secureLocalStorage  from  "react-secure-storage";

export const editService = async ( user,userId) => {

  const response = await axios.put(
    `https://localhost:7245/api/User/EditUser?id=${userId}`,
    user
  );
  console.log("res: "+response.data.userName)
  secureLocalStorage.setItem("user", JSON.stringify(response.data));
  return response.data;
};

export const loginService = async (email, password) => {
  const response = await axios
    .get(
      `https://localhost:7245/api/User/Get_user?email=${email}&password=${password}`,
      {}
    )
  return response.data;
};

export const signInService = async (user) => {
  console.log("uu"+user.userName);
  console.log("uu"+user.email);
  console.log("uu"+user.password);
  const response = await axios.post(
    "https://localhost:7245/api/User/AddUser",
    user
  );
  return response.data;
};
