"use strict";
cc._RF.push(module, 'e3c22SE6LxH94Tih+hbpskR', 'Prop');
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