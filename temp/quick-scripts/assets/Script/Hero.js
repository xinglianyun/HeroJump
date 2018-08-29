(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Hero.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '284632PZTxAoIx26cEjZvmd', 'Hero', __filename);
// Script/Hero.js

"use strict";

// 英雄状态
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
    },
    start: function start() {
        this._status = HeroStatus.running;
        this._leftOrRight = -1;
        this.colliderProxy.setRealListener(this);
    },


    // update (dt) {},

    //************************************start logic*************************************************//
    /**
     * desc: left(-1) or right(1)
     */
    setLeftOrRight: function setLeftOrRight(leftOrRight) {
        this._leftOrRight = leftOrRight;
    },

    /**
     * desc: return left or right
     */
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
     * desc: 当碰撞产生的时候调用
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
                    Global.gameMainScene.gameOver();
                    other.node.getComponent("Enemy").beVictory();
                } else {
                    other.node.getComponent("Enemy").beKilled();
                }
            } else {}
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
        //# sourceMappingURL=Hero.js.map
        