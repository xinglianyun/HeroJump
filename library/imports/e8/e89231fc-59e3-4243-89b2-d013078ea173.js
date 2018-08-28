"use strict";
cc._RF.push(module, 'e8923H8WeNCQ4my0BMHjqFz', 'LongBarrierEnemy');
// Script/enemy/LongBarrierEnemy.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.getComponent("Enemy").setRealListener(this);
        this._enemyNodeType = Global.enemyNodeType.longbarrier;
    },
    start: function start() {
        this._totalOffsetY = 0.0;
    },
    update: function update(dt) {
        var offsetY = Global.gameMainScene.getRunSpeed() * dt;
        this.node.y += offsetY;
        this._totalOffsetY += offsetY;

        if (Math.abs(this._totalOffsetY) >= cc.director.getWinSize().height * 1.5) {
            this.beKilled();
        }
    },


    // logic
    beVictory: function beVictory() {
        this.node.stopAllActions();
    },
    beKilled: function beKilled() {
        this.node.stopAllActions();
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType);
    }
});

cc._RF.pop();