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
        // 碰撞代理组件
        colliderProxy: {
            default: null,
            type: require("HeroColliderProxy")
        },
        propCenterNode: {
            default: null,
            type: cc.Node
        },
        invincibleTime: {
            default: 3.0,
            type: cc.Float
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
        this._allProps = {
            circleprop: {
                count: 0,
                circlePropNode: null
            }
        };
        this._invincible = false;
        this._invincibleDurTime = 0.0;
        this._oldParentNode = null;
    },
    update: function update(dt) {
        if (this._invincible) {
            this._invincibleDurTime += dt;
            if (this._invincibleDurTime >= this.invincibleTime) {
                this.setInvincible(false);
            }
        }
    },


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
     * desc: add the prop
     */
    addProp: function addProp(propNode) {
        propNode.getComponent("Prop").beOnHero();
        var propEnemyType = propNode.getComponent("Prop").getPropEnemyType();
        switch (propEnemyType) {
            case Global.enemyType.circleprop:
                this.addCircleProp(propNode);
                break;
        }
    },

    /**
     * desc: add the circle prop
     */
    addCircleProp: function addCircleProp(propNode) {
        this._allProps.circleprop.count += 1;
        propNode.parent = this.propCenterNode;
        propNode.setPosition(0, 0);

        if (!this._allProps.circleprop.circlePropNode) {
            this._allProps.circleprop.circlePropNode = propNode;
        }
    },

    /**
     * desc: delete one circle prop
     */
    deleteCircleProp: function deleteCircleProp() {
        this._allProps.circleprop.count -= 1;
        if (this._allProps.circleprop.count <= 0) {
            this._allProps.circleprop.count = 0;
            this._allProps.circleprop.circlePropNode.getComponent("Prop").beCollected();
            this._allProps.circleprop.circlePropNode = null;
        }
    },

    /**
     * desc: set the hero invincible
     */
    setInvincible: function setInvincible(invincible, type) {
        this._invincible = invincible;
        if (invincible) {
            this._oldParentNode = this.node.parent;
            this.node.parent = Global.gameMainScene.centerHeroPosNode;
            switch (type) {
                case Global.enemyType.bird:
                    this.getComponent(cc.Animation).play("HeroBirdRushClip");
                    break;
                case Global.enemyType.dart2:
                    this.getComponent(cc.Animation).play("HeroDartRushClip");
                    break;
                case Global.enemyType.linecat:
                    this.getComponent(cc.Animation).play("HeroCatRushClip");
                    break;
            }
        } else {
            this.node.parent = this._oldParentNode;
            this.getComponent(cc.Animation).play("HeroRunClip");
        }
    },

    /**
     * desc: get the hero invincible
     */
    getInvincible: function getInvincible() {
        return this._invincible;
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
                if (this._status === HeroStatus.running && !this._invincible) {
                    if (this._allProps.circleprop > 0) {
                        this.deleteCircleProp();
                        other.node.getComponent("Enemy").beKilled();
                    } else {
                        // dead, game oveer
                        this.dead();
                        Global.gameMainScene.gameOver();
                        other.node.getComponent("Enemy").beVictory();
                    }
                } else {
                    other.node.getComponent("Enemy").beKilled();
                }
            } else if (group === "prop") {
                this.addProp(other.node);
            }
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
        