"use strict";
cc._RF.push(module, '4f46934E09FLrtVsB1ZYRQu', 'DartNode');
// Script/enemy/DartNode.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        _idle: {
            default: false,
            type: cc.Boolean
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.getComponent("Enemy").setRealListener(this);
        this._enemyNodeType = Global.enemyNodeType.dartnode;
    },
    start: function start() {},


    // update (dt) {},

    //************************************start logic*************************************************//
    /**
     * desc: kill the hero
     */
    beVictory: function beVictory() {
        this.node.stopAllActions();
    },
    /**
     * desc: killed by the hero
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
    },

    /**
     * desc: set the enemy state
     */
    setIdle: function setIdle(idle) {
        this._idle = idle;
    }

    //************************************end logic*************************************************//
});

cc._RF.pop();