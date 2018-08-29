cc.Class({
    extends: cc.Component,

    properties: {
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad () {
        this._realListener = null;
    },

    start () {

    },

    // update (dt) {},

    //************************************start logic*************************************************//
    setRealListener : function(realListener){
        this._realListener = realListener
    },

    onCollisionEnter: function (other, self) {
        if(this._realListener){
            this._realListener.onCollisionEnter(other, self)
        }
    }
    //************************************start logic*************************************************//
});
