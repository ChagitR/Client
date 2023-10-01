import { useState, useEffect } from "react";
import React from "react";
import { loginService } from "./Service/User";
import { signInService } from "./Service/User";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import "./StyleHomePage.css";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import secureLocalStorage from "react-secure-storage";
import { useForm } from "react-hook-form";
import { Message } from "primereact/message";
import HomeIcon from "@mui/icons-material/Home";
import e from "./image/e.png";
import Icon from "./image/Icon.png";
import Vector1 from "./image/Vector1.png";
import Vector2 from "./image/Vector2.png";
import Vector3 from "./image/Vector3.png";
import Tooltip from "@mui/material/Tooltip";
import Vector from "./image/Vector.png";
import componen from "./image/Componen.png";
import rtlPlugin from 'stylis-plugin-rtl';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { prefixer } from 'stylis';
import { createTheme, ThemeProvider } from "@mui/material/styles";
const cacheRtl = createCache({
  key: "muirtl",
  stylisPlugins: [prefixer, rtlPlugin],
});
const theme = createTheme({
  direction: "rtl", // Both here and <body dir="rtl">
});
export default function Login() {
  // const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [data, setData] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => console.log(data);

  const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };
  const login = async () => {
    const x = await loginService(email, password).catch((error) => {
      console.log("err " + error);
      alert("לא קיים משתשמש זה");
    });
    if (x) {
      setData(x);
      secureLocalStorage.setItem("user", JSON.stringify(x));
      routeChange();
    }
  };
  const signIn = async (data, e) => {
    const x = await signInService(data).catch((error) => {
      console.log("err " + error);
    });
    setData(x);
    if (x) {
      secureLocalStorage.setItem("user", JSON.stringify(x));
      routeChange();
    }
  };

  let navigate = useNavigate();

  const routeChange = () => {
    let path = "../personalarea";
    navigate(path);
  };

  const routeHomePage = () => {
    let path = "../";
    navigate(path);
  };

  const requierd = (val) => ({
    maxLength: {
      value: val,
      message: "dfjnf",
    },
  });
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
    lastName: {
      required: "שדה חובה",
      minLength: {
        value: 2,
        message: "שם משפחה חייב להכיל לפחות 2 אותיות",
      },
    },
    identity: {
      required: "שדה חובה",
      minLength: {
        value: 9,
        message: "מספר זהות חייב להכיל 9 ספרות",
      },
      maxLength: {
        value: 9,
        message: "מספר זהות חייב להכיל 9 ספרות בלבד ",
      },
    },
    phone: {
      required: "שדה חובה",
      minLength: {
        value: 9,
        message: "מספר טלפון חייב להכיל מינימום 9 ספרות",
      },
      maxLength: {
        value: 15,
        message: "מספר טלפון לא חוקי ",
      },
    },
    email: {
      required: "שדה חובה",
      pattern: {
        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
        message: "כתובת המייל לא תקינה",
      },
    },
    address: {
      required: "שדה חובה",
      minLength: {
        value: 5,
        message: "כתובת אינה תקינה",
      },
    },
    building: {
      required: "שדה חובה",
      minLength: {
        value: 1,
        message: "מספר לא חוקי",
      },
    },
  };
  const fff = () => {
    console.log("fff");
  };
  // const onSubmit = data => console.log(data);
  return (
    <div style={{ borderColor: "#f2446f" }}>
         <CacheProvider value={cacheRtl}>
    <ThemeProvider theme={theme}>
      <div dir="rtl">
      <>
        <img style={{ position: "absolute", marginTop: "40%" }} src={e}></img>
        <img
          style={{ position: "absolute", marginTop: "3%", right: "13%" }}
          src={Vector1}
        ></img>
        <img
          style={{ position: "absolute", marginTop: "0%", right: "0%" }}
          src={Vector2}
        ></img>
        <img
          style={{ position: "absolute", marginTop: "5%", right: "7%" }}
          src={Vector3}
        ></img>
        <img
          style={{ position: "absolute", marginTop: "3%", right: "5%" }}
          src={Vector}
        ></img>
        <img
          style={{ position: "absolute", marginTop: "5%", right: "3%" }}
          src={Vector}
        ></img>
        <img
          style={{ position: "absolute", marginTop: "10%", marginLeft: "10%" }}
          src={componen}
        ></img>
      </>
      <div>
        <div style={{ width: "50%", marginLeft: "25%", marginRight: "25%" }}>
          <Box sx={{ width: "100%" }}>
            <Grid
              container
              rowSpacing={1}
              columnSpacing={{ xs: 1, sm: 5, md: 3 }}
            >
              <Grid item xs={6}>
                {/* login  */}
                <span className="in">
                  <img
                    style={{ position: "relative", top: "3%" }}
                    src={Icon}
                  ></img>
                  <h1>כניסה </h1>

                  <br></br>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#fe2d61",
                          },
                        },
                      }}
                      id="outlined-basic"
                      label="אימייל"
                      variant="outlined"
                      onChange={(e) => setEmail(e.target.value)}
                    />

                    <br></br>
                    <br></br>
                    <FormControl
                      sx={{
                        m: 1,
                        width: "25ch",
                        "& .MuiOutlinedInput-root": {
                          "&.Mui-focused fieldset": {
                            borderColor: "#fe2d61",
                          },
                        },
                      }}
                      variant="outlined"
                    >
                      <InputLabel htmlFor="outlined-adornment-password">
                        סיסמה
                      </InputLabel>
                      <OutlinedInput
                        onChange={(e) => setPassword(e.target.value)}
                        id="outlined-adornment-password"
                        type={showPassword ? "text" : "password"}
                        endAdornment={
                          <InputAdornment position="end">
                            <IconButton
                              aria-label="toggle password visibility"
                              onClick={handleClickShowPassword}
                              onMouseDown={handleMouseDownPassword}
                              edge="end"
                            >
                              {showPassword ? (
                                <VisibilityOff />
                              ) : (
                                <Visibility />
                              )}
                            </IconButton>
                          </InputAdornment>
                        }
                        label="Password"
                      />
                    </FormControl>

                    <br></br>
                    <br></br>
                    <Button
                      style={{
                        border: "none",

                        color: "#FFFFFF",
                        background:
                          " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
                      }}
                      variant="contained"
                      className="button"
                      onClick={login}
                    >
                      Login
                    </Button>
                  </Box>
                </span>
              </Grid>
              <Grid item xs={6}>
                <form onSubmit={handleSubmit(signIn)}>
                  <div className="in">
                    <img
                      style={{ position: "relative", top: "3%" }}
                      src={Icon}
                    ></img>
                    <h1>הרשמה </h1>
                    <Box
                      component="form"
                      sx={{
                        "& > :not(style)": { m: 1, width: "25ch" },
                      }}
                      noValidate
                      autoComplete="off"
                    >
                      <FormControl
                        sx={{
                          m: 1,
                          width: "25ch",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "#fe2d61",
                            },
                          },
                        }}
                        variant="outlined"
                      >
                        <TextField
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "#fe2d61",
                              },
                            },
                          }}
                          id="outlined-basic"
                          label="שם מתשתמש"
                          variant="outlined"
                          {...register("userName", registerOptions.userName)}
                        />
                        {errors?.userName && (
                          <Alert
                            style={{ backgroundColor: "rgb(255 255 255)" }}
                            severity="error"
                          >
                            {errors.userName.message}
                          </Alert>
                        )}
                      </FormControl>
                      <FormControl
                        sx={{
                          m: 1,
                          width: "25ch",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "#fe2d61",
                            },
                          },
                        }}
                        variant="outlined"
                      >
                        <TextField
                          sx={{
                            "& .MuiOutlinedInput-root": {
                              "&.Mui-focused fieldset": {
                                borderColor: "#fe2d61",
                              },
                            },
                          }}
                          id="outlined-basic"
                          label="אימייל"
                          variant="outlined"
                          {...register("email", registerOptions.email)}
                        />
                        {errors?.email && (
                          <Alert
                            style={{ backgroundColor: "rgb(255 255 255)" }}
                            severity="error"
                          >
                            {errors.email.message}
                          </Alert>
                        )}
                      </FormControl>
                      <FormControl
                        sx={{
                          m: 1,
                          width: "25ch",
                          "& .MuiOutlinedInput-root": {
                            "&.Mui-focused fieldset": {
                              borderColor: "#fe2d61",
                            },
                          },
                        }}
                        variant="outlined"
                      >
                        <InputLabel htmlFor="outlined-adornment-password">
                          סיסמה
                        </InputLabel>
                        <OutlinedInput
                          {...register("password", registerOptions.password)}
                          id="outlined-adornment-password"
                          type={showPassword ? "text" : "password"}
                          endAdornment={
                            <InputAdornment position="end">
                              <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                              >
                                {showPassword ? (
                                  <VisibilityOff />
                                ) : (
                                  <Visibility />
                                )}
                              </IconButton>
                            </InputAdornment>
                          }
                          label="Password"
                        />
                        {errors?.password && (
                          <Alert
                            style={{ backgroundColor: "rgb(255 255 255)" }}
                            severity="error"
                          >
                            {errors.password.message}
                          </Alert>
                        )}
                      </FormControl>
                    </Box>
                    <Button
                      style={{
                        margin: "8px",
                        width: "25ch",
                        border: "none",
                        color: "#FFFFFF",
                        background:
                          " linear-gradient(107.3deg, #FE2C61 9.49%, #FF0342 90.6%)",
                      }}
                      variant="contained"
                      className="button"
                      type="submit"
                    >
                      signIn
                    </Button>
                  </div>
                </form>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div>
      <Tooltip title="דף הבית">
      <Button
        style={{
          border: "none",
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
       
        onClick={routeHomePage}
      >
        <HomeIcon fontSize="large"></HomeIcon>
      </Button></Tooltip>
      {/* <Button variant="contained" onClick={routeHomePage}>
        דף הבית
      </Button> */}
      </div>{" "}
          </ThemeProvider>
        </CacheProvider>
    </div>
  );
}
