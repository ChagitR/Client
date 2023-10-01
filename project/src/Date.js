import * as React from "react";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import { DateRangePicker } from "@mui/x-date-pickers-pro/DateRangePicker";
import date from "dayjs";

export default function Date(props) {
  const l = (e) => {
    props.getDetails(e, "date");
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DemoContainer  sx={{ m: 10, minWidth: 100 ,marginTop:"0%",marginBottom:"0%"}}
        components={["DateRangePicker", "DateRangePicker", "DateRangePicker"]}
      >
        <DemoItem label="טווח התאריכים" component="DateRangePicker">
          <DateRangePicker 
          
            defaultValue={
              props.objToChange != null
                ? [
                    date(props.objToChange.startDate),
                    date(props.objToChange.endDate),
                  ]
                : [date(), date()]
            }
            calendars={1}
            onChange={l}
          />
        </DemoItem>
      </DemoContainer>
    </LocalizationProvider>
  );
}
