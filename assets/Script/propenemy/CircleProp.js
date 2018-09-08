cc.Class({
    extends: cc.Component,

    properties: {
        effectTime : {
            default : 1.0,
            type : cc.Float
        },
        spriteNode : {
            default : null,
            type : cc.Node
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getComponent("Prop").setRealListener(this)
        this._enemyNodeType = Global.enemyNodeType.circleprop

        this.onInit()

    },

    start () {
    },

    update (dt) {
        if(this._onHero){
            this._keepTime += dt
            if(this._keepTime >= this.effectTime){
                Global.hero.deleteCircleProp()
            }
            return
        }

        var speed = Global.gameMainScene.getRunSpeed()
        var offsetY = speed * dt
        this.node.y += offsetY
        this._totalOffsetY += offsetY

        if(Math.abs(this._totalOffsetY_totalOffsetY) > (cc.director.getWinSize().height * 1.5)){
            this.beCollected()
        }
    },

    reuse : function(){
        this.onInit()
    },

    //************************************start logic*************************************************//
    onInit(){
        this._totalOffsetY = 0.0
        this._onHero = false
        this._keepTime = 0.0
        
        this.node.setScale(1)
        this.spriteNode.setScale(0.5)
        this.spriteNode.setPosition(0, 0)

        this.node.setPosition(0, 0)
        this.node.getComponent(cc.Animation).play("CirclePropIdle")
    },

    setOnHero : function(onHero){
        this._onHero = onHero
    },

    getOnHero : function(){
        return this._onHero
    },
    /**
     * desc: get the enenmy node type
     */
    getPropEnemyType : function(){
        return this._enemyNodeType
    },

    /**
     * desc: set the keep time
     */
    setKeepTime : function(time){
        this._keepTime = time
    },

    /**
     * desc: be on hero
     */
    beOnHero : function(){
        this.setOnHero(true)
        this.getComponent(cc.Animation).play("CirclePropBreath")
    },

    /**
     * desc: be off hero 
     */
    beOffHero : function(){
        this.setOnHero(false)
    },
    
    /**
     * desc: be collected
     */
    beCollected : function(){
        this.node.stopAllActions()
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType)
    },
    //************************************end logic*************************************************//
});
