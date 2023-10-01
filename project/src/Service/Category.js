import axios from "axios"
export const getCategory = async () => {
    const response=await axios
      .get(`https://localhost:7245/api/Category/Get_all_category`, {})
      
        return response.data;
      
  };
  
