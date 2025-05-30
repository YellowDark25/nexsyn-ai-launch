
/**
 * Validates a Brazilian WhatsApp number
 * Accepts formats like: 
 * - (65) 99999-9999
 * - 65 99999-9999
 * - 6599999999
 * - +55 65 99999-9999
 * - 55 65 99999-9999
 */
export const validateWhatsApp = (number: string): boolean => {
  // Remove all non-digit characters
  const cleanNumber = number.replace(/\D/g, '');
  
  // Brazilian mobile numbers with 9 digits (including area code)
  // Can have country code (55) or not
  // Area code (2 digits) + 9 + 8 more digits = 11 digits total
  // With country code: 13 digits total
  
  if (cleanNumber.length === 11) {
    // Format: DDD + 9 + 8 digits (65999999999)
    return /^[1-9][1-9]9[0-9]{8}$/.test(cleanNumber);
  } else if (cleanNumber.length === 13) {
    // Format: 55 + DDD + 9 + 8 digits (5565999999999)
    return /^55[1-9][1-9]9[0-9]{8}$/.test(cleanNumber);
  }
  
  return false;
};
