cc.Class({
    extends: cc.Component,

    properties: {
        catNode : {
            default : null,
            type : cc.Node
        },
        _cat : {
            default : null,
            type : cc.Node,
            serializable: false
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad () {
        this._totalOffsetY = 0.0
        this._enemyNodeType = Global.enemyNodeType.line
    },

    start () {
        
    },

    update (dt) {
        var speed = Global.gameMainScene.getRunSpeed()
        var offsetY = speed * dt
        this.node.y += offsetY
        this._totalOffsetY += offsetY
        
        if(Math.abs(this._totalOffsetY) > (cc.director.getWinSize().height * 1.5)){
            if(this.catNode.childrenCount > 0){
                if(this._cat){
                    this._cat.getComponent("CatEnemy").beKilled()
                }
            }

            this.beKilled()
        }
        
    },

    // logic
    addCat : function(cat){
        if(this.catNode){
            this.catNode.addChild(cat)
             this._cat = cat
        }
    },

    beKilled : function(){
        this.node.stopAllActions()
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
    },
});
