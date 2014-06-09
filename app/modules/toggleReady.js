p2kmgcl.toggleReady = function () {
	for (var i = 0; i < p2kmgcl.readyFunctions.length; i++) {
		p2kmgcl.readyFunctions[i]();
	}
};
