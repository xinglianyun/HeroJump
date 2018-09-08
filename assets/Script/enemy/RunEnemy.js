cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getComponent("Enemy").setRealListener(this)
        this._enemyNodeType = Global.enemyNodeType.runenemy
        console.log("aaaaaaaaaaaaaaaaaa RunEnemy onLoad "+ this.node.uuid)
        this.onInit()
    },

    start () {
    },

    update (dt) {
        var speed = Global.gameMainScene.getRunSpeed()*1.2
        var offsetY = speed * dt
        this.node.y += offsetY
        this._totalOffsetY += offsetY

        if(Math.abs(this._totalOffsetY) > (cc.director.getWinSize().height * 1.5)){
            this.beCollected()
        }
    },

    reuse : function(){
        console.log("aaaaaaaaaaaaaaaaaa RunEnemy reuse "+ this.node.uuid)
        this.onInit()
    },

    //************************************start logic*************************************************//
    onInit : function(){
        console.log("aaaaaaaaaaaaaaaaaa RunEnemy onInit "+ this.node.uuid)

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
     * desc: be killed by hero
     */
    beKilled : function(){
        this.node.stopAllActions()
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
    },
    /**
     * desc: be collected
     */
    beCollected : function(){
        console.log("aaaaaaaaaaaaaaaaaa RunEnemy beCollected "+ this.node.uuid)

        this.node.stopAllActions()
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
    },
    //************************************end logic*************************************************//
});
