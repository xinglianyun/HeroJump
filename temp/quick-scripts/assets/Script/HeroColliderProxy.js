(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/HeroColliderProxy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '9f071UfU1ZDcYTb5Wjct3zt', 'HeroColliderProxy', __filename);
// Script/HeroColliderProxy.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {},

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._realListener = null;
    },
    start: function start() {},


    // update (dt) {},

    //logic
    setRealListener: function setRealListener(realListener) {
        this._realListener = realListener;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (this._realListener) {
            this._realListener.onCollisionEnter(other, self);
        }
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
        //# sourceMappingURL=HeroColliderProxy.js.map
        