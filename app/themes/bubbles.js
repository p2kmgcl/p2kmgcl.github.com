(function () {
	var _can,
		_ctx,
		_deltatime,
		PIX2 = Math.PI * 2,
		konamiBubbles = [],
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

		_ctx.fillStyle = '#cacaca';
		_ctx.strokeStyle = '#c1c1c1';

		for (var j = 0; j < konamiBubbles.length; j++) {
			konamiBubbles[j].update();
			konamiBubbles[j].speed += 1;
			konamiBubbles[j].render();
			if (konamiBubbles[j].position.y < -konamiBubbles[j].radius) {
				konamiBubbles.splice(j--, 1);
			}
		}
	};

	function bubbleLine (beginX, beginY, endX, endY) {
		var wcan = _can.width / 2,
			distance = Math.sqrt(
				Math.pow(endX - beginX, 2) +
				Math.pow(endY - beginY, 2)
			),
			distanceX = endX - beginX,
			distanceY = endY - beginY,
			bubbles = distance / 10,
			percent = 1 / bubbles;

		for (var i = percent; i < 1; i += percent) {
			var posx = parseInt(beginX + distanceX * i),
				posy = parseInt(beginY + distanceY * i),
				bubble = new Bubble();

			bubble.init();
			bubble.position.x = wcan + posx;
			bubble.position.y = _can.height + posy;
			bubble.speed = 5;
			bubble.radius = Math.random() * 5 + 5;
			konamiBubbles.push(bubble);
		}
	}

	window.p2kmgcl.onKonamiCode = function () {
		var k = konamiBubbles,
			offset,
			offsetStep = 90;

		// K
		offset = -225;
		bubbleLine(0 + offset, 100, 0 + offset, 0);
		bubbleLine(0 + offset, 50, 50 + offset, 0);
		bubbleLine(0 + offset, 50, 50 + offset, 100);

		// O
		offset += offsetStep;
		bubbleLine(0 + offset, 0, 0 + offset, 100);
		bubbleLine(0 + offset, 100, 50 + offset, 100);
		bubbleLine(50 + offset, 100, 50 + offset, 0);
		bubbleLine(50 + offset, 0, 0 + offset, 0);

		// N
		offset += offsetStep;
		bubbleLine(0 + offset, 0, 0 + offset, 100);
		bubbleLine(0 + offset, 100, 50 + offset, 0);
		bubbleLine(50 + offset, 0, 50 + offset, 100);

		// A
		offset += offsetStep;
		bubbleLine(10 + offset, 70, 40 + offset, 70);
		bubbleLine(0 + offset, 100, 25 + offset, 0);
		bubbleLine(25 + offset, 0, 50 + offset, 100);

		// M
		offset += offsetStep;
		bubbleLine(0 + offset, 100, 0 + offset, 0);
		bubbleLine(0 + offset, 0, 25 + offset, 50);
		bubbleLine(25 + offset, 50, 50 + offset, 0);
		bubbleLine(50 + offset, 0, 50 + offset, 100);

		// I
		offset += offsetStep;
		bubbleLine(0 + offset, 0, 0 + offset, 100);
	};

}());
