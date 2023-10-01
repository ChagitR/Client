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
import Alert from "@mui/material/Alert";
import secureLocalStorage from "react-secure-storage";
import "./StyleHomePage.css";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import DialogSearch from "./DialogSearch";
import date from "dayjs";
import Pagination from "@mui/material/Pagination";
import { getAds1 } from "./Service/Ads";
import { getCategory } from "./Service/Category";
import { getSubCategory } from "./Service/SubCategory";
import Xx from "./Xx";
import SelectCities from "./SelectCities";
import TextField from "@mui/material/TextField";



const getBeginningOfDate = (d) => {
  if (d.isValid() === true) {
    return d.hour(0).minute(0).second(0).millisecond(0);
  }
  return null;
};
const getEndOfOfDate = (d) => {
  if (d.isValid() === true) {
    return d.hour(23).minute(59).second(59).millisecond(999);
  }
  return null;
};

const AdvancedSearch = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [selectSubCat, setSelectSubCat] = useState();
  const [ad, setAd] = useState([]);
  // const s=()=>{
  //   let t = ad.filter((e)=>e.statusId==1)
  //   // console.log("t: "+t);
  //  setAd(t);
  //  ad.slice(0, 5);
  // }
  const [smallAd, setSmallAd] = useState(ad.slice(0, 11));
  const [page, setPage] = useState(1);
  const [isLogin, setIsLogIn] = useState(false);
  const [radioDefaltVal, setRadioDefaltVal] = useState(-1);
  const [search, setSearch] = useState({
    userId: -1,
    typeId: -1,
    categoryId: -1,
    subCategoryId: -1,
    startDatePublished: null,
    endDatePublished: null,
    startDate: null,
    endDate: null,
    common: "defaultValue",
    city: "defaultValue",
  });

  const [open, setOpen] = useState(false);
  let size = 1;
  const countOfLfs = 12;
  const handleClickOpen = () => {
    setIsOpen(true);
    setOpen(true);
  };

  const handleCloseSave = (searchObj) => {
    setSearch({
      ...search,
      typeId: searchObj.typeId,
      categoryId: searchObj.categoryId,
      subCategoryId: searchObj.subCategoryId,
      startDatePublished: getBeginningOfDate(
        date(searchObj.datePublished)
      )?.toISOString(),
      endDatePublished: getEndOfOfDate(
        date(searchObj.datePublished) ``
      )?.toISOString(),
      startDate: getBeginningOfDate(date(searchObj.startDate))?.toISOString(),
      endDate: getEndOfOfDate(date(searchObj.endDate))?.toISOString(),
      common: searchObj.common,
      city: searchObj.city,
    });
    setOpen(false);
    setIsOpen(false);
  };

  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };
  let catList = category.map((cat) => (
    <MenuItem value={cat.categoryId}>{cat.categoryName}</MenuItem>
  ));

  // const getAds = async () => {
  //   const x = await getAds1(search);
  //   let e = x.filter((e) => e.statusId === 1);
  //   setAd(e);
  // };

  const handleChangeCat = (event) => {
    if (event.target.value === "") {
      setSearch({ ...search, categoryId: -1, subCategoryId: -1 });
    } else {
      setSearch({
        ...search,
        categoryId: event.target.value,
        subCategoryId: -1,
      });
    }
  };

  // useEffect(() => {
  //   console.log(date().toDate().getDay());
  //   // let tmp = ad.filter((e)=>e.statusId==1);
  //   // setAd(tmp);
  //   setSmallAd(ad.slice(size - 1, size + countOfLfs - 1));
  // }, [ad]);

  const handleChangeSubCat = async (event) => {
    setSearch({ ...search, subCategoryId: event.target.value });
    await setSelectSubCat(event.target.value);
  };

  const getSubCat = async () => {
    const x = await getSubCategory(search.categoryId);
    setSubCategory(x);
  };
  const getCat = async () => {
    const x = await getCategory();
    setCategory(x);
  };
  // useEffect(
  //   () => {
  //     if (search.categoryId !== -1) {
  //       getSubCat();
  //     }
  //     getAds();
  //     getCat();
  //     if (JSON.parse(secureLocalStorage.getItem("user"))) setIsLogIn(true);
  //   },
  //   [search.categoryId],
  //   [radioDefaltVal],
  //   [isLogin]
  // );
  const handleChangeType = (event) => {
    // props.subscribe();
    setSearch({ ...search, typeId: event.target.value });
  };
  // useEffect(() => {
  //   getAds().catch(() => {
  //     setAd([]);
  //   });
  //   props.handleCloseSave(search);
  // }, [search]);

  useEffect(()=>{
       props.handleCloseSave(search);
  },[search])
  const disconnection = (event) => {
    if (window.confirm("Do you really want to leave?")) {
      secureLocalStorage.clear();
      setIsLogIn(false);
    }
  };
  let navigate = useNavigate();
  const routeChange = () => {
    let pathP = "../PersonalArea";
    let pathL = "../login";
    let user = JSON.parse(secureLocalStorage.getItem("user"));
    if (user) {
      navigate(pathP);
    } else {
      navigate(pathL);
    }
  };
  const handleChangePagination = (event, value) => {
    // setPage(value);
    size = value;
    let x = ad.slice((size - 1) * countOfLfs, size * countOfLfs);
    setSmallAd(x);
  };

  const getDetails = (event, attr) => {
    if (attr == "categoryId") {
      if (event.target.value == "") {
        setSearch({ ...search, categoryId: -1, subCategoryId: -1 });
      } else {
        setSearch({
          ...search,
          categoryId: event.target.value,
          subCategoryId: -1,
        });
      }
    }
    setSearch({ ...search, [attr]: event.target.value });
  };
  return (
    <div>
      <FormControl>
        <RadioGroup
          row
          aria-labelledby="demo-radio-buttons-group-label"
          defaultValue={search.typeId}
          value={search.typeId}
          name="radio-buttons-group"
          onChange={(e) => {
            handleChangeType(e, "typeId");
          }}
        >
          <FormControlLabel value="-1" control={<Radio />} label="הכל" />
          <FormControlLabel value="1" control={<Radio />} label="אבידה" />
          <FormControlLabel value="2" control={<Radio />} label="מציאה" />
        </RadioGroup>
      </FormControl>

      <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
        <InputLabel id="demo-simple-select-standard-label">קטגוריה</InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={search.categoryId}
          onChange={(e) => {
            handleChangeCat(e, "categoryId");
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
        disabled={search.categoryId === -1 || subCategory.length === 0}
      >
        <InputLabel id="demo-simple-select-standard-label">
          תת קטגוריה
        </InputLabel>
        <Select
          labelId="demo-simple-select-standard-label"
          id="demo-simple-select-standard"
          value={search.subCategoryId}
          onChange={(e) => {
            handleChangeSubCat(e, "subCategoryId");
          }}
          label="תת קטגוריה"
        >
          {subCategory.length !== 0 ? (
            subCategory?.map((cat) => (
              <MenuItem value={cat.subCategoryId}>
                {cat.subCategoryName}
              </MenuItem>
            ))
          ) : (
            <></>
          )}
        </Select>
      </FormControl>
<div id="f"> <SelectCities getDetails={getDetails} cities={null}  isAddAd={false}></SelectCities>
          <TextField
            autoFocus
            margin="dense"
            id="name"
            label="תאריך פרסום"
            type="date"
            fullWidth
            variant="standard"
            onChange={(event) => {
              setSearch({
                ...search,
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
              setSearch({ ...search, startDate: event.target.value });
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
              setSearch({ ...search, endDate: event.target.value });
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
          /></div>
    </div>

  );
};

export default AdvancedSearch;
