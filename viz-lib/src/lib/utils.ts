import moment from "moment";
import { visualizationsSettings } from "@/visualizations/visualizationsSettings";

function formatDateTime(value: any) {
  if (!value) {
    return "";
  }

  const parsed = moment(value);
  if (!parsed.isValid()) {
    return "-";
  }

  return parsed.format(visualizationsSettings.dateTimeFormat);
}

function formatDate(value: any) {
  if (!value) {
    return "";
  }

  const parsed = moment(value);
  if (!parsed.isValid()) {
    return "-";
  }

  return parsed.format(visualizationsSettings.dateFormat);
}

export function formatColumnValue(value: any, columnType = null) {
  if (moment.isMoment(value)) {
    if (columnType === "date") {
      return formatDate(value);
    }
    return formatDateTime(value);
  }

  if (typeof value === "boolean") {
    return value.toString();
  }

  return value;
}

export function arePropertyValuesEqual(arr: any[], property: string) {
  if (arr.length === 0) {
    return true; // If the array is empty, all properties are considered the same
  }

  const firstValue = arr[0][property]; // Get the property value of the first object

  // Check if the property exists in the first object
  if (!(property in arr[0])) {
    return false;
  }

  // Use the 'every' method to check if all subsequent property values are the same
  return arr.every(obj => obj[property] === firstValue);
}
