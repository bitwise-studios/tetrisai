function ScoreManager(){
	this.lastClear = 0;
	this.rageLevel = 100;
	this.score = 0;
}

ScoreManager.prototype.lineClearNotify = function(lines){
	this.lastClear = 0;
	this.rageLevel = this.rageLevel / Math.pow(2, lines);
};

ScoreManager.prototype.update = function(){
	this.lastClear++;
    if (this.lastClear != 0)
    {
        if (this.lastClear % 5 == 0)
        {
            // update rage level
            this.rageLevel = this.rageLevel * 2;
            this.rageLevel++;
        }
    }
    if(this.rageLevel > 1000)
    {
        this.score += this.rageLevel / (Mathf.Log10(this.rageLevel) * 10);
    }
    else if(rageLevel > 100)
    {
        this.score += (long) this.rageLevel / 10;
    }
    else
    {
        this.score += (long)((this.rageLevel - 100) * (this.score > 10 ? Mathf.Log10(this.score) : 1));
    }
};