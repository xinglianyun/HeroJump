cc.Class({
    extends: cc.Component,

    properties: {
        // 左右移动一次需要的时间
        runTime : {
            default : 1.5,
            type : cc.Float
        },
        _idle : {
            default : false,
            type : cc.Boolean
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getComponent("Enemy").setRealListener(this)
        this._enemyNodeType = Global.enemyNodeType.cat

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
        this._idle = false
        this.node.setPosition(0, 0)
        this.node.setScale(1)

        this.scheduleOnce(this.runForwardBack, 0.1)
    },

    /**
     * desc: 
     */
    runForwardBack : function(){
        if(this._idle){
            return
        }
        var moveAction = cc.moveBy(this.runTime, cc.winSize.width, 0)
        var callfunc = cc.callFunc( function(target){
            this.node.scaleX *= -1
        }, this)
        var reverseMoveAction = moveAction.reverse()
        var sequence = cc.sequence(moveAction, callfunc, reverseMoveAction, callfunc)
        var repeat = cc.repeatForever(sequence)
        this.node.runAction(repeat)
    },
    /**
     * desc: when victory (kill the hero)
     */
    beVictory : function(){
        this.node.stopAllActions()
    },
    /**
     * desc: when killed by hero
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
