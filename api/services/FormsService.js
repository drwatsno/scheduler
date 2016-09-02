module.exports = {
  getValueOf: function (record, field) {
    if (typeof record !== 'undefined') {
      return record[field]?record[field]:'';
    } else return '';
  }
};
