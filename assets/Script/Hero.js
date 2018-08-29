// 英雄状态
var HeroStatus = cc.Enum({
    dead : -1,
    running : -1,
    jump : -1,
    fly : -1
})

cc.Class({
    extends: cc.Component,

    properties: {
        colliderProxy : {
            default : null,
            type : require("HeroColliderProxy")
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
                    // dead, game oveer
                    this.dead()
                    Global.gameMainScene.gameOver()
                    other.node.getComponent("Enemy").beVictory()
                }else{
                    other.node.getComponent("Enemy").beKilled()
                }
            }else {

            }
        }
    },
    //************************************end logic*************************************************//
});
