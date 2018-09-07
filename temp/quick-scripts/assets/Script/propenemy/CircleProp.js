(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/propenemy/CircleProp.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '88208zw9ddLX4uNWncfnpFv', 'CircleProp', __filename);
// Script/propenemy/CircleProp.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        effectTime: {
            default: 1.0,
            type: cc.Float
        },
        spriteNode: {
            default: null,
            type: cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.getComponent("Prop").setRealListener(this);
        this._enemyNodeType = Global.enemyNodeType.circleprop;
    },
    start: function start() {},
    update: function update(dt) {
        if (this._onHero) {
            this._keepTime += dt;
            if (this._keepTime >= this.effectTime) {
                Global.hero.deleteCircleProp();
            }
            return;
        }

        var speed = Global.gameMainScene.getRunSpeed();
        var offsetY = speed * dt;
        this.node.y += offsetY;
        this._totalOffsetY += offsetY;

        if (Math.abs(this._totalOffsetY_totalOffsetY) > cc.director.getWinSize().height * 1.5) {
            this.beCollected();
        }
    },


    //************************************start logic*************************************************//
    onInit: function onInit() {
        this._totalOffsetY = 0.0;
        this._onHero = false;
        this._keepTime = 0.0;

        this.node.setScale(1);
        this.spriteNode.setScale(0.5);
        this.spriteNode.setPosition(0, 0);

        this.node.setPosition(0, 0);
        this.node.getComponent(cc.Animation).play("CirclePropIdle");
    },


    setOnHero: function setOnHero(onHero) {
        this._onHero = onHero;
    },

    getOnHero: function getOnHero() {
        return this._onHero;
    },
    /**
     * desc: get the enenmy node type
     */
    getPropEnemyType: function getPropEnemyType() {
        return this._enemyNodeType;
    },

    /**
     * desc: set the keep time
     */
    setKeepTime: function setKeepTime(time) {
        this._keepTime = time;
    },

    /**
     * desc: be on hero
     */
    beOnHero: function beOnHero() {
        this.setOnHero(true);
        this.getComponent(cc.Animation).play("CirclePropBreath");
    },

    /**
     * desc: be off hero 
     */
    beOffHero: function beOffHero() {
        this.setOnHero(false);
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
        //# sourceMappingURL=CircleProp.js.map
        