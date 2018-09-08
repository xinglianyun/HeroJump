(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/enemy/RunEnemy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'eb0b8lg6rZNxYc4PAE8E4q0', 'RunEnemy', __filename);
// Script/enemy/RunEnemy.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.getComponent("Enemy").setRealListener(this);
        this._enemyNodeType = Global.enemyNodeType.runenemy;
        console.log("aaaaaaaaaaaaaaaaaa RunEnemy onLoad " + this.node.uuid);
        this.onInit();
    },
    start: function start() {},
    update: function update(dt) {
        var speed = Global.gameMainScene.getRunSpeed() * 1.2;
        var offsetY = speed * dt;
        this.node.y += offsetY;
        this._totalOffsetY += offsetY;

        if (Math.abs(this._totalOffsetY) > cc.director.getWinSize().height * 1.5) {
            this.beCollected();
        }
    },


    reuse: function reuse() {
        console.log("aaaaaaaaaaaaaaaaaa RunEnemy reuse " + this.node.uuid);
        this.onInit();
    },

    //************************************start logic*************************************************//
    onInit: function onInit() {
        console.log("aaaaaaaaaaaaaaaaaa RunEnemy onInit " + this.node.uuid);

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
        console.log("aaaaaaaaaaaaaaaaaa RunEnemy beCollected " + this.node.uuid);

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
        //# sourceMappingURL=RunEnemy.js.map
        