"use strict";
cc._RF.push(module, '5be60po1ftAeKQCWHjKcJbn', 'DartEnemy');
// Script/enemy/DartEnemy.js

"use strict";

var Global = require("Global");
var dartNodes = [];

cc.Class({
    extends: cc.Component,

    properties: {
        type: {
            default: "dartenemy",
            type: cc.String
        },
        // emit the dart when the dart enemy go throw the screen
        emitDartTime: {
            default: 0.5,
            type: cc.Float
        },
        _startSide: {
            default: -1,
            type: cc.Integer
        },
        _overScreenX: {
            default: -100.0,
            type: cc.Float
        }
    },

    //logic
    addChildDartNode: function addChildDartNode(dartNode) {
        dartNode.getComponent("DartNode").setGameManager(this._gameManager);
        dartNode.parent = this.node;
        dartNodes.push(dartNode);
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._game = cc.find("Game");
        this._gameMainScene = this._game.getComponent("GameMainScene");
        this._totalOffsetY = 0.0;
        this._startSide = -1;
        this._targetWorldPos = cc.Vec2(0, 0);
        this._isEmitDart = false;
        this.node.getComponent("Enemy").setRealListener(this);
    },
    start: function start() {},
    update: function update(dt) {
        var gameMainSceneSpeed = this._gameMainScene.getRunSpeed();
        var offsetY = gameMainSceneSpeed * dt;
        this.node.y -= offsetY;
        this._totalOffsetY += offsetY;

        if (!this._isEmitDart) {
            if (Math.abs(this._totalOffsetY) >= cc.director.getWinSize().height * this.emitDartTime) {
                // emit the DartNode
                this.emitDartNode();
                this._isEmitDart = true;
            }
        }

        if (Math.abs(this._totalOffsetY) >= cc.director.getWinSize() * 1.5) {
            this._gameManager.collectEnemy(this.node, this.type);
        }
    },


    // logic
    setStartSide: function setStartSide(startSide) {
        this._startSide = startSide;
    },

    setGameManager: function setGameManager(gameManager) {
        this._gameManager = gameManager;
    },

    setTargetWorldPos: function setTargetWorldPos(worldPos) {
        this._targetWorldPos = worldPos;
    },

    beVictory: function beVictory() {
        this.node.stopAllActions();
    },

    beKilled: function beKilled() {
        this.node.stopAllActions();
        this._gameManager.collectEnemy(this.node, this.type);
    },

    emitDartNode: function emitDartNode() {
        var _this = this;

        var _loop = function _loop(i) {
            //dartNodes[i].getComponent("DartNode").runToTarget(this._targetWorldPos, i, dartNodes.length)
            if (i === 0) {
                moveToHeroPos = _this.node.parent.convertToNodeSpace(_this._targetWorldPos);

                moveToHeroPos.x += -_this._startSide * _this._overScreenX;
                moveToHeroPos.y -= _this._overScreenX * Math.abs(_this.node.y - moveToHeroPos.y) / Math.abs(_this.node.x - moveToHeroPos.x);
                moveAction = cc.moveTo(cc.director.getWinSize().height * (1 - _this.emitDartTime) / _this._gameMainScene.getRunSpeed() * 0.5, moveToHeroPos);
                callfunc = cc.callFunc(function (target) {
                    this._gameManager.collectEnemy(dartNodes[i], "dartnode");
                }, _this);
                sequence = cc.sequence(moveAction, callfunc);

                dartNodes[i].parent = _this.node.parent;
                dartNodes[i].runAction(sequence);
            } else if (i === 1) {
                moveAction = cc.moveBy(cc.director.getWinSize().height * (1 - _this.emitDartTime) / _this._gameMainScene.getRunSpeed(), -_this._startSide * cc.director.getWinSize().width, 0);
                callfunc = cc.callFunc(function (target) {
                    this._gameManager.collectEnemy(dartNodes[i], "dartnode");
                }, _this);
                sequence = cc.sequence(moveAction, callfunc);

                dartNodes[i].runAction(sequence);
            } else if (i === 2) {}
        };

        for (var i = 0; i < dartNodes.length; ++i) {
            var moveToHeroPos;
            var moveAction;
            var callfunc;
            var sequence;
            var moveAction;
            var callfunc;
            var sequence;

            _loop(i);
        }
    }
});

cc._RF.pop();