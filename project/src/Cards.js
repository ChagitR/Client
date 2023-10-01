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
import { useState } from "react";
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
export default function Cards(props) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  // const [edit, setEdit] = useState(false);
  const [status, setStatus] = useState("פעיל");
  const [checked, setChecked] = useState(props.status);
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
    setChecked(event.target.checked);
    if (checked) {
      props.obj.statusId = 2;
      const x = await editAd(props.obj, props.obj.id)
        .then(props.handleClose)
        .catch(console.log("not succes"));
      setStatus("לא פעיל");
    } else {
      props.obj.statusId = 1;
      const x = await editAd(props.obj, props.obj.id)
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
    if (window.confirm("האם אתה בטוח רוצה למחוק את המודעה לצמיתות?")) {
      // console.log(props.obj,props.obj.id);
      props.obj.statusId = 3;
      console.log("e: " + props.obj.statusId);
      const x = await editAd(props.obj, props.obj.id)
        .then(props.handleClose)
        .catch(console.log("not succes"));
    }
  };
  return (
    <div>
      <div className="card">
        {/* <CardActionArea style={{ height: "350px" }}>
         */}
        <Stack direction="row" spacing={1}>
          <Chip
            style={{
              fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
              backgroundColor:
                props.ad.typeId == 1 ? "rgb(204 210 210)" : "  rgb(52 54 54)",
              color:
                props.ad.typeId == 1 ? "  rgb(52 54 54)" : "rgb(204 210 210)",
              boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.15)",
              width: "30%",
              height: "26px",
            }}
            label={props.ad.typeName}
          />
        </Stack>
        <div id="pictureOfAd">
          {" "}
          {props.ad.image !== "defaultValue" ? (
            <CardMedia
              component="img"
              height="140"
              image={`https://localhost:7245/images/${props.ad.image}`}
              alt="green iguana"
            />
          ) : (
            <>
              <CardMedia
                component="img"
                height="140"
                style={{ backgroundColor: "rgb(220 220 220)" }}
              />
            </>
          )}
        </div>
        <CardContent>
          <Typography gutterBottom variant="h5" component="a">
            <a>{props.ad.subCategoryName}</a>
          </Typography>
          <Typography gutterBottom fontSize="140%">
            <a style={{ color: "rgb(255, 255, 255)" }}>
              {props.ad.common === "" && "a"}
            </a>
            <a style={{ color: "#737373" }}> {props.ad.common}</a>
          </Typography>{" "}
          <Typography variant="body2" color="#737373">
            <CalendarMonthIcon
              fontSize="s"
              sx={{ color: teal[900], marginLeft: "2%" }}
            ></CalendarMonthIcon>

            <span style={{ fontSize: "14px" }}>
              {date(props.ad.datePublished).format("DD.MM.YYYY")}
            </span>
          </Typography>{" "}
          <Typography variant="body2" color="#737373">
            <RoomOutlinedIcon
              fontSize="s"
              sx={{ color: teal[900], marginLeft: "2%" }}
            ></RoomOutlinedIcon>
            {props.ad.cities.join(", ")}
          </Typography>{" "}
          <Typography variant="body2" color="#737373">
            <CallOutlinedIcon
              fontSize="s"
              sx={{ color: teal[900], marginLeft: "2%" }}
            ></CallOutlinedIcon>
            {props.ad.phone}
          </Typography>
          <Typography variant="body2" color="#737373">
            <AlternateEmailOutlinedIcon
              fontSize="s"
              sx={{ color: teal[900], marginLeft: "2%" }}
            ></AlternateEmailOutlinedIcon>
            <a>{props.ad.email}</a>
          </Typography>
        </CardContent>
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
    </div>
  );
}
