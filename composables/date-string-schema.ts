import { z } from 'zod'

export const zodDateStringSchema = (() => { 
    return z.string().refine(value => {
      const date = Date.parse(value);

      if (Number.isNaN(date)) {
        return false;
      }

      const dateParts = value.split('-');
      if (dateParts.length !== 3) {
        return false;
      }

      const year = parseInt(dateParts[0], 10);
      const month = parseInt(dateParts[1], 10) - 1; // JavaScript 的月份是从 0 开始的
      const day = parseInt(dateParts[2], 10);

      const dateObject = new Date(year, month, day);

      return (
        dateObject.getFullYear() === year &&
        dateObject.getMonth() === month &&
        dateObject.getDate() === day
      );
  }, { message: 'Invalid date format. Expected YYYY-MM-DD' });
})

