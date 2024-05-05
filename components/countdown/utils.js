import dayjs from "dayjs"

export const calculateDiff = (timeInMs)=>{
  const timeStamp = dayjs(timeInMs);
  const nowDayjs = dayjs();
  if(timeStamp.isBefore(nowDayjs)){
    return {
      seconds:"00",
      minutes:"00",
      hours:"00",
      days:"00"
    }
  }
  return {
    seconds:getRemainingSecond(nowDayjs,timeStamp),
      minutes:getRemainingMinute(nowDayjs,timeStamp),
      hours:getRemainingHour(nowDayjs,timeStamp),
      days:getRemainingDay(nowDayjs,timeStamp)
  }

}

function getRemainingSecond(nowDayjs,timeStamp){
  const seconds = timeStamp.diff(nowDayjs,"seconds") % 60
  return padWithZeros(seconds,2);
}
function getRemainingMinute(nowDayjs,timeStamp){
  const minutes = timeStamp.diff(nowDayjs,"minutes") % 60
  return padWithZeros(minutes,2);
}
function getRemainingHour(nowDayjs,timeStamp){
  const hours = timeStamp.diff(nowDayjs,"hours") % 60
  return padWithZeros(hours,2)
}
function getRemainingDay(nowDayjs,timeStamp){
  const days = timeStamp.diff(nowDayjs,"days") 
  return days.toString();
}

function padWithZeros(number,length){
  const numberString = number.toString();
  if(numberString.length >= length) return numberString;
  return "0".repeat(length - numberString.length) + numberString;
}