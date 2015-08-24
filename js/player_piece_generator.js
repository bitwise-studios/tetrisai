function PlayerPieceGenerator(){
    this.bag = [0, 1];
	this.setupUi();
};

PlayerPieceGenerator.prototype.setupUi = function() {
	var canvas = document.createElement("canvas");
	this.pieceImgUrls = new Array(7);
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
	}
}

PlayerPieceGenerator.prototype.pieceClicked = function(e) {
	this.bag.push(parseInt(e.target.alt));
	this.updateQueue();
}

PlayerPieceGenerator.prototype.nextPiece = function(){
	if (this.bag.length == 0) {
		alert("YOU FAIL");
		return null;
	}
    var retval = Piece.fromIndex(this.bag.shift());
	this.updateQueue();
	return retval;
};

PlayerPieceGenerator.prototype.updateQueue = function() {
	document.getElementById("piecequeue").textContent = this.bag.toString();
}

PlayerPieceGenerator.prototype.shuffleBag = function() {
};