(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/enemy/LongBarrierEnemy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e8923H8WeNCQ4my0BMHjqFz', 'LongBarrierEnemy', __filename);
// Script/enemy/LongBarrierEnemy.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.getComponent("Enemy").setRealListener(this);
        this._enemyNodeType = Global.enemyNodeType.longbarrier;

        this.onInit();
    },
    start: function start() {},
    update: function update(dt) {
        var offsetY = Global.gameMainScene.getRunSpeed() * dt;
        this.node.y += offsetY;
        this._totalOffsetY += offsetY;

        if (Math.abs(this._totalOffsetY) >= cc.winSize.height * 1.5) {
            this.beCollected();
        }
    },


    reuse: function reuse() {
        this.onInit();
    },
    //************************************start logic*************************************************//
    onInit: function onInit() {
        this._totalOffsetY = 0.0;
        this.node.setPosition(0, 0);
        this.node.setScale(1);
    },
    /**
     * desc: kill the hero
     */
    beVictory: function beVictory() {
        this.node.stopAllActions();
    },
    /**
     * desc: killed by hero
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
        //# sourceMappingURL=LongBarrierEnemy.js.map
        