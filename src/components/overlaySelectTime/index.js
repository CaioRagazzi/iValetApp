import React, {useState} from 'react';
import {Overlay} from 'react-native-elements';
import DatePicker from 'react-native-date-picker';

export default function OverlaySelectTime(props) {
  const [date, setDate] = useState(new Date());
  return (
    <Overlay
      isVisible={props.visible ? props.visible : false}
      onBackdropPress={() => props.onClose()}>
      <DatePicker date={date} mode="time" onDateChange={setDate} />
    </Overlay>
  );
}
