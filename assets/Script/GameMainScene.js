// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var Global = require("Global")

cc.Class({
    extends: cc.Component,

    properties: {
        // foo: {
        //     // ATTRIBUTES:
        //     default: null,        // The default value will be used only when the component attaching
        //                           // to a node for the first time
        //     type: cc.SpriteFrame, // optional, default is typeof default
        //     serializable: true,   // optional, default is true
        // },
        // bar: {
        //     get () {
        //         return this._bar;
        //     },
        //     set (value) {
        //         this._bar = value;
        //     }
        // },
        heroNode : {
            default : null,
            type : cc.Node
        },
        leftHeroPosNode : {
            default : null,
            type : cc.Node
        },
        rightHeroPosNode : {
            default : null,
            type : cc.Node
        },
        sideLeft : {
            default : null,
            type : cc.Node
        },
        sideRight : {
            default : null,
            type : cc.Node
        },
        enemyNodeLeft : {
            default : null,
            type : cc.Node
        },
        enemyNodeRight : {
            default : null,
            type : cc.Node
        },
        bottomBG : {
            default : null,
            type : cc.Node
        },
        scoreLabel : {
            default : null,
            type : cc.Label
        },
        _runSpeed : {
            default : 0.0,
            type : cc.Float
        },
        maxSpeed : {
            default : -250.0,
            type : cc.Float
        },
        accSpeed : {
            default : -100.0,
            type : cc.Float
        },
        _startEnemyDistance : {
            default : 0.0,
            type : cc.Float
        },
        _posYInteval : {
            default : 0.0,
            type : cc.Float
        },
        maxPosYInteval : {
            default : -128.0,
            type : cc.Float
        },
        _bottomBGYInteval : {
            default : 0.0,
            type : cc.Float
        },
        _bottomBGScroll : {
            default : true,
            type : cc.Boolean
        },
        _leftOrRight : {
            default : -1,
            type : cc.Integer
        },
        // todo : for test
        _stopCreateEnemy : {
            default : false,
            type : cc.Boolean
        }
    },

    // logic area
    getRunSpeed : function(){
        return this._runSpeed  
    },
    // scroll side repeatedly
    scrollSide : function(dt){
        this._runSpeed += this.accSpeed * dt
        if(this._runSpeed < this.maxSpeed) {
            this._runSpeed = this.maxSpeed
        } 

        var offsetY = this._runSpeed * dt
        this._posYInteval += offsetY;

        if(this._posYInteval < this.maxPosYInteval) {
            this._posYInteval -= this.maxPosYInteval
            this.sideLeft.y -= this.maxPosYInteval      
        }
        this.sideLeft.y += offsetY
        this.sideRight.y = this.sideLeft.y

        this._distance += Math.abs(offsetY / 3.0)
        this.scoreLabel.string = Math.floor(this._distance)
    },
    // move the Bottom BG
    moveBottomBG : function(dt) {
        if(this._bottomBGScroll){
            var offsetY = this._runSpeed * dt
            this.bottomBG.y += offsetY

            this._bottomBGYInteval += offsetY
            if(Math.abs(this._bottomBGYInteval) > cc.director.getWinSize().height / 2.0)
            {
                this._bottomBGScroll = false
                this._startEnemyDistance = this._distance
            }
        }
        
    },
    heroJump : function(){
        this._leftOrRight *= (-1)
        this.heroNode.getComponent("Hero").setLeftOrRight(this._leftOrRight)
        this.heroNode.getComponent("Hero").jump()
        var offsetX = this.rightHeroPosNode.x - this.leftHeroPosNode.x
        offsetX *= this._leftOrRight 
        this.heroNode.getComponent(cc.Animation).play("HeroJumpClip")

        var moveAction = cc.moveBy(0.33, offsetX, 0)
        var callfuncAction = cc.callFunc(
            function(){
                this.heroNode.scaleX *= (-1)
                this.heroNode.getComponent("Hero").run()
                this.heroNode.getComponent(cc.Animation).play("HeroRunClip")
            }, this
        )
        var action = cc.sequence(moveAction, callfuncAction)
        this.heroNode.runAction(action)
    },
    // mouse event
    onMouseDown : function(event){

    },
    onMouseMove : function(event){

    },
    onMouseUp : function(event){

    },
    // touch event
    onTouchStart : function(event){
        this.heroJump()
    },
    onTouchMove : function(event){

    }, 
    onTouchEnd : function(event){

    },

    createEnemy : function(dt){
        if(this._bottomBGScroll || this._stopCreateEnemy){
            return
        }

        this._enemyTimeInteval += dt
        
        var timeInteval = this._gameManager.getTimeIntevalWithDistance(this._distance - this._startEnemyDistance)
        if(this._enemyTimeInteval >= timeInteval){
            this._enemyTimeInteval -= timeInteval
            var enemyInfo = this._gameManager.generateEnemy(this._distance - this._startEnemyDistance)
            if(enemyInfo){
                if(enemyInfo.type === "bird") {
                    this.dealWithBird(enemyInfo.enemyNode)
                }else if(enemyInfo.type == "dart2") {
                    this.dealWithDartEnemy(enemyInfo.enemyNode)
                }
                // todo : for test
                this._stopCreateEnemy = true
            }
        }
    },

    dealWithBird : function(birdNode){
        birdNode.parent = (this._leftOrRight > 0) ? this.enemyNodeLeft : this.enemyNodeRight
        var targetWorldPos = (this._leftOrRight > 0) ? this.rightHeroPosNode.convertToWorldSpace(cc.v2(0, 0)) : this.leftHeroPosNode.convertToWorldSpace(cc.v2(0, 0))
        birdNode.scaleX *= this._leftOrRight
        birdNode.getComponent("Bird").setStartSide(-this._leftOrRight)
        birdNode.getComponent("Bird").setTargetWorldPos(targetWorldPos)
        birdNode.getComponent("Bird").setGameManager(this._gameManager)
    },
    dealWithDartEnemy : function(dartEnemyNode){
        dartEnemyNode.parent = (this._leftOrRight > 0) ? this.enemyNodeLeft : this.enemyNodeRight
        var targetWorldPos = (this._leftOrRight > 0) ? this.rightHeroPosNode.convertToWorldSpace(cc.v2(0, 0)) : this.leftHeroPosNode.convertToWorldSpace(cc.v2(0, 0))
        birdNode.scaleX *= this._leftOrRight
        birdNode.getComponent("DartEnemy").setStartSide(-this._leftOrRight)
        birdNode.getComponent("DartEnemy").setTargetWorldPos(targetWorldPos)
        birdNode.getComponent("DartEnemy").setGameManager(this._gameManager)
    },

    //
    gameOver : function(){  
        this._gameManager.gameOver()
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        Global.gameMainScene = this

        this.node.on(cc.Node.EventType.MOUSE_DOWN, this.onMouseDown, this)
        this.node.on(cc.Node.EventType.MOUSE_MOVE, this.onMouseMove, this)
        this.node.on(cc.Node.EventType.MOUSE_UP, this.onMouseUp, this)

        this.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this)
        this.node.on(cc.Node.EventType.TOUCH_MOVE, this.onTouchMove, this)
        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)

        this.node.on("MSG_GameOver", this.gameOver, this)

        this._gameManager = this.getComponent("GameManager")
        this.heroNode.getComponent("Hero").setGameMainScene(this)
    },

    start () {
        this._leftOrRight = -1
        this._distance = 0
        this._enemyTimeInteval = 0.0
    },

    update (dt) {
        this.scrollSide(dt)
        this.moveBottomBG(dt)
        this.createEnemy(dt)
    },
});
