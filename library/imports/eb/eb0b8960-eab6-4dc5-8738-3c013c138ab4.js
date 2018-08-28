"use strict";
cc._RF.push(module, 'eb0b8lg6rZNxYc4PAE8E4q0', 'RunEnemy');
// Script/enemy/RunEnemy.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.getComponent("Enemy").setRealListener(this);
        this._enemyNodeType = Global.enemyNodeType.runenemy;
    },
    start: function start() {
        this._totalOffsetY = 0.0;
    },
    update: function update(dt) {
        var speed = Global.gameMainScene.getRunSpeed() * 1.2;
        var offsetY = speed * dt;
        this.node.y += offsetY;
        this._totalOffsetY += offsetY;

        if (Math.abs(this._totalOffsetY) > cc.director.getWinSize().height * 1.5) {
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