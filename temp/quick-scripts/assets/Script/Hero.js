(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Hero.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '284632PZTxAoIx26cEjZvmd', 'Hero', __filename);
// Script/Hero.js

"use strict";

var HeroStatus = cc.Enum({
    dead: -1,
    running: -1,
    jump: -1,
    fly: -1
});

cc.Class({
    extends: cc.Component,

    properties: {
        colliderProxy: {
            default: null,
            type: require("HeroColliderProxy")
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        Global.hero = this;
        this._status = HeroStatus.running;
        this._gameMainScene = null;
    },
    start: function start() {
        this._leftOrRight = -1;
        this.colliderProxy.setRealListener(this);
    },


    // update (dt) {},

    // logic
    setGameMainScene: function setGameMainScene(mainScene) {
        this._gameMainScene = mainScene;
    },


    setLeftOrRight: function setLeftOrRight(leftOrRight) {
        this._leftOrRight = leftOrRight;
    },
    getLeftOrRight: function getLeftOrRight() {
        return this._leftOrRight;
    },

    run: function run() {
        this._status = HeroStatus.running;
    },

    jump: function jump() {
        this._status = HeroStatus.jump;
    },

    fly: function fly() {
        this._status = HeroStatus.fly;
    },

    dead: function dead() {
        this._status = HeroStatus.dead;
    },

    /**
     * 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function onCollisionEnter(other, self) {
        console.log('on collision enter');

        if (this._status !== HeroStatus.dead) {
            var group = cc.game.groupList[other.node.groupIndex];
            if (group === "enemy") {
                if (this._status === HeroStatus.running) {
                    // dead, game oveer
                    this.dead();
                    this._gameMainScene.gameOver();
                    other.node.getComponent("Enemy").beVictory();
                } else {
                    other.node.getComponent("Enemy").beKilled();
                }
            } else {}
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
        //# sourceMappingURL=Hero.js.map
        