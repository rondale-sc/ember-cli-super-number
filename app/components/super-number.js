import NumberFormatter from "ember-super-number/utils/number-formatter";

var DOWN_ARROW = 40,
    UP_ARROW = 38;

export default Ember.Component.extend({
  classNames: ["super_number"],
  value: null,
  min: null,
  max: null,
  precision: null,
  scale: null,
  loop: false,
  step: 1,
  numberFormatter: null,
  init: function() {
    this._super();

    var options = {
      step:      this.get('step'),
      precision: this.get('precision'),
      scale:     this.get('scale'),
      min:       this.get('min'),
      max:       this.get('max'),
      loop:      this.get('loop')
    };

    this.set('numberFormatter', new NumberFormatter(this.get('value'), options));
  },
  syncFormatter: function(){
    this.set('numberFormatter', this.numberFormatter.setValue(this.get('value')));
  }.observes('value'),
  focusOut: function(){
    this.set('value', this.get('numberFormatter').toString());
  },
  keyDown: function(e) {
    if(e.which === DOWN_ARROW) {
      this.send('decrement');
    } else if(e.which === UP_ARROW) {
      this.send('increment');
    }
  },

  nextValue: function(){
    return this.get('numberFormatter').add(this.get('step'));
  },

  previousValue: function(){
    return this.get('numberFormatter').subtract(this.get('step'));
  },

  actions: {
    handleIncrement: function(e){
      this.set('value', this.nextValue());
    },
    handleDecrement: function(){
      this.set('value', this.previousValue());
    }
  }
});
