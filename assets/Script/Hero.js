// 英雄状态
var HeroStatus = cc.Enum({
    dead : -1,
    running : -1,
    jump : -1,
    fly : -1,
})

cc.Class({
    extends: cc.Component,

    properties: {
        // 碰撞代理组件
        colliderProxy : {
            default : null,
            type : require("HeroColliderProxy")
        },
        propCenterNode : {
            default : null,
            type : cc.Node
        },
        invincibleTime : {
            default : 3.0,
            type : cc.Float
        },
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
    },

    start () {
        this._status = HeroStatus.running
        this._leftOrRight = -1
        this.colliderProxy.setRealListener(this)
        this._allProps = {
            circleprop : {
                count : 0,
                circlePropNode : null
            }
        }
        this._invincible = false
        this._invincibleDurTime = 0.0
        this._oldParentNode = null
    },

    update (dt) {
        if(this._invincible){
            this._invincibleDurTime += dt
            if(this._invincibleDurTime >= this.invincibleTime){
                this._invincibleDurTime = 0
                this.setInvincible(false)
            }
        }
    },

    //************************************start logic*************************************************//
    /**
     * desc: left(-1) or right(1)
     */
    setLeftOrRight : function(leftOrRight){
        this._leftOrRight = leftOrRight
    },

    /**
     * desc: return left or right
     */
    getLeftOrRight : function(){
        return this._leftOrRight
    },

    run : function(){
        this._status = HeroStatus.running
    },

    jump : function(){
        this._status = HeroStatus.jump
    },

    fly : function(){
        this._status = HeroStatus.fly
    },

    dead : function(){
        this._status = HeroStatus.dead
        if(this._allProps.circleprop.circlePropNode){
            this._allProps.circleprop.circlePropNode.destroy()
            this._allProps.circleprop.count = 0
        }
    },


    /**
     * desc: add the prop
     */
    addProp : function(propNode){
        propNode.getComponent("Prop").beOnHero()
        var propEnemyType = propNode.getComponent("Prop").getPropEnemyType()
        switch(propEnemyType){
            case Global.enemyType.circleprop:
                this.addCircleProp(propNode)
                break
        }
    },

    /**
     * desc: add the circle prop
     */
    addCircleProp(propNode){
        this._allProps.circleprop.count += 1

        if(!this._allProps.circleprop.circlePropNode){
            propNode.parent = this.propCenterNode
            propNode.setPosition(0, 0)
            this._allProps.circleprop.circlePropNode= propNode
        }else{
            propNode.getComponent("Prop").beCollected()
        }
    },
    /**
     * desc: delete one circle prop
     */
    deleteCircleProp : function(){
        this._allProps.circleprop.count -= 1
        if(this._allProps.circleprop.count <= 0){
            this._allProps.circleprop.count = 0
            if(this._allProps.circleprop.circlePropNode){
                this._allProps.circleprop.circlePropNode.getComponent("Prop").beOffHero()
                this._allProps.circleprop.circlePropNode.getComponent("Prop").beCollected()
                this._allProps.circleprop.circlePropNode = null
            }
        }else{
            this._allProps.circleprop.circlePropNode.getComponent("CircleProp").setKeepTime(0.0)
        }
    },

    /**
     * desc: set the hero invincible
     */
    setInvincible : function(invincible, type){
        this._invincible = invincible
        if(invincible){
            this._oldParentNode = this.node.parent
            this.node.parent = Global.gameMainScene.centerHeroPosNode
            switch(type){
                case Global.enemyNodeType.bird:
                    this.getComponent(cc.Animation).play("HeroBirdRushClip")
                    break
                case Global.enemyNodeType.dartnode:
                    this.getComponent(cc.Animation).play("HeroDartRushClip")
                    break
                case Global.enemyNodeType.cat:
                    this.getComponent(cc.Animation).play("HeroCatRushClip")
                    break
            }
        }else{
            this.node.parent = this._oldParentNode
            this.node.scaleX *= -1
            this.node.setPosition(0, 0)
            if(this._leftOrRight === 1){
                var worldPos = Global.gameMainScene.rightHeroPosNode.parent.convertToWorldSpaceAR(Global.gameMainScene.rightHeroPosNode.position)
                var nodePos = Global.gameMainScene.leftHeroPosNode.convertToNodeSpaceAR(worldPos)
                this.node.setPosition(nodePos)
            }
            this.getComponent(cc.Animation).play("HeroRunClip")
        }
    },

    /**
     * desc: get the hero invincible
     */
    getInvincible : function(){
        return this._invincible
    },

    /**
     * desc: 当碰撞产生的时候调用
     * @param  {Collider} other 产生碰撞的另一个碰撞组件
     * @param  {Collider} self  产生碰撞的自身的碰撞组件
     */
    onCollisionEnter: function (other, self) {
        console.log('on collision enter')
        
        if(this._status !== HeroStatus.dead){
            var group = cc.game.groupList[other.node.groupIndex]
            if(group === "enemy"){
                if(this._status === HeroStatus.running && !this._invincible){
                    if(this._allProps.circleprop.count > 0){
                        this.deleteCircleProp()
                        other.node.getComponent("Enemy").beKilled()
                    }else{
                        // dead, game oveer
                        this.dead()
                        other.node.getComponent("Enemy").beVictory()
                        Global.gameMainScene.gameOver()
                    }
                }else{
                    var enemyNodeType = other.node.getComponent("Enemy").getEnemyNodeType()
                    Global.gameMainScene.showDeadEnemyNode(enemyNodeType)
                    other.node.getComponent("Enemy").beKilled()
                }
            }else if(group === "prop") {
                this.addProp(other.node)
            }
        }
    },
    //************************************end logic*************************************************//
});
