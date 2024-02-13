import React, {useState} from 'react';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import isFunction from 'lodash/isFunction';
import TouchableInput from '../TouchableInput';
import Text from '../Text';
import PREFERRED_DATE from '../../../assets/icons/preferreddate.png';

export default function DatePicker({onChange, maxDate, minDate, value, error}) {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = date => {
    console.warn('A date has been picked: ', date.toLocaleDateString());
    if (isFunction(onChange)) {
      onChange(date);
    }
    hideDatePicker();
  };

  return (
    <>
      <TouchableInput
        onPress={showDatePicker}
        error={error}
        icon={PREFERRED_DATE}>
        <Text>{value ? value.toLocaleDateString() : ''}</Text>
      </TouchableInput>

      <DateTimePickerModal
        isVisible={isDatePickerVisible}
        mode="date"
        onConfirm={handleConfirm}
        onCancel={hideDatePicker}
        maximumDate={maxDate}
        minimumDate={minDate}
      />
    </>
  );
}
