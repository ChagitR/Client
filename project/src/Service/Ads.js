import axios from "axios";
import secureLocalStorage from "react-secure-storage";

export const getAds1 = async (search) => {
 
  let url = ``;

  if (search.startDatePublished != null) {
    if (search.startDate != null) {
      if (search.endDate != null) {
        url = `https://localhost:7245/api/LostAndFound/GetByAdvancedSearch?userId=${search.userId}&typeId=${search.typeId}&categoryId=${search.categoryId}&subCategoryId=${search.subCategoryId}&startDatePublished=${search.startDatePublished}&endDatePublished=${search.endDatePublished}&startDate=${search.startDate}&endDate=${search.endDate}&common=${search.common}&city=${search.city}`;
      } else {
        url = `https://localhost:7245/api/LostAndFound/GetByAdvancedSearch?userId=${search.userId}&typeId=${search.typeId}&categoryId=${search.categoryId}&subCategoryId=${search.subCategoryId}&startDatePublished=${search.startDatePublished}&endDatePublished=${search.endDatePublished}&startDate=${search.startDate}&common=${search.common}&city=${search.city}`;
      }
    } else {
      if (search.endDate != null) {
        url = `https://localhost:7245/api/LostAndFound/GetByAdvancedSearch?userId=${search.userId}&typeId=${search.typeId}&categoryId=${search.categoryId}&subCategoryId=${search.subCategoryId}&startDatePublished=${search.startDatePublished}&endDatePublished=${search.endDatePublished}&endDate=${search.startDate}&common=${search.common}&city=${search.city}`;
      } else {
        url = `https://localhost:7245/api/LostAndFound/GetByAdvancedSearch?userId=${search.userId}&typeId=${search.typeId}&categoryId=${search.categoryId}&subCategoryId=${search.subCategoryId}&startDatePublished=${search.startDatePublished}&endDatePublished=${search.endDatePublished}&common=${search.common}&city=${search.city}`;
      }
    }
  } else {
    if (search.startDate != null) {
      if (search.endDate != null) {
        url = ` https://localhost:7245/api/LostAndFound/GetByAdvancedSearch?userId=${search.userId}&typeId=${search.typeId}&categoryId=${search.categoryId}&subCategoryId=${search.subCategoryId}&startDate=${search.startDate}&endDate=${search.endDate}&common=${search.common}&city=${search.city}`;
      } else {
        url = ` https://localhost:7245/api/LostAndFound/GetByAdvancedSearch?userId=${search.userId}&typeId=${search.typeId}&categoryId=${search.categoryId}&subCategoryId=${search.subCategoryId}&startDate=${search.startDate}&common=${search.common}&city=${search.city}`;
      }
    } else {
      if (search.endDate != null) {
        url = ` https://localhost:7245/api/LostAndFound/GetByAdvancedSearch?userId=${search.userId}&typeId=${search.typeId}&categoryId=${search.categoryId}&subCategoryId=${search.subCategoryId}&endDate=${search.endDate}&common=${search.common}&city=${search.city}`;
      } else {
        url = ` https://localhost:7245/api/LostAndFound/GetByAdvancedSearch?userId=${search.userId}&typeId=${search.typeId}&categoryId=${search.categoryId}&subCategoryId=${search.subCategoryId}&common=${search.common}&city=${search.city}`;
      }
    }
  }

  const response = await axios.get(url, {});
  return response.data;
};
export const getAdsByUserId = async () => {
  let user = JSON.parse(secureLocalStorage.getItem("user"));
  const response = await axios.get(
    ` https://localhost:7245/api/LostAndFound/GetByAdvancedSearch?userId=${user.userId}&typeId=-1&categoryId=-1&subCategoryId=-1&common=defaultValue&city=defaultValue`,
    {}
  );

  return response.data;
};
export const addAdToService = async (ad,common,phone) => {
  ad.common=common;
  ad.phone=phone;
  const response = await axios
    .post(`https://localhost:7245/api/LostAndFound/AddAd`, ad)
    .catch(console.log("err!!!!!!"));
  console.log("response.data " + response.data);
  return response.data;
};

export const editAd = async (ad, id, data) => {
  ad.common=data.common;
  ad.phone=data.phone;
  console.log("EEET "+ad.statusId);
  const response = await axios.put(
    `https://localhost:7245/api/LostAndFound/UpdateAd?adId=${id}`,
    ad
  );
console.log("status:"+response.data.statusId);
  return response.data;
};
export const UploadImage = async (data, id) => {
  // let u = JSON.parse(secureLocalStorage.getItem("user"));
  const response = await axios.post(
    `https://localhost:7245/api/LostAndFound/UploadImage?lfId=${id}`,
    data,
    {
      headers: {
        "content-type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
