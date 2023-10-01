import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import DialogSearchl from "./DialogSearch";
import Dialog from "@mui/material/Dialog";

import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { getCategory } from "./Service/Category";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import { SingleInputDateRangeField } from "@mui/x-date-pickers-pro/SingleInputDateRangeField";
import { getSubCategory } from "./Service/SubCategory";
import date from "dayjs";
import SelectCities from "./SelectCities";
const WrappedSingleInputDateRangeField = React.forwardRef((props, ref) => {
  return <SingleInputDateRangeField size="small" {...props} ref={ref} />;
});
const NewSearch = (props) => {
  //   const [value, setValue] = useState();

  const [catList, setCatList] = useState(props.catList);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [open, setOpen] = useState(props.open);
  const [searchObj, setSearchObj] = useState({
    typeId: -1,
    categoryId: -1,
    subCategoryId: -1,
    datePublished: null,
    startDate: null,
    endDate: null,
    common: "defaultValue",
    city: "defaultValue",
  });
  // const getCity = async () => {
  //   const cities = await getCities();
  //   setCityList(cities);
  // };
  const getSubCat = async () => {
    const subCategory = await getSubCategory(searchObj.categoryId);
    setSubCategory(subCategory);
  };
  const getCat = async () => {
    const category = await getCategory();
    setCategory(category);
  };
  useEffect(() => {
    if (searchObj.categoryId != -1) {
      getSubCat();
    }
    getCat();
    // getCity();
  }, [searchObj.categoryId]);
  const getDetails = (event, attr) => {
    if (attr == "categoryId") {
      if (event.target.value == "") {
        setSearchObj({ ...searchObj, categoryId: -1, subCategoryId: -1 });
      } else {
        setSearchObj({
          ...searchObj,
          categoryId: event.target.value,
          subCategoryId: -1,
        });
      }
    }
    setSearchObj({ ...searchObj, [attr]: event.target.value });
  };
  useEffect(() => {
    setSearchObj({
      ...searchObj,
      typeId: props.search.typeId,
      categoryId: props.search.categoryId,
      subCategoryId: props.search.subCategoryId,
      datePublished: null,
      startDate: null,
      endDate: null,
      common: "defaultValue",
      city: "defaultValue",
    });

    getCat();
  }, []);
  const [value, setValue] = useState(date("2022-04-17"));
  return (
    <div dir="ltr">
      <div className="newSearch">
        <b style={{ marginLeft: "45%", position: "relative" }}>חיפוש מתקדם</b>
    
        <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={3} columns={{ xs: 2, sm: 8, md: 10 }}>
            <Grid item xs={3} sm={11} md={3}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#fe2d61",
                        },
                      },
                    }}
                    slotProps={{ textField: {} }}
                  
                    label="תאריך פרסום"
                    onChange={(event) => {
                      setSearchObj({
                        ...searchObj,
                        datePublished: event.toISOString(),
                      });
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>{" "}
            <Grid item xs={1} sm={10} md={4}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["SingleInputDateRangeField"]}>
                  <DateRangePicker
                    sx={{ 
                      "& .MuiOutlinedInput-root": {
                        "&.Mui-focused fieldset": {
                          borderColor: "#fe2d61",
                        },
                      },
                    }}
                    slotProps={{ textField: { size: "large" } }}
                    slots={{ field: WrappedSingleInputDateRangeField }}
                    onChange={(event) => {
                      setSearchObj({
                        ...searchObj,
                        startDate: date(event[0]).add(3, "hour").toISOString(),
                        endDate: date(event[1]).add(3, "hour").toISOString(),
                      });
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            </Grid>{" "}
            <Grid item xs={2} sm={10} md={3}>
              <SelectCities
                getDetails={getDetails}
                cities={null}
                isAddAd={false}
              ></SelectCities>
            </Grid>
            <Grid item xs={2} sm={10} md={12}>
              <div style={{ position: "relative", marginLeft: "20%" }}>
                <TextField
                  sx={{
                    "& .MuiOutlinedInput-root": {
                      "&.Mui-focused fieldset": {
                        borderColor: "#fe2d61",
                      },
                    },
                  }}
                  id="outlined-basic"
                  label="תיאור"
                  // fullWidth
                  style={{ width: "80%" }}
                  // size="small"
                  // helperText="הערה יכולה להכיל עד 30 תוים"
                  variant="outlined"
                  onChange={(e) => {
                    getDetails(e, "common");
                  }}
                  // {...register("common", registerOptions.common)}
                />
              </div>
            </Grid>
          </Grid>
        </Box>

        <span style={{ position: "absolute", marginTop: "-1%" }}>
          <Button
            style={{
              color: "#ff124d",
              borderColor:
                " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
              backgroundColor: "#FFFFFF",
              borderRadius: "15px",
              border: "none",
            }}
            variant="outlined"
            onClick={() => props.handleCloseSave(searchObj)}
          >
            חפש
          </Button>
          <Button
            style={{
              color: "#ff124d",
              borderColor:
                " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
              backgroundColor: "#FFFFFF",
              borderRadius: "15px",
              border: "none",
            }}
            variant="outlined"
            onClick={props.handleClose}
          >
            ביטול
          </Button>
        </span>
      </div>
    </div>
  );
};
export default NewSearch;
