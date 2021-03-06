(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/enemy/Enemy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'dc010bqCIZLv4Rr7u/Vm1X4', 'Enemy', __filename);
// Script/enemy/Enemy.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        _realListener: cc.Component
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {},
    start: function start() {},


    reuse: function reuse() {
        if (this._realListener) {
            this._realListener.reuse();
        }
    },

    // update (dt) {},

    //************************************start logic*************************************************//
    setRealListener: function setRealListener(realListener) {
        this._realListener = realListener;
    },

    onInit: function onInit() {
        if (this._realListener) {
            this._realListener.onInit();
        }
    },

    setIdle: function setIdle(idle) {
        if (this._realListener) {
            this._realListener.setIdle(idle);
        }
    },

    beVictory: function beVictory() {
        if (this._realListener) {
            this._realListener.beVictory();
        }
    },
    beKilled: function beKilled() {
        if (this._realListener) {
            this._realListener.beKilled();
        }
    },
    getEnemyNodeType: function getEnemyNodeType() {
        if (this._realListener) {
            return this._realListener.getEnemyNodeType();
        }
    },
    DisplayDeadEnemyState: function DisplayDeadEnemyState(isDeadState) {
        if (this._realListener) {
            this._realListener.DisplayDeadEnemyState(isDeadState);
        }
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
        //# sourceMappingURL=Enemy.js.map
        