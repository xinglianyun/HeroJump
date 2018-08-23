(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f7b1dc5DqBF0pywMhvO+d9N', 'GameManager', __filename);
// Script/GameManager.js

"use strict";

/**
 * desc     :   game manager contains the Global Varible and some calculate logic
 * authur   :   xinghui
 */
var Global = require("Global");
var GameData = require("GameData");
cc.Class({

    extends: cc.Component,

    properties: {
        birdEnemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        catEnemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        crakerLongEnemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        crakerShortEnemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        dartEnemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        dartPrefab: {
            default: null,
            type: cc.Prefab
        },
        runEnemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        bannerPrefab: {
            default: null,
            type: cc.Prefab
        },
        _totalTime: {
            default: 0.0,
            type: cc.Float
        }
    },
    //logic func
    initEnemyRate: function initEnemyRate() {
        for (var level = 0; level < GameData.EnemyConfig.length; ++level) {
            var config = GameData.EnemyConfig[level];
            this._enemyTotalRate[level] = 0;
            this._enemyRate[level] = [];
            for (var enemyIndex = 0; enemyIndex < config.enemy.length; ++enemyIndex) {
                var enemy = config.enemy[enemyIndex];
                this._enemyTotalRate[level] += enemy.rate;
                this._enemyRate[level][enemyIndex] = this._enemyTotalRate[level];
            }
        }
    },

    initEnemyPool: function initEnemyPool() {
        this._birdEnemyPool = new cc.NodePool();
        this._birdPoolCapacity = 2;
        for (var i = 0; i < this._birdPoolCapacity; ++i) {
            var enemy = cc.instantiate(this.birdEnemyPrefab); // bird pool
            this._birdEnemyPool.put(enemy);
        }

        this._catEnemyPool = new cc.NodePool();
        this._catPoolCapacity = 2;
        for (var _i = 0; _i < this._catPoolCapacity; ++_i) {
            var _enemy = cc.instantiate(this.catEnemyPrefab); // cat pool
            this._catEnemyPool.put(_enemy);
        }

        this._crackerLongEnemyPool = new cc.NodePool();
        this._crackerLongPoolCapacity = 2;
        for (var _i2 = 0; _i2 < this._crackerLongPoolCapacity; ++_i2) {
            var _enemy2 = cc.instantiate(this.crakerLongEnemyPrefab); // cracker long
            this._crackerLongEnemyPool.put(_enemy2);
        }

        this._crackerShortEnemyPool = new cc.NodePool();
        this._crackerShortPoolCapacity = 2;
        for (var _i3 = 0; _i3 < this._crackerShortPoolCapacity; ++_i3) {
            var _enemy3 = cc.instantiate(this.crakerShortEnemyPrefab); // cracker short
            this._crackerShortEnemyPool.put(_enemy3);
        }

        this._dartEnemyPool = new cc.NodePool();
        this._dartEnemyPoolCapacity = 2;
        for (var _i4 = 0; _i4 < this._dartEnemyPoolCapacity; ++_i4) {
            var _enemy4 = cc.instantiate(this.dartEnemyPrefab); // dart enemy pool
            this._dartEnemyPool.put(_enemy4);
        }

        this._dartNodePool = new cc.NodePool();
        this._dartNodePoolCapacity = 3;
        for (var _i5 = 0; _i5 < this._dartNodePoolCapacity; ++_i5) {
            var _enemy5 = cc.instantiate(this.dartPrefab); // dart node pool
            this._dartNodePool.put(_enemy5);
        }

        this._runEnemyPool = new cc.NodePool();
        this._runEnemyPoolCapacity = 2;
        for (var _i6 = 0; _i6 < this._runEnemyPoolCapacity; ++_i6) {
            var _enemy6 = cc.instantiate(this.runEnemyPrefab); // run enemy pool
            this._runEnemyPool.put(_enemy6);
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        Global.gameManager = this;
        cc.game.addPersistRootNode(this.Node);
        cc.director.getCollisionManager().enabled = true;
    },
    start: function start() {
        // Game Over
        this.gameOveer = false;
        // enemy level
        this._enemyLevel = 0;

        // enemy rate
        this._enemyRate = [];
        this._enemyTotalRate = [];
        this.initEnemyRate();

        // enemy pool 
        this.initEnemyPool();
    },
    update: function update(dt) {
        this._totalTime += dt;
    },


    // logic
    // 
    generateEnemy: function generateEnemy(distance) {
        var enemy = null;
        // get config
        var enemyLevel = 0;
        for (var level = 0; level < GameData.EnemyConfig.length; ++level) {
            var config = GameData.EnemyConfig[level];
            if (distance <= config.height) {
                enemyLevel = level;
                break;
            }
            if (level === GameData.EnemyConfig.length - 1) {
                enemyLevel = GameData.EnemyConfig.length - 1;
                break;
            }
        }

        var anchor = Math.random() * this._enemyTotalRate[enemyLevel];
        for (var enemyIndex = 0; enemyIndex < this._enemyRate[enemyLevel].length; ++enemyIndex) {
            if (anchor <= this._enemyRate[enemyLevel][enemyIndex]) {
                var enemyConfig = GameData.EnemyConfig[enemyLevel].enemy[enemyIndex];
                enemy = this.generateEnemyByType(enemyConfig.enemyType);
                break;
            }
        }

        return enemy;
    },

    generateEnemyByType: function generateEnemyByType(enemyType) {
        var enemy = null;
        enemyType = "dart2"; //todo : test
        switch (enemyType) {
            case "bird":
                enemy = this._createBird();
                break;
            case "dart2":
                enemy = this._createDart2();
                break;
        }
        return { enemyNode: enemy, type: enemyType };
    },

    _createBird: function _createBird() {
        var bird = null;
        bird = this._birdEnemyPool.get();
        if (!bird) {
            bird = cc.instantiate(this.birdEnemyPrefab);
        }
        return bird;
    },

    _createDart2: function _createDart2() {
        var dart2 = null;
        dart2 = this._dartEnemyPool.get();
        if (!dart2) {
            dart2 = cc.instantiate(this.dartEnemyPrefab);
        }

        var dartNode = null;
        for (var i = 0; i < 2; ++i) {
            dartNode = this._dartNodePool.get();
            if (!dartNode) {
                dartNode = cc.instantiate(this.dartPrefab);
            }
            dart2.node.getComponent("DartEnemy").addChildDartNode(dartNode[i]);
        }

        return dart2;
    },

    //
    collectEnemy: function collectEnemy(node, type) {
        switch (type) {
            case "bird":
                this._birdEnemyPool.put(node);
                break;
            case "dartenemy":
                this._dartEnemyPool.put(node);
                break;
            case "dartnode":
                this._dartNodePool.put(node);
                break;
        }
    },

    getTimeIntevalWithDistance: function getTimeIntevalWithDistance(distance) {
        for (var level = 0; level < GameData.EnemyConfig.length; ++level) {
            var config = GameData.EnemyConfig[level];
            if (distance <= config.height) return config.space;
        }
        return GameData.EnemyConfig[GameData.EnemyConfig.length - 1].space;
    },

    gameOver: function gameOver() {
        // game over

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
        //# sourceMappingURL=GameManager.js.map
        