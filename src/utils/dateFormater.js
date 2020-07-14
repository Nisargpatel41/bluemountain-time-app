function formatTodayDate() {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const d = new Date();

  const year = d.getFullYear();
  const dateOfMonth = d.getDate();

  const monthName = months[d.getMonth()];

  const dayName = days[d.getDay()];

  //   const localConvert = d.toLocaleString();

  //   const extractTime = localConvert.split(",")[1].split(":");

  //   const hour = extractTime[0];

  //   const minute = extractTime[1];

  //   const ap = extractTime[extractTime.length - 1].split(" ")[1];

  // At ${hour}:${minute} ${ap}

  const time = `${dayName}, ${dateOfMonth} ${monthName} ${year}`;

  return time;
}

export default formatTodayDate;
