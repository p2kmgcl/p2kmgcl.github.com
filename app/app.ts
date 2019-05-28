class MediaAnimation {
  static instances: MediaAnimation[] = [];
  static MEDIA_QUERY: string = '(min-width: 1px)';

  private _started: boolean = false;

  static begin() {
    if (!MediaAnimation.instances) {
      MediaAnimation.instances = [];
      window.addEventListener('resize', MediaAnimation.handleResize);
    }
  }

  static handleResize() {
    MediaAnimation.instances.forEach((instance) => {
      const shouldRun = window.matchMedia(
        (<typeof MediaAnimation>instance.constructor).MEDIA_QUERY,
      ).matches;

      if (shouldRun && !instance._started) {
        instance._started = true;
        instance.start();
      } else if (!shouldRun && instance._started) {
        instance._started = false;
        instance.stop();
      }
    });
  }

  constructor() {
    MediaAnimation.begin();
    MediaAnimation.instances.push(this);
    MediaAnimation.handleResize();
  }

  start() {}
  stop() {}
}

class LinksHovering extends MediaAnimation {
  static LINKS_WRAPPER_CLASS: string = 'links';
  static LINK_CLASS: string = 'link';
  static HOVERED_CLASS: string = 'link--hover';

  private _linksWrapper: HTMLElement | null = null;
  private _links: HTMLElement[] = [];
  private _lastHovered: number = -1;
  private _tickIntervalId: NodeJS.Timeout | null = null;

  start() {
    this._linksWrapper = document.querySelector(
      `.${LinksHovering.LINKS_WRAPPER_CLASS}`,
    );

    this._links = Array.from(
      document.querySelectorAll(`.${LinksHovering.LINK_CLASS}`),
    );

    this._lastHovered = this._links.length - 1;

    if (this._linksWrapper && this._links.length) {
      this._tick = this._tick.bind(this);
      this._handleWrapperMouseEnter = this._handleWrapperMouseEnter.bind(this);
      this._handleWrapperMouseLeave = this._handleWrapperMouseLeave.bind(this);
      this._handleLinkMouseEnter = this._handleLinkMouseEnter.bind(this);

      this._links.forEach((link) =>
        link.addEventListener('mouseenter', this._handleLinkMouseEnter),
      );

      this._linksWrapper.addEventListener(
        'mouseenter',
        this._handleWrapperMouseEnter,
      );

      this._linksWrapper.addEventListener(
        'mouseleave',
        this._handleWrapperMouseLeave,
      );

      this._startInterval();
      this._tick();
    }
  }

  stop() {
    this._stopInterval();
    this._removeHoveredLink();
    this._links.forEach((link) =>
      link.removeEventListener('mouseenter', this._handleLinkMouseEnter),
    );

    if (this._linksWrapper) {
      this._linksWrapper.removeEventListener(
        'mouseenter',
        this._handleWrapperMouseEnter,
      );

      this._linksWrapper.removeEventListener(
        'mouseleave',
        this._handleWrapperMouseLeave,
      );
    }

    this._links = [];
    this._linksWrapper = null;
  }

  _startInterval() {
    this._tickIntervalId = setInterval(this._tick, 2500);
  }

  _stopInterval() {
    if (this._tickIntervalId) {
      clearInterval(this._tickIntervalId);
    }
  }

  _handleLinkMouseEnter(event: MouseEvent) {
    if (event.target instanceof HTMLElement) {
      this._lastHovered = this._links.indexOf(event.target) - 1;
    }
  }

  _handleWrapperMouseEnter() {
    this._stopInterval();
    this._removeHoveredLink();
  }

  _handleWrapperMouseLeave() {
    this._startInterval();
    this._tick();
  }

  _hoverNextLink() {
    this._lastHovered = (this._lastHovered + 1) % this._links.length;

    const nextLink = this._links[this._lastHovered];
    if (nextLink) nextLink.classList.add(LinksHovering.HOVERED_CLASS);
  }

  _removeHoveredLink() {
    const hoveredLink = document.querySelector(
      `.${LinksHovering.HOVERED_CLASS}`,
    );
    if (hoveredLink) hoveredLink.classList.remove(LinksHovering.HOVERED_CLASS);
  }

  _tick() {
    this._removeHoveredLink();
    this._hoverNextLink();
  }
}

export default class App {
  constructor() {
    new LinksHovering();
  }
}
