(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/enemy/LineEnemy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd64a05T5MBJ1LAfhoMEGFDE', 'LineEnemy', __filename);
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
        this._enemyNodeType = Global.enemyNodeType.line;
        this.node.getComponent("Enemy").setRealListener(this);

        this.onInit();
    },
    start: function start() {},
    update: function update(dt) {
        var speed = Global.gameMainScene.getRunSpeed();
        var offsetY = speed * dt;
        this.node.y += offsetY;
        this._totalOffsetY += offsetY;

        if (Math.abs(this._totalOffsetY) > cc.winSize.height * 1.5) {
            if (this.catNode.childrenCount > 0) {
                if (this._cat) {
                    this._cat.getComponent("CatEnemy").beCollected();
                    this._cat = null;
                }
            }
            this.beCollected();
        }
    },


    reuse: function reuse() {
        this.onInit();
    },

    //************************************start logic*************************************************//
    onInit: function onInit() {
        this.node.setPosition(0, 0);
        this.node.setScale(1);
        this._totalOffsetY = 0.0;
    },
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
        if (this._cat) {
            this._cat.getComponent("CatEnemy").beCollected();
            this._cat = null;
        }
        this.node.stopAllActions();
        Global.gameManager.collectEnemy(this.node, this._enemyNodeType);
    }
    //************************************end logic*************************************************//
});

cc._RF.pop();
        }
        if (CC_EDITOR) {
            __define(__module.exports, __require, __module);
        }
        else {
            cc.registerModuleFunc(__filename, function () {
                __define(__module.exports, __require, __module);
            });
        }
        })();
        //# sourceMappingURL=LineEnemy.js.map
        