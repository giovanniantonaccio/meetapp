import React, { useState, useRef, useEffect } from 'react';
import DateFnsUtils from '@date-io/date-fns';
import { DatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import ptBr from 'date-fns/locale/pt-BR';
import { createMuiTheme } from '@material-ui/core';
import { ThemeProvider } from '@material-ui/styles';

import { useField } from '@rocketseat/unform';

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#f94d6a',
    },
  },
});

export default function CustomizedDatePicker({ name }) {
  const ref = useRef(null);
  const { fieldName, defaultValue, registerField } = useField(name);
  const [selectedDate, setSelectedDate] = useState(new Date());

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.value',
    });
    // eslint-disable-line
  }, [fieldName, registerField]);

  useEffect(() => {
    console.tron.log('Data selecionada', selectedDate);
  }, [selectedDate]);

  return (
    <ThemeProvider theme={customTheme}>
      <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptBr}>
        <DatePicker
          autoOk
          variant="inline"
          format="dd 'de' MMMM 'de' yyyy"
          theme="green"
          minDate={new Date()}
          InputProps={{
            disableUnderline: true,
          }}
          name={fieldName}
          ref={ref}
          value={selectedDate}
          onChange={date => setSelectedDate(date)}
        />
      </MuiPickersUtilsProvider>
    </ThemeProvider>
  );
}
