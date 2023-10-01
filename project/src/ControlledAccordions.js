import * as React from "react";
import { useState, useEffect } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import EditAd from "./EditAd";
import Switch from "@mui/material/Switch";
import { editAd } from "./Service/Ads";
import "./StyleHomePage.css";

// import React from "react";
// import Option from "./Options"
import Menu from "@mui/material/Menu";
import MoreVertIcon from "@mui/icons-material/MoreVert";

import MenuItem from "@mui/material/MenuItem";
const ControlledAccordions = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [edit, setEdit] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [status, setStatus] = useState("פעיל");
  const [checked, setChecked] = useState(props.status);
  const open1 = Boolean(anchorEl);
  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };
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
  const ITEM_HEIGHT = 48;
  useEffect(() => {
    //  if(props.obj.statusId==1){
    //   setChecked(true);
    //  }
    //  else
    //  setChecked(false);
    // console.log("Checked: "+checked);
  });

  console.log(props.obj.startDate);

  return (
    <div>
      {props.pa && (
        <div>
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
      )}

      <Accordion
        expanded={expanded === "panel1"}
        onChange={handleChange("panel1")}
      >
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography sx={{ width: "20%", flexShrink: 0 }}>
            <h3>{props.obj.subCategoryName}</h3>
          </Typography>
          <Typography sx={{ width: "20%", flexShrink: 0 }}>
            {props.obj.typeName}
          </Typography>
          <Typography sx={{ width: "20%", flexShrink: 0 }}>
            {props.obj.cities}
          </Typography>
          <Typography sx={{ width: "25%", flexShrink: 0 }}>
            {" "}
            תאריך פרסום: {props.obj.datePublished}
          </Typography>
          {!checked && (
            <Typography sx={{ width: "10%", flexShrink: 0 }}>
              <div id="not">מודעה לא פעילה</div>
            </Typography>
          )}
        </AccordionSummary>

        <AccordionDetails>
          <Typography>
            {edit == false ? (
              <h4>{props.obj.common}</h4>
            ) : (
              <input value={props.obj.common}></input>
            )}
          </Typography>
          <Typography>{props.obj.phone}</Typography>
          <Typography>{props.obj.email}</Typography>
          <Typography>
            start date:
            {props.obj.startDate}
          </Typography>
          <Typography>
            end date:
            {props.obj.endDate}
          </Typography>
          <Typography>
            עיר:
            {props.obj.cities}
          </Typography>
          <Typography>
            <span>
              {props.obj.image ? (
                <img
                  style={{ width: "49px", height: "49px" }}
                  src={`https://localhost:7245/images/${props.obj.image}`}
                />
              ) : (
                "image"
              )}{" "}
            </span>
          </Typography>
        </AccordionDetails>
      </Accordion>
      <br></br>
      {isOpen && (
        <EditAd
          open={open}
          handleClose={handleClose}
          handleCloseSave={handleCloseSaveEdit}
          adId={props.obj.id}
          adDetails={props.obj}
        ></EditAd>
      )}
    </div>
  );
};

export default ControlledAccordions;
