const SVG_NS = "http://www.w3.org/2000/svg";
const RADIUS = 80;
const CIRCUMFERENCE = 2 * Math.PI * RADIUS;

export class Progress {
  constructor(container) {
    if (!(container instanceof HTMLElement)) {
      throw new Error("Progress: container must be an HTML element");
    }

    this.container = container;

    this.state = {
      value: 0,
      animated: false,
      hidden: false,
    };

    this._createMarkup();
  }

  _createMarkup() {
    const svg = document.createElementNS(SVG_NS, "svg");
    svg.setAttribute("viewBox", "0 0 200 200");

    const backgroundCircle = document.createElementNS(SVG_NS, "circle");
    backgroundCircle.setAttribute("cx", "100");
    backgroundCircle.setAttribute("cy", "100");
    backgroundCircle.setAttribute("r", String(RADIUS));
    backgroundCircle.classList.add(
      "progress__circle",
      "progress__circle--background"
    );

    const valueCircle = document.createElementNS(SVG_NS, "circle");
    valueCircle.setAttribute("cx", "100");
    valueCircle.setAttribute("cy", "100");
    valueCircle.setAttribute("r", String(RADIUS));
    valueCircle.classList.add("progress__circle", "progress__circle--value");

    svg.append(backgroundCircle, valueCircle);
    this.container.append(svg);

    this.svg = svg;
    this.backgroundCircle = backgroundCircle;
    this.valueCircle = valueCircle;

    this.circumference = CIRCUMFERENCE;
    this.valueCircle.style.strokeDasharray = `${this.circumference}`;
    this.valueCircle.style.strokeDashoffset = `${this.circumference}`;
  }

  setValue(value) {
    if (value === "" || value === null || value === undefined) {
      return this.state.value;
    }

    const numericValue = Number(value);
    if (!Number.isFinite(numericValue)) {
      return this.state.value;
    }

    this.state.value = Math.min(100, Math.max(0, numericValue));
    this._updateValue();

    return this.state.value;
  }

  setAnimated(animated) {
    this.state.animated = Boolean(animated);
    this._updateAnimated();
  }

  setHidden(hidden) {
    this.state.hidden = Boolean(hidden);
    this._updateHidden();
  }

  _updateValue() {
    const offset = this.circumference * (1 - this.state.value / 100);
    this.valueCircle.style.strokeDashoffset = offset;
  }

  _updateAnimated() {
    this.valueCircle.classList.toggle(
      "progress__circle--animated",
      this.state.animated
    );
  }

  _updateHidden() {
    this.container.hidden = this.state.hidden;
  }

  getValue() {
    return this.state.value;
  }

  isAnimated() {
    return this.state.animated;
  }

  isHidden() {
    return this.state.hidden;
  }
}