const toString = Object.prototype.toString;

module.exports = {
  isPromise: (obj) => {
    return toString.call(obj) === '[object Promise]';
  },

  isArray: (obj) => {
    return toString.call(obj) === '[object Array]';
  },

  isFunction: (obj) => {
    return toString.call(obj) === '[object Function]';
  }
};
