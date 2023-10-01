import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import DialogSearchl from "./DialogSearch";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getCategory } from "./Service/Category";
import { getSubCategory } from "./Service/SubCategory";
import Date from "./Date";
import Alert from "@mui/material/Alert";
import { UploadImage } from "./Service/Ads";
import SelectCities from "./SelectCities";
import { editAd } from "./Service/Ads";
import { useForm } from "react-hook-form";
import date from "dayjs";
import Checkbox from "@mui/material/Checkbox";
import FormGroup from "@mui/material/FormGroup";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';import { createTheme, ThemeProvider } from "@mui/material/styles";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});

const EditAd = (props) => {
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [open, setOpen] = useState(props.open);
  const [file, setFile] = useState(props.adDetails.image);
  const [objToChange, setObjToChange] = useState({
    typeId: props.adDetails.typeId,
    statusId: props.adDetails.statusId,
    userId: props.adDetails.userId,
    categoryId: props.adDetails.categoryId,
    subCategoryId: props.adDetails.subCategoryId,
    datePublished: props.adDetails.datePublished,
    startDate: props.adDetails.startDate,
    endDate: props.adDetails.endDate,
    email: props.adDetails.email,
    phone: props.adDetails.phone,
    common: props.adDetails.common,
    getEmail: props.adDetails.getEmail,
    cities: props.adDetails.cities,
    image: props.adDetails.image,
  });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const registerOptions = {
    common: {
      maxLength: {
        value: 30,
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
  };

  let catList = category.map((cat) => (
    <MenuItem value={cat.categoryId}>{cat.categoryName}</MenuItem>
  ));
  const getSubCat = async () => {
    const subCategory = await getSubCategory(objToChange.categoryId);
    setSubCategory(subCategory);
  };
  const getCat = async () => {
    const category = await getCategory();
    setCategory(category);
  };
  useEffect(() => {
    if (typeof file === "string") console.log("file: ", typeof file === String);
    console.log("tt: " + objToChange.cities);
    // console.log("r:"+props.adId);
    if (objToChange.categoryId != -1) {
      getSubCat();
    }
    getCat();
  }, [objToChange]);

  const getDetails = (event, attr) => {
    if (attr == "categoryId") {
      if (event.target.value == "") {
        setObjToChange({ ...objToChange, categoryId: -1, subCategoryId: -1 });
        setObjToChange({ ...objToChange, [attr]: event.target.value });
      } else {
        setObjToChange({
          ...objToChange,
          categoryId: event.target.value,
          subCategoryId: -1,
        });
      }
    } else if (attr == "date") {
      console.log("===", date(event[0]).toISOString());
      setObjToChange({
        ...objToChange,
        startDate: date(event[0]).add(3, "hour").toISOString(),
        endDate: date(event[1]).add(3, "hour").toISOString(),
      });
    } else if (attr == "city") {
      setObjToChange({ ...objToChange, cities: event.target.value });
    } else setObjToChange({ ...objToChange, [attr]: event.target.value });
  };
  const handleCloseSave = async (data, event) => {
    if (window.confirm("האם אתה בטוח שאתה רוצה לשנות את פרטי המודעה?")) {
      const x = await editAd(objToChange, props.adId, data)
        .then(props.handleClose)
        .catch(console.log("not succes " + objToChange.cities[0]));
      await changeFile(props.adId, event);
    }
  };
  const changeFile = async (id, event) => {
    event.preventDefault();
    const data = new FormData();
    data.append("userfile", file != null ? file : "");
    if (objToChange.typeId === 1) await UploadImage(data, id);
  };
  const handleFileChange = (event) => {
    console.log("===", event.target.files[0]);
    setFile(event.target.files[0]);
  };
  const handleChangeType = (typeId) => {
    if (objToChange.typeId === typeId)
      setObjToChange({ ...objToChange, typeId: -1 });
    else setObjToChange({ ...objToChange, typeId: typeId });
  };
  return (
    <div>
        <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <div dir="rtl">
      <Dialog open={props.open} onClose={props.handleClose}>
        <form onSubmit={handleSubmit(handleCloseSave)}>
          <DialogTitle>עדכון פרטי מודעה </DialogTitle>
          <DialogContent style={{ textAlign: "center" }}>
            <DialogContentText></DialogContentText>
            <div>
              <Button
                required
                onClick={() => handleChangeType(2)}
                style={{
                  border: "1px solid rgb(160 163 169) ",
                  color: "#A0A3A9",
                  background:
                    objToChange.typeId === 2 &&
                    "linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
                  borderRadius: " 10px 0% 0% 10px ",
                  width: "25%",
                }}
              >
                מציאה
              </Button>
              <Button
                required
                onClick={() => handleChangeType(1)}
                style={{
                  border: "1px solid rgb(160 163 169)",
                  color: "#A0A3A9",
                  background:
                    objToChange.typeId === 1 &&
                    " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
                  borderRadius: "0% 10px 10px 0%",
                  width: "25%",
                }}
              >
                אבידה
              </Button>
            </div>

            {/* <FormControl>
              <RadioGroup
                row
                aria-labelledby="demo-radio-buttons-group-label"
                defaultValue={props.adDetails.typeId}
                name="radio-buttons-group"
                onChange={(e) => {
                  getDetails(e, "typeId");
                }}
              >
                <FormControlLabel
                  required
                  value="1"
                  control={<Radio />}
                  label="אבידה"
                />
                <FormControlLabel
                  required
                  value="2"
                  control={<Radio />}
                  label="מציאה"
                />
              </RadioGroup>
            </FormControl> */}
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
              <InputLabel id="demo-simple-select-helper-label">
                קטגוריה
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-required-label"
                id="demo-simple-select-required"
                value={objToChange.categoryId}
                onChange={(e) => {
                  getDetails(e, "categoryId");
                }}
                label="קטגוריה"
              >
                {catList}
              </Select>
            </FormControl>
            <FormControl
              disabled={
                objToChange.categoryId === -1 || subCategory.length === 0
              }
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
                value={objToChange.subCategoryId}
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

            {/* <FormControl
              required
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
            >
              <InputLabel id="demo-simple-select-standard-label">
                קטגוריה
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                defaultValue={objToChange.categoryId}
                value={objToChange.categoryId}
                onChange={(e) => {
                  getDetails(e, "categoryId");
                }}
                label="קטגוריה"
              >
                <MenuItem value="">
                  <em>ללא</em>
                </MenuItem>
                {catList}
              </Select>
            </FormControl>
            <br></br>

            <FormControl
              required
              variant="standard"
              sx={{ m: 1, minWidth: 120 }}
              disabled={objToChange.categoryId == -1}
            >
              <InputLabel required id="demo-simple-select-standard-label">
                תת קטגוריה
              </InputLabel>
              <Select
                required
                labelId="demo-simple-select-standard-label"
                id="demo-simple-select-standard"
                value={objToChange.subCategoryId}
                defaultValue={objToChange.subCategoryId}
                onChange={(e) => {
                  getDetails(e, "subCategoryId");
                }}
                label="תת קטגוריה"
              >
                {subCategory?.map((cat) => (
                  <MenuItem required value={cat.subCategoryId}>
                    {cat.subCategoryName}
                  </MenuItem>
                ))}
              </Select>
            </FormControl> */}
            <br></br>

            <SelectCities
              getDetails={getDetails}
              cities={objToChange.cities}
              isAddAd={false}
            ></SelectCities>
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
              label="הערה"
              variant="outlined"
              defaultValue={objToChange.common}
              // onChange={(e) => {
              //   getDetails(e, "common");
              // }}
              {...register("common", registerOptions.common)}
            />
            {errors?.common && (
              <Alert severity="error">{errors.common.message}</Alert>
            )}
            <br></br>
            <br></br>

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
              required
              id="outlined-basic"
              label="טלפון"
              variant="outlined"
              defaultValue={objToChange.phone}
              // onChange={(e) => {
              //   getDetails(e, "phone");
              // }}
              {...register("phone", registerOptions.phone)}
            />
            {errors?.phone && (
              <Alert severity="error">{errors.phone.message}</Alert>
            )}
            <br></br>
            {/* {newAd.typeId === 1 && (<div>
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
            </FormGroup>  <Stack direction="row" alignItems="center" spacing={2}>
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
          </Stack></div>
          )} */}
            {objToChange.typeId === 1 && (
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
                <Stack direction="row" alignItems="center" spacing={2}></Stack>
                <br></br>
                <br></br>
                <Stack direction="row" alignItems="center" spacing={2}>
                  <Tooltip title="צירוף תמונה">
                    <IconButton
                      style={{
                        position: "relative",
                        marginLeft: "45%",
                        // marginTop: "30%",
                        // marginBottom: "5%",
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
                        // required
                        className="form-control-file mb-3"
                        id="file"
                        type="file"
                        multiple
                      />
                      {/* <input hidden accept="image/*" type="file" /> */}
                      <PhotoCamera />
                    </IconButton>
                  </Tooltip>
                  {file !== null &&
                    (typeof file === "string" ? (
                      <div>
                        <span>
                          {props.adDetails.image ? (
                            <img
                              style={{ width: "49px", height: "49px" }}
                              src={`https://localhost:7245/images/${props.adDetails.image}`}
                            />
                          ) : (
                            "image"
                          )}{" "}
                        </span>

                        <label>{file}</label>
                      </div>
                    ) : (
                      <label>{file.name}</label>
                    ))}
                </Stack>
              </div>
            )}
            <Date getDetails={getDetails} objToChange={objToChange}></Date>
          </DialogContent>
          <DialogActions>
            <Button type="submit">עדכן</Button>
            <Button onClick={props.handleClose}>ביטול</Button>
          </DialogActions>
        </form>
      </Dialog>
      </div>{" "}
            </ThemeProvider>
          </CacheProvider>
    </div>
  );
};
export default EditAd;
