function PlayerPieceGenerator(){
    this.bag = [];
	this.setupUi();
	this.bagCount = new Array(7);
};

PlayerPieceGenerator.prototype.setupUi = function() {
	var canvas = document.createElement("canvas");
	this.pieceImgUrls = new Array(7);
	this.pieceImgUrlsDisabled = new Array(7);
	this.pieceImg = new Array(7);
	this.pieceChooser = document.getElementById("piecechooser");
	this.pieceChooser.innerHTML = "";
	for (var i = 0; i < 7; i++) {
		var next = Piece.fromIndex(i);
		canvas.width = canvas.height = 4 * 20;
		var context = canvas.getContext("2d");
		context.clearRect(0, 0, canvas.width, canvas.height);
		context.fillStyle="#FF0000";
		context.strokeStyle="#FFFFFF";
		var xOffset = next.dimension == 2 ? 20 : next.dimension == 3 ? 10 : next.dimension == 4 ? 0 : null;
		var yOffset = next.dimension == 2 ? 20 : next.dimension == 3 ? 20 : next.dimension == 4 ? 10 : null;
		for(var r = 0; r < next.dimension; r++){
			for(var c = 0; c < next.dimension; c++){
				if (next.cells[r][c] == 1){
					context.fillRect(xOffset + 20 * c, yOffset + 20 * r, 20, 20);
					context.strokeRect(xOffset + 20 * c, yOffset + 20 * r, 20, 20);
				}
			}
		}
		this.pieceImgUrls[i] = canvas.toDataURL();
		var imgElem = document.createElement("img");
		imgElem.alt = i;
		imgElem.src = this.pieceImgUrls[i];
		var that = this;
		imgElem.onclick = function(e) {
			that.pieceClicked(e);
		}
		this.pieceChooser.appendChild(imgElem);
		this.pieceImg[i] = imgElem;

		context.fillStyle="#bebebe";

		for(var r = 0; r < next.dimension; r++){
			for(var c = 0; c < next.dimension; c++){
				if (next.cells[r][c] == 1){
					context.fillRect(xOffset + 20 * c, yOffset + 20 * r, 20, 20);
					context.strokeRect(xOffset + 20 * c, yOffset + 20 * r, 20, 20);
				}
			}
		}

		this.pieceImgUrlsDisabled[i] = canvas.toDataURL();
	}
	this.pieceQueueCanvas = document.getElementById("piecequeuecanvas");
}

PlayerPieceGenerator.prototype.pieceClicked = function(e) {
	if(this.bag.length > 4)
		return;
	if (this.bagCount[parseInt(e.target.alt)] >= 2) {
		return;
	}
	this.bag.push(parseInt(e.target.alt));
	this.updateQueue();
}

PlayerPieceGenerator.prototype.clearBag = function(e){
	this.bag.length = 0;
	this.updateQueue();
}

PlayerPieceGenerator.prototype.nextPiece = function(){
	if (this.bag.length == 0) {
		console.log("YOU FAIL");
		return Piece.fromIndex(Math.floor((Math.random() * 7)));
		//alert("YOU FAIL");
		//return null;
	}
    var retval = Piece.fromIndex(this.bag.shift());
	this.updateQueue();
	return retval;
};

PlayerPieceGenerator.prototype.updateQueue = function() {
	var canvas = this.pieceQueueCanvas;
	var blockwidth = 8;
	canvas.height = this.bag.length * (5*blockwidth);
	canvas.width = 6*blockwidth;
	var context = this.pieceQueueCanvas.getContext("2d");
	context.clearRect(0, 0, canvas.width, canvas.height);
	context.fillStyle="#FF0000";
	context.strokeStyle="#FFFFFF";
	for (var c = 0; c < this.bagCount.length; c++) {
		this.bagCount[c] = 0;
	}
	for (var i = 0; i < this.bag.length; i++) {
		var next = Piece.fromIndex(this.bag[i]);
		var xOffset = next.dimension == 2 ? blockwidth : next.dimension == 3 ? blockwidth / 2 : next.dimension == 4 ? 0 : null;
		var yOffset = next.dimension == 2 ? blockwidth : next.dimension == 3 ? blockwidth : next.dimension == 4 ? blockwidth / 2 : null;
		for(var r = 0; r < next.dimension; r++){
			for(var c = 0; c < next.dimension; c++){
				if (next.cells[r][c] == 1){
					context.fillRect(xOffset + blockwidth * c, i*5*blockwidth + yOffset + blockwidth * r, blockwidth, blockwidth);
				}
			}
		}
		this.bagCount[this.bag[i]] += 1;
	}
	for (var c = 0; c < this.bagCount.length; c++) {
		this.pieceImg[c].src = (this.bagCount[c] >= 2 || this.bag.length > 4)? this.pieceImgUrlsDisabled[c]:this.pieceImgUrls[c];
	}
}

PlayerPieceGenerator.prototype.shuffleBag = function() {
};