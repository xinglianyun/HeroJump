"use strict";
cc._RF.push(module, '284632PZTxAoIx26cEjZvmd', 'Hero');
// Script/Hero.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html
var Global = require("Global");
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