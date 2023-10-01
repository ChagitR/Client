import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as React from "react";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import PersonIcon from "@mui/icons-material/Person";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Alert from "@mui/material/Alert";
import secureLocalStorage from "react-secure-storage";
import "./StyleHomePage.css";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import w from "./image/w.png";
import componen from "./image/Componen.png";
import Maskgroup from "./image/Maskgroup.png";
import Vector from "./image/Vector3.png";
import Tooltip from "@mui/material/Tooltip";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import Line72 from "./image/Line72.png";
import Button from "@mui/material/Button";
import DialogSearch from "./DialogSearch";
import date from "dayjs";
import Pagination from "@mui/material/Pagination";
import ButtonGroup from "@mui/material/ButtonGroup";
import { purple, red } from "@mui/material/colors";
import { getAds1 } from "./Service/Ads";
import { getCategory } from "./Service/Category";
import { getSubCategory } from "./Service/SubCategory";
import NewSearch from "./NewSearch";
import Xx from "./Xx";

const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});


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

const HomePage = () => {
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
    if (open === true) {
      setIsOpen(false);
      setOpen(false);
    } else {
      setIsOpen(true);
      setOpen(true);
    }
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
        date(searchObj.datePublished)
      )?.toISOString(),
      startDate: getBeginningOfDate(date(searchObj.startDate))?.toISOString(),
      endDate: getEndOfOfDate(date(searchObj.endDate))?.toISOString(),
      common: searchObj.common,
      city: searchObj.city,
    });
    setOpen(false);
    setIsOpen(false);
  };
  let u = JSON.parse(secureLocalStorage.getItem("user"));
  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };
  let catList = category.map((cat) => (
    <MenuItem
      style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
      value={cat.categoryId}
    >
      {cat.categoryName}
    </MenuItem>
  ));
  // let catList1 = category.map((cat) => (
  //   <menuitem value={cat.categoryId}>{cat.categoryName}</menuitem>
  // ));

  const getAds = async () => {
    const x = await getAds1(search);
    let e = x.filter((e) => e.statusId === 1);
    setAd(e);
  };

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
  const addAd = () => {
    let path = "";
    if (u !== null) path = "../AddAd";
    else path = "../LogIn";

    navigate(path);
  };
  useEffect(() => {
    // let tmp = ad.filter((e)=>e.statusId==1);
    // setAd(tmp);
    setSmallAd(ad.slice(size - 1, size + countOfLfs - 1));
  }, [ad]);
  useEffect(() => {
    getAds().catch(() => {
      setAd([]);
    });
  }, [search]);
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
  useEffect(
    () => {
      if (search.categoryId !== -1) {
        getSubCat();
      }
      getAds();
      getCat();
      if (JSON.parse(secureLocalStorage.getItem("user"))) setIsLogIn(true);
    },
    [search.categoryId],
    [radioDefaltVal],
    [isLogin]
  );
  const handleChangeType = (typeId) => {
    if (search.typeId === typeId) setSearch({ ...search, typeId: -1 });
    else setSearch({ ...search, typeId: typeId });
  };
  const disconnection = (event) => {
    if (window.confirm("Do you really want to leave?")) {
      secureLocalStorage.clear();
      setIsLogIn(false);
    }
  };

  let navigate = useNavigate();
  const pathP = "../PersonalArea";
  const pathL = "../login";
  const routeChange = () => {
    let userInLocalStorage = JSON.parse(secureLocalStorage.getItem("user"));
    console.log("userInLocalStorage" + userInLocalStorage);
    // if (userInLocalStorage!==undefined) {
    //   navigate(pathP);
    // } else {
    //   console.log("is exist : "+ userInLocalStorage.password);
    //   navigate(pathL);
    // }
    if (userInLocalStorage === null) navigate(pathL);
    else navigate(pathP);
  };
  const handleChangePagination = (event, value) => {
    // setPage(value);
    size = value;
    let x = ad.slice((size - 1) * countOfLfs, size * countOfLfs);
    window.scrollTo(0, 420);
    setSmallAd(x);
  };
  const options = ["אבידה", "מציאה"];
  const [value, setValue] = useState(options[0]);

  const primary = red[500];

  return (
    <div
      dir="rtl"
      style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
    >
      <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <div dir="rtl">
      <div className="title">
        אבד לך משהו? <br></br>
        <b>אולי מצאנו...</b>
        <div
          style={{
            fontSize: "40%",
            color: "#FE2D61",
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
          }}
        >
          אתר השבת אבידה הגדול בישראל
        </div>
      </div>
      <img
        style={{ position: "absolute", marginTop: "5%", left: "5%" }}
        src={w}
      ></img>
      <img
        style={{ position: "absolute", marginTop: "2%", left: "20%" }}
        src={componen}
      ></img>
      <img
        style={{ position: "absolute", marginTop: "2%", right: "1%" }}
        src={Vector}
      ></img>
      <img
        style={{
          position: "absolute",
          marginTop: "103.4%",
          marginLeft: "0%",
          width: "100%",
          height: "6px",
        }}
        src={Line72}
      ></img>
      <img
        style={{ position: "absolute", marginTop: "85%", marginLeft: "0%" }}
        src={Maskgroup}
      ></img>
      <div className="sargel" style={{ left: "25%" }}>
        {/* <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-radio-buttons-group-label"
            defaultValue={search.typeId}
            value={search.typeId}
            name="radio-buttons-group"
            onChange={(e) => {
              handleChangeType(e.target.value, "typeId");
            }}
          >
            <FormControlLabel value="-1" control={<Radio />} label="הכל" />
            <FormControlLabel value="1" control={<Radio />} label="אבידה" />
            <FormControlLabel value="2" control={<Radio />} label="מציאה" />
          </RadioGroup>
        </FormControl> */}
 
        <FormControl
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          style={{
            marginLeft: "10%",
            marginRight: "3%",
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            
          }}
        >
          <InputLabel
            id="demo-simple-select-standard-label"
            style={{
              marginLeft: "18%",
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            }}
          >
            קטגוריה
          </InputLabel>
          <Select
          value={search?.categoryId?search.categoryId:""}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            // value={search.categoryId}
            onChange={(e) => {
              handleChangeCat(e, "categoryId");
            }}
            label="קטגוריה"
            // label="קטגוריה"
            style={{ width: "120px" }}
          >
            {catList}
          </Select>
        </FormControl>
        <span className="pas" style={{ position: "absolute" }}></span>
        <FormControl
          style={{ marginLeft: "10%" }}
          variant="standard"
          sx={{ m: 1, minWidth: 120 }}
          disabled={search.categoryId === -1 || subCategory.length === 0}
        >
          <InputLabel
            id="demo-simple-select-standard-label"
            style={{
              marginLeft: "10%",
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            }}
          >
            תת קטגוריה
          </InputLabel>
          <Select
              value={search?.subCategoryId?search.subCategoryId:""}
            labelId="demo-simple-select-standard-label"
            id="demo-simple-select-standard"
            // value={search.subCategoryId}
            onChange={(e) => {
              handleChangeSubCat(e, "subCategoryId");
            }}
            label="תת קטגוריה"
            style={{ width: "120px" }}
          >
            {subCategory.length !== 0 ? (
              subCategory?.map((cat) => (
                <MenuItem
                  style={{ fontFamily: "Verdana, Geneva, Tahoma, sans-serif" }}
                  value={cat.subCategoryId}
                >
                  {cat.subCategoryName}
                </MenuItem>
              ))
            ) : (
              <></>
            )}
          </Select>
        </FormControl>
        <span
          className="pas"
          style={{ position: "absolute", right: "46%" }}
        ></span>
        <ButtonGroup
          size="large"
          aria-label="large button group"
          dir="ltr"
          style={{ width: "226px", marginTop: "2%" }}
        >
          <Button
            onClick={() => handleChangeType(2)}
            style={{
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
              border: "1px solid rgb(160 163 169) ",
              color: "#A0A3A9",
              background:
                search.typeId === 2 &&
                "linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
              borderRadius: " 10px 0% 0% 10px ",
              width: "113px",
            }}
          >
            מציאה
          </Button>
          <Button
            onClick={() => handleChangeType(1)}
            style={{
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
              border: "1px solid rgb(160 163 169)",
              color: "#A0A3A9",
              background:
                search.typeId === 1 &&
                " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
              borderRadius: "0% 10px 10px 0%",
              width: "113px",
            }}
          >
            אבידה
          </Button>
        </ButtonGroup>
        <Button
          style={{
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            fontSize: "75%",
            color: "#ff124d",
            borderColor:
              " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
            backgroundColor: "#FFFFFF",
            borderRadius: "15px",
            border: "none",
          }}
          variant="outlined"
          onClick={() => {
          
           setSearch({
              ...search,
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
          }}
        >
          נקה מסננים
        </Button>

        <Button
          style={{
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
            border: "1px solid rgb(160 163 169) ",
            color: "#FFFFFF",
            background:
              " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
            borderRadius: " 100px",
            width: "86.86px",
            height: "75.14px",
          }}
          variant="contained"
          onClick={handleClickOpen}
        >
          חיפוש מתקדם
        </Button>

        {isOpen ? (
          <NewSearch
            search={search}
            open={open}
            handleClose={handleClose}
            handleCloseSave={handleCloseSave}
            catList={catList}
            getSubCat={getSubCat}
          ></NewSearch>
        ) : (
          // <DialogSearch
          //   search={search}
          //   open={open}
          //   handleClose={handleClose}
          //   handleCloseSave={handleCloseSave}
          //   catList={catList}
          //   getSubCat={getSubCat}
          // ></DialogSearch>
          <></>
        )}
      </div>

      <Button
        style={{
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
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
      ><Tooltip title="לאיזור האישי">
        <PersonIcon fontSize="large"></PersonIcon></Tooltip>
      </Button>
      <Button
        style={{
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
          position: "fixed",
          left: "7%",
          fontSize: "16px",
          color: "#ff124d",
          borderColor:
            " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
          backgroundColor: "#FFFFFF",
          borderRadius: "15px",
          border: "1px solid rgb(254 10 71)",
          height: "60px",
        }}
        variant="outlined"
        onClick={addAd}
      >
        פרסם מודעה חדשה
      </Button>
      {/* <Button variant="outlined">Outlined</Button> */}
      {/* <button onClick={routeChange}>
        <h4> הוספת מודעה + עדכון מודעה</h4>כניסה לאיזור האישי
      </button> */}
      {/* {isLogin && (
        <Button variant="contained" onClick={disconnection}>
          התנתקות
        </Button>
      )} */}
      <div></div>

      <br></br>
      <br></br>
      <br></br>
      <div id="homepage">
        <Xx arr={smallAd} isPersonalArea={false} status={true}></Xx>
      </div>

      {/* {smallAd.length > 0 ? (
        smallAd.map((a) => (
          <div id="homepage">
            {" "}
            { <Xx obj={a} pa={false} status={true}></Xx> }
            {<ControlledAccordions
              obj={a}
              pa={false}
              status={true}
            ></ControlledAccordions> }
          </div>
        ))
      ) : (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">אין פריטים מתאימים לחיפוש</Alert>
        </Stack>
      )} */}
      <Stack>
        <div dir="ltr">
          <Pagination
            id="page"
            count={Math.ceil(ad.length / countOfLfs)}
            onChange={handleChangePagination}
          />
        </div>
      </Stack>
      {/* <Xx ></Xx> */}
      </div>{" "}
            </ThemeProvider>
          </CacheProvider>
    </div>
  );
};

export default HomePage;
