var React = require('react');
var ReactDOM = require('react-dom');
var ReactPropTypes = React.PropTypes;

var pageScroller = React.createClass({
  defaults: {
    sectionContainer: "section",
    easing: "ease",
    animationTime: 1000,
    pagination: true,
    updateURL: false,
    keyboard: true,
    beforeMove: null,
    afterMove: null,
    loop: false,
    responsiveFallback: false,
    mainContainer: document.querySelector("body")
  },

  collateObj: function(obj1, obj2) {
    for (var p in obj2) {
      if (obj2[p].constructor == Object) {
        if (obj1[p]) {
          this.collateObj(obj1[p], obj2[p]);
          continue;
        }
      }
      obj1[p] = obj2[p];
    }
  },

  getInitialSate: function() {
    return ({
      settings: this.collateObj(this.defaults, this.props.settings),
      el: document.querySelector(element),
      sections: document.querySelectorAll(this.state.settings.sectionContainer),
      total: document.querySelectorAll(this.state.settings.sectionContainer).length,
      status: "off",
      topPos: 0,
      lastAnimation: 0,
      quietPeriod: 500,
      paginationList: ""
    });
  },

  render: function() {
    return this.props.children;
  }
});

module.exports = pageScroller;
