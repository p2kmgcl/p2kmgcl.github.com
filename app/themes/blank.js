// Thanks to http://codepen.io/jackrugile/pen/BvLHg

(function () {
	var height,
		minHeight = 20,
		points = [],
		pointSpacing = 10,
		pointNumber = 4,
		lineWidth = 1,
		margin = lineWidth * 3,

		waveNumber = 2,
		waves = [];

	for (var i = 0; i <= pointNumber; i++) {
		points.push({ y: 0, x: i * pointSpacing });
	}

	for (i = 0; i < waveNumber; i++) {
		waves.push({
			wavePosition: -Infinity,
			waveWidth: -Infinity,
			waveHeight: -Infinity,
			waveTop: false
		});
	}

	function movePoints (can, deltatime) {
		// Reajusta los puntos
		for (var j = 0; j <= pointNumber; j++) {
			points[j].y = height;
		}

		// Recalcula todas las olas
		for (var i = 0; i < waveNumber; i++) {
			if (waves[i].wavePosition < -can.width ||
				waves[i].wavePosition > (can.width + waves[i].waveWidth)) {
				waves[i].waveHeight = Math.random() * minHeight + minHeight;
				waves[i].waveWidth = Math.random() * 250 + 250;
				waves[i].wavePosition =
					-waves[i].waveWidth * i -
					waves[i].waveWidth * 2;
			} else {
				waves[i].wavePosition += 100 * deltatime;
			}

			var distance,
				positionY;
			for (j = 0; j <= pointNumber; j++) {
				distance = Math.abs(points[j].x - waves[i].wavePosition);
				positionY =
					+((waves[i].waveWidth - distance) /
					waves[i].waveWidth) * waves[i].waveHeight;
				positionY += height;
				if (positionY > points[j].y) {
					points[j].y = positionY;
				}
			}
		}
	}

	function drawPoints (ctx) {
		for (var i = 0; i <= pointNumber; i++) {
			ctx.beginPath();
			ctx.moveTo(points[i].x + 2, points[i].y);
			ctx.arc(
				points[i].x, points[i].y,
				2, 0, Math.PI * 2, true);
			ctx.closePath();
			ctx.fill();
			ctx.stroke();
		}

		// Draw the wave point
		for (i = 0; i < waveNumber; i++) {
			ctx.beginPath();
			ctx.moveTo(waves[i].wavePosition + waves[i].waveHeight, height);
			drawEllipseByCenter(ctx, waves[i].wavePosition, height, waves[i].waveWidth, waves[i].waveHeight);
			ctx.closePath();
			ctx.stroke();
		}
	}

	function drawPath (ctx) {
		ctx.beginPath();
		ctx.moveTo(points[0].x, points[0].y);
		for (var i = 1; i <= pointNumber - 2; i++) {
			ctx.quadraticCurveTo(
				points[i].x, points[i].y,
				(points[i].x + points[i + 1].x) / 2,
				(points[i].y + points[i + 1].y) / 2);
		}
		ctx.quadraticCurveTo(
			points[i].x, points[i].y,
			points[i + 1].x, points[i + 1].y);

		ctx.lineTo(points[i + 1].x, -margin);
		ctx.lineTo(-margin, -margin);
		ctx.fill();
		//ctx.stroke();
	}

	// From http://stackoverflow.com/questions/2172798/how-to-draw-an-oval-in-html5-canvas

	function drawEllipseByCenter(ctx, cx, cy, w, h) {
	  drawEllipse(ctx, cx - w/2.0, cy - h/2.0, w, h);
	}

	function drawEllipse(ctx, x, y, w, h) {
	  var kappa = 0.5522848,
	      ox = (w / 2) * kappa, // control point offset horizontal
	      oy = (h / 2) * kappa, // control point offset vertical
	      xe = x + w,           // x-end
	      ye = y + h,           // y-end
	      xm = x + w / 2,       // x-middle
	      ym = y + h / 2;       // y-middle

	  ctx.beginPath();
	  ctx.moveTo(x, ym);
	  ctx.bezierCurveTo(x, ym - oy, xm - ox, y, xm, y);
	  ctx.bezierCurveTo(xm + ox, y, xe, ym - oy, xe, ym);
	  ctx.bezierCurveTo(xe, ym + oy, xm + ox, ye, xm, ye);
	  ctx.bezierCurveTo(xm - ox, ye, x, ym + oy, x, ym);
	  //ctx.closePath(); // not used correctly, see comments (use to close off open path)
	  ctx.stroke();
	}

	window.p2kmgcl.canvasMagicResize = function (can, ctx) {
		ctx.fillStyle = '#fafafa';
		ctx.lineWidth = lineWidth;

		// Línea debajo del título
		height = 315;

		pointSpacing = can.width / pointNumber;
		for (var i = 0; i <= pointNumber; i++) {
			points[i].x = i * pointSpacing;
			points[i].y = height;
		}
		points[0].x -= margin;
		points[pointNumber].x += margin;
	};

	window.p2kmgcl.canvasMagic = function (can, ctx, deltatime) {
		ctx.clearRect(0, 0, can.width, can.height);
		movePoints(can, deltatime);
		drawPath(ctx);
		//drawPoints(ctx);
	};

}());
