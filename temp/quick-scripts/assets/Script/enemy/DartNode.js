(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/enemy/DartNode.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '4f46934E09FLrtVsB1ZYRQu', 'DartNode', __filename);
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

        this.onInit();
    },
    start: function start() {},


    reuse: function reuse() {
        this.onInit();
    },

    // update (dt) {},

    //************************************start logic*************************************************//
    onInit: function onInit() {
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
    },

    /**
     * desc: get enemy node type
     */
    getEnemyNodeType: function getEnemyNodeType() {
        return this._enemyNodeType;
    },

    /**
     * desc: display the dead enemy when killed
     */
    DisplayDeadEnemyState: function DisplayDeadEnemyState(isDeadState) {
        this.getComponent(cc.BoxCollider).enabled = !isDeadState;
        this.setIdle(isDeadState);
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
        //# sourceMappingURL=DartNode.js.map
        