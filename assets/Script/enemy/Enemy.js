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

    reuse : function(){
        if(this._realListener){
            this._realListener.reuse()
        }
    },

    // update (dt) {},

    //************************************start logic*************************************************//
    setRealListener : function(realListener){
        this._realListener = realListener
    },

    onInit : function(){
        if(this._realListener){
            this._realListener.onInit()
        }
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
    },
    getEnemyNodeType : function(){
        if(this._realListener){
            this._realListener.getEnemyNodeType()
        }
    },
    DisplayDeadEnemyState : function(){
        if(this._realListener){
            this._realListener.DisplayDeadEnemyState()
        }
    }
    //************************************end logic*************************************************//
});
