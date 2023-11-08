System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, __checkObsolete__, __checkObsoleteInNamespace__, _decorator, Component, QRCode, QRErrorCorrectLevel, _dec, _class, _crd, ccclass, property, test;

  function _reportPossibleCrUseOfQRCode(extras) {
    _reporterNs.report("QRCode", "./QRCode", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQRErrorCorrectLevel(extras) {
    _reporterNs.report("QRErrorCorrectLevel", "./QRCode", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
      __checkObsolete__ = _cc.__checkObsolete__;
      __checkObsoleteInNamespace__ = _cc.__checkObsoleteInNamespace__;
      _decorator = _cc._decorator;
      Component = _cc.Component;
    }, function (_unresolved_2) {
      QRCode = _unresolved_2.QRCode;
      QRErrorCorrectLevel = _unresolved_2.QRErrorCorrectLevel;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "a7f41Qg7T5If4r0WgMkIoYc", "test", undefined);

      __checkObsolete__(['_decorator', 'Component', 'Node']);

      ({
        ccclass,
        property
      } = _decorator);

      _export("test", test = (_dec = ccclass('test'), _dec(_class = class test extends Component {
        start() {
          let qr = new (_crd && QRCode === void 0 ? (_reportPossibleCrUseOfQRCode({
            error: Error()
          }), QRCode) : QRCode)(-1, (_crd && QRErrorCorrectLevel === void 0 ? (_reportPossibleCrUseOfQRErrorCorrectLevel({
            error: Error()
          }), QRErrorCorrectLevel) : QRErrorCorrectLevel).H);
          console.error(qr);
        }

        update(deltaTime) {}

      }) || _class));

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=4e9f50ff6eb1bd23385f8a46113766d6355eee14.js.map