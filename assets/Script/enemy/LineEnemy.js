cc.Class({
    extends: cc.Component,

    properties: {
        // 挂载猫节点的位置
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
        this._enemyNodeType = Global.enemyNodeType.line
        this.node.getComponent("Enemy").setRealListener(this)

        this.onInit()
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
                    this._cat.getComponent("CatEnemy").beCollected()
                    this._cat = null
                }
            }
            this.beCollected()
        }
    },

    reuse : function(){
        this.onInit()
    },

    //************************************start logic*************************************************//
    onInit : function(){
        this.node.setPosition(0, 0)
        this.node.setScale(1)
        this._totalOffsetY = 0.0

    },
    /**
     * desc: add the cat to lin
     */
    addCat : function(cat){
        if(this.catNode){
            this.catNode.addChild(cat)
             this._cat = cat
        }
    },
    /**
     * desc: be collected
     */
    beCollected : function(){
        if(this._cat){
            this._cat.getComponent("CatEnemy").beCollected()
            this._cat = null
        }
        this.node.stopAllActions()
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
    },
    //************************************end logic*************************************************//
});
