# Ember Super Number

*The conversion of this to an Ember CLI addon has been documented in this blog post: ["Building Ember CLI Addons Simply"](http://hashrocket.com/blog/posts/building-ember-addons)

Ember Super Number is a component that let's you intelligently deal with increment and decrement controls on a given input.  It handles all sorts of configurations, and user input sanitization.  You can see a demo below. Let me know what you think!

This is mostly feature compatible with Shane Riley's [super number plugin](https://github.com/shaneriley/super_number) with some minor differences around precision. 


# Demo

* here in a [gist](https://gist.github.com/rondale-sc/3e0e86d6cf103a9e77e9#file-directional-link-js)
* here in [jsbin](http://jsbin.com/soqew/1)

![example image](http://i.imgur.com/u7cXbhU.png)

# Installation

```
npm install ember-cli-super-number --save-dev
```

# Usage

```
{{super-number id="standard"}}

{{super-number id="min" min=1}}

{{super-number id="max" max=1}}

{{super-number id="step" step=5}}

{{super-number id="precision" precision=3}}

{{super-number id="scale" scale=2}}

{{super-number id="loop" loop=true min=1 max=9}}

{{super-number id="max-hold" max=3}}
```

Options can be composed interchangeably.  They are:

* Min - The lowest number you'd like to be reachable
* Max - The largest number you'd like to be reachable
* Loop (requisites min,max) - Behavior that states when value reaches min or max will cycle around to its opposite.
* Precision - Total number of digits you'd like to represent your value as.
  * examples:
    * 30000 is a precision of 5
    * 12 is a precision of 2
    * 0001 is a precision of 4
* Scale - number of digits to the right of the decimal to represent in value
  * examples:
    * 2.00 is a scale of 2
    * 3.1091 is a scale of 4
* Step - Sets the number to add or subtract to value each time increment action is triggered (on click or arrow keys)
* Value - The intial value.  You will likely set this something property on your context controller to do meaningful actions with.  (defaults to 0)

# Lastly

Thanks! 

If you'd like to contribute just open a PR.  :)))
