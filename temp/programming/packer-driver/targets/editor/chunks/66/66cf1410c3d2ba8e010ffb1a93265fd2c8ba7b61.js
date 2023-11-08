System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, QRCode, QRErrorCorrectLevel, _cc, _dec, _dec2, _class, _class2, _descriptor, _crd, cc, ccclass, property, test;

  function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

  function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

  function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

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

      _export("test", test = (_dec = ccclass("test"), _dec2 = property(cc.Node), _dec(_class = (_class2 = class test extends Component {
        constructor(...args) {
          super(...args);

          _initializerDefineProperty(this, "ctxNode", _descriptor, this);

          this.ctx = void 0;
        }

        start() {
          this.ctx = this.ctxNode.getComponent(cc.Graphics);

          if (!this.ctx) {
            this.ctx = this.ctxNode.addComponent(cc.Graphics);
          }

          this.QRCreate("https://docs.cocos.com/creator/3.6/manual/zh/ui-system/components/editor/graphics.html");
        } //输入框 内容发生变化


        editBoxChange(data) {
          cc.log(data);
          this.QRCreate(data);
        } //绘制二维码


        QRCreate(url) {
          //根据QRCode来生成二维码数据
          var qrcode = new (_crd && QRCode === void 0 ? (_reportPossibleCrUseOfQRCode({
            error: Error()
          }), QRCode) : QRCode)(-1, (_crd && QRErrorCorrectLevel === void 0 ? (_reportPossibleCrUseOfQRErrorCorrectLevel({
            error: Error()
          }), QRErrorCorrectLevel) : QRErrorCorrectLevel).H);
          qrcode.addData(url);
          qrcode.make();
          this.ctx.fillColor = cc.Color.BLACK;
          let roll = Math.floor(qrcode.getModuleCount()); //块宽高

          var tileW = this.ctxNode.getComponent(cc.UITransform).width / roll;
          var tileH = this.ctxNode.getComponent(cc.UITransform).height / roll;
          this.ctx.clear();

          for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
              if (qrcode.isDark(row, col)) {
                var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
                var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
                let posx = Math.round(col * tileW) - this.ctxNode.getComponent(cc.UITransform).width / 2;
                let posy = Math.round(row * tileH) - this.ctxNode.getComponent(cc.UITransform).height / 2;
                this.ctx.rect(posx, posy, w, h); //颜色

                this.ctx.fillColor = cc.Color.WHITE;
                this.ctx.fill();
              }
            }
          }
        }

        update(deltaTime) {}

      }, (_descriptor = _applyDecoratedDescriptor(_class2.prototype, "ctxNode", [_dec2], {
        configurable: true,
        enumerable: true,
        writable: true,
        initializer: null
      })), _class2)) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=66cf1410c3d2ba8e010ffb1a93265fd2c8ba7b61.js.map