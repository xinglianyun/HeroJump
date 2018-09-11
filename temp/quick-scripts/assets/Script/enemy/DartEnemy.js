(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/enemy/DartEnemy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, '5be60po1ftAeKQCWHjKcJbn', 'DartEnemy', __filename);
// Script/enemy/DartEnemy.js

"use strict";

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
        },
        _dartNodes: [cc.Node]
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._game = cc.find("Game");

        this.node.getComponent("Enemy").setRealListener(this);
        this._enemyNodeType = Global.enemyNodeType.dartenemy;

        console.log("aaaaaaaaaaaaaaaaaa DartEnemy onLoad " + this.node.uuid);
        this.onInit();
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
            if (Math.abs(this._totalOffsetY) >= cc.winSize.height * this.emitDartTime) {
                // emit the DartNode
                this.emitDartNode();
                this._isEmitDart = true;
            }
        }

        if (Math.abs(this._totalOffsetY) >= cc.winSize.height * 1.5) {
            this.beCollected();
        }
    },


    onDestroy: function onDestroy() {
        console.log("aaaaaaaaaaaaaaaaaa DartEnemy onDestroy " + this.node.uuid);
        this._dartNodes = [];
    },

    reuse: function reuse() {
        this.onInit();
    },

    //************************************start logic*************************************************//
    onInit: function onInit() {
        this._totalOffsetY = 0.0;
        this._startSide = -1;
        this._targetWorldPos = cc.Vec2(0, 0);
        this._isEmitDart = false;
        this._idle = false;

        this.node.setPosition(0, 0);
        this.node.setScale(1);
        console.log("aaaaaaaaaaaaaaaaaa DartEnemy onInit " + this.node.uuid);
    },
    /**
     * desc: add the dart node to dart
     */
    addChildDartNode: function addChildDartNode(dartNode) {
        dartNode.parent = this.node;
        this._dartNodes.push(dartNode);

        console.log("aaaaaaaaaaaaaaaaaa DartEnemy addChildDartNode " + this.node.uuid + " " + dartNode.uuid);
    },
    /**
     * desc: set the start side
     */
    setStartSide: function setStartSide(startSide) {
        console.log("aaaaaaaaaaaaaaaaaa DartEnemy setStartSide " + this.node.uuid);
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
        console.log("aaaaaaaaaaaaaaaaaa DartEnemy beVictory " + this.node.uuid);
    },

    /**
     * desc: killed by the hero
     */
    beKilled: function beKilled() {
        console.log("aaaaaaaaaaaaaaaaaa DartEnemy beKilled " + this.node.uuid);

        this.node.stopAllActions();
        for (var i = 0; i < this._dartNodes.length; ++i) {
            if (this._dartNodes[i]) {
                this._dartNodes[i].stopAllActions();
                this._dartNodes[i].getComponent("DartNode").beCollected();
            }
        }
        this._dartNodes = [];
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType);
    },
    /**
     * desc: node to be collected
     */
    beCollected: function beCollected() {
        console.log("aaaaaaaaaaaaaaaaaa DartEnemy beCollected " + this.node.uuid);

        this.node.stopAllActions();
        for (var i = 0; i < this._dartNodes.length; ++i) {
            if (this._dartNodes[i]) {
                this._dartNodes[i].stopAllActions();
                this._dartNodes[i].getComponent("DartNode").beCollected();
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
     * desc: get enemy node type
     */
    getEnemyNodeType: function getEnemyNodeType() {
        return this._enemyNodeType;
    },

    /**
     * desc: display the dead enemy when killed
     */
    DisplayDeadEnemyState: function DisplayDeadEnemyState(isDeadState) {
        this.getComponent(cc.BoxCollider).enabled = !isDeadState;
        this.setIdle(isDeadState);
    },

    /**
     * desc: emit the dart node
     */
    emitDartNode: function emitDartNode() {
        console.log("aaaaaaaaaaaaaaaaaa DartEnemy emitDartNode " + this.node.uuid);

        for (var i = 0; i < this._dartNodes.length; ++i) {
            if (i === 0) {
                console.log("aaaaaaaaaaaaaaaaaa DartEnemy emitDartNode emit" + this._dartNodes[i].uuid);
                // fly to hero
                var moveToHeroPos = this.node.parent.convertToNodeSpace(this._targetWorldPos);
                moveToHeroPos.x += this._startSide * this._overScreenX;
                moveToHeroPos.y += this._overScreenX * Math.abs(this.node.y - moveToHeroPos.y) / Math.abs(this.node.x - moveToHeroPos.x);
                var moveAction = cc.moveTo(cc.winSize.height * (1 - this.emitDartTime) / Math.abs(Global.gameMainScene.getRunSpeed()) * 0.5, moveToHeroPos);
                // change the dartnode's parent to the grandpa
                var dartNodeWorldPos = this.node.convertToWorldSpace(this._dartNodes[i].getPosition());
                var tmpPos = this.node.parent.convertToNodeSpace(dartNodeWorldPos);
                this._dartNodes[i].parent = this.node.parent;
                this._dartNodes[i].setPosition(tmpPos);
                this._dartNodes[i].runAction(moveAction);
            } else if (i === 1) {
                // fly horizon
                var offsetX = -1 * this._startSide * cc.winSize.width * this.node.scaleX;
                var time = cc.winSize.height * (1 - this.emitDartTime) / Math.abs(Global.gameMainScene.getRunSpeed());
                var moveAction = cc.moveBy(time, offsetX, 0);
                console.log("aaaaaaaaaaaaaaaaaa DartEnemy emitDartNode emit " + this._dartNodes[i].uuid + " _startSide " + this._startSide + " time " + time + " offsetX " + offsetX);

                this._dartNodes[i].runAction(moveAction);
            } else if (i === 2) {}
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
        //# sourceMappingURL=DartEnemy.js.map
        