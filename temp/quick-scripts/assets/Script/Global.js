(function() {"use strict";var __module = CC_EDITOR ? module : {exports:{}};var __filename = 'preview-scripts/assets/Script/Global.js';var __require = CC_EDITOR ? function (request) {return cc.require(request, require);} : function (request) {return cc.require(request, __filename);};function __define (exports, require, module) {"use strict";
cc._RF.push(module, 'd7899SR5YdG0agMlq8G/gzS', 'Global', __filename);
// Script/Global.js

"use strict";

window.Global = {
    gameManager: null,
    gameMainScene: null,
    hero: null,
    enemyType: {
        bird: "bird",
        dart2: "dart2",
        line: "line",
        linecat: "linecat",
        shortbarrier: "shortbarrier",
        longbarrier: "longbarrier",
        enemyrun: "enemyrun",
        circleprop: "circleprop"
    },
    enemyNodeType: {
        bird: "bird",
        dartenemy: "dartenemy",
        dartnode: "dartnode",
        line: "line",
        cat: "cat",
        shortbarrier: "shortbarrier",
        longbarrier: "longbarrier",
        runenemy: "runenemy",
        circleprop: "circleprop"
    }
};

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
        //# sourceMappingURL=Global.js.map
        