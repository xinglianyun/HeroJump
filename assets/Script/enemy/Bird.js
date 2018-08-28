// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

cc.Class({
    extends: cc.Component,

    properties: {
        flyDownTime : {
            default : 0.5,
            type : cc.Float
        },
        flyTime : {
            default : 1.0,
            type : cc.Float
        },
        flyToHeroTime : {
            default : 5.0,
            type : cc.Float
        },
        flyVictoryTime : {
            default : 0.8,
            type : cc.Float
        },
        _startSide : {
            default : -1, 
            type : cc.Integer
        },
        _overScreenX : {
            default : 100.0,
            type : cc.Float
        },
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._startOffsetY = 100
        this._startSide = -1
        this._targetWorldPos = cc.Vec2(0, 0)
        this.node.y += this._startOffsetY
        this.scheduleOnce(this.moveBird, 0)

        this.node.getComponent("Enemy").setRealListener(this)
        this._enemyNodeType = Global.enemyNodeType.bird
    },

    start () {
        
    },

    // update (dt) {},

    //logic
    setStartSide : function(startSide){
        this._startSide = startSide
    },

    moveBird : function(){
        var moveDownAction = cc.moveBy(this.flyDownTime, 0, this._startOffsetY * (-1))
        var delayAction = cc.delayTime(this.flyTime)
        var moveToHeroPos = this.node.parent.convertToNodeSpace(this._targetWorldPos)
        moveToHeroPos.x += -this._startSide*this._overScreenX
        moveToHeroPos.y -= (this._overScreenX * Math.abs(this.node.y - moveToHeroPos.y)) / (Math.abs(this.node.x - moveToHeroPos.x))
        var moveToHeroAction = cc.moveTo(this.flyToHeroTime, moveToHeroPos)
        
        var callfunc = cc.callFunc(function(target){
             Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
        }, this)
        var sequeenAction = cc.sequence(moveDownAction, delayAction, moveToHeroAction, callfunc)
        this.node.runAction(sequeenAction)
    },

    setTargetWorldPos : function(worldPos){
        this._targetWorldPos = worldPos
    },

    beVictory : function(){
        this.node.stopAllActions()
        var moveHorizon = cc.moveBy(this.flyVictoryTime, -this._startSide * 200, 0)
        this.node.runAction(moveHorizon)
    },

    beKilled : function(){
        this.node.stopAllActions()
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
    }
});
