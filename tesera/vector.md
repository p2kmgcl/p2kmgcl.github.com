---
type: post
title: Vector.js
language: en
draft: false
date: 2021-07-22
mood: Inspired
tags: [post]
emoji: 🏹
summary: >
  Simple but useful n-dimensional Vector class for animations and games.
---

```js
export class Vector {
  /** @param {number[]} components */
  constructor(...components) {
    /** @type {ReadonlyArray<number>} */
    this.components = [...components];
  }

  toString() {
    return `[${this.components.join(', ')}]`;
  }

  get dimensions() {
    return this.components.length;
  }

  get x() {
    return this.components[0];
  }

  get y() {
    return this.components[1];
  }

  get z() {
    return this.components[2];
  }

  get t() {
    return this.components[3];
  }

  /**
   * Returns the Euclidean length of the vector.
   * @see https://en.wikipedia.org/wiki/Euclidean_vector#Length
   */
  get length() {
    return Math.sqrt(
      this.components.map((x) => x ** 2).reduce((x, y) => x + y, 0),
    );
  }

  /**
   * Returns the polar form's angle of the vector in radians.
   * @throws {RangeError} If vector does not have exactly 2 components.
   */
  get angle() {
    assertFixedComponentCount(this, 2);

    let deltaRotation = 0;

    if (this.x < 0) {
      if (this.y <= 0) {
        deltaRotation += Math.PI;
      } else {
        deltaRotation += Math.PI / 2;
      }
    } else if (this.y < 0) {
      if (this.x === 0) {
        deltaRotation += Math.PI;
      } else {
        deltaRotation += (3 * Math.PI) / 2;
      }
    }

    return Math.atan(Math.abs(this.y) / Math.abs(this.x)) + deltaRotation;
  }

  /**
   * Returns a new Vector by adding all components.
   * @param {Vector} v
   * @throws {RangeError} If given vector doesn't have same number of
   *  components.
   */
  add(v) {
    assertSameComponentCount(this, v);

    return new Vector(
      ...this.components.map((x, index) => x + v.components[index]),
    );
  }
}
```

```js
/**
 * @param {Vector} v
 * @param {number} componentCount
 */
function assertFixedComponentCount(v, componentCount) {
  if (v.dimensions !== componentCount) {
    throw new RangeError(
      `Expected ${componentCount} components, but found ${v.dimensions}`,
    );
  }
}
```

```js
/**
 * @private
 * @param {Vector} v1
 * @param {Vector} v2
 */
function assertSameComponentCount(v1, v2) {
  if (v1.dimensions !== v2.dimensions) {
    throw new RangeError(
      `Different number of components: ${v1.dimensions} vs. ${v2.dimensions}`,
    );
  }
}
```

```html
<script type="module">
  import '/util/test.js';

  describe('Vector', () => {
    describe('components', () => {
      it('provides all given components', () => {
        const v = new Vector(1, 2);
        expect(v.components).to.deep.equal([1, 2]);
      });

      it('can be expressed as string', () => {
        const v = new Vector(2, 1);
        expect(v.toString()).to.equal('[2, 1]');
      });

      it('has easy access to first four dimensions', () => {
        const v = new Vector(1, 2, 3, 4);
        expect(v.components[0]).to.equal(v.x);
        expect(v.components[1]).to.equal(v.y);
        expect(v.components[2]).to.equal(v.z);
        expect(v.components[3]).to.equal(v.t);
      });
    });

    describe('#length', () => {
      it('works for 2D vectors', () => {
        const v = new Vector(0, 1);
        expect(v.length).to.equal(1);
      });

      it('works for any number of dimensions', () => {
        const v = new Vector(2, 2, 2, 2);
        expect(v.length).to.equal(4);
      });
    });

    describe('#angle', () => {
      it('gives correct angle', () => {
        const v = new Vector(1, 1);
        expect(v.angle).to.equal(Math.PI / 4);
      });

      it('throws RangeError for wrong dimensions', () => {
        const v = new Vector(1, 2, 3);
        expect(() => v.angle).to.throw(RangeError);
      });
    });

    describe('#add()', () => {
      it('returns a new Vector with all added components', () => {
        const v1 = new Vector(1, 0);
        const v2 = new Vector(0, 1);
        expect(v1.add(v2)).to.deep.equal(new Vector(1, 1));
      });

      it('throws RangeError for different dimensions', () => {
        const v1 = new Vector(1, 0);
        const v2 = new Vector(0, 1, 1);
        expect(() => v1.add(v2)).to.throw(RangeError);
      });
    });
  });
</script>
```
