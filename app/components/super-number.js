var DOWN_ARROW = 40,
    UP_ARROW = 38;

export default Ember.Component.extend({
  classNames: ["super_number"],
  value: 0,
  min: null,
  max: null,
  loop: false,
  step: 1,
  roundTo: function(value, num) {
    var resto = value % num;
    if (resto <= (num / 2)) {
      return value - resto;
    } else {
      return value + num - resto;
    }
  },
  focusOut: function() {
    var value = parseInt(this.get('value')),
        step  = parseInt(this.get('step'));

    this.set('value', this.roundTo(value,step));
  },
  keyDown: function(e) {
    if(e.which === DOWN_ARROW) {
      this.send('decrement');
    } else if(e.which === UP_ARROW) {
      this.send('increment');
    }
  },
  nextValue: function(){
    var max   = this.get('max');
    var min   = this.get('min');
    var value = ~~this.get('value');

    // loop
    if(max && min && value > (max - 1)){
      return this.get('loop') ? min : value;
    }

    // increment no further than max
    if (max != null && value >= max) {
      return max;
    }

    // default increment
    return value + this.get('step');
  },
  previousValue: function(){
    var max   = this.get('max');
    var min   = this.get('min');
    var value = ~~this.get('value');

    // loop
    if(max && min && value < (min + 1)) {
      return this.get('loop') ? max : value;
    }

    // decrement no further than min
    if(min != null && value <= min) {
      return min;
    }

    // default decrement
    return value - this.get('step');
  },
  actions: {
    increment: function(){
      this.set('value', this.nextValue());
    },
    decrement: function(){
      this.set('value', this.previousValue());
    }
  }
});
