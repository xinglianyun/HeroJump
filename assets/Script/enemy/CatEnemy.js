// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var gameManager = Global.gameManager
cc.Class({
    extends: cc.Component,

    properties: {
        type : {
            default : "cat",
            type : cc.String
        },
        runTime : {
            default : 1.5,
            type : cc.Float
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getComponent("Enemy").setRealListener(this)
    },

    start () {
        
        var moveAction = cc.moveBy(this.runTime, cc.director.getWinSize().width, 0)
        var reverseMoveAction = moveAction.reverse()
        var sequence = cc.sequence(moveAction, reverseMoveAction)
        var repeat = cc.repeatForever(sequence)
        this.node.runAction(repeat)
    },

    // update (dt) {},

    //logic
    beVictory : function(){
        this.node.stopAllActions()
    },

    beKilled : function(){
        this.node.stopAllActions()
        gameManager.collectEnemy(this.node, this.type)
    },

});
