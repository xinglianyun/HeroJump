(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/enemy/CatEnemy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '0265crrPQxFEquaXLE5C+gN', 'CatEnemy', __filename);
// Script/enemy/CatEnemy.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 左右移动一次需要的时间
        runTime: {
            default: 1.5,
            type: cc.Float
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.getComponent("Enemy").setRealListener(this);
        this._enemyNodeType = Global.enemyNodeType.cat;
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

    //************************************start logic*************************************************//
    /**
     * desc: when victory (kill the hero)
     */
    beVictory: function beVictory() {
        this.node.stopAllActions();
    },
    /**
     * desc: when killed by hero
     */
    beKilled: function beKilled() {
        this.node.stopAllActions();
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType);
    },

    /**
     * desc: node to be collected
     */
    beCollected: function beCollected() {
        this.node.stopAllActions();
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType);
    }
    //************************************end logic*************************************************//
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=CatEnemy.js.map
        