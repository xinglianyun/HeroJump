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
        circlePropPrefab : {
            default : null,
            type : cc.Prefab
        },
        // 游戏运行时间
        _totalTime : {
            default : 0.0,
            type : cc.Float
        },   
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

    //************************************start logic*************************************************//
    /**
     * desc: calaulate the apperence rate of enemy according to the rate
     *       the varible _enemyTotalRate contains the total rate of the enemys in one level
     *       the _enemyRate contains the seperate rate of the enemys
     */
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

    /**
     * desc: init all the pool of the enemy
     */
    initEnemyPool : function(){
        this._birdEnemyPool = new cc.NodePool("Enemy")
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

        this._circlePropPool = new cc.NodePool()
        this._circlePropPoolCapacity = 2
        for(let i = 0; i < this._circlePropPoolCapacity; ++i){
            let prop = cc.instantiate(this.circlePropPrefab)// circle prop pool
            this._circlePropPool.put(prop)
        }
    },
    /**
     * desc: create enemy according the distance
     */
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

    /**
     * desc: create enemy by type
     */
    generateEnemyByType : function(enemyType){
        let enemy = null
        enemyType = Global.enemyType.bird
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
            case Global.enemyType.circleprop:
                enemy = this._createCircleProp()
                break;
        }
        if(enemy){
            enemy.setPosition(0, 0)
        }
        return {enemyNode : enemy, type : enemyType}
    },

    /**
     * 
     */
    generateEnemyNodeByNodeType : function(enemyNodeType){
        let enemy = null
        switch(enemyNodeType){
            case Global.enemyNodeType.bird:
                enemy = this._createBird()
                break;
            case Global.enemyNodeType.dartnode:
                enemy = this._createDartNode()
                break;
            case Global.enemyNodeType.cat:
                enemy = this._createCat()
                break;
            case Global.enemyNodeType.runenemy:
                enemy = this._createRunEnemy()
                break;
        }
        if(enemy){
            enemy.setPosition(0, 0)
        }
        return enemy
    },

    /**
     * desc: create bird
     */
    _createBird : function(){
        let bird = null
        bird = this._birdEnemyPool.get()
        if(!bird){
            bird = cc.instantiate(this.birdEnemyPrefab); 
            console.log("Game Manager : _createBird, From prfab")
        }else {
            console.log("Game Manager : _createBird, From pool")
        }
        return bird
    },
    /**
     * desc: create dartenemy with 2 dart 
     */
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

    /**
     * desc: create dart node
     */
    _createDartNode : function(){
        let dartNode = null
        dartNode = this._dartNodePool.get()
        if(!dartNode){
            dartNode = cc.instantiate(this.dartPrefab)
        }
        return dartnode
    },

    /**
     * desc: create line alone
     */
    _createLine : function(){
        let line = null
        line = this._bannerEnemyPool.get()
        if(!line){
            line = cc.instantiate(this.bannerPrefab)
        }
        return line
    },

    /**
     * desc: create line with cat
     */
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

    /**
     * desc: create cat
     */
    _createCat : function(){
        let cat = null
        cat = this._catEnemyPool.get()
        if(!cat){
            cat = cc.instantiate(this.catEnemyPrefab)
        }
        return cat
    },

    /**
     * desc: create short barrier
     */
    _createShortBarrier : function(){
        var barrier = null
        barrier = this._crackerShortEnemyPool.get()
        if(!barrier){
            barrier = cc.instantiate(this.crakerShortEnemyPrefab)
        }
        return barrier
    },

    /**
     * desc: create long barrier
     */
    _createLongBarrier : function(){
        var barrier = null
        barrier = this._crackerLongEnemyPool.get()
        if(!barrier){
            barrier = cc.instantiate(this.crakerLongEnemyPrefab)
        }
        return barrier
    },

    /**
     * desc: create run enemy
     */
    _createRunEnemy : function(){
        var runEnemy = null
        runEnemy = this._runEnemyPool.get()
        if(!runEnemy){
            runEnemy = cc.instantiate(this.runEnemyPrefab)
        }
        return runEnemy
    },

    /**
     * desc: create circle prop
     */
    _createCircleProp : function(){
        var prop = null
        prop = this._circlePropPool.get()
        if(!prop){
            prop = cc.instantiate(this.circlePropPrefab)
        }
        return prop
    },

    /**
     * desc: re collect the node of no use
     */
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
            case Global.enemyNodeType.circleprop:
                this._circlePropPool.put(node)
                break;
        }
    },

    /**
     * desc: get the enenmy appare time inteval accroding the distance
     */
    getTimeIntevalWithDistance : function(distance){
        for(let level = 0; level < GameData.EnemyConfig.length; ++level){
            var config = GameData.EnemyConfig[level]
            if(distance <= config.height)
                return config.space
        }
        return GameData.EnemyConfig[GameData.EnemyConfig.length-1].space
    },

    /**
     * desc: game over
     */
    gameOver : function(){
        // game over
        
    }
    //************************************start logic*************************************************//
});
