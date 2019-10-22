// @flow
import "date-fns";
import React, { Fragment } from "react";
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from "@material-ui/pickers";
import DateFnsUtils from "@date-io/date-fns";

type $Props = { label: string };

const DatePicker = (props: $Props) => {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };
  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={DateFnsUtils}>
        <KeyboardDatePicker
          disableToolbar
          variant="inline"
          format="MM/dd/yyyy"
          margin="normal"
          id="date-picker-inline"
          KeyboardButtonProps={{
            "aria-label": "change date",
          }}
          value={selectedDate}
          onChange={handleDateChange}
          {...props}
        />
      </MuiPickersUtilsProvider>
    </Fragment>
  );
};

export default DatePicker;
