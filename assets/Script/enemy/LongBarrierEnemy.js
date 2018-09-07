cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getComponent("Enemy").setRealListener(this)
        this._enemyNodeType = Global.enemyNodeType.longbarrier
    },

    start () {
    },

    update (dt) {
        var offsetY = Global.gameMainScene.getRunSpeed() * dt
        this.node.y += offsetY
        this._totalOffsetY += offsetY

        if(Math.abs(this._totalOffsetY) >= cc.director.getWinSize().height * 1.5){
            this.beCollected()
        }
    },

    //************************************start logic*************************************************//
    onInit : function(){
        this._totalOffsetY = 0.0
        this.node.setPosition(0, 0)
        this.node.setScale(1)
    },
    /**
     * desc: kill the hero
     */
    beVictory : function(){
        this.node.stopAllActions()
    },
    /**
     * desc: killed by hero
     */
    beKilled : function(){
        this.node.stopAllActions()
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
    },
    /**
     * desc: be collected
     */
    beCollected : function(){
        this.node.stopAllActions()
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
    },
});
