(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/GameManager.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'f7b1dc5DqBF0pywMhvO+d9N', 'GameManager', __filename);
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
        // 鸟儿
        birdEnemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 猫
        catEnemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 长屋脊
        crakerLongEnemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 短屋脊
        crakerShortEnemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 忍者主体
        dartEnemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 忍着手里剑
        dartPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 跑步忍者
        runEnemyPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 条幅
        bannerPrefab: {
            default: null,
            type: cc.Prefab
        },
        // 圆圈道具
        circlePropPrefab: {
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
        cc.game.addPersistRootNode(this.Node);
        // enable the collider
        cc.director.getCollisionManager().enabled = true;
    },
    start: function start() {
        // enemy level
        this._enemyLevel = 0;

        this._totalTime = 0.0;

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
        this._birdEnemyPool = new cc.NodePool("Enemy");
        this._birdPoolCapacity = 2;
        for (var i = 0; i < this._birdPoolCapacity; ++i) {
            var enemy = cc.instantiate(this.birdEnemyPrefab); // bird pool
            this._birdEnemyPool.put(enemy);
        }

        this._catEnemyPool = new cc.NodePool("Enemy");
        this._catPoolCapacity = 2;
        for (var _i = 0; _i < this._catPoolCapacity; ++_i) {
            var _enemy = cc.instantiate(this.catEnemyPrefab); // cat pool
            this._catEnemyPool.put(_enemy);
        }

        this._crackerLongEnemyPool = new cc.NodePool("Enemy");
        this._crackerLongPoolCapacity = 2;
        for (var _i2 = 0; _i2 < this._crackerLongPoolCapacity; ++_i2) {
            var _enemy2 = cc.instantiate(this.crakerLongEnemyPrefab); // cracker long
            this._crackerLongEnemyPool.put(_enemy2);
        }

        this._crackerShortEnemyPool = new cc.NodePool("Enemy");
        this._crackerShortPoolCapacity = 2;
        for (var _i3 = 0; _i3 < this._crackerShortPoolCapacity; ++_i3) {
            var _enemy3 = cc.instantiate(this.crakerShortEnemyPrefab); // cracker short
            this._crackerShortEnemyPool.put(_enemy3);
        }

        this._dartEnemyPool = new cc.NodePool("Enemy");
        this._dartEnemyPoolCapacity = 2;
        for (var _i4 = 0; _i4 < this._dartEnemyPoolCapacity; ++_i4) {
            var _enemy4 = cc.instantiate(this.dartEnemyPrefab); // dart enemy pool
            this._dartEnemyPool.put(_enemy4);
        }

        this._dartNodePool = new cc.NodePool("Enemy");
        this._dartNodePoolCapacity = 3;
        for (var _i5 = 0; _i5 < this._dartNodePoolCapacity; ++_i5) {
            var _enemy5 = cc.instantiate(this.dartPrefab); // dart node pool
            this._dartNodePool.put(_enemy5);
        }

        this._runEnemyPool = new cc.NodePool("Enemy");
        this._runEnemyPoolCapacity = 2;
        for (var _i6 = 0; _i6 < this._runEnemyPoolCapacity; ++_i6) {
            var _enemy6 = cc.instantiate(this.runEnemyPrefab); // run enemy pool
            this._runEnemyPool.put(_enemy6);
        }

        this._bannerEnemyPool = new cc.NodePool("Enemy");
        this._bannerEnemyPoolCapacity = 2;
        for (var _i7 = 0; _i7 < this._bannerEnemyPoolCapacity; ++_i7) {
            var _enemy7 = cc.instantiate(this.bannerPrefab); // banner enemy pool
            this._bannerEnemyPool.put(_enemy7);
        }

        this._circlePropPool = new cc.NodePool("Prop");
        this._circlePropPoolCapacity = 2;
        for (var _i8 = 0; _i8 < this._circlePropPoolCapacity; ++_i8) {
            var prop = cc.instantiate(this.circlePropPrefab); // circle prop pool
            this._circlePropPool.put(prop);
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
        //enemyType = Global.enemyType.circleprop
        switch (enemyType) {
            case Global.enemyType.bird:
                enemy = this._createBird();
                break;
            case Global.enemyType.dart2:
                enemy = this._createDart2();
                break;
            case Global.enemyType.line:
                enemy = this._createBanner();
                break;
            case Global.enemyType.linecat:
                enemy = this._createBannerCat();
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
            case Global.enemyType.circleprop:
                enemy = this._createCircleProp();
                break;
        }
        if (enemy) {
            enemy.setPosition(0, 0);
        }
        return { enemyNode: enemy, type: enemyType };
    },

    /**
     * 
     */
    generateEnemyNodeByNodeType: function generateEnemyNodeByNodeType(enemyNodeType) {
        var enemy = null;
        switch (enemyNodeType) {
            case Global.enemyNodeType.bird:
                enemy = this._createBird();
                break;
            case Global.enemyNodeType.dartnode:
                enemy = this._createDartNode();
                break;
            case Global.enemyNodeType.cat:
                enemy = this._createCat();
                break;
            case Global.enemyNodeType.runenemy:
                enemy = this._createRunEnemy();
                break;
        }
        if (enemy) {
            enemy.setPosition(0, 0);
        }
        return enemy;
    },

    /**
     * desc: create bird
     */
    _createBird: function _createBird() {
        var bird = null;
        bird = this._birdEnemyPool.get();
        if (!bird) {
            bird = cc.instantiate(this.birdEnemyPrefab);
            console.log("Game Manager : _createBird, From prfab");
        } else {
            console.log("Game Manager : _createBird, From pool");
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
     * desc: create dart node
     */
    _createDartNode: function _createDartNode() {
        var dartNode = null;
        dartNode = this._dartNodePool.get();
        if (!dartNode) {
            dartNode = cc.instantiate(this.dartPrefab);
        }
        return dartNode;
    },

    /**
     * desc: create line alone
     */
    _createBanner: function _createBanner() {
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
    _createBannerCat: function _createBannerCat() {
        var line = this._createBanner();

        var cat = null;
        cat = this._catEnemyPool.get();
        if (!cat) {
            cat = cc.instantiate(this.catEnemyPrefab);
        }
        line.getComponent("LineEnemy").addCat(cat);
        return line;
    },

    /**
     * desc: create cat
     */
    _createCat: function _createCat() {
        var cat = null;
        cat = this._catEnemyPool.get();
        if (!cat) {
            cat = cc.instantiate(this.catEnemyPrefab);
        }
        return cat;
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
     * desc: create circle prop
     */
    _createCircleProp: function _createCircleProp() {
        var prop = null;
        prop = this._circlePropPool.get();
        if (!prop) {
            prop = cc.instantiate(this.circlePropPrefab);
        }
        return prop;
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
            case Global.enemyNodeType.circleprop:
                this._circlePropPool.put(node);
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
    gameOver: function gameOver() {
        // game over
        // clear the pool
        this._birdEnemyPool.clear();

        this._catEnemyPool.clear();

        this._crackerLongEnemyPool.clear();

        this._crackerShortEnemyPool.clear();

        this._dartNodePool.clear();

        this._dartEnemyPool.clear();

        this._runEnemyPool.clear();

        this._bannerEnemyPool.clear();

        this._circlePropPool.clear();
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
        //# sourceMappingURL=GameManager.js.map
        