import { useState, useEffect } from "react";
import { editService } from "./Service/User";
import React, { useRef } from "react";
import { useForm } from "react-hook-form";
import FormControl from "@mui/material/FormControl";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import TextField from "@mui/material/TextField";
import Alert from "@mui/material/Alert";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import secureLocalStorage from "react-secure-storage";
// import { Button } from "primereact/button";
import { CacheProvider } from '@emotion/react';
import rtlPlugin from 'stylis-plugin-rtl';
import { prefixer } from 'stylis';
import createCache from '@emotion/cache';

import Button from "@mui/material/Button";
import { Toast } from "primereact/toast";
export default function EditUser() {
  const toast = useRef(null);
  const toastBC = useRef(null);

  const clear = (submit, user) => {
    toastBC.current.clear();
    submit && show(user);
  };

  const show = (user) => {
    editUser(user);
    toast.current.show({
      severity: "success",
      summary: "יש!!",
      detail: "הפרטים נשמרו בהצלחה",
    });
  };
  const theme = createTheme({
    direction: 'rtl', // Both here and <body dir="rtl">
  });
  const confirm = (user) => {
    toastBC.current.show({
      severity: "info",
      sticky: true,
      className: "border-none",
      content: (
        <div
          className="flex flex-column align-items-center"
          style={{ flex: "1" }}
        >
          <div className="text-center">
            <i
              className="pi pi-exclamation-triangle"
              style={{ fontSize: "3rem" }}
            ></i>
            <div className="font-bold text-xl my-3">האם אתה בטוח?</div>
          </div>
          <div className="flex gap-2">
            <Button
              style={{
                border: "none",

                color: "#FFFFFF",
                background:
                  " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
              }}
              variant="contained"
              onClick={(e) => clear(true, user)}
              type="button"
              className="p-button-success w-6rem"
            >
              אישור
            </Button>

            <Button
              style={{
                border: "none",

                color: "#FFFFFF",
                background:
                  " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
              }}
              variant="contained"
              onClick={(e) => clear(false, user)}
              type="button"
              className="p-button-warning w-6rem"
            >
              ביטול
            </Button>
          </div>
        </div>
      ),
    });
  };

  let userLast = JSON.parse(secureLocalStorage.getItem("user"));
  useEffect(() => {
    console.log(userLast);
  }, []);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [showPassword, setShowPassword] = React.useState(false);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const registerOptions = {
    userName: {
      required: "שדה חובה",
      minLength: {
        value: 2,
        message: "שם פרטי חייב להכיל לפחות 2 אותיות",
      },
    },
    password: {
      required: "שדה חובה",
      minLength: {
        value: 4,
        message: "סיסמה חייבת להכיל לפחות 4 תוים",
      },
    },

    email: {
      required: "שדה חובה",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "כתובת המייל לא תקינה",
      },
    },
   
  };
  // const edit = async () => {
  //   const user = {
  //     userName: name,
  //     email: email,
  //     Password: password,
  //   };
  //   const x = await editService(user);
  // };
  const cacheRtl = createCache({
    key: 'muirtl',
    stylisPlugins: [prefixer, rtlPlugin],
  });
  const editUser = async (user) => {
    console.log("userName " + user.userName); 
    console.log("mail " + user.email);
    console.log("password " + user.password);
    console.log("userId " + userLast.userId);
    await editService(user, userLast.userId);
  };
  return (
    <div dir="rtl" className="edit">
      <form onSubmit={handleSubmit(confirm)}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={2} columns={{ xs: 2, sm:8, md:24}}>
          <Grid item xs={2} sm={10} md={5}>
          <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
          <div dir="rtl">
            <TextField
          
              sx={{
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#fe2d61",
                  },
                },
              }}
              defaultValue={userLast.userName}
              id="outlined-basic"
              label="שם משתמש"
              variant="outlined"
              {...register("userName", registerOptions.userName)}
            /></div>  </ThemeProvider>
            </CacheProvider>
            {errors?.userName && (
              <Alert
                style={{ backgroundColor: "rgb(255 255 255)" }}
                severity="error"
              >
                {errors.userName.message}
              </Alert>
            )}
            <br></br>
          </Grid>
       
        <Grid item xs={2} sm={10} md={5}>
        <CacheProvider value={cacheRtl}>
  <ThemeProvider theme={theme}>
          <div dir="rtl">
          <TextField
            sx={{
              "& .MuiOutlinedInput-root": {
                "&.Mui-focused fieldset": {
                  borderColor: "#fe2d61",
                },
              },
            }}
            defaultValue={userLast.email}
            id="outlined-basic"
            label="אימייל"
            variant="outlined"
            {...register("email", registerOptions.email)}
          /></div>  </ThemeProvider>
          </CacheProvider>
          {errors?.email && (
            <Alert
              style={{ backgroundColor: "rgb(255 255 255)" }}
              severity="error"
            >
              {errors.email.message}
            </Alert>
          )}
        </Grid>
    
        {/* <button className="button" type="submit">
          edit
        </button>
      */}
        <Grid item xs={2} sm={10} md={5}>
          <Toast ref={toast} />
          <Toast ref={toastBC} position="bottom-center" />
          <Button
            style={{
              border: "none",
              borderRadius: "50px",
              fontSize:"130%", fontFamily: "Verdana, Geneva, Tahoma, sans-serif",
height:"55px",
              color: "#FFFFFF",
              background:
                " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
            }}
            variant="contained"
            className="button"
            type="submit"
            
          >
            שמור שינויים
          </Button>
        </Grid> </Grid>
        </Box>
      </form>
    </div>
  );
}
