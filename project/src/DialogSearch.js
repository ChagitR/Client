import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import Radio from "@mui/material/Radio";
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
import date from "dayjs";
import SelectCities from "./SelectCities";

const DialogSearch = (props) => {
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

  return (
    <div>
      <Dialog open={props.open} onClose={props.handleClose}>
        <DialogTitle>חיפוש פריט מתקדם</DialogTitle>
        <DialogContent>
          <DialogContentText>
            כדי ליעל את החיפוש, הכנס מקסימום פרטים שאתה זוכר
          </DialogContentText>
          <FormControl>
            <RadioGroup
            row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue={props.search.typeId}
              name="radio-buttons-group"
              onChange={(e) => {
                getDetails(e, "typeId");
              }}
            >
              <FormControlLabel value="-1" control={<Radio />} label="הכל" />
              <FormControlLabel value="1" control={<Radio />} label="אבידה" />
              <FormControlLabel value="2" control={<Radio />} label="מציאה" />
            </RadioGroup>
          </FormControl>

          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="demo-simple-select-standard-label">
              קטגוריה
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              defaultValue={props.search.categoryId}
              value={searchObj.categoryId}
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

          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
            disabled={searchObj.categoryId == -1}
          >
            <InputLabel id="demo-simple-select-standard-label">
              תת קטגוריה
            </InputLabel>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={searchObj.subCategoryId}
              defaultValue={props.search.subCategoryId}
              onChange={(e) => {
                getDetails(e, "subCategoryId");
              }}
              label="תת קטגוריה"
            >
              {subCategory?.map((cat) => (
                <MenuItem value={cat.subCategoryId}>
                  {cat.subCategoryName}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
          <br></br>

          <SelectCities getDetails={getDetails} cities={null}  isAddAd={false}></SelectCities>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="תאריך פרסום"
            type="date"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setSearchObj({
                ...searchObj,
                datePublished: event.target.value,
              });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="תאריך התחלה"
            type="date"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setSearchObj({ ...searchObj, startDate: event.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="תאריך סיום"
            type="date"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setSearchObj({ ...searchObj, endDate: event.target.value });
            }}
          />
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="הערה"
            type="text"
            fullWidth
            variant="standard"
            onChange={(e) => {
              getDetails(e, "common");
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => props.handleCloseSave(searchObj)}>חפש</Button>
          <Button onClick={props.handleClose}>ביטול</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
export default DialogSearch;
