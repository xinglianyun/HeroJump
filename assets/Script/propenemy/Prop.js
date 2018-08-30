cc.Class({
    extends: cc.Component,

    properties: {
        _realListener: cc.Component
    },

    // LIFE-CYCLE CALLBACKS:

    // onLoad () {},

    start () {

    },

    // update (dt) {},

    //************************************start logic*************************************************//
    setRealListener : function(realListener){
        this._realListener = realListener
    },
    beOnHero : function(){
        if(this._realListener){
            this._realListener.beOnHero()
        }
    },
    getPropEnemyType : function(){
        var propEnemyType = null
        if(this._realListener){
            propEnemyType = this._realListener.getPropEnemyType()
        }
        return propEnemyType
    },
    beCollected : function(){
        if(this._realListener){
            this._realListener.beCollected()
        }
    },
    //************************************end logic*************************************************//
});
