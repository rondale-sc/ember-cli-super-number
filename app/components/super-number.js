export default Ember.Component.extend({
  value: 0,
  min: null,
  max: null,
  loop: false,
  step: 1,
  actions: {
    increment: function(){
      this.set('value', this.nextValue());
    },
    decrement: function(){
      this.set('value', this.previousValue());
    }
  },
  nextValue: function(){
    var max   = this.get('max');
    var min   = this.get('min');
    var value = ~~this.get('value');

    if(max && min && value > (max - 1)){
      return this.get('loop') ? min : value;
    } else {
      return value + this.get('step');
    }
  },
  previousValue: function(){
    var max   = this.get('max');
    var min   = this.get('min');
    var value = ~~this.get('value');

    if(max && min && value < (min + 1)) {
      return this.get('loop') ? max : value;
    } else {
      return value - this.get('step');
    }
  }
});
