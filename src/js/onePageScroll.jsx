'use strict';

var React = require('react');
var ReactDOM = require('react-dom');
var ReactPropTypes = React.PropTypes;

var pageScroller = React.createClass({

  collateObj: function(obj1, obj2) {
    var obj = {},
      i = 0,
      il = arguments.length,
      key;
    for (; i < il; i++) {
      for (key in arguments[i]) {
        if (arguments[i].hasOwnProperty(key)) {
          obj[key] = arguments[i][key];
        }
      }
    }
    return obj;
  },

  componentWillMount: function() {
    window.moveDown = this.moveDown;
    window.moveUp = this.moveUp;
    window.moveTo = this.moveTo;
  },

  componentDidMount: function() {
    this.loadSettings();
    console.log(this.props.children[0]);
    this.init();
  },

  loadSettings: function() {
    var defaults = {
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
      panelContainer: "#panelContainer",
      mainContainer: "body"
    };
    this.topPos = 0;
    this.lastAnimation = 0;
    this.quietPeriod = 500;
    this.paginationList = "";
    this.settings = this.collateObj(defaults, this.props.settings);
    this.settings.panelContainer = document.querySelector(this.settings.panelContainer);
    this.settings.mainContainer = document.querySelector(this.settings.mainContainer);
    this.sections = document.querySelectorAll(this.settings.sectionContainer);
    this.total = document.querySelectorAll(this.settings.sectionContainer).length;
  },

  init: function() {
    /*-------------------------------------------*/
    /*  Prepare Everything                       */
    /*-------------------------------------------*/
    this._addClass(this.settings.panelContainer, "onepage-wrapper");
    this.settings.panelContainer.style.position = "relative";

    for (var i = 0; i < this.sections.length; i++) {
      this._addClass(this.sections[i], "ops-section");
      this.sections[i].dataset.index = i + 1;
      this.topPos = this.topPos + 100;

      if (this.settings.pagination == true) {
        this.paginationList +=

          "<li><a data-index='" + (i + 1) + "' href='#" + (i + 1) + "'></a></li>";
      }
    }

    this._swipeEvents(this.settings.panelContainer);
    document.addEventListener("swipeDown", function(event) {
      if (!this._hasClass(this.settings.mainContainer, "disabled-onepage-scroll")) event.preventDefault();
      moveUp(this.settings.panelContainer);
    });
    document.addEventListener("swipeUp", function(event) {
      if (!this._hasClass(this.settings.mainContainer, "disabled-onepage-scroll")) event.preventDefault();
      moveDown(this.settings.panelContainer);
    });

    // Create Pagination and Display Them

    if (this.settings.pagination == true) {
      var pagination = document.createElement("ul");
      pagination.setAttribute("class", "onepage-pagination");

      this.settings.mainContainer.appendChild(pagination);
      pagination.innerHTML = this.paginationList;
      var posTop = (document.querySelector(".onepage-pagination").offsetHeight / 2) * -1;
      document.querySelector(".onepage-pagination").style.marginTop = posTop;
    }

    if (window.location.hash != "" && window.location.hash != "#1") {
      var init_index = window.location.hash.replace("#", ""),
        next = document.querySelector(this.settings.sectionContainer + "[data-index='" + (init_index) + "']"),
        next_index = next.dataset.index;

      this._addClass(document.querySelector(this.settings.sectionContainer + "[data-index='" + init_index + "']"), "active");
      this._addClass(this.settings.mainContainer, "viewing-page-" + init_index);
      if (this.settings.pagination == true) this._addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + init_index + "']"), "active");

      if (next) {
        this._addClass(next, "active");
        if (this.settings.pagination == true) this._addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + init_index + "']"), "active");

        this.settings.mainContainer.className = this.settings.mainContainer.className.replace(/\bviewing-page-\d.*?\b/g, '');
        this._addClass(this.settings.mainContainer, "viewing-page-" + next_index);
        if (history.replace && this.settings.updateURL == true) {
          var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (init_index);
          history.pushState({}, document.title, href);
        }
      }
      var pos = ((init_index - 1) * 100) * -1;
      this._transformPage(this.settings.panelContainer, this.settings, pos, init_index);

    } else {
      this._addClass(document.querySelector(this.settings.sectionContainer + "[data-index='1']"), "active");
      this._addClass(this.settings.mainContainer, "viewing-page-1");
      if (this.settings.pagination == true) this._addClass(document.querySelector(".onepage-pagination li a[data-index='1']"), "active");
    }

    var _paginationHandler = function() {
      var page_index = window.dataset.index;
      moveTo(this.settings.panelContainer, page_index);
    }.bind(this);


    if (this.settings.pagination == true) {
      var pagination_links = document.querySelectorAll(".onepage-pagination li a");

      for (var i = 0; i < pagination_links.length; i++) {
        pagination_links[i].addEventListener('click', _paginationHandler);
      }
    }

    var _mouseWheelHandler = function(event) {
      event.preventDefault();
      var delta = event.wheelDelta || -event.detail;
      if (!this._hasClass(this.settings.mainContainer, "disabled-onepage-scroll")) this._init_scroll(event, delta);
    }.bind(this);

    document.addEventListener('mousewheel', _mouseWheelHandler);
    document.addEventListener('DOMMouseScroll', _mouseWheelHandler);


    if (this.settings.responsiveFallback != false) {
      window.onresize = function() {
        this._responsive();
      };

      this._responsive();
    }

    var _keydownHandler = function(e) {
      var tag = e.target.tagName.toLowerCase();

      if (!this._hasClass(this.settings.mainContainer, "disabled-onepage-scroll")) {
        switch (e.which) {
          case 38:
            if (tag != 'input' && tag != 'textarea') moveUp(this.settings.panelContainer);
            break;
          case 40:
            if (tag != 'input' && tag != 'textarea') moveDown(this.settings.panelContainer);
            break;
          default:
            return;
        }
      }
      return false;
    }.bind(this);

    if (this.settings.keyboard == true) {
      document.onkeydown = _keydownHandler;
    }
    return false;
  },

  /*-------------------------------------------------------*/
  /*  Private Functions                                    */
  /*-------------------------------------------------------*/
  /*------------------------------------------------*/
  /*  Credit: Eike Send for the awesome swipe event */
  /*------------------------------------------------*/
  _swipeEvents: function() {
    var startX,
      startY;

    document.addEventListener("touchstart", touchstart);

    function touchstart(event) {
      var touches = event.touches;
      if (touches && touches.length) {
        startX = touches[0].pageX;
        startY = touches[0].pageY;
        document.addEventListener("touchmove", touchmove);
      }
    }

    function touchmove(event) {
      var touches = event.touches;
      if (touches && touches.length) {
        event.preventDefault();
        var deltaX = startX - touches[0].pageX;
        var deltaY = startY - touches[0].pageY;

        if (deltaX >= 50) {
          var event = new Event('swipeLeft');
          document.dispatchEvent(event);
        }
        if (deltaX <= -50) {
          var event = new Event('swipeRight');
          document.dispatchEvent(event);
        }
        if (deltaY >= 50) {
          var event = new Event('swipeUp');
          document.dispatchEvent(event);
        }
        if (deltaY <= -50) {
          var event = new Event('swipeDown');
          document.dispatchEvent(event);
        }

        if (Math.abs(deltaX) >= 50 || Math.abs(deltaY) >= 50) {
          document.removeEventListener('touchmove', touchmove);
        }
      }
    }
  },

  /*-----------------------------------------------------------*/
  /*  Utility to add/remove class easily with javascript       */
  /*-----------------------------------------------------------*/

  _trim: function(str) {
    return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
  },

  _hasClass: function(ele, cls) {
    if (ele.className) {
      return ele.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
    } else {
      return ele.className = cls;
    }
  },

  _addClass: function(ele, cls) {
    if (!this._hasClass(ele, cls)) ele.className += " " + cls;
    ele.className = this._trim(ele.className);
  },

  _removeClass: function(ele, cls) {
    if (this._hasClass(ele, cls)) {
      var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
      ele.className = ele.className.replace(reg, ' ');
    }
    ele.className = this._trim(ele.className);
  },

  /*-----------------------------------------------------------*/
  /*  Transtionend Normalizer by Modernizr                     */
  /*-----------------------------------------------------------*/

  _whichTransitionEvent: function() {
    var t;
    var el = document.createElement('fakeelement');
    var transitions = {
      'transition': 'transitionend',
      'OTransition': 'oTransitionEnd',
      'MozTransition': 'transitionend',
      'WebkitTransition': 'webkitTransitionEnd'
    };

    for (t in transitions) {
      if (el.style[t] !== undefined) {
        return transitions[t];
      }
    }
  },

  /*-----------------------------------------------------------*/
  /*  Function to perform scroll to top animation              */
  /*-----------------------------------------------------------*/

  _scrollTo: function(element, to, duration) {
    if (duration < 0) return;
    var difference = to - element.scrollTop;
    var perTick = difference / duration * 10;

    setTimeout(function() {
      element.scrollTop = element.scrollTop + perTick;
      if (element.scrollTop == to) return;
      this._scrollTo(element, to, duration - 10);
    }, 10);
  },


  /*---------------------------------*/
  /*  Function to transform the page */
  /*---------------------------------*/

  _transformPage: function(el2, settings, pos, index, next_el) {
    if (typeof settings.beforeMove == 'function') settings.beforeMove(index, next_el);

    var transformCSS = "-webkit-transform: translate3d(0, " + pos + "%, 0); -webkit-transition: -webkit-transform " + settings.animationTime + "ms " + settings.easing + "; -moz-transform: translate3d(0, " + pos + "%, 0); -moz-transition: -moz-transform " + settings.animationTime + "ms " + settings.easing + "; -ms-transform: translate3d(0, " + pos + "%, 0); -ms-transition: -ms-transform " + settings.animationTime + "ms " + settings.easing + "; transform: translate3d(0, " + pos + "%, 0); transition: transform " + settings.animationTime + "ms " + settings.easing + ";";

    el2.style.cssText = transformCSS;

    var transitionEnd = this._whichTransitionEvent();
    el2.addEventListener(transitionEnd, endAnimation, false);

    function endAnimation() {
      if (typeof settings.afterMove == 'function') settings.afterMove(index, next_el);
      el2.removeEventListener(transitionEnd, endAnimation);
    }
  },

  /*-------------------------------------------*/
  /*  Responsive Fallback trigger              */
  /*-------------------------------------------*/

  _responsive: function() {

    if (document.settings.mainContainer.clientWidth < settings.responsiveFallback) {

      this._addClass(settings.mainContainer, "disabled-onepage-scroll");
      document.removeEventListener('mousewheel', _mouseWheelHandler);
      document.removeEventListener('DOMMouseScroll', _mouseWheelHandler);
      this._swipeEvents(this.settings.panelContainer);
      document.removeEventListener("swipeDown");
      document.removeEventListener("swipeUp");

    } else {

      if (this._hasClass(settings.mainContainer, "disabled-onepage-scroll")) {
        this._removeClass(settings.mainContainer, "disabled-onepage-scroll");
        this._scrollTo(document.documentElement, 0, 2000);
      }



      this._swipeEvents(this.settings.panelContainer);
      document.addEventListener("swipeDown", function(event) {
        if (!this._hasClass(settings.mainContainer, "disabled-onepage-scroll")) event.preventDefault();
        moveUp(this.settings.panelContainer);
      });
      document.addEventListener("swipeUp", function(event) {
        if (!this._hasClass(settings.mainContainer, "disabled-onepage-scroll")) event.preventDefault();
        moveDown(this.settings.panelContainer);
      });

      document.addEventListener('mousewheel', _mouseWheelHandler);
      document.addEventListener('DOMMouseScroll', _mouseWheelHandler);

    }
  },

  /*-------------------------------------------*/
  /*  Initialize scroll detection              */
  /*-------------------------------------------*/

  _init_scroll: function(event, delta) {
    var deltaOfInterest = delta,
      timeNow = new Date().getTime();

    // Cancel scroll if currently animating or within quiet period
    if (timeNow - this.lastAnimation < this.quietPeriod + this.settings.animationTime) {
      event.preventDefault();
      return;
    }

    if (deltaOfInterest < 0) {
      moveDown(this.settings.panelContainer);
    } else {
      moveUp(this.settings.panelContainer);
    }

    this.lastAnimation = timeNow;
  },


  /*-------------------------------------------------------*/
  /*  Public Functions                                     */
  /*-------------------------------------------------------*/

  /*---------------------------------*/
  /*  Function to move down section  */
  /*---------------------------------*/

  moveDown: function(el3) {

    if (typeof el3 == "string") el3 = document.querySelector(el3);

    var index = document.querySelector(this.settings.sectionContainer + ".active").dataset.index,
      current = document.querySelector(this.settings.sectionContainer + "[data-index='" + index + "']"),
      next = document.querySelector(this.settings.sectionContainer + "[data-index='" + (parseInt(index) + 1) + "']"),
      pos;


    if (!next) {
      if (this.settings.loop == true) {
        pos = 0;
        next = document.querySelector(this.settings.sectionContainer + "[data-index='1']");
      } else {
        return;
      }

    } else {
      pos = (index * 100) * -1;
    }
    var next_index = next.dataset.index;
    this._removeClass(current, "active");
    this._addClass(next, "active");

    if (this.settings.pagination == true) {
      this._removeClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + index + "']"), "active");
      this._addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + next_index + "']"), "active");
    }

    this.settings.mainContainer.className = this.settings.mainContainer.className.replace(/\bviewing-page-\d.*?\b/g, '');
    this._addClass(this.settings.mainContainer, "viewing-page-" + next_index);

    if (history.replace && this.settings.updateURL == true) {
      var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (parseInt(index) + 1);
      history.pushState({}, document.title, href);
    }
    this._transformPage(el3, this.settings, pos, next_index, next);
  },

  /*---------------------------------*/
  /*  Function to move up section    */
  /*---------------------------------*/

  moveUp: function(el4) {

    if (typeof el4 == "string") el4 = document.querySelector(el4);

    var index = document.querySelector(this.settings.sectionContainer + ".active").dataset.index,
      current = document.querySelector(this.settings.sectionContainer + "[data-index='" + index + "']"),
      next = document.querySelector(this.settings.sectionContainer + "[data-index='" + (parseInt(index) - 1) + "']"),
      pos;

    if (!next) {
      if (this.settings.loop == true) {
        pos = ((this.total - 1) * 100) * -1;
        next = document.querySelector(this.settings.sectionContainer + "[data-index='" + this.total + "']");
      } else {
        return;
      }
    } else {
      pos = ((next.dataset.index - 1) * 100) * -1;
    }
    var next_index = next.dataset.index;
    this._removeClass(current, "active");
    this._addClass(next, "active");

    if (this.settings.pagination == true) {
      this._removeClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + index + "']"), "active");
      this._addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + next_index + "']"), "active");
    }
    this.settings.mainContainer.className = this.settings.mainContainer.className.replace(/\bviewing-page-\d.*?\b/g, '');
    this._addClass(this.settings.mainContainer, "viewing-page-" + next_index);

    if (history.replace && this.settings.updateURL == true) {
      var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (parseInt(index) - 1);
      history.pushState({}, document.title, href);
    }
    this._transformPage(el4, this.settings, pos, next_index, next);
  },

  /*-------------------------------------------*/
  /*  Function to move to specified section    */
  /*-------------------------------------------*/

  moveTo: function(el5, page_index) {

    if (typeof el5 == "string") el5 = document.querySelector(el5);

    var current = document.querySelector(this.settings.sectionContainer + ".active"),
      next = document.querySelector(this.settings.sectionContainer + "[data-index='" + (page_index) + "']"),
      pos;

    if (next) {
      var next_index = next.dataset.index;
      this._removeClass(current, "active");
      this._addClass(next, "active");
      this._removeClass(document.querySelector(".onepage-pagination li a" + ".active"), "active");
      this._addClass(document.querySelector(".onepage-pagination li a" + "[data-index='" + (page_index) + "']"), "active");

      this.settings.mainContainer.className = this.settings.mainContainer.className.replace(/\bviewing-page-\d.*?\b/g, '');
      this._addClass(this.settings.mainContainer, "viewing-page-" + next_index);

      pos = ((page_index - 1) * 100) * -1;

      if (history.replace && this.settings.updateURL == true) {
        var href = window.location.href.substr(0, window.location.href.indexOf('#')) + "#" + (parseInt(page_index));
        history.pushState({}, document.title, href);
      }
      this._transformPage(el5, this.settings, pos, page_index, next);
    }
  },
  //---------------------------------
  //----------END WINDOW ASSIGNMENTS
  //---------------------------------


  render: function() {
    return (
      <div id={"panelContainer"}>
        { this.props.children }
      </div>
    );
  }
});

module.exports = pageScroller;
