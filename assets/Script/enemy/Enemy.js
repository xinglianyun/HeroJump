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

    //logic
    setRealListener : function(realListener){
        this._realListener = realListener
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
});
