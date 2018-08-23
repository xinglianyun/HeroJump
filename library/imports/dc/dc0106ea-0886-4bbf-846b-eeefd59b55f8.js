"use strict";
cc._RF.push(module, 'dc010bqCIZLv4Rr7u/Vm1X4', 'Enemy');
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


    // update (dt) {},

    //logic
    setRealListener: function setRealListener(realListener) {
        this._realListener = realListener;
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
    }
});

cc._RF.pop();