"use strict";
cc._RF.push(module, '0265crrPQxFEquaXLE5C+gN', 'CatEnemy');
// Script/enemy/CatEnemy.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var gameManager = Global.gameManager;
cc.Class({
    extends: cc.Component,

    properties: {
        type: {
            default: "cat",
            type: cc.String
        },
        runTime: {
            default: 1.5,
            type: cc.Float
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.getComponent("Enemy").setRealListener(this);
    },
    start: function start() {
        var moveAction = cc.moveBy(this.runTime, cc.director.getWinSize().width, 0);
        var callfunc = cc.callFunc(function (target) {
            this.node.scaleX *= -1;
        }, this);
        var reverseMoveAction = moveAction.reverse();
        var sequence = cc.sequence(moveAction, callfunc, reverseMoveAction, callfunc);
        var repeat = cc.repeatForever(sequence);
        this.node.runAction(repeat);
    },


    // update (dt) {},

    //logic
    beVictory: function beVictory() {
        this.node.stopAllActions();
    },

    beKilled: function beKilled() {
        this.node.stopAllActions();
        gameManager.collectEnemy(this.node, this.type);
    }

});

cc._RF.pop();