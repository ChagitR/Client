import axios from "axios";

export const getSubCategory = async (categoryId) => {
  const response=await axios
    .get(
      `https://localhost:7245/api/SubCategory/Get_subcategory_by_categoryId/${categoryId}`,
      {}
    );
   
        return response.data;
    //   setSubCategory(response.data);w
   
};
