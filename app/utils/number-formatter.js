
var NumberFormater = function(value, options) {
  this._options = options || {};

  if (value != null && typeof value === "object") {
    this._options = value;
    value = null;
  }

  this.setValue(value);
};

var snapToNearestStep = function(value, num) {
  var resto = value % num;
  if (resto <= (num / 2)) {
    return value - resto;
  } else {
    return value + num - resto;
  }
};

var proto = NumberFormater.prototype;


proto.setValue = function(value) {
  value = value === null ? "0" : value;

  if(this._options.step) {
    value = snapToNearestStep((parseFloat(value) || 0), this._options.step);
  }

  this._value = ((parseFloat(value)).toString() === "NaN") ? "0" : value;
  return this;
};

proto.add = function(x) {
  var value = parseFloat(this._value) + parseFloat(x);
  if(this._options.step) { value = snapToNearestStep(value, this._options.step); }

  if(this._options.max && value > this._options.max) { value = this._options.max; }
  this._value = (value).toString();

  return this.toString();
};

proto.subtract = function(x) {
  var value = parseFloat(this._value) - parseFloat(x);
  if(this._options.step) { value = snapToNearestStep(value, this._options.step); }

  if(this._options.min && value < this._options.min) { value = this._options.min; }

  this._value = (value).toString();
  return this.toString();
};

proto.toString = function() {
  var value, absolute_value, sign, whole_number, decimal, precision;

  value = this._value + "";

  if(this._options.scale) {
    var scale = parseFloat(this._options.scale);
    value = parseFloat(this._value).toFixed(scale);
  }

  if(this._options.precision) {
      precision      = this._options.precision - (this._options.scale || 0);
      absolute_value = value.replace(/\-/, "");
      sign           = (value.length === absolute_value.length) ? "" : "-";
      whole_number   = absolute_value.replace(/\..*/, "");
      decimal        = absolute_value.replace(/-?\d*\.?/, "");

    if(absolute_value.length < this._options.precision) {
      whole_number = new Array(precision - whole_number.length + 1).join("0") + whole_number;
      value = sign + whole_number + (decimal ? "." + decimal : "");
    }
  }

  return value;
};

export default NumberFormater;
