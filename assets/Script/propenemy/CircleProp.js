cc.Class({
    extends: cc.Component,

    properties: {
        effectTime : {
            default : 1.0,
            type : cc.Float
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this.node.getComponent("Prop").setRealListener(this)
        this._enemyNodeType = Global.enemyNodeType.circleprop
    },

    start () {
        this._totalOffsetY = 0.0
        this._onHero = false
        this._keepTime = 0.0
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

    //************************************start logic*************************************************//
    setOnHero : function(onHero){
        this._onHero = onHero
    },

    getOnHero : function(){
        return this._onHero
    },

    getPropEnemyType : function(){
        return this._enemyNodeType
    },
    /**
     * desc: be on hero
     */
    beOnHero : function(){
        this.setOnHero(true)
        this.getComponent(cc.Animation).play("CirclePropBreath")
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
