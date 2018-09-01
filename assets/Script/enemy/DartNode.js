cc.Class({
    extends: cc.Component,

    properties: {
        _idle : {
            default : false,
            type : cc.Boolean
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getComponent("Enemy").setRealListener(this)
        this._enemyNodeType = Global.enemyNodeType.dartnode
    },

    start () {

    },

    // update (dt) {},

    //************************************start logic*************************************************//
    /**
     * desc: kill the hero
     */    
    beVictory : function(){
        this.node.stopAllActions()
    },
    /**
     * desc: killed by the hero
     */
    beKilled : function(){
        this.node.stopAllActions()
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
    },

    /**
     * desc: node to be collected
     */
    beCollected : function(){
        this.node.stopAllActions()
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
    },

    /**
     * desc: set the enemy state
     */
    setIdle : function(idle){
        this._idle= idle
    },

    //************************************end logic*************************************************//
});
