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
        console.log("aaaaaaaaaaaaaaaaaa DartNode onLoad " + this.node.uuid)

        this.node.getComponent("Enemy").setRealListener(this)
        this._enemyNodeType = Global.enemyNodeType.dartnode
    },

    start () {

    },

    // update (dt) {},

    //************************************start logic*************************************************//
    onInit : function(){
        console.log("aaaaaaaaaaaaaaaaaa DartNode onInit " + this.node.uuid)
        this.node.setPosition(0, 0)
        this.node.setScale(1)
    },
    /**
     * desc: kill the hero
     */    
    beVictory : function(){
        console.log("aaaaaaaaaaaaaaaaaa DartNode beVictory " + this.node.uuid)

        this.node.stopAllActions()
    },
    /**
     * desc: killed by the hero
     */
    beKilled : function(){
        console.log("aaaaaaaaaaaaaaaaaa DartNode beKilled " + this.node.uuid)
        
        this.node.stopAllActions()
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
    },

    /**
     * desc: node to be collected
     */
    beCollected : function(){
        console.log("aaaaaaaaaaaaaaaaaa DartNode beCollected " + this.node.uuid)

        this.node.stopAllActions()
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
    },

    /**
     * desc: set the enemy state
     */
    setIdle : function(idle){
        console.log("aaaaaaaaaaaaaaaaaa DartNode setIdle " + this.node.uuid)
        
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
        console.log("aaaaaaaaaaaaaaaaaa DartNode DisplayDeadEnemyState " + this.node.uuid)
        
        this.getComponent(cc.BoxCollider).enabled = !isDeadState
        this.setIdle(isDeadState)
    }

    //************************************end logic*************************************************//
});
