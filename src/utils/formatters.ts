/**
 * Format currency strictly in Indian Rupees (₹) with Indian number grouping
 * Example: 142800 -> "₹ 1,42,800" or "₹ 1,42,800.50"
 */
export const formatINR = (amount: number, includeDecimals: boolean = false): string => {
  if (isNaN(amount) || amount === null || amount === undefined) {
    return '₹ 0';
  }
  
  if (includeDecimals || amount % 1 !== 0) {
    const parts = amount.toFixed(2).split('.');
    const integerPart = parts[0];
    const decimalPart = parts[1];
    
    // Indian formatting regex
    const lastThree = integerPart.substring(integerPart.length - 3);
    const otherNumbers = integerPart.substring(0, integerPart.length - 3);
    const formattedInt = otherNumbers !== '' 
      ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree 
      : lastThree;
      
    return `₹ ${formattedInt}.${decimalPart}`;
  } else {
    const str = Math.round(amount).toString();
    const lastThree = str.substring(str.length - 3);
    const otherNumbers = str.substring(0, str.length - 3);
    const formatted = otherNumbers !== '' 
      ? otherNumbers.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + ',' + lastThree 
      : lastThree;
    return `₹ ${formatted}`;
  }
};

/**
 * Format date in DD/MM/YYYY IST standard
 */
export const formatIndianDate = (date: Date = new Date()): string => {
  return date.toLocaleDateString('en-GB', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

/**
 * Format time in 12-hour IST format (e.g., 01:30 PM)
 */
export const formatIndianTime = (date: Date = new Date()): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  });
};
