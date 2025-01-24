import { bulkRecordHook } from "@flatfile/plugin-record-hook";
import {parsePhoneNumberWithError, isPossiblePhoneNumber, isValidPhoneNumber, validatePhoneNumberLength  }from 'libphonenumber-js'

/**
 * Record hook for the projects sheet that validates data as it's being imported.
 * This hook processes records in bulk for better performance.
 * Currently implements phone number validation for the primary_phone field.
 */
export default bulkRecordHook('projects', (records, context) => {
  // Process each record in the batch to validate phone numbers
  records.forEach((record) => {
    validatePhoneNumber(record, 'primary_phone');
  });
});

/**
 * Validates and normalizes a phone number field in a record
 * Uses libphonenumber-js for robust phone number validation
 * 
 * @param record - The record object containing the phone number
 * @param key - The field key containing the phone number (e.g., 'primary_phone')
 * 
 * Validation steps:
 * 1. Checks if phone number exists
 * 2. Attempts to parse the number (assumes US)
 * 3. Validates if the number is possible
 * 4. Validates if the number is valid
 * 5. If valid, normalizes to E.164 format
 * 
 * On success: Sets the normalized E.164 format
 * On failure: Adds appropriate error message to the record
 */
function validatePhoneNumber(record, key) {
  let phoneNumber = record.get(key) as string; 
  if (!phoneNumber) return;  // Skip validation if no phone number provided
  
  try {   
    // Attempt to parse the phone number (assumes US region)
    let parsedPhoneNumber = parsePhoneNumberWithError(phoneNumber, 'US')
    
    // Check if the number is possible (has correct length and pattern)
    if (!parsedPhoneNumber.isPossible()) {
      record.addError('primary_phone', 'Invalid phone number (impossible)');
    } else if (!parsedPhoneNumber.isValid()) {  // Check if the number is valid (exists in the region)
      record.addError('primary_phone', 'Invalid phone number (invalid)');
    } else {  // If all validation passes, normalize to E.164 format (+1234567890)
      record.set('primary_phone', parsedPhoneNumber.format("E.164"));
    }
  } catch (error) {
    // Handle parsing errors (e.g., completely invalid format)
    record.addError('primary_phone', 'Invalid phone number (error)');
  }
}



