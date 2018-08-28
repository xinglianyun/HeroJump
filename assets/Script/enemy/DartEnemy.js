var dartNodes = [];

cc.Class({
    extends: cc.Component,

    properties: {
        // emit the dart when the dart enemy go throw the screen
        emitDartTime : {
            default : 0.3,
            type : cc.Float
        },
        _startSide : {
            default : -1, 
            type : cc.Integer
        },
        _overScreenX : {
            default : -100.0,
            type : cc.Float
        },
    },


    //logic
    addChildDartNode : function(dartNode){
        dartNode.parent = this.node
        dartNodes.push(dartNode)
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._game = cc.find("Game")
        this._totalOffsetY = 0.0
        this._startSide = -1
        this._targetWorldPos = cc.Vec2(0, 0)
        this._isEmitDart = false
        this.node.getComponent("Enemy").setRealListener(this)
        this._enemyNodeType = Global.enemyNodeType.dartenemy

    },

    start () {

    },

    update (dt) {
        var gameMainSceneSpeed = Global.gameMainScene.getRunSpeed()
        var offsetY = gameMainSceneSpeed * dt
        this.node.y += offsetY
        this._totalOffsetY += offsetY

        if(!this._isEmitDart){
            if(Math.abs(this._totalOffsetY) >= cc.director.getWinSize().height * this.emitDartTime){
                // emit the DartNode
                this.emitDartNode()
                this._isEmitDart = true
            }
        }

        if(Math.abs(this._totalOffsetY) >= cc.director.getWinSize() * 1.5){
            Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
        }
        
    },

    // logic
    setStartSide : function(startSide){
        this._startSide = startSide
    },

    setTargetWorldPos : function(worldPos){
        this._targetWorldPos = worldPos
    },

    beVictory : function(){
        this.node.stopAllActions()
    },

    beKilled : function(){
        this.node.stopAllActions()
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
    },

    emitDartNode : function(){
        
        for(let i = 0; i < dartNodes.length; ++i){
            //dartNodes[i].getComponent("DartNode").runToTarget(this._targetWorldPos, i, dartNodes.length)
            if(i === 0){
                var moveToHeroPos = this.node.parent.convertToNodeSpace(this._targetWorldPos)
                moveToHeroPos.x += this._startSide*this._overScreenX
                moveToHeroPos.y += (this._overScreenX * Math.abs(this.node.y - moveToHeroPos.y)) / (Math.abs(this.node.x - moveToHeroPos.x))
                var moveAction = cc.moveTo(cc.director.getWinSize().height * (1- this.emitDartTime) / Math.abs(Global.gameMainScene.getRunSpeed()) * 0.5, moveToHeroPos)
                var callfunc = cc.callFunc(function(target){
                    Global.gameManager.collectEnemy(dartNodes[i], "dartnode")
                }, this)
                var sequence = cc.sequence(moveAction, callfunc)
                // change the dartnode's parent to the grandpa
                var dartNodeWorldPos = this.node.convertToWorldSpace(dartNodes[i].getPosition())
                var tmpPos = this.node.parent.convertToNodeSpace(dartNodeWorldPos)
                dartNodes[i].parent = this.node.parent
                dartNodes[i].setPosition(tmpPos)
                dartNodes[i].runAction(sequence)
            }else if(i === 1){
                var moveAction = cc.moveBy(cc.director.getWinSize().height * (1- this.emitDartTime) / Math.abs(Global.gameMainScene.getRunSpeed()), this._startSide * cc.director.getWinSize().width, 0)

                var callfunc = cc.callFunc(function(target){
                    Global.gameManager.collectEnemy(dartNodes[i], "dartnode")
                }, this)
                var sequence = cc.sequence(moveAction, callfunc)
                dartNodes[i].runAction(sequence)
            }else if(i === 2){

            }
        }
    }
});
