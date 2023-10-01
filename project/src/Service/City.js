import axios from "axios"
export const getCities = async () => {
    const response=await axios
      .get(`https://localhost:7245/api/City/GetAllCity`, {});
      
        return response.data;
      
  };
  