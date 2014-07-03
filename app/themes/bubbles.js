(function () {
	var _can,
		_ctx,
		_deltatime,
		PIX2 = Math.PI * 2,
		bubbles = [],
		bubbleVertical = 0,
		bubbleCount = 5,
		bubbleSpeed = 10,
		bubbleRadius = 50;

	function Bubble () {
	}

	Bubble.prototype.init = function () {
		this.radius = Math.random() * bubbleRadius + bubbleRadius / 5;
		this.speed = bubbleSpeed / this.radius;

		this.position = {
			x: Math.random() * _can.width,
			y: _can.height + (++bubbleVertical) * this.radius
		};

		if (bubbleVertical > bubbleCount) {
			bubbleVertical = 0;
		}
	};

	Bubble.prototype.update = function () {
		this.position.y -= _deltatime * this.speed;
	};

	Bubble.prototype.render = function () {
		_ctx.beginPath();
		_ctx.moveTo(this.position.x + this.radius, this.position.y);
		_ctx.arc(
			this.position.x, this.position.y,
			this.radius, 0, PIX2, true);
		_ctx.closePath();
		_ctx.fill();
		_ctx.stroke();
	};

	window.p2kmgcl.canvasMagicResize = function (can, ctx) {
		_can = can;
		_ctx = ctx;
		bubbleRadius = Math.min(_can.width / 10, _can.height / 10) * 2;
		bubbleSpeed = _can.height;

		while (bubbles.length < bubbleCount) {
			bubbles.push(new Bubble());
			bubbles[bubbles.length - 1].init();
		}
	};

	window.p2kmgcl.canvasMagic = function (can, ctx, deltatime) {
		_can = can;
		_ctx = ctx;
		_deltatime = deltatime;
		_ctx.clearRect(0, 0, _can.width, _can.height);
		_ctx.fillStyle = '#dadada';
		_ctx.strokeStyle = '#d1d1d1';

		for (var i = 0; i < bubbles.length; i++) {
			bubbles[i].update();
			bubbles[i].render();
			if (bubbles[i].position.y < -bubbles[i].radius) {
				bubbles[i].init();
			}
		}
	};

}());
