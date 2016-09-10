"use strict";
module.exports = {
  getValueOf(record, field) {
    if (typeof record !== "undefined") {
      return record[field] ? record[field] : "";
    } else {
      return "";
    }
  }
};
