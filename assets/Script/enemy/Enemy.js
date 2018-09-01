cc.Class({
    extends: cc.Component,

    properties: {
        _realListener: cc.Component
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        
    },

    start () {

    },

    // update (dt) {},

    //************************************start logic*************************************************//
    setRealListener : function(realListener){
        this._realListener = realListener
    },

    setIdle : function(idle){
        if(this._realListener){
            this._realListener.setIdle(idle)
        }
    },

    beVictory : function(){
        if(this._realListener){
            this._realListener.beVictory()
        }
    },
    beKilled : function(){
        if(this._realListener){
            this._realListener.beKilled()
        }
    }
    //************************************end logic*************************************************//
});
