var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MediaAnimation = function () {
  _createClass(MediaAnimation, null, [{
    key: 'begin',
    value: function begin() {
      if (!MediaAnimation.instances) {
        MediaAnimation.instances = [];
        window.addEventListener('resize', MediaAnimation.handleResize);
      }
    }
  }, {
    key: 'handleResize',
    value: function handleResize() {
      MediaAnimation.instances.forEach(function (instance) {
        var shouldRun = window.matchMedia(instance.constructor.MEDIA_QUERY).matches;

        if (shouldRun && !instance._started) {
          instance._started = true;
          instance.start();
        } else if (!shouldRun && instance._started) {
          instance._started = false;
          instance.stop();
        }
      });
    }
  }, {
    key: 'MEDIA_QUERY',
    get: function get() {
      return '(min-width: 1px)';
    }
  }]);

  function MediaAnimation() {
    _classCallCheck(this, MediaAnimation);

    MediaAnimation.begin();
    MediaAnimation.instances.push(this);

    this._started = false;
    MediaAnimation.handleResize();
  }

  _createClass(MediaAnimation, [{
    key: 'start',
    value: function start() {}
  }, {
    key: 'stop',
    value: function stop() {}
  }]);

  return MediaAnimation;
}();

var LinksHovering = function (_MediaAnimation) {
  _inherits(LinksHovering, _MediaAnimation);

  function LinksHovering() {
    _classCallCheck(this, LinksHovering);

    return _possibleConstructorReturn(this, (LinksHovering.__proto__ || Object.getPrototypeOf(LinksHovering)).apply(this, arguments));
  }

  _createClass(LinksHovering, [{
    key: 'start',
    value: function start() {
      var _this2 = this;

      this._linksWrapper = document.querySelector('.' + LinksHovering.LINKS_WRAPPER_CLASS);
      this._links = Array.from(document.querySelectorAll('.' + LinksHovering.LINK_CLASS));
      this._lastHovered = this._links.length - 1;

      this._tick = this._tick.bind(this);
      this._handleWrapperMouseEnter = this._handleWrapperMouseEnter.bind(this);
      this._handleWrapperMouseLeave = this._handleWrapperMouseLeave.bind(this);
      this._handleLinkMouseEnter = this._handleLinkMouseEnter.bind(this);

      this._links.forEach(function (link) {
        return link.addEventListener('mouseenter', _this2._handleLinkMouseEnter);
      });
      this._linksWrapper.addEventListener('mouseenter', this._handleWrapperMouseEnter);
      this._linksWrapper.addEventListener('mouseleave', this._handleWrapperMouseLeave);
      this._startInterval();
      this._tick();
    }
  }, {
    key: 'stop',
    value: function stop() {
      var _this3 = this;

      this._stopInterval();
      this._removeHoveredLink();
      this._links.forEach(function (link) {
        return link.removeEventListener('mouseenter', _this3._handleLinkMouseEnter);
      });
      this._linksWrapper.removeEventListener('mouseenter', this._handleWrapperMouseEnter);
      this._linksWrapper.removeEventListener('mouseleave', this._handleWrapperMouseLeave);

      this._links = null;
      this._linksWrapper = null;
    }
  }, {
    key: '_startInterval',
    value: function _startInterval() {
      this._tickIntervalId = setInterval(this._tick, 2500);
    }
  }, {
    key: '_stopInterval',
    value: function _stopInterval() {
      clearInterval(this._tickIntervalId);
    }
  }, {
    key: '_handleLinkMouseEnter',
    value: function _handleLinkMouseEnter(event) {
      this._lastHovered = this._links.indexOf(event.target) - 1;
    }
  }, {
    key: '_handleWrapperMouseEnter',
    value: function _handleWrapperMouseEnter() {
      this._stopInterval();
      this._removeHoveredLink();
    }
  }, {
    key: '_handleWrapperMouseLeave',
    value: function _handleWrapperMouseLeave() {
      this._startInterval();
      this._tick();
    }
  }, {
    key: '_hoverNextLink',
    value: function _hoverNextLink() {
      this._lastHovered = (this._lastHovered + 1) % this._links.length;

      var nextLink = this._links[this._lastHovered];
      if (nextLink) nextLink.classList.add(LinksHovering.HOVERED_CLASS);
    }
  }, {
    key: '_removeHoveredLink',
    value: function _removeHoveredLink() {
      var hoveredLink = document.querySelector('.' + LinksHovering.HOVERED_CLASS);
      if (hoveredLink) hoveredLink.classList.remove(LinksHovering.HOVERED_CLASS);
    }
  }, {
    key: '_tick',
    value: function _tick() {
      this._removeHoveredLink();
      this._hoverNextLink();
    }
  }], [{
    key: 'LINKS_WRAPPER_CLASS',
    get: function get() {
      return 'links';
    }
  }, {
    key: 'LINK_CLASS',
    get: function get() {
      return 'link';
    }
  }, {
    key: 'HOVERED_CLASS',
    get: function get() {
      return 'link--hover';
    }
  }]);

  return LinksHovering;
}(MediaAnimation);

new LinksHovering();
