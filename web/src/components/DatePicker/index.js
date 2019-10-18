import React, { useRef, useEffect, useState } from 'react';
import ReactDatePicker from 'react-datepicker';
import { format, parseISO } from 'date-fns';
import pt from 'date-fns/locale/pt';
import { useField } from '@rocketseat/unform';
import PropTypes from 'prop-types';

import 'react-datepicker/dist/react-datepicker.css';

export default function DatePicker({ name, placeholder, selectedDate }) {
  const ref = useRef(null);
  const { fieldName, registerField, error } = useField(name);
  const [selected, setSelected] = useState(
    selectedDate ? parseISO(selectedDate) : new Date()
  );

  useEffect(() => {
    registerField({
      name: fieldName,
      ref: ref.current,
      path: 'props.selected',
      clearValue: pickerRef => {
        pickerRef.clear();
      },
    });
    // eslint-disable-next-line
  }, [ref.current, fieldName]);

  return (
    <>
      <ReactDatePicker
        name={fieldName}
        selected={selected}
        onChange={date => setSelected(date)}
        minDate={new Date()}
        showTimeSelect
        timeFormat="p"
        dateFormat="Pp"
        locale={pt}
        ref={ref}
        placeholderText={placeholder}
        autoComplete="off"
      />
      {error && <span>{error}</span>}
    </>
  );
}

DatePicker.propTypes = {
  name: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  selectedDate: PropTypes.string,
};

DatePicker.defaultProps = {
  selectedDate: format(new Date(), "yyyy-MM-dd'T'HH:mm:ssxxx"),
  // selectedDate: '2019-07-10T15:00:00-04:00',
};

// '2019-07-10T15:00:00-04:00'
