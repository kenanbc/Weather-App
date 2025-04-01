export const days = [
  "Monday",
  "Thuesday",
  "Wedenesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];
export const months = [
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
export const DEFAULT_CITY = "Tuzla";

export const firstLetterUpperCase = (data: string) => {
  return data.slice(0, 1).toUpperCase() + data.slice(1).toLowerCase();
};

export const timeFormater = (today: Date) => {
  return (
    today.getHours().toString().padStart(2, "0") +
    ":" +
    today.getMinutes().toString().padStart(2, "0") +
    " " +
    days[today.getDay() - 1].toString() +
    " - " +
    months[today.getMonth()].toString() +
    " " +
    today.getDate().toString() +
    ", " +
    today.getFullYear().toString()
  );
};

export const getBackgroundImage = (code: number, isDayTime: number) => {
  if (code === 1000) {
    if (!isDayTime) return "url(/Weather-App/night.jpg)";
    return "url(/Weather-App/clear.jpg)";
  } else if (
    code == 1003 ||
    code == 1006 ||
    code == 1009 ||
    code == 1030 ||
    code == 1069 ||
    code == 1087 ||
    code == 1135 ||
    code == 1273 ||
    code == 1276 ||
    code == 1279 ||
    code == 1282
  ) {
    return "url(/Weather-App/cloudy.jpg)";
  }else if(
    code == 1063 ||
    code == 1069 ||
    code == 1072 ||
    code == 1150 ||
    code == 1153 ||
    code == 1180 ||
    code == 1183 ||
    code == 1189 ||
    code == 1192 ||
    code == 1195 ||
    code == 1204 ||
    code == 1207 ||
    code == 1240 ||
    code == 1243 ||
    code == 1246 ||
    code == 1249 ||
    code == 1252){
      if (!isDayTime) return "url(/Weather-App/rainNight.jpg)";
      return "url(/Weather-App/rain.jpg)";
  }

  return ""
};
