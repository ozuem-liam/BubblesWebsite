import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// lib/utils/string.ts
/**
 * Capitalizes the first letter of a string
 * @param str - The string to capitalize
 * @returns The string with first letter capitalized
 */
export const capitalize = (str?: string): string | null => {
  if (!str || typeof str !== 'string') return null;
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

/**
 * Capitalizes each word in a string
 * @param str - The string to capitalize
 * @returns The string with each word capitalized
 */
export const capitalizeWords = (str: string): string => {
  if (!str || typeof str !== 'string') return str;
  return str.split(' ').map(capitalize).join(' ');
};

/**
 * Formats a name by capitalizing first and last name
 * @param firstName 
 * @param lastName 
 * @returns Properly capitalized full name
 */
export const formatName = (firstName: string, lastName: string): string => {
  return `${capitalize(firstName)} ${capitalize(lastName)}`;
};

/**
 * Converts kobo to naira (1 NGN = 100 kobo)
 * @param kobo - Amount in kobo
 * @returns Amount in naira with 2 decimal places
 */
export const koboToNaira = (kobo?: number): number => {
  if (kobo === undefined || kobo === null) return 0;
  if (isNaN(kobo)) {
    throw new Error('Invalid input: kobo must be a number');
  }
  return parseFloat((kobo / 100).toFixed(2));
};

/**
 * Formats naira amount with currency symbol
 * @param amount - Amount in naira
 * @returns Formatted string (e.g., "₦1,500.00")
 */
export const formatNaira = (amount: number): string => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }).format(amount);
};