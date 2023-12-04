
const origLog = console.log;
console.log = function (obj, ...placeholders) {
  if (typeof obj === "string")
    placeholders.unshift("[" + new Date() + "] " + obj);
  else {
    placeholders.unshift("[" + new Date() + "]" + JSON.stringify(obj,null,2));
  }
  origLog.apply(this, placeholders);
};
const origError = console.error;

console.error = function (obj, ...placeholders) {
  if (typeof obj === "string")
    placeholders.unshift("[" + new Date() + "] " + obj);
  else {
    placeholders.unshift("[" + new Date() + "]" + JSON.stringify(obj,null,2));
  }
  origError.apply(this, placeholders);
};