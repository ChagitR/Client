import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Cards from "./Cards";
import CardPersonal from "./CardPersonal";
import Stack from "@mui/material/Stack";

import Alert from "@mui/material/Alert";

import "./StyleHomePage.css";
// const Item = styled(Paper)(({ theme }) => ({
//   backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: "center",
//   color: theme.palette.text.secondary,
// }));

// function FormRow() {
//   return (
//     <React.Fragment>
//       {w.map(() => (
//         <Grid item xs={2}>
//           <Cards></Cards>
//         </Grid>
//       ))}
//     </React.Fragment>
//   );
// }

const Xx = (props) => {
  const w = props.arr;
  return (
    <div>
      {w.length > 0 ? (<>{props.isPersonalArea ? (   <Box sx={{ flexGrow: 1 }}>
            {w.map((e) => (
             
                (e.statusId)!==3 && <CardPersonal
                  ad={e}
                  status={true}
                ></CardPersonal>
                
            ))}
        </Box>):(   <Box sx={{ flexGrow: 1 }}>
          <Grid container spacing={5} columns={{ xs: 2, sm: 8, md: 8 }}>
            {w.map((e) => (
              <Grid item xs={2} sm={10} md={2}>
                <Cards
                  ad={e}
                  status={true}
                ></Cards>
              </Grid>
            ))}
          </Grid>
        </Box>)}</> ) : (
        <Stack sx={{ width: "100%" }} spacing={2}>
          <Alert severity="error">אין פריטים מתאימים לחיפוש</Alert>
        </Stack>
      )}
    </div>
  );
};
export default Xx;
