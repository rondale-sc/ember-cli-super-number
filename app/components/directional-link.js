export default Ember.Component.extend({
  isHoldingMouseDown: false,
  click: function(e){
    return false;
  },
  mouseDown: function(){
    this.set('isHoldingMouseDown', true)
    var intervalId = setInterval(function() {
      if(this.get('isHoldingMouseDown')) {
        this.sendAction();
      } else {
        clearInterval(intervalId);
      }
    }.bind(this), 100);
  },
  dragStart: function(){
    return false;
  },
  mouseUp: function(){
    this.sendAction();
    this.set('isHoldingMouseDown',false);
  },
  mouseLeave: function(){
    this.set('isHoldingMouseDown',false);
  }
});
