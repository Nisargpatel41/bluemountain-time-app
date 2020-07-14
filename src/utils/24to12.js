function to12(hours, minutes) {
  // Check whether AM or PM
  var newformat = hours >= 12 ? "PM" : "AM";

  // Find current hour in AM-PM Format
  hours = hours % 12;

  // To display "0" as "12"
  hours = hours ? hours : 12;
  minutes = minutes < 10 ? "0" + minutes : minutes;

  const endTime = `${hours} : ${minutes} ${newformat}`;

  return endTime;
}

export default to12;
