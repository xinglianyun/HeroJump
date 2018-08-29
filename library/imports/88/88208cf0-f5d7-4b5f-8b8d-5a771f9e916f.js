"use strict";
cc._RF.push(module, '88208zw9ddLX4uNWncfnpFv', 'CircleProp');
// Script/propenemy/CircleProp.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.getComponent("Prop").setRealListener(this);
        this._enemyNodeType = Global.enemyNodeType.circleprop;
    },
    start: function start() {
        this._totalOffsetY = 0.0;
        this._onHero = false;
    },
    update: function update(dt) {
        if (this._onHero) {
            return;
        }

        var speed = Global.gameMainScene.getRunSpeed();
        var offsetY = speed * dt;
        this.node.y += offsetY;
        this._totalOffsetY += offsetY;

        if (Math.abs(this._totalOffsetY) > cc.director.getWinSize().height * 1.5) {
            this.beCollected();
        }
    },


    //************************************start logic*************************************************//
    setOnHero: function setOnHero(onHero) {
        this._onHero = onHero;
    },

    getOnHero: function getOnHero() {
        return this._onHero;
    },

    getPropEnemyType: function getPropEnemyType() {
        return this._enemyNodeType;
    },
    /**
     * desc: be on hero
     */
    beOnHero: function beOnHero() {
        this.setOnHero(true);
        this.getComponent(cc.Animation).play("CirclePropBreath");
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