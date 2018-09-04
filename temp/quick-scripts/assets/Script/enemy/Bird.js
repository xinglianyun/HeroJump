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
        },
        _idle: {
            default: false,
            type: cc.Boolean
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this.node.getComponent("Enemy").setRealListener(this);
        this._enemyNodeType = Global.enemyNodeType.bird;
        console.log("Jump Hero : Bird onLoad " + this.node.uuid);
    },
    start: function start() {
        console.log("Jump Hero :  Bird start " + this.node.uuid);
    },


    reuse: function reuse() {
        console.log("Jump Hero :  Bird reuse " + this.node.uuid);
    },

    // update (dt) {},

    //************************************start logic*************************************************//
    onInit: function onInit() {
        this.node.setPosition(0, 0);
        this.node.setScale(1);

        this._startOffsetY = 100;
        this._startSide = -1;
        this._targetWorldPos = cc.Vec2(0, 0);
        this.node.y += this._startOffsetY;
        this._idle = false;

        this.scheduleOnce(this.moveBird, 0.1);

        console.log("Jump Hero :  Bird onInit " + this.node.uuid);
    },

    /**
     * desc: set the start side
     */
    setStartSide: function setStartSide(startSide) {
        this._startSide = startSide;
        console.log("Jump Hero :  Bird setStartSide " + this.node.uuid);
    },

    /**
     * desc: set the enemy state
     */
    setIdle: function setIdle(idle) {
        this._idle = idle;
        console.log("Jump Hero : Bird setIdle " + this.node.uuid);
    },

    /**
     * desc: move the bird
     */
    moveBird: function moveBird() {
        if (this._idle) {
            return;
        }
        var moveDownAction = cc.moveBy(this.flyDownTime, 0, this._startOffsetY * -1);
        var delayAction = cc.delayTime(this.flyTime);

        var moveToHeroPos = this.node.parent.convertToNodeSpace(this._targetWorldPos);
        moveToHeroPos.x += -this._startSide * this._overScreenX;
        moveToHeroPos.y -= this._overScreenX * Math.abs(this.node.y - moveToHeroPos.y) / Math.abs(this.node.x - moveToHeroPos.x);
        var moveToHeroAction = cc.moveTo(this.flyToHeroTime, moveToHeroPos);

        var callfunc = cc.callFunc(function (target) {
            this.beCollected();
        }, this);
        var sequeenAction = cc.sequence(moveDownAction, delayAction, moveToHeroAction, callfunc);
        this.node.runAction(sequeenAction);
    },

    /**
     * desc: set the target world pos
     */
    setTargetWorldPos: function setTargetWorldPos(worldPos) {
        this._targetWorldPos = worldPos;
        console.log("Jump Hero : Bird setTargetWorldPos " + this.node.uuid);
    },

    /**
     * desc: when victory (kill the hero)
     */
    beVictory: function beVictory() {
        this.node.stopAllActions();
        var moveHorizon = cc.moveBy(this.flyVictoryTime, -this._startSide * 200, 0);
        var callback = cc.callFunc(function (target) {
            this.beCollected();
        }, this);
        var sequenceAction = cc.sequence(moveHorizon, callback);
        this.node.runAction(sequenceAction);

        console.log("Jump Hero : Bird beVictory " + this.node.uuid);
    },

    /**
     * desc: when killed by hero
     */
    beKilled: function beKilled() {
        //todo: run dead animation
        this.node.stopAllActions();
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType);
        console.log("Jump Hero : Bird beKilled " + this.node.uuid);
    },
    /**
     * desc: node to be collected
     */
    beCollected: function beCollected() {
        this.node.stopAllActions();
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType);
        console.log("Jump Hero : Bird beCollected " + this.node.uuid);
    },

    /**
     * desc: get enemy node type
     */
    getEnemyNodeType: function getEnemyNodeType() {
        return this._enemyNodeType;
    },
    /**
     * desc: display the dead enemy when killed
     */
    DisplayDeadEnemyState: function DisplayDeadEnemyState() {
        this.getComponent(cc.BoxCollider).enabled = false;
        this.setIdle(true);
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
        