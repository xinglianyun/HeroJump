"use strict";
cc._RF.push(module, '5be60po1ftAeKQCWHjKcJbn', 'DartEnemy');
// Script/enemy/DartEnemy.js

"use strict";

var dartNodes = [];

cc.Class({
    extends: cc.Component,

    properties: {
        // emit the dart when the dart enemy go throw the screen
        emitDartTime: {
            default: 0.3,
            type: cc.Float
        },
        // 开始方向
        _startSide: {
            default: -1,
            type: cc.Integer
        },
        // 飞向hero的飞镖的终点在屏幕外的x坐标
        _overScreenX: {
            default: -100.0,
            type: cc.Float
        },
        _idle: {
            default: false,
            type: cc.Boolean
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._game = cc.find("Game");
        this._totalOffsetY = 0.0;
        this._startSide = -1;
        this._targetWorldPos = cc.Vec2(0, 0);
        this._isEmitDart = false;
        this.node.getComponent("Enemy").setRealListener(this);
        this._enemyNodeType = Global.enemyNodeType.dartenemy;
    },
    start: function start() {},
    update: function update(dt) {
        if (this._idle) {
            return;
        }

        var gameMainSceneSpeed = Global.gameMainScene.getRunSpeed();
        var offsetY = gameMainSceneSpeed * dt;
        this.node.y += offsetY;
        this._totalOffsetY += offsetY;

        if (!this._isEmitDart) {
            if (Math.abs(this._totalOffsetY) >= cc.director.getWinSize().height * this.emitDartTime) {
                // emit the DartNode
                this.emitDartNode();
                this._isEmitDart = true;
            }
        }

        if (Math.abs(this._totalOffsetY) >= cc.director.getWinSize() * 1.5) {
            this.beCollected();
        }
    },


    //************************************start logic*************************************************//
    /**
     * desc: add the dart node to dart
     */
    addChildDartNode: function addChildDartNode(dartNode) {
        dartNode.parent = this.node;
        dartNodes.push(dartNode);
    },
    /**
     * desc: set the start side
     */
    setStartSide: function setStartSide(startSide) {
        this._startSide = startSide;
    },

    /**
     * desc: set the world pos of target
     */
    setTargetWorldPos: function setTargetWorldPos(worldPos) {
        this._targetWorldPos = worldPos;
    },

    /**
     * desc: kill the hero
     */
    beVictory: function beVictory() {
        this.node.stopAllActions();
    },

    /**
     * desc: killed by the hero
     */
    beKilled: function beKilled() {
        this.node.stopAllActions();
        for (var i = 0; i < dartNodes.length; ++i) {
            if (dartNodes[i]) {
                dartNodes[i].stopAllActions();
                dartNodes[i].getComponent("DartNode").beCollected();
            }
        }
        dartNodes = [];
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType);
    },
    /**
     * desc: node to be collected
     */
    beCollected: function beCollected() {
        this.node.stopAllActions();
        for (var i = 0; i < dartNodes.length; ++i) {
            if (dartNodes[i]) {
                dartNodes[i].stopAllActions();
                dartNodes[i].getComponent("DartNode").beCollected();
            }
        }
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType);
    },

    /**
     * desc: set the enemy state
     */
    setIdle: function setIdle(idle) {
        this._idle = idle;
    },

    /**
     * desc: emit the dart node
     */
    emitDartNode: function emitDartNode() {
        for (var i = 0; i < dartNodes.length; ++i) {
            if (i === 0) {
                // fly to hero
                var moveToHeroPos = this.node.parent.convertToNodeSpace(this._targetWorldPos);
                moveToHeroPos.x += this._startSide * this._overScreenX;
                moveToHeroPos.y += this._overScreenX * Math.abs(this.node.y - moveToHeroPos.y) / Math.abs(this.node.x - moveToHeroPos.x);
                var moveAction = cc.moveTo(cc.director.getWinSize().height * (1 - this.emitDartTime) / Math.abs(Global.gameMainScene.getRunSpeed()) * 0.5, moveToHeroPos);
                // change the dartnode's parent to the grandpa
                var dartNodeWorldPos = this.node.convertToWorldSpace(dartNodes[i].getPosition());
                var tmpPos = this.node.parent.convertToNodeSpace(dartNodeWorldPos);
                dartNodes[i].parent = this.node.parent;
                dartNodes[i].setPosition(tmpPos);
                dartNodes[i].runAction(moveAction);
            } else if (i === 1) {
                // fly horizon
                var moveAction = cc.moveBy(cc.director.getWinSize().height * (1 - this.emitDartTime) / Math.abs(Global.gameMainScene.getRunSpeed()), this._startSide * cc.director.getWinSize().width, 0);
                dartNodes[i].runAction(moveAction);
            } else if (i === 2) {}
        }
    }

    //************************************end logic*************************************************//

});

cc._RF.pop();