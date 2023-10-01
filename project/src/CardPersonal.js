import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
// import "./StyleHomePage.css";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import EditIcon from "@mui/icons-material/Edit";
import EditAd from "./EditAd";
import Switch from "@mui/material/Switch";
import { editAd } from "./Service/Ads";
import { useState,useEffect } from "react";
import Menu from "@mui/material/Menu";
import { teal } from "@mui/material/colors";
import AlternateEmailOutlinedIcon from "@mui/icons-material/AlternateEmailOutlined";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import RoomOutlinedIcon from "@mui/icons-material/RoomOutlined";
import MenuItem from "@mui/material/MenuItem";
import "./Style/Cards.css";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";
import date from "dayjs";
export default function CardPersonal(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState("פעיל");
  const [checked, setChecked] = useState(()=>{
    if(props.ad.statusId===1) return true;
    if(props.ad.statusId===2) return false;
  });
  const open1 = Boolean(anchorEl);
  const ITEM_HEIGHT = 48;
  // const handleChange = (panel) => (event, isExpanded) => {
  //   setExpanded(isExpanded ? panel : false);
  // };

  const handleCloseSaveEdit = () => {
    setOpen(false);
    setIsOpen(false);
  };
  const handleChangeStatus = async (event) => {
    console.log("ppppp "+event.target.checked);
    let data = {common: props.ad.common,phone:props.ad.phone}; 

    setChecked(event.target.checked);
    if (checked) {
      props.ad.statusId = 2;
console.log("EEE "+props.ad.statusId);
      const x = await editAd(props.ad, props.ad.id,data)
        .then(props.handleClose)
        .catch(console.log("not succes"));
      setStatus("לא פעיל");
    } else {
      props.ad.statusId = 1;
console.log("EEE "+props.ad.statusId);

      const x = await editAd(props.ad, props.ad.id,data)
        .then(props.handleClose)
        .catch(console.log("not succes"));
      setStatus("פעיל");
    }
  };
  const handleClickOpen = () => {
    setIsOpen(true);
    setOpen(true);
    setAnchorEl(null);
  };
  const handleClose = () => {
    setOpen(false);
    setIsOpen(false);
  };
  const handleClose2 = () => {
    setAnchorEl(null);
  };
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const deleteAd = async () => {
    let data = {common: props.ad.common,phone:props.ad.phone}; 
    if (window.confirm("האם אתה בטוח רוצה למחוק את המודעה לצמיתות?")) {
      console.log(props.ad+"-------------");
      props.ad.statusId = 3;
      console.log("e: " + props.ad.statusId);
      await editAd(props.ad, props.ad.id,data)
        .then(props.handleClose)
        .catch(console.log("not succes"));
    }
  };
 
  return (
    <div dir="rtl">
      <div className="cardPer">
        <div>
          <div className="three">
            
            <IconButton
              aria-label="more"
              id="long-button"
              aria-controls={open1 ? "long-menu" : undefined}
              aria-expanded={open1 ? "true" : undefined}
              aria-haspopup="true"
              onClick={handleClick}
            >
              <MoreVertIcon />
            </IconButton>
          </div>
          <Menu
            id="long-menu"
            MenuListProps={{
              "aria-labelledby": "long-button",
            }}
            anchorEl={anchorEl}
            open={open1}
            onClose={handleClose2}
            PaperProps={{
              style: {
                maxHeight: ITEM_HEIGHT * 4.5,
                width: "20ch",
              },
            }}
          >
            <MenuItem onClick={handleClickOpen}>
              <IconButton>
                <EditIcon />
              </IconButton>
              עריכה
            </MenuItem>
            <MenuItem onClick={deleteAd}>
              <IconButton>
                <DeleteIcon />
              </IconButton>
              מחיקה
            </MenuItem>
            <MenuItem>
              <Tooltip title={status}>
                <Switch
                  checked={checked}
                  onChange={handleChangeStatus}
                  inputProps={{ "aria-label": "controlled" }}
                />
              </Tooltip>
              מצב מודעה
            </MenuItem>
          </Menu>
        </div>

        {/* <CardActionArea style={{ height: "350px" }}>
         */}
      
        
        <div id="pictureOfAd">
          {props.ad.image !== "defaultValue" ?(
          <img
                  style={{ position:"absolute",width: "3%",height:"7%",marginTop:"-2%"}}
                  src={`https://localhost:7245/images/${props.ad.image}`}
                />
                ):(<span style={{backgroundColor:"#d2dfdf", position:"absolute",width: "3%",height:"7%",marginTop:"-2%"}}></span>) } 
       
        </div>
   
       
            <a className="letter">{props.ad.subCategoryName}</a>
       
        
          
            <span style={{ fontSize: "14px" }}>
              {date(props.ad.datePublished).format("DD/MM/YYYY")}
            </span>
         
         
      
            {props.ad.cities.join(", ")}      
            <Chip
            style={{
              position:"absolute",
              marginRight:"39%",
              fontSize:"60%",
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
              backgroundColor:
                props.ad.typeId == 1 ? "rgb(204 210 210)" : "  rgb(52 54 54)",
              color:
                props.ad.typeId == 1 ? "  rgb(52 54 54)" : "rgb(204 210 210)",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
              width: "3%",
              height: "26px",
            }}
            label={props.ad.typeName}
          />

        {/* </CardActionArea> */}
        {isOpen && (
          <EditAd
            open={open}
            handleClose={handleClose}
            handleCloseSave={handleCloseSaveEdit}
            adId={props.ad.id}
            adDetails={props.ad}
          ></EditAd>
        )}
      </div>
      {!checked && (
              <Typography sx={{ width: "10%", flexShrink: 0 }}>
                <div id="not">מודעה לא פעילה</div>
              </Typography>
            )}
      <br></br>
    </div>
  );
}
