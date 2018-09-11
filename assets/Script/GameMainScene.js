/*
* author:   xinghui
* desc:     GameMainScene
*/

cc.Class({
    extends: cc.Component,

    properties: {
        // 英雄节点
        heroNode : {
            default : null,
            type : cc.Node
        },
        // 左侧英雄位置节点
        leftHeroPosNode : {
            default : null,
            type : cc.Node
        },
        // 右侧英雄位置节点
        rightHeroPosNode : {
            default : null,
            type : cc.Node
        },
        // 中间英雄节点
        centerHeroPosNode : {
            default : null,
            type : cc.Node
        },
        // 左侧墙体：需要移动
        sideLeft : {
            default : null,
            type : cc.Node
        },
        // 右侧墙体：需要移动
        sideRight : {
            default : null,
            type : cc.Node
        },
        // 左侧敌人节点
        enemyNodeLeft : {
            default : null,
            type : cc.Node
        },
        // 右侧敌人节点
        enemyNodeRight : {
            default : null,
            type : cc.Node
        },
        // 底部背景装饰
        bottomBG : {
            default : null,
            type : cc.Node
        },
        // 分数文字
        scoreLabel : {
            default : null,
            type : cc.Label
        },
        // 两侧墙体向下移动速度，负数
        _runSpeed : {
            default : 0.0,
            type : cc.Float
        },
        // 最大速度，负数
        maxSpeed : {
            default : -250.0,
            type : cc.Float
        },
        // 特殊效果需要加速时，增加的最大速度
        addSpecialMaxSpeed : {
            default : -250.0,
            type : cc.Float
        },
        // 加速度，负数
        accSpeed : {
            default : -100.0,
            type : cc.Float
        },
        // 死亡敌人的父节点
        deadEnemyNodes : [cc.Node],
        // 开始敌人出现逻辑时，移动的距离，从这个距离开始，通过移动距离判断敌人类型和速度
        _startEnemyDistance : {
            default : 0.0,
            type : cc.Float
        },
        // 两侧墙向下移动距离，因为两侧墙是循环使用的，当达到一个值时，需要重置墙体位置。
        _posYInteval : {
            default : 0.0,
            type : cc.Float
        },
        // 墙体移动此距离后，需要重置，数值要根据墙体资源设置，不然容易走光，哈哈
        maxPosYInteval : {
            default : -128.0,
            type : cc.Float
        },
        // 英雄移动距离
        _heroRunDistance : {
            default : 0.0,
            type : cc.Float
        },
        // 是否可以移动底部背景
        _bottomBGScroll : {
            default : true,
            type : cc.Boolean
        },
        // 出现一次英雄后经过的时间
        _enemyTimeInteval : {
            default : 0.0,
            type : cc.Float
        },
        // todo : for test
        _stopCreateEnemy : {
            default : false,
            type : cc.Boolean
        },
        
    },

    //************************************start logic*************************************************//
    calculateSpeed : function(dt){
        // deal with runing speed
        if(this._runSpeed <= this.maxSpeed) {
            this._runSpeed = this.maxSpeed
        }else{
            this._runSpeed += this.accSpeed * dt
        }
    },
    /**
     * desc: 增加额外的快速效果
     */
    addMaxSpeed : function(){
        this._oldMaxSpeed = this.maxSpeed
        this.maxSpeed += this.addSpecialMaxSpeed
        this._runSpeed = this.maxSpeed
    },
    /**
     * desc: 移除额外的快速效果
     */
    subMaxSpeed : function(){
        this.maxSpeed = this._oldMaxSpeed
        this._runSpeed = this.maxSpeed
    },
    /*
    *  desc: get the speed of main scene at runtime
    */
    getRunSpeed : function(){
        return this._runSpeed  
    },
    /*
    *  desc: scroll side repeatedly
    */
    scrollSide : function(dt){
        // deal with the BG
        var offsetY = this._runSpeed * dt
        this._posYInteval += offsetY;
        if(this._posYInteval < this.maxPosYInteval) {
            this._posYInteval -= this.maxPosYInteval
            this.sideLeft.y -= this.maxPosYInteval      
        }
        this.sideLeft.y += offsetY
        this.sideRight.y = this.sideLeft.y

        // deal with the total distance and the score
        this._heroRunDistance += offsetY
        this.scoreLabel.string = Math.floor(Math.abs(this._heroRunDistance * 0.33))
    },
    /*
    *  desc: move the Bottom BG
    */
    moveBottomBG : function(dt) {
        if(this._bottomBGScroll){
            var offsetY = this._runSpeed * dt
            this.bottomBG.y += offsetY

            // bottom bg can stop
            if(Math.abs(this._heroRunDistance) > cc.winSize.height * 0.5)
            {
                this._bottomBGScroll = false
                this._startEnemyDistance = this._heroRunDistance
            }
        }
    },
    /*
    *  desc: hero jump from oneside to another
    */
    heroJump : function(){
        Global.hero.jumpFromSideToSide()
    },
    onMouseDown : function(event){

    },
    onMouseMove : function(event){

    },
    onMouseUp : function(event){

    },
    onTouchStart : function(event){
        this.heroJump()
    },
    onTouchMove : function(event){

    }, 
    onTouchEnd : function(event){

    },
    /*
    *  desc: create enemy
    */
    createEnemy : function(dt){
        // bottom bg must stop
        if(this._bottomBGScroll || this._stopCreateEnemy){
            return
        }

        this._enemyTimeInteval += dt
        
        var timeInteval = Global.gameManager.getTimeIntevalWithDistance(this._heroRunDistance - this._startEnemyDistance)
        if(this._enemyTimeInteval >= timeInteval){
            this._enemyTimeInteval -= timeInteval
            var enemyInfo = Global.gameManager.generateEnemy(this._heroRunDistance - this._startEnemyDistance)
            if(enemyInfo){
                if(enemyInfo.type === Global.enemyType.bird) {
                    this.dealWithBird(enemyInfo.enemyNode)
                }else if(enemyInfo.type === Global.enemyType.dart2) {
                    this.dealWithDartEnemy(enemyInfo.enemyNode)
                }else if(enemyInfo.type === Global.enemyType.line){
                    this.dealWithLine(enemyInfo.enemyNode)
                }else if(enemyInfo.type === Global.enemyType.linecat){
                    this.dealWithLineCat(enemyInfo.enemyNode)
                }else if(enemyInfo.type === Global.enemyType.shortbarrier){
                    this.dealWithShortBarrier(enemyInfo.enemyNode)
                }else if(enemyInfo.type === Global.enemyType.longbarrier){
                    this.dealWithLongBarrier(enemyInfo.enemyNode)
                }else if(enemyInfo.type === Global.enemyType.enemyrun){
                    this.dealWithRunEnemy(enemyInfo.enemyNode)
                }else if(enemyInfo.type === Global.enemyType.circleprop){
                    this.dealWithCircleProp(enemyInfo.enemyNode)
                }
            }
        }
    },
    /*
    *  desc: dealWithBird
    */
    dealWithBird : function(birdNode){
        var leftOrRight = Global.hero.getLeftOrRight()
        birdNode.parent = (leftOrRight > 0) ? this.enemyNodeLeft : this.enemyNodeRight
        var targetWorldPos = (leftOrRight > 0) ? this.rightHeroPosNode.convertToWorldSpace(cc.v2(0, 0)) : this.leftHeroPosNode.convertToWorldSpace(cc.v2(0, 0))
        birdNode.scaleX *= leftOrRight
        birdNode.getComponent("Bird").setStartSide(-leftOrRight)
        birdNode.getComponent("Bird").setTargetWorldPos(targetWorldPos)
    },
    /*
    *  desc: dealWithDartEnemy
    */
    dealWithDartEnemy : function(dartEnemyNode){
        var leftOrRight = Global.hero.getLeftOrRight()

        dartEnemyNode.parent = (leftOrRight > 0) ? this.enemyNodeLeft : this.enemyNodeRight
        var targetWorldPos = (leftOrRight > 0) ? this.rightHeroPosNode.convertToWorldSpace(cc.v2(0, 0)) : this.leftHeroPosNode.convertToWorldSpace(cc.v2(0, 0))
        dartEnemyNode.scaleX *= leftOrRight
        dartEnemyNode.getComponent("DartEnemy").setStartSide(-leftOrRight)
        dartEnemyNode.getComponent("DartEnemy").setTargetWorldPos(targetWorldPos)
    },
    /*
    *  desc: dealWithLine
    */
    dealWithLine : function(lineEnemyNode){
        lineEnemyNode.parent = this.enemyNodeLeft
    },
    /*
    *  desc: dealWithLineCat
    */
    dealWithLineCat : function(linecatEnemyNode){
        linecatEnemyNode.parent = this.enemyNodeLeft
    },
    /*
    *  desc: dealWithShortBarrier
    */
    dealWithShortBarrier : function(shortBarrierNode){
        var leftOrRight = Global.hero.getLeftOrRight()

        shortBarrierNode.parent = (leftOrRight > 0) ? this.enemyNodeRight : this.enemyNodeLeft
        shortBarrierNode.scaleX *= -leftOrRight
    },
    /*
    *  desc: dealWithLongBarrier
    */
    dealWithLongBarrier : function(longBarrierNode){
        var leftOrRight = Global.hero.getLeftOrRight()
        longBarrierNode.parent = (leftOrRight > 0) ? this.enemyNodeRight : this.enemyNodeLeft
        longBarrierNode.scaleX *= -leftOrRight
    },
    /*
    *  desc: dealWithRunEnemy
    */
    dealWithRunEnemy : function(runEnemey){
        var leftOrRight = Global.hero.getLeftOrRight()
        runEnemey.parent = (leftOrRight > 0) ? this.enemyNodeRight : this.enemyNodeLeft
        runEnemey.scaleX *= (-leftOrRight)
    },

    dealWithCircleProp : function(circleProp){
        var leftOrRight = Global.hero.getLeftOrRight()
        circleProp.parent = (leftOrRight > 0) ? this.enemyNodeRight : this.enemyNodeLeft
        circleProp.scaleX *= (-leftOrRight)
    },

    /**
     * desc: collect the dead enemy
     */
    showDeadEnemyNode : function(enemyNodeType){
        if(this._deadEnemy.enemyNodeType !== enemyNodeType){
            this.collectOldDeadEnemy()
            this._deadEnemy.enemyNodeType = enemyNodeType
            this._deadEnemy.deadCount = 1
        }else{
            this._deadEnemy.deadCount += 1
        }
        if(this._deadEnemy.deadCount >= 3){
            Global.hero.node.stopAllActions()
            Global.hero.node.setPosition(0, 0)
            Global.hero.setInvincible(true, this._deadEnemy.enemyNodeType)
            this.collectOldDeadEnemy()
            this._deadEnemy.deadCount = 0
            this._deadEnemy.enemyNodeType = "none"
        }else{
            this.refreshDeadEnemyShow()
        }
    },

    /**
     * desc: collect the old dead enemy node
     */
    collectOldDeadEnemy : function(){
        for(let i = 0; i < this._deadEnemy.enemyNode.length; ++i){
            this._deadEnemy.enemyNode[i].getComponent("Enemy").DisplayDeadEnemyState(false)
            Global.gameManager.collectEnemy(this._deadEnemy.enemyNode[i], this._deadEnemy.enemyNodeType)
        }
        this._deadEnemy.enemyNode = []
    },

    /**
     * desc: refresh the dead enemy show
     */
    refreshDeadEnemyShow : function(){
        var enemyNode = Global.gameManager.generateEnemyNodeByNodeType(this._deadEnemy.enemyNodeType)
        if(enemyNode){
            enemyNode.parent = this.deadEnemyNodes[this._deadEnemy.deadCount - 1]
            enemyNode.getComponent("Enemy").DisplayDeadEnemyState(true)
            this._deadEnemy.enemyNode.push(enemyNode)
        }
    },

    /*
    *  desc: gameOver
    */
    gameOver : function(){  
        Global.gameManager.gameOver()
        cc.director.loadScene("GameStartScene")
    },

    /**
     * desc: register the handler
     */
    registHandler : function(){
        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this)
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this)
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this)

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)

        this.node.on("MSG_GameOver", this.gameOver, this)
    },
    //*******************************end logic******************************************************//

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        Global.gameMainScene = this
        Global.gameManager = this.getComponent("GameManager")
        Global.hero = this.heroNode.getComponent("Hero")
    },

    start () {
        this._bottomBGScroll = true
        this._startEnemyDistance = 0.0
        this._posYInteval = 0.0
        this._runSpeed = 0.0
        this._heroRunDistance = 0
        this._enemyTimeInteval = 0.0
        this._oldMaxSpeed = 0.0
        this._deadEnemy = {
            enemyNodeType : "none",
            deadCount : 0,
            enemyNode : []
        }
        this.registHandler()
    },

    update (dt) {
        this.calculateSpeed(dt)
        this.scrollSide(dt)
        this.moveBottomBG(dt)
        this.createEnemy(dt)
    },
});
