(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/propenemy/Prop.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'e3c22SE6LxH94Tih+hbpskR', 'Prop', __filename);
// Script/propenemy/Prop.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        _realListener: cc.Component
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start: function start() {},


    // update (dt) {},

    //************************************start logic*************************************************//
    setRealListener: function setRealListener(realListener) {
        this._realListener = realListener;
    },
    beOnHero: function beOnHero() {
        if (this._realListener) {
            this._realListener.beOnHero();
        }
    },
    getPropEnemyType: function getPropEnemyType() {
        if (this._realListener) {
            this._realListener.getPropEnemyType();
        }
    },
    beCollected: function beCollected() {
        if (this._realListener) {
            this._realListener.beCollected();
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
        //# sourceMappingURL=Prop.js.map
        