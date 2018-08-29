"use strict";
cc._RF.push(module, 'f7b1dc5DqBF0pywMhvO+d9N', 'GameManager');
// Script/GameManager.js

"use strict";

/**
 * desc     :   game manager contains the Global Varible and some calculate logic
 * authur   :   xinghui
 */
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
        // 游戏运行时间
        _totalTime: {
            default: 0.0,
            type: cc.Float
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


    //************************************start logic*************************************************//
    /**
     * desc: calaulate the apperence rate of enemy according to the rate
     *       the varible _enemyTotalRate contains the total rate of the enemys in one level
     *       the _enemyRate contains the seperate rate of the enemys
     */
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

    /**
     * desc: init all the pool of the enemy
     */
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

        this._bannerEnemyPool = new cc.NodePool();
        this._bannerEnemyPoolCapacity = 2;
        for (var _i7 = 0; _i7 < this._bannerEnemyPoolCapacity; ++_i7) {
            var _enemy7 = cc.instantiate(this.bannerPrefab); // banner enemy pool
            this._bannerEnemyPool.put(_enemy7);
        }
    },
    /**
     * desc: create enemy according the distance
     */
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

    /**
     * desc: create enemy by type
     */
    generateEnemyByType: function generateEnemyByType(enemyType) {
        var enemy = null;
        switch (enemyType) {
            case Global.enemyType.bird:
                enemy = this._createBird();
                break;
            case Global.enemyType.dart2:
                enemy = this._createDart2();
                break;
            case Global.enemyType.line:
                enemy = this._createLine();
                break;
            case Global.enemyType.linecat:
                enemy = this._createLineCat();
                break;
            case Global.enemyType.shortbarrier:
                enemy = this._createShortBarrier();
                break;
            case Global.enemyType.longbarrier:
                enemy = this._createLongBarrier();
                break;
            case Global.enemyType.enemyrun:
                enemy = this._createRunEnemy();
                break;
        }
        return { enemyNode: enemy, type: enemyType };
    },

    /**
     * desc: create bird
     */
    _createBird: function _createBird() {
        var bird = null;
        bird = this._birdEnemyPool.get();
        if (!bird) {
            bird = cc.instantiate(this.birdEnemyPrefab);
        }
        return bird;
    },
    /**
     * desc: create dartenemy with 2 dart 
     */
    _createDart2: function _createDart2() {
        var dart2 = null;
        dart2 = this._dartEnemyPool.get();
        if (!dart2) {
            dart2 = cc.instantiate(this.dartEnemyPrefab);
        }

        for (var i = 0; i < 2; ++i) {
            var dartNode = this._dartNodePool.get();
            if (!dartNode) {
                dartNode = cc.instantiate(this.dartPrefab);
            }
            dart2.getComponent("DartEnemy").addChildDartNode(dartNode);
        }

        return dart2;
    },

    /**
     * desc: create line alone
     */
    _createLine: function _createLine() {
        var line = null;
        line = this._bannerEnemyPool.get();
        if (!line) {
            line = cc.instantiate(this.bannerPrefab);
        }
        return line;
    },

    /**
     * desc: create line with cat
     */
    _createLineCat: function _createLineCat() {
        var line = this._createLine();

        var cat = null;
        cat = this._catEnemyPool.get();
        if (!cat) {
            cat = cc.instantiate(this.catEnemyPrefab);
        }
        line.getComponent("LineEnemy").addCat(cat);
        return line;
    },

    /**
     * desc: create short barrier
     */
    _createShortBarrier: function _createShortBarrier() {
        var barrier = null;
        barrier = this._crackerShortEnemyPool.get();
        if (!barrier) {
            barrier = cc.instantiate(this.crakerShortEnemyPrefab);
        }
        return barrier;
    },

    /**
     * desc: create long barrier
     */
    _createLongBarrier: function _createLongBarrier() {
        var barrier = null;
        barrier = this._crackerLongEnemyPool.get();
        if (!barrier) {
            barrier = cc.instantiate(this.crakerLongEnemyPrefab);
        }
        return barrier;
    },

    /**
     * desc: create run enemy
     */
    _createRunEnemy: function _createRunEnemy() {
        var runEnemy = null;
        runEnemy = this._runEnemyPool.get();
        if (!runEnemy) {
            runEnemy = cc.instantiate(this.runEnemyPrefab);
        }
        return runEnemy;
    },

    /**
     * desc: re collect the node of no use
     */
    collectEnemy: function collectEnemy(node, type) {
        switch (type) {
            case Global.enemyNodeType.bird:
                this._birdEnemyPool.put(node);
                break;
            case Global.enemyNodeType.dartenemy:
                this._dartEnemyPool.put(node);
                break;
            case Global.enemyNodeType.dartnode:
                this._dartNodePool.put(node);
                break;
            case Global.enemyNodeType.line:
                this._bannerEnemyPool.put(node);
                break;
            case Global.enemyNodeType.cat:
                this._catEnemyPool.put(node);
                break;
            case Global.enemyNodeType.shortbarrier:
                this._crackerShortEnemyPool.put(node);
                break;
            case Global.enemyNodeType.longbarrier:
                this._crackerLongEnemyPool.put(node);
                break;
            case Global.enemyNodeType.runenemy:
                this._runEnemyPool.put(node);
                break;
        }
    },

    /**
     * desc: get the enenmy appare time inteval accroding the distance
     */
    getTimeIntevalWithDistance: function getTimeIntevalWithDistance(distance) {
        for (var level = 0; level < GameData.EnemyConfig.length; ++level) {
            var config = GameData.EnemyConfig[level];
            if (distance <= config.height) return config.space;
        }
        return GameData.EnemyConfig[GameData.EnemyConfig.length - 1].space;
    },

    /**
     * desc: game over
     */
    gameOver: function gameOver() {}
    // game over

    //************************************start logic*************************************************//
});

cc._RF.pop();