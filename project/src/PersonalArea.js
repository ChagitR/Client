import { useState, useEffect } from "react";
import React from "react";
import Button from "@mui/material/Button";
import { useNavigate } from "react-router-dom";
import { getAdsByUserId } from "./Service/Ads";
import secureLocalStorage from "react-secure-storage";
import Box from "@mui/material/Box";
import Fab from "@mui/material/Fab";
import AddIcon from "@mui/icons-material/Add";
import Xx from "./Xx";
import "./StyleHomePage.css";
import EditUser from "./EditUser";
export default function PersonalArea() {
  const [user, setUser] = useState({});
  const [ad, setAd] = useState([]);

  const getAds = async () => {
    const ad = await getAdsByUserId();
    if (ad.length > 0) setAd(ad);
    // console.log("id: "+ad[0].id);
  };
  const routeHomePage = () => {
    let path = "../";
    navigate(path);
  };
  useEffect(() => {
    const useri = JSON.parse(secureLocalStorage.getItem("user"));
    if (useri === null) routeHomePage();
    // console.log("user: " + useri);
    setUser(useri);
  }, []);
  useEffect(() => {
    getAds();
  }, [ad]);
  useEffect(() => {
    getAds();
  });

  let navigate = useNavigate();

  const addAd = () => {
    let path = "../AddAd";
    navigate(path);
  };

  const disconnection = (event) => {
    if (window.confirm("האם אתה בטוח שאתה רוצה לעזוב?")) {
      secureLocalStorage.clear();
      let path = "../";
      navigate(path);
    }
  };
  return (
    <>
      <Button
        style={{
          top: "2%",
          position: "absolute",
          right: "1%",
          border: "none",
          borderRadius: "10px",
          fontSize: "80%",
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
          // height:"100%",
          color: "#FFFFFF",
          background:
            " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
        }}
        variant="contained"
        className="button"
        onClick={disconnection}
      >
        התנתקות
      </Button>
      <Button
        style={{
          color: "#ff124d",
          position: "fixed",
          left: "12%",
          top: "1%",
          fontSize: "150%",
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",

          borderColor:
            " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
          backgroundColor: "#FFFFFF",
          borderRadius: "15px",
          border: "none",
        }}
        variant="outlined"
        onClick={routeHomePage}
      >
        דף הבית
      </Button>
      <Button
        style={{
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
          position: "fixed",
          top: "1%",
          left: "1%",
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

      <b
        style={{
          position: "absolute",
          left: "47%",

          fontSize: "200%",
          marginRight: "25%",
          width: "30%",
          top: "15%",
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
        }}
      >
        <div style={{ color: "#14B2B1", marginBottom: "4%" }}>איזור אישי</div>
        <div>{user.userName} שלום </div>
      </b>
      <div
        style={{
          position: "absolute",
          left: "20%",
          width: "44%",
          top: "35%",
          fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
        }}
      >
        <EditUser></EditUser>
      </div>
      <div id="per">
        <b
          style={{
            position: "absolute",
            left: "64%",

            fontSize: "150%",
            top: "53%",
            fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
          }}
        >
          <div> מודעות שפרסמת </div>
        </b>
        <Xx arr={ad} isPersonalArea={true} status={true} ></Xx>
      </div>

    </>
  );
}
