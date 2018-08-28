/**
 * desc     :   game manager contains the Global Varible and some calculate logic
 * authur   :   xinghui
 */
var GameData = require("GameData")
cc.Class({

    extends: cc.Component,

    properties: {
        birdEnemyPrefab : {
            default : null,
            type : cc.Prefab
        },
        catEnemyPrefab : {
            default : null,
            type : cc.Prefab
        },
        crakerLongEnemyPrefab : {
            default : null,
            type : cc.Prefab
        },
        crakerShortEnemyPrefab : {
            default : null,
            type : cc.Prefab
        },
        dartEnemyPrefab : {
            default : null,
            type : cc.Prefab
        },
        dartPrefab : {
            default : null,
            type : cc.Prefab
        },
        runEnemyPrefab : {
            default : null,
            type : cc.Prefab
        },
        bannerPrefab : {
            default : null,
            type : cc.Prefab
        },
        _totalTime : {
            default : 0.0,
            type : cc.Float
        },   
    },
    //logic func
    initEnemyRate : function(){
        for(let level = 0; level < GameData.EnemyConfig.length; ++level){
            var config = GameData.EnemyConfig[level]
            this._enemyTotalRate[level] = 0
            this._enemyRate[level] = []
            for(let enemyIndex = 0; enemyIndex < config.enemy.length; ++enemyIndex){
                var enemy = config.enemy[enemyIndex]
                this._enemyTotalRate[level] += enemy.rate
                this._enemyRate[level][enemyIndex] = this._enemyTotalRate[level]
            }
        }
    },

    initEnemyPool : function(){
        this._birdEnemyPool = new cc.NodePool()
        this._birdPoolCapacity = 2
        for(let i = 0; i < this._birdPoolCapacity; ++i){
            let enemy = cc.instantiate(this.birdEnemyPrefab); // bird pool
            this._birdEnemyPool.put(enemy)
        }

        this._catEnemyPool = new cc.NodePool()
        this._catPoolCapacity = 2
        for(let i = 0; i < this._catPoolCapacity; ++i){
            let enemy = cc.instantiate(this.catEnemyPrefab); // cat pool
            this._catEnemyPool.put(enemy)
        }

        this._crackerLongEnemyPool = new cc.NodePool()
        this._crackerLongPoolCapacity = 2
        for(let i = 0; i < this._crackerLongPoolCapacity; ++i){
            let enemy = cc.instantiate(this.crakerLongEnemyPrefab); // cracker long
            this._crackerLongEnemyPool.put(enemy)
        }

        this._crackerShortEnemyPool = new cc.NodePool()
        this._crackerShortPoolCapacity = 2
        for(let i = 0; i < this._crackerShortPoolCapacity; ++i){
            let enemy = cc.instantiate(this.crakerShortEnemyPrefab); // cracker short
            this._crackerShortEnemyPool.put(enemy)
        }

        this._dartEnemyPool = new cc.NodePool()
        this._dartEnemyPoolCapacity = 2
        for(let i = 0; i < this._dartEnemyPoolCapacity; ++i){
            let enemy = cc.instantiate(this.dartEnemyPrefab); // dart enemy pool
            this._dartEnemyPool.put(enemy)
        }

        this._dartNodePool = new cc.NodePool()
        this._dartNodePoolCapacity = 3
        for(let i = 0; i < this._dartNodePoolCapacity; ++i){
            let enemy = cc.instantiate(this.dartPrefab); // dart node pool
            this._dartNodePool.put(enemy)
        }

        this._runEnemyPool = new cc.NodePool()
        this._runEnemyPoolCapacity = 2
        for(let i = 0; i < this._runEnemyPoolCapacity; ++i){
            let enemy = cc.instantiate(this.runEnemyPrefab); // run enemy pool
            this._runEnemyPool.put(enemy)
        }

        this._bannerEnemyPool = new cc.NodePool()
        this._bannerEnemyPoolCapacity = 2
        for(let i = 0; i < this._bannerEnemyPoolCapacity; ++i){
            let enemy = cc.instantiate(this.bannerPrefab);// banner enemy pool
            this._bannerEnemyPool.put(enemy)
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        Global.gameManager = this
        cc.game.addPersistRootNode(this.Node);
        cc.director.getCollisionManager().enabled = true
    },

    start () {
        // Game Over
        this.gameOveer = false
        // enemy level
        this._enemyLevel = 0

        // enemy rate
        this._enemyRate = []
        this._enemyTotalRate = []
        this.initEnemyRate()

        // enemy pool 
        this.initEnemyPool()
        
    },

    update (dt) {
        this._totalTime += dt;
    },

    // logic
    // 
    generateEnemy : function(distance){
        let enemy = null
        // get config
        var enemyLevel = 0
        for(let level = 0; level < GameData.EnemyConfig.length; ++level){
            var config = GameData.EnemyConfig[level]
            if(distance <= config.height){
                enemyLevel = level
                break
            }
            if(level === GameData.EnemyConfig.length-1){
                enemyLevel = GameData.EnemyConfig.length-1
                break
            }
        }
        
        var anchor = Math.random() * this._enemyTotalRate[enemyLevel]
        for(let enemyIndex = 0; enemyIndex < this._enemyRate[enemyLevel].length; ++enemyIndex){
            if(anchor <= this._enemyRate[enemyLevel][enemyIndex]){
                var enemyConfig = GameData.EnemyConfig[enemyLevel].enemy[enemyIndex]
                enemy = this.generateEnemyByType(enemyConfig.enemyType)
                break
            }
        }

        return enemy
    },

    generateEnemyByType : function(enemyType){
        let enemy = null
        enemyType = Global.enemyrun //todo : test
        switch(enemyType){
            case Global.enemyType.bird:
                enemy = this._createBird()
                break;
            case Global.enemyType.dart2:
                enemy = this._createDart2()
                break;
            case Global.enemyType.line:
                enemy = this._createLine()
                break;
            case Global.enemyType.linecat:
                enemy = this._createLineCat()
                break;
            case Global.enemyType.shortbarrier:
                enemy = this._createShortBarrier()
                break;
            case Global.enemyType.longbarrier:
                enemy = this._createLongBarrier()            
                break;
            case Global.enemyType.enemyrun:
                enemy = this._createRunEnemy()
                break;
        }
        return {enemyNode : enemy, type : enemyType}
    },

    _createBird : function(){
        let bird = null
        bird = this._birdEnemyPool.get()
        if(!bird){
            bird = cc.instantiate(this.birdEnemyPrefab); 
        }
        return bird
    },

    _createDart2 : function(){
        let dart2 = null
        dart2 = this._dartEnemyPool.get()
        if(!dart2){
            dart2 = cc.instantiate(this.dartEnemyPrefab);
        }

        for(let i = 0; i < 2; ++i){
            var dartNode = this._dartNodePool.get()
            if(!dartNode){
                dartNode = cc.instantiate(this.dartPrefab)
            }
            dart2.getComponent("DartEnemy").addChildDartNode(dartNode)
        }

        return dart2
    },

    _createLine : function(){
        let line = null
        line = this._bannerEnemyPool.get()
        if(!line){
            line = cc.instantiate(this.bannerPrefab)
        }
        return line
    },

    _createLineCat : function(){
        var line = this._createLine()

        let cat = null
        cat = this._catEnemyPool.get()
        if(!cat){
            cat = cc.instantiate(this.catEnemyPrefab)
        }
        line.getComponent("LineEnemy").addCat(cat)
        return line
    },

    _createShortBarrier : function(){
        var barrier = null
        barrier = this._crackerShortEnemyPool.get()
        if(!barrier){
            barrier = cc.instantiate(this.crakerShortEnemyPrefab)
        }
        return barrier
    },

    _createLongBarrier : function(){
        var barrier = null
        barrier = this._crackerLongEnemyPool.get()
        if(!barrier){
            barrier = cc.instantiate(this.crakerLongEnemyPrefab)
        }
        return barrier
    },

    _createRunEnemy : function(){
        var runEnemy = null
        runEnemy = this._runEnemyPool.get()
        if(!runEnemy){
            runEnemy = cc.instantiate(this.runEnemyPrefab)
        }
        return runEnemy
    },

    //
    collectEnemy : function(node, type)
    {
        switch(type){
            case Global.enemyNodeType.bird:
                this._birdEnemyPool.put(node)
                break;
            case Global.enemyNodeType.dartenemy:
                this._dartEnemyPool.put(node)
                break;
            case Global.enemyNodeType.dartnode:
                this._dartNodePool.put(node)
                break;
            case Global.enemyNodeType.line:
                this._bannerEnemyPool.put(node)
                break;
            case Global.enemyNodeType.cat:
                this._catEnemyPool.put(node)
                break;
            case Global.enemyNodeType.shortbarrier:
                this._crackerShortEnemyPool.put(node)
                break;
            case Global.enemyNodeType.longbarrier:
                this._crackerLongEnemyPool.put(node)
                break;
            case Global.enemyNodeType.runenemy:
                this._runEnemyPool.put(node)
                break;
        }
    },

    getTimeIntevalWithDistance : function(distance){
        for(let level = 0; level < GameData.EnemyConfig.length; ++level){
            var config = GameData.EnemyConfig[level]
            if(distance <= config.height)
                return config.space
        }
        return GameData.EnemyConfig[GameData.EnemyConfig.length-1].space
    },

    gameOver : function(){
        // game over
        
    }
   
});
