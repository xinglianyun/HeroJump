/**
 * desc     :   game manager contains the Global Varible and some calculate logic
 * authur   :   xinghui
 */
var Global = require("Global")
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
        enemyType = "dart2" //todo : test
        switch(enemyType){
            case "bird":
                enemy = this._createBird()
                break;
            case "dart2":
                enemy = this._createDart2()
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

        let dartNode = null
        for(let i = 0; i < 2; ++i){
            dartNode = this._dartNodePool.get()
            if(!dartNode){
                dartNode = cc.instantiate(this.dartPrefab)
            }
            dart2.node.getComponent("DartEnemy").addChildDartNode(dartNode[i])
        }

        return dart2
    },

    //
    collectEnemy : function(node, type)
    {
        switch(type){
            case "bird":
                this._birdEnemyPool.put(node)
                break;
            case "dartenemy":
                this._dartEnemyPool.put(node)
                break;
            case "dartnode":
                this._dartNodePool.put(node)
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
