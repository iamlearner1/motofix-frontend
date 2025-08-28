import { format } from 'date-fns';

/**
 * Formats an ISO date string into a more readable format.
 * Example: "2025-10-26T00:00:00.000Z" becomes "October 26, 2025"
 * @param dateString The ISO date string to format.
 * @returns A formatted, user-friendly date string.
 */
export const formatDisplayDate = (dateString: string): string => {
  try {
    // The 'PP' format token from date-fns corresponds to 'Month day, Year'
    return format(new Date(dateString), 'PP');
  } catch (error) {
    console.error("Invalid date string provided to formatDisplayDate:", dateString);
    return "Invalid Date"; // Return a fallback string on error
  }
};