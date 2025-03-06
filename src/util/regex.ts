export const NumberRegEx = new RegExp(/^\d+$/);
export const NorthAmericanTelRegEx = new RegExp(/^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/);
export const InternationalTelRegEx = new RegExp(/^\\+?(\\d{1,3})?[-. ]?(\\d{1,4})?[-. ]?(\\d{1,4})?[-. ]?(\\d{1,9})$/);
export const E164TelRegEx = new RegExp(/^\+?[1-9]\d{1,14}$/);
export const EmailRegEx = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/);
export const URLRegEx = new RegExp(/^(?:(?:https?|ftp):\/\/)?(?:www\.)?[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+([\w.,@?^=%&:/~+#-]*[\w@?^=%&/~+#-])?$/);
export const TimeRegEx = /^\d{2}:\d{2}$/;
