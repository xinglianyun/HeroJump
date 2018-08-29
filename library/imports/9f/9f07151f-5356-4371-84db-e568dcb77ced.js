"use strict";
cc._RF.push(module, '9f071UfU1ZDcYTb5Wjct3zt', 'HeroColliderProxy');
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

    //************************************start logic*************************************************//
    setRealListener: function setRealListener(realListener) {
        this._realListener = realListener;
    },

    onCollisionEnter: function onCollisionEnter(other, self) {
        if (this._realListener) {
            this._realListener.onCollisionEnter(other, self);
        }
    }
    //************************************start logic*************************************************//
});

cc._RF.pop();