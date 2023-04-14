//utility mothod
function convertTo24Hour(time12h) {
  // Split the time string into hours, minutes, and am/pm indicator
  const [hour, minute, indicator] = time12h.match(/\d+|[a-z]+/gi);

  // Convert the hour to an integer
  let hourInt = parseInt(hour);
  let hourStr;

  // If the hour is not 12 -- example 12:00am -->0000 ; 12:00pm--> 1200
  if (hourInt === 12) {
    if (indicator === "am") {
      hourInt = "00";
    }
    hourStr = hourInt.toString().padStart(2, "0");
  }

  // If the indicator is "pm" and the hour is NOT 12, add 12 and convert to string
  // example convert 8:00pm to 2000 / 11:00pm into 2300
  if (indicator === "pm" && hourInt !== 12) {
    hourInt += 12;
    hourStr = hourInt.toString().padStart(2, "0");
  }

  // If the indicator is "am" and the hour is NOT 12, then just convert to string
  // example convert 8:00am to 800
  if (indicator === "am" && hourInt !== 12) {
    hourStr = hourInt.toString();
  }

  console.log(time12h + " converted into " + hourStr + minute);
  return hourStr + minute;
}

module.exports = {
  convertTo24Hour,
};

exports.convertTo24Hour = convertTo24Hour;
