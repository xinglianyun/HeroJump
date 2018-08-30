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
        }
        
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        Global.hero = this
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
    },

    // update (dt) {},

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
        propNode.parent = this.propCenterNode
        propNode.setPosition(0, 0)
        
        if(!this._allProps.circleprop.circlePropNode){
            this._allProps.circleprop.circlePropNode= propNode
        }
        
    },
    /**
     * desc: delete one circle prop
     */
    deleteCircleProp(){
        this._allProps.circleprop.count -= 1
        if(this._allProps.circleprop.count <= 0){
            this._allProps.circleprop.count = 0
            this._allProps.circleprop.circlePropNode.getComponent("Prop").beCollected()
            this._allProps.circleprop.circlePropNode = null
        }
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
                if(this._status === HeroStatus.running){
                    if(this._allProps.circleprop > 0){
                        this.deleteCircleProp()
                        other.node.getComponent("Enemy").beKilled()
                    }else{
                        // dead, game oveer
                        this.dead()
                        Global.gameMainScene.gameOver()
                        other.node.getComponent("Enemy").beVictory()
                    }
                }else{
                    other.node.getComponent("Enemy").beKilled()
                }
            }else if(group === "prop") {
                this.addProp(other.node)
            }
        }
    },
    //************************************end logic*************************************************//
});
