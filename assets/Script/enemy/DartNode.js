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

        this.onInit()
    },

    start () {

    },

    reuse : function(){
        this.onInit()
    },

    // update (dt) {},

    //************************************start logic*************************************************//
    onInit : function(){
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

    /**
     * desc: get enemy node type
     */
    getEnemyNodeType : function(){
        return this._enemyNodeType
    },

    /**
     * desc: display the dead enemy when killed
     */
    DisplayDeadEnemyState : function(isDeadState){
        this.getComponent(cc.BoxCollider).enabled = !isDeadState
        this.setIdle(isDeadState)
    }

    //************************************end logic*************************************************//
});
