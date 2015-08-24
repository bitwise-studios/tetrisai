function ScoreManager(){
	this.lastClearCount = 0;
	this.rageLevelLines = 100;
	this.rageLevel = this.rageLevelLines * 0.5 + 0;
	this.score = 0;

	this.rageContainer = document.getElementById("rage-container");
	this.statusContainer = document.getElementById("status-container");
    this.scoreContainer = document.getElementById("rscore-container");

	this.update();
}

ScoreManager.prototype.lineClearNotify = function(lines){
	this.lastClearCount = 0;
	this.rageLevelLines = this.rageLevelLines / 2;//this.rageLevel / Math.pow(2, lines);
};

ScoreManager.prototype.update = function(grid){
	if (!grid) {
		this.rageContainer.innerHTML = Math.round(this.rageLevel);//Math.round(this.score); // temporary
		this.updateStatus();
		return;
	}
	this.lastClearCount++;
	console.log(this.lastClearCount);
    if (this.lastClearCount != 0)
    {
        if (this.lastClearCount % 3 == 0)
        {
            // update rage level
            this.rageLevelLines = this.rageLevelLines * 1.5;
            this.rageLevelLines++;
        }
    }
	this.rageLevel = this.rageLevelLines*0.5 + grid.aggregateHeight()*0.5;

    if(this.rageLevel > 1000)
    {
        this.score += this.rageLevel / (Math.log10(this.rageLevel) * 10);
    }
    else if(this.rageLevel > 100)
    {
        this.score += this.rageLevel / 10;
    }
    else
    {
        this.score += ((this.rageLevel - 100) * (this.score > 10 ? Math.log10(this.score) : 1));
    }
    this.rageContainer.innerHTML = Math.round(this.rageLevel);//Math.round(this.score); // temporary
    this.scoreContainer.innerHTML = Math.round(this.score);
    this.updateStatus();

};

ScoreManager.prototype.updateStatus = function(){
	var status;
	if (gameOver)
        status = "Game Over.";
    else if (this.rageLevel > 1000)
    {
        status = "WARNING! RAGEQUIT IMMINENT!";
    }
    else if (this.rageLevel > 500)
    {
        status = "Stressing";
    }
    else if (this.rageLevel > 250)
    {
        status = "Starting to get difficult...";
    }
    else if (this.rageLevel >= 100)
    {
        status = "Fair";
    }
    else
    {
        status = "Too easy.";
    }	

    this.statusContainer.innerHTML = status;

};