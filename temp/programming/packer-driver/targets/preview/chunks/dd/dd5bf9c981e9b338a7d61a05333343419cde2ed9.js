System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, QRCode, QRErrorCorrectLevel, _cc, _dec, _class, _crd, cc, ccclass, property, test;

  function _reportPossibleCrUseOfQRCode(extras) {
    _reporterNs.report("QRCode", "./QRCode", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQRErrorCorrectLevel(extras) {
    _reporterNs.report("QRErrorCorrectLevel", "./QRCode", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc2) {
      _cclegacy = _cc2.cclegacy;
      __checkObsolete__ = _cc2.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc2.__checkObsoleteInNamespace__;
      _decorator = _cc2._decorator;
      Component = _cc2.Component;
      _cc = _cc2;
    }, function (_unresolved_2) {
      QRCode = _unresolved_2.QRCode;
      QRErrorCorrectLevel = _unresolved_2.QRErrorCorrectLevel;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a7f41Qg7T5If4r0WgMkIoYc", "test", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      cc = __checkObsoleteInNamespace__(_cc);
      ({
        ccclass,
        property
      } = _decorator);

      _export("test", test = (_dec = ccclass("test"), _dec(_class = class test extends Component {
        start() {
          // let qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
          // console.error(qrcode);
          // qrcode.addData("www.baidu.com");
          // qrcode.make();
          // console.error(qrcode);
          var ctx = this.node.getComponent(cc.Graphics);
          this.QRCreate(ctx, "https://docs.cocos.com/creator/3.6/manual/zh/ui-system/components/editor/graphics.html");
        }

        QRCreate(ctx, url) {
          var qrcode = new (_crd && QRCode === void 0 ? (_reportPossibleCrUseOfQRCode({
            error: Error()
          }), QRCode) : QRCode)(-1, (_crd && QRErrorCorrectLevel === void 0 ? (_reportPossibleCrUseOfQRErrorCorrectLevel({
            error: Error()
          }), QRErrorCorrectLevel) : QRErrorCorrectLevel).H);
          qrcode.addData(url);
          qrcode.make();
          ctx.fillColor = cc.Color.BLACK; //块宽高

          var tileW = this.node.getComponent(cc.UITransform).width / qrcode.getModuleCount();
          var tileH = this.node.getComponent(cc.UITransform).height / qrcode.getModuleCount(); // draw in the Graphics

          for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
              if (qrcode.isDark(row, col)) {
                //   ctx.fillColor = cc.Color.WHITE;
                var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
                var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW); //   let node = cc.instantiate(cc.find("testNode", this.node));
                //   this.node.addChild(node)
                //   node.setPosition(
                //     cc.v3(Math.round(col * tileW)-this.node.getComponent(cc.UITransform).width/2 +w/2, Math.round(row * tileH)-this.node.getComponent(cc.UITransform).height/2 +h/2)
                //   );
                //   node.getComponent(cc.UITransform).width = w;
                //   node.getComponent(cc.UITransform).height = h;
                //   node.active = true;

                var posx = Math.round(col * tileW) - this.node.getComponent(cc.UITransform).width / 2 + w / 2;
                var posy = Math.round(col * tileW) - this.node.getComponent(cc.UITransform).height / 2 + h / 2;
                ctx.rect(posx, posy, w, h);
                ctx.fillRect();
                ctx.stroke();
                ctx.fill();
              }
            }
          } // ctx.stroke();

        }

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=dd5bf9c981e9b338a7d61a05333343419cde2ed9.js.map