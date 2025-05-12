
/**
 * Validates a Brazilian WhatsApp number
 * Accepts formats like: +55 65 92934536, 55 65 92934536, 65 92934536, 6592934536
 */
export const validateWhatsApp = (number: string): boolean => {
  // Brazilian phone number format with optional country code
  const whatsappRegex = /^(\+?\d{2}\s?)?(\d{2})\s?(\d{8,9})$/;
  return whatsappRegex.test(number);
};
