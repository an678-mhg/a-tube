export const calculateCreatedTime = (timeCreated) => {
  let periods = {
    "năm trước": 365 * 30 * 24 * 60 * 60 * 1000,
    "tháng trước": 30 * 24 * 60 * 60 * 1000,
    "tuần trước": 7 * 24 * 60 * 60 * 1000,
    "ngày trước": 24 * 60 * 60 * 1000,
    "giờ trước": 60 * 60 * 1000,
    "phút trước": 60 * 1000,
  };

  let diff = Date.now() - +new Date(`${timeCreated}`);

  for (const key in periods) {
    if (diff >= periods[key]) {
      let result = Math.floor(diff / periods[key]);
      return `${result} ${result === 1 ? key : key}`;
    }
  }

  return "Bây giờ";
};
