import { format, getTime, formatDistanceToNow } from "date-fns";

// ----------------------------------------------------------------------

type InputValue = Date | string | number | null | undefined;

export function fDate(date: InputValue, newFormat?: string) {
  const fm = newFormat || "dd MMM yyyy";

  return date ? format(new Date(date), fm) : "";
}

export function fDateTime(date: InputValue, newFormat?: string) {
  const fm = newFormat || "dd MMM yyyy p";

  return date ? format(new Date(date), fm) : "";
}

export function fTimestamp(date: InputValue) {
  return date ? getTime(new Date(date)) : "";
}

export function fToNow(date: InputValue) {
  return date
    ? formatDistanceToNow(new Date(date), {
        addSuffix: true,
      })
    : "";
}

// format Date and Time: yyyy-MM-dd'T'HH:mm:ss.SSS'Z' -> dd MMM yyyy, HH:mm
export function fFullDateTime(date: InputValue) {
  return date ? fDateTime(date, "dd MMM yyyy, HH:mm") : "";
}
