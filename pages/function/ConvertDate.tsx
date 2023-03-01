export default function ConvertToDate(datetime: any) {
  const time = datetime.toString()
  const utcTime = new Date(time);
  const localTime = new Date(utcTime.toLocaleString('en-US', { timeZone: 'Asia/Shanghai' }));
  const year = localTime.getFullYear();
  const month = localTime.getMonth() + 1;
  const day = localTime.getDate();
  return `${year}年${month}月${day}日`
}