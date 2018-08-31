(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/enemy/Bird.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'fbd32tK2Z9LFJ5lf38NG2YB', 'Bird', __filename);
// Script/enemy/Bird.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 鸟儿向下移动进场时间
        flyDownTime: {
            default: 0.5,
            type: cc.Float
        },
        // 定点飞行的时间
        flyTime: {
            default: 1.0,
            type: cc.Float
        },
        // 飞向enemy的时间
        flyToHeroTime: {
            default: 5.0,
            type: cc.Float
        },
        // 杀死hero之后的飞行动作时间
        flyVictoryTime: {
            default: 0.8,
            type: cc.Float
        },
        // 鸟儿出现的位置
        _startSide: {
            default: -1,
            type: cc.Integer
        },
        // 飞向hero的时候，终点在x方向的延长
        _overScreenX: {
            default: 100.0,
            type: cc.Float
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._startOffsetY = 100;
        this._startSide = -1;
        this._targetWorldPos = cc.Vec2(0, 0);
        this.node.y += this._startOffsetY;
        this.scheduleOnce(this.moveBird, 0);

        this.node.getComponent("Enemy").setRealListener(this);
        this._enemyNodeType = Global.enemyNodeType.bird;
    },
    start: function start() {},


    // update (dt) {},

    //************************************start logic*************************************************//
    setStartSide: function setStartSide(startSide) {
        this._startSide = startSide;
    },

    /**
     * desc: move the bird
     */
    moveBird: function moveBird() {
        var moveDownAction = cc.moveBy(this.flyDownTime, 0, this._startOffsetY * -1);
        var delayAction = cc.delayTime(this.flyTime);

        var moveToHeroPos = this.node.parent.convertToNodeSpace(this._targetWorldPos);
        moveToHeroPos.x += -this._startSide * this._overScreenX;
        moveToHeroPos.y -= this._overScreenX * Math.abs(this.node.y - moveToHeroPos.y) / Math.abs(this.node.x - moveToHeroPos.x);
        var moveToHeroAction = cc.moveTo(this.flyToHeroTime, moveToHeroPos);

        var callfunc = cc.callFunc(function (target) {
            this.beKilled();
        }, this);
        var sequeenAction = cc.sequence(moveDownAction, delayAction, moveToHeroAction, callfunc);
        this.node.runAction(sequeenAction);
    },

    /**
     * desc: set the target world pos
     */
    setTargetWorldPos: function setTargetWorldPos(worldPos) {
        this._targetWorldPos = worldPos;
    },

    /**
     * desc: when victory (kill the hero)
     */
    beVictory: function beVictory() {
        this.node.stopAllActions();
        var moveHorizon = cc.moveBy(this.flyVictoryTime, -this._startSide * 200, 0);
        var callback = cc.callfunc(function (target) {
            this.beCollected();
        }, this);
        var sequenceAction = cc.sequence(moveHorizon, callback);
        this.node.runAction(sequenceAction);
    },

    /**
     * desc: when killed by hero
     */
    beKilled: function beKilled() {
        //todo: run dead animation
        this.node.stopAllActions();
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType);
    },
    /**
     * desc: node to be collected
     */
    beCollected: function beCollected() {
        this.node.stopAllActions();
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType);
    }
    //************************************start logic*************************************************//
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
        //# sourceMappingURL=Bird.js.map
        