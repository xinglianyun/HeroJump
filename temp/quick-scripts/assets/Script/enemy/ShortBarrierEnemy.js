(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/enemy/ShortBarrierEnemy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd1b703uNcJNQLz1LcG0+kWt', 'ShortBarrierEnemy', __filename);
// Script/enemy/ShortBarrierEnemy.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.getComponent("Enemy").setRealListener(this);
        this._enemyNodeType = Global.enemyNodeType.shortbarrier;
    },
    start: function start() {
        this._totalOffsetY = 0.0;
    },
    update: function update(dt) {
        var offsetY = Global.gameMainScene.getRunSpeed() * dt;
        this.node.y += offsetY;
        this._totalOffsetY += offsetY;

        if (Math.abs(this._totalOffsetY) >= cc.director.getWinSize().height * 1.5) {
            this.beCollected();
        }
    },


    //************************************start logic*************************************************//
    /**
     * desc: kill the hero
     */
    beVictory: function beVictory() {
        this.node.stopAllActions();
    },
    /**
     * desc: be killed by hero
     */
    beKilled: function beKilled() {
        this.node.stopAllActions();
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType);
    },
    /**
     * desc: be collected
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
        //# sourceMappingURL=ShortBarrierEnemy.js.map
        