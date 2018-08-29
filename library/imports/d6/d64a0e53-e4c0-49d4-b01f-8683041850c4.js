"use strict";
cc._RF.push(module, 'd64a05T5MBJ1LAfhoMEGFDE', 'LineEnemy');
// Script/enemy/LineEnemy.js

"use strict";

cc.Class({
    extends: cc.Component,

    properties: {
        // 挂载猫节点的位置
        catNode: {
            default: null,
            type: cc.Node
        },
        _cat: {
            default: null,
            type: cc.Node,
            serializable: false
        }
    },

    // LIFE-CYCLE CALLBACKS:
    onLoad: function onLoad() {
        this._totalOffsetY = 0.0;
        this._enemyNodeType = Global.enemyNodeType.line;
    },
    start: function start() {},
    update: function update(dt) {
        var speed = Global.gameMainScene.getRunSpeed();
        var offsetY = speed * dt;
        this.node.y += offsetY;
        this._totalOffsetY += offsetY;

        if (Math.abs(this._totalOffsetY) > cc.director.getWinSize().height * 1.5) {
            if (this.catNode.childrenCount > 0) {
                if (this._cat) {
                    this._cat.getComponent("CatEnemy").beCollected();
                }
            }
            this.beCollected();
        }
    },


    //************************************start logic*************************************************//
    /**
     * desc: add the cat to lin
     */
    addCat: function addCat(cat) {
        if (this.catNode) {
            this.catNode.addChild(cat);
            this._cat = cat;
        }
    },
    /**
     * desc: be collected
     */
    beCollected: function beCollected() {
        this.node.stopAllActions();
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType);
    }
    //************************************end logic*************************************************//
});

cc._RF.pop();