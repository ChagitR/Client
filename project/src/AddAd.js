import { useState, useEffect } from "react";
import React, { useRef } from "react";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import PersonIcon from "@mui/icons-material/Person";
import styled from "styled-components";
import { getCategory } from "./Service/Category";
import { getSubCategory } from "./Service/SubCategory";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import SelectCities from "./SelectCities";
import TextField from "@mui/material/TextField";
import Date from "./Date";
import dayjs from "dayjs";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import secureLocalStorage from "react-secure-storage";
import { useForm } from "react-hook-form";
import { addAdToService } from "./Service/Ads";
import { useNavigate } from "react-router-dom";
import { UploadImage } from "./Service/Ads";
import componen from "./image/Componen.png";
import Maskgroup from "./image/Maskgroup.png";
import Line72 from "./image/Line72.png";
import Group273 from "./image/Group273.png";
import Vector1 from "./image/Vector1.png";
import Vector2 from "./image/Vector2.png";
import Vector3 from "./image/Vector3.png";
import Vector from "./image/Vector.png";
import { Toast } from "primereact/toast";
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";
import { prefixer } from "stylis";

// Create rtl cache
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
export default function AddAd() {
  const [file, setFile] = useState(null);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const u = JSON.parse(secureLocalStorage.getItem("user"));
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const [newAd, setNewAd] = useState({
    userId: u.userId,
    typeId: -1,
    categoryId: -1,
    subCategoryId: -1,
    datePublished: dayjs().add(3, "hour").toISOString(),
    startDate: dayjs().add(3, "hour").toISOString(),
    endDate: dayjs().add(3, "hour").toISOString(),
    common: "defaultValue",
    getEmail: true,
    statusId: 1,
    email: u.email,
    phone: "defaultValue",
    cities: "defaultValue",
    image: "defaultValue",
  });
  const routeChangeHome = () => {
    let pathP = "../";
    navigate(pathP);
  };

  useEffect(() => {
    if (u === null) routeChangeHome();
  }, []);
  useEffect(() => {
    if (newAd.categoryId !== -1) {
      getSubCat();
    }
    getCat();
  }, [newAd.categoryId]);
  const getCat = async () => {
    const x = await getCategory();
    setCategory(x);
  };

  const getSubCat = async () => {
    const x = await getSubCategory(newAd.categoryId);
    setSubCategory(x);
  };

  const navigate = useNavigate();
  const routeChange = () => {
    navigate("../PersonalArea");
  };

  const getDetails = (event, attr) => {
    if (attr === "categoryId") {
      setNewAd({
        ...newAd,
        categoryId: event.target.value,
        subCategoryId: -1,
      });
      setNewAd({ ...newAd, [attr]: event.target.value });
    } else if (attr === "date") {
      setNewAd({
        ...newAd,
        startDate: dayjs(event[0]).add(3, "hour").toISOString(),
        endDate: dayjs(event[1]).add(3, "hour").toISOString(),
      });
    } else if (attr === "getEmail") {
      setNewAd({ ...newAd, [attr]: event.target.checked });
    } else if (attr === "city") {
      setNewAd({ ...newAd, cities: event.target.value });
    } else setNewAd({ ...newAd, [attr]: event.target.value });
  };
  let catList = category.map((cat) => (
    <MenuItem value={cat.categoryId} required>
      {cat.categoryName}
    </MenuItem>
  ));
  const showMessage = (event, ref, severity) => {
    ref.current.show({
      severity: severity,
      summary: "שים לב",
      detail: "חובה לבחור את סוג המודעה - אבידה / מציאה",
      life: 3000,
    });
  };
  const toastCenter = useRef(null);
  const registerOptions = {
    common: {
      maxLength: {
        value: 20,
        message: "עברת את מכסת התוים האפשרית",
      },
    },
    phone: {
      minLength: {
        value: 9,
        message: "מספר טלפון לא חוקי ",
      },
      maxLength: {
        value: 15,
        message: "מספר טלפון לא חוקי ",
      },
    },
    cateory: {
      required: "שדה חובה",
    },
    subCateory: {
      required: "שדה חובה",
    },
  };
  const handleChangeType = (typeId) => {
    if (newAd.typeId === typeId) setNewAd({ ...newAd, typeId: -1 });
    else setNewAd({ ...newAd, typeId: typeId });
  };
  const handleSubmit1 = async (data, event) => {
    if (newAd.typeId !== -1) {
      console.log("category:" + data.category);
      console.log("---------" + u);
      if (window.confirm("להוסיף את המודעה?")) {
        const t = await addAdToService(newAd, data.common, data.phone);
        func(t.id, event);
        routeChange();
      }
    } else {
      showMessage(event, toastCenter, "error");

      // <Button label="Center" className="p-button-danger" onClick={(e) => showMessage(e, toastCenter, 'error')} />
    }
  };
  const func = async (id, event) => {
    localStorage.setItem("func", true);
    event.preventDefault();
    const data = new FormData();
    data.append("userfile", file != null ? file : "");
    if (newAd.typeId === 1) await UploadImage(data, id);
  };
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
    console.log("===", event.target.files[0]);
  };

  return (
    <div>
      <img
        style={{ position: "absolute", marginTop: "10%", marginLeft: "20%" }}
        src={componen}
      ></img>
      <img
        style={{ position: "absolute", marginTop: "27%", marginLeft: "0%" }}
        src={Maskgroup}
      ></img>
      <img
        style={{
          position: "absolute",
          marginTop: "45.1%",
          marginLeft: "0%",
          width: "100%",
          height: "6px",
        }}
        src={Line72}
      ></img>
      <img
        style={{ position: "absolute", marginTop: "35.8%", right: "0%" }}
        src={Group273}
      ></img>
      <img
        style={{ position: "absolute", marginTop: "3%", right: "13%" }}
        src={Vector1}
      ></img>
      <img
        style={{ position: "absolute", marginTop: "0%", right: "0%" }}
        src={Vector2}
      ></img>
      <img
        style={{ position: "absolute", marginTop: "5%", right: "7%" }}
        src={Vector3}
      ></img>
      <img
        style={{ position: "absolute", marginTop: "3%", right: "5%" }}
        src={Vector}
      ></img>
      <img
        style={{ position: "absolute", marginTop: "5%", right: "3%" }}
        src={Vector}
      ></img>

      <Button
        style={{
          position: "fixed",
          left: "1%",
          color: "#FFFFFF",
          background:
            " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
          borderRadius: " 100%",
          width: "0%",
          height: "60px",
        }}
        variant="contained"
        onClick={routeChange}
      >
        <PersonIcon fontSize="large"></PersonIcon>
      </Button>
      <Button
        style={{
          color: "#ff124d",
          position: "fixed",
          left: "6%",
          borderColor:
            " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
          backgroundColor: "#FFFFFF",
          borderRadius: "15px",
          border: "none",
        }}
        variant="outlined"
        onClick={routeChangeHome}
      >
        דף הבית
      </Button>
      <div className="ad">
        <h1>פרסום מודעה </h1>
        <form onSubmit={handleSubmit(handleSubmit1)}>
          <div>
            <Button
              onClick={() => handleChangeType(2)}
              style={{
                border: "1px solid rgb(160 163 169) ",
                color: "#A0A3A9",
                background:
                  newAd.typeId === 2 &&
                  "linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
                borderRadius: " 10px 0% 0% 10px ",
                width: "25%",
              }}
            >
              מציאה
            </Button>
            <Button
              onClick={() => handleChangeType(1)}
              style={{
                border: "1px solid rgb(160 163 169)",
                color: "#A0A3A9",
                background:
                  newAd.typeId === 1 &&
                  " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
                borderRadius: "0% 10px 10px 0%",
                width: "25%",
              }}
            >
              אבידה
            </Button>
          </div>
          <CacheProvider value={cacheRtl}>
            <ThemeProvider theme={theme}>
              <div dir="rtl">
                <FormControl
                  required
                  sx={{
                    m: 1,
                    minWidth: 300,
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#fe2d61",
                      },
                    },
                  }}
                >
                  <InputLabel id="demo-simple-select-helper-label" required>
                    קטגוריה
                  </InputLabel>
                  <Select
                    required
                    labelId="demo-simple-select-required-label"
                    id="demo-simple-select-required"
                    // value={newAd.categoryId}
                    onChange={(e) => {
                      getDetails(e, "categoryId");
                    }}
                    // label="קטגוריה"
                    // {...register("category", registerOptions.category)}
                  >
                    {catList}
                  </Select>
                </FormControl>
      
          
          <FormControl
            disabled={newAd.categoryId === -1 || subCategory.length === 0}
            required
            sx={{
              m: 1,
              minWidth: 300,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#fe2d61",
                },
              },
            }}
          >
            <InputLabel id="demo-simple-select-helper-label">
              תת קטגוריה
            </InputLabel>{" "}
            <Select
              required
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              // value={newAd.subCategoryId}
              onChange={(e) => {
                getDetails(e, "subCategoryId");
              }}
              label="תת קטגוריה"
            >
              {subCategory.length !== 0 &&
                subCategory?.map((cat) => (
                  <MenuItem required value={cat.subCategoryId}>
                    {cat.subCategoryName}
                  </MenuItem>
                ))}
            </Select>
          </FormControl>
          <SelectCities
            getDetails={getDetails}
            cities={null}
            nn={"יש לבחור לפחות עיר אחת"}
            isAddAd={true}
          ></SelectCities>
          <TextField
            id="outlined-basic"
            sx={{
              m: 1,
              minWidth: 300,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#fe2d61",
                },
              },
            }}
            label="הערה"
            helperText="הערה יכולה להכיל עד 30 תוים"
            variant="outlined"
            {...register("common", registerOptions.common)}
          />
          {errors?.common && (
            <Alert severity="error">{errors.common.message}</Alert>
          )}
          <TextField
            sx={{
              m: 1,
              minWidth: 300,
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#fe2d61",
                },
              },
            }}
            id="outlined-basic"
            required
            label="טלפון"
            variant="outlined"
            helperText=""
            {...register("phone", registerOptions.phone)}
          />        
          {errors?.phone && (
            <Alert
              severity="error"
              style={{ backgroundColor: "rgb(255 255 255)" }}
            >
              {errors.phone.message}
            </Alert>
          )}
          <Date getDetails={getDetails} objToChange={null}></Date>
</div>{" "}
          </ThemeProvider>
        </CacheProvider>
          {newAd.typeId === 1 && (
            <div>
              <FormGroup
                style={{
                  position: "absolute",
                  marginLeft: "15%",
                  marginBottom: "-5%",
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      style={{ color: "#ff124d" }}
                      onChange={(e) => {
                        getDetails(e, "getEmail");
                      }}
                      defaultChecked
                    />
                  }
                  label="קבלת עדכון למייל במקרה של מציאה מתאימה"
                />
              </FormGroup>{" "}
              <Stack direction="row" alignItems="center" spacing={2}>
                <Tooltip title="צירוף תמונה">
                  <IconButton
                    style={{
                      position: "absolute",
                      marginLeft: "45%",
                      marginTop: "30%",
                      marginBottom: "5%",
                      border: "none",
                      color: "#FFFFFF",
                      background:
                        " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
                    }}
                    color="primary"
                    aria-label="upload picture"
                    component="label"
                    onChange={handleFileChange}
                  >
                    <input
                      hidden
                      className="form-control-file mb-3"
                      id="file"
                      type="file"
                      multiple
                    />
                    <PhotoCamera />
                  </IconButton>
                </Tooltip>
                {file !== null && <label>{file.name}</label>}
              </Stack>
            </div>
          )}

          <Button
            style={{
              position: "absolute",
              marginLeft: "-12%",
              marginTop: "23%",
              marginBottom: "10%",
              border: "none",
              color: "#FFFFFF",
              background:
                " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
            }}
            variant="contained"
            className="button"
            type="submit"
          >
            הכנסת מודעה
          </Button>
          <div className="card flex justify-content-center">
            <Toast ref={toastCenter} position="center" />

            <div className="flex flex-wrap gap-2"></div>
          </div>
        </form>
      </div>
    </div>
  );
}
