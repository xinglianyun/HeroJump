(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/enemy/LineEnemy.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd64a05T5MBJ1LAfhoMEGFDE', 'LineEnemy', __filename);
// Script/enemy/LineEnemy.js

"use strict";

// Learn cc.Class:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/class.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/class.html
// Learn Attribute:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/reference/attributes.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/reference/attributes.html
// Learn life-cycle callbacks:
//  - [Chinese] http://docs.cocos.com/creator/manual/zh/scripting/life-cycle-callbacks.html
//  - [English] http://www.cocos2d-x.org/docs/creator/en/scripting/life-cycle-callbacks.html

var gameMainScene = Global.gameMainScene;
var gameManager = Global.gameManager;

cc.Class({
    extends: cc.Component,

    properties: {
        catNode: {
            default: null,
            type: cc.Node
        },
        type: {
            default: "line",
            type: cc.String
        }
    },

    // LIFE-CYCLE CALLBACKS:

    onLoad: function onLoad() {
        this._cat = null;
        this._totalOffsetY = 0.0;
    },
    start: function start() {},
    update: function update(dt) {
        var speed = gameMainScene.getRunSpeed();
        var offsetY = speed * dt;
        this.node.y += offsetY;
        this._totalOffsetY += offsetY;

        if (Math.abs(this._totalOffsetY) > cc.director.getWinSize().height * 1.5) {
            if (this.catNode.childrenCount > 0) {
                this.cat.getComponent("CatEnemy").beKilled();
            }

            this.beKilled();
        }
    },


    // logic
    addCat: function addCat(cat) {
        if (this.catNode) {
            this.catNode.addChild(cat);
        }
        this._cat = cat;
    },

    beKilled: function beKilled() {
        this.node.stopAllActions();
        gameManager.collectEnemy(this.node, this.type);
    }
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
        