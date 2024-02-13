class DateParser {
  // Parse a date string in "YYYY-MM-DD" format into a Date object
  static parse(dateString) {
    const parts = dateString.split('-');
    if (parts.length === 3) {
      const year = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1; // Subtract 1 because months are zero-based
      const day = parseInt(parts[2], 10);
      if (!isNaN(year) && !isNaN(month) && !isNaN(day)) {
        return new Date(year, month, day);
      }
    }
    throw new Error('Invalid date format. Use "YYYY-MM-DD".');
  }

  // Format a Date object as a string in "YYYY-MM-DD" format
  static format(date) {
    const year = date.getFullYear();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${year}-${month}-${day}`;
  }
  static formatWithOrdinal(date) {
    const year = date.getFullYear();
    const month = date.toLocaleString('default', {month: 'long'});
    const day = date.getDate();
    const dayString = addOrdinalSuffix(day); // Helper function to add the ordinal suffix

    return `${dayString} ${month} ${year}`;
  }
}

function addOrdinalSuffix(day) {
  if (day >= 11 && day <= 13) {
    return `${day}th`;
  }
  switch (day % 10) {
    case 1:
      return `${day}st`;
    case 2:
      return `${day}nd`;
    case 3:
      return `${day}rd`;
    default:
      return `${day}th`;
  }
}

export default DateParser;
