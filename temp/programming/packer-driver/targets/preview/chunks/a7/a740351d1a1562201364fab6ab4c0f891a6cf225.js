System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, QRMode, QR8bitByte, _crd;

  function _reportPossibleCrUseOfQRMode(extras) {
    _reporterNs.report("QRMode", "./constants", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      QRMode = _unresolved_2.QRMode;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "49529lak81D3JswXM+bPsfG", "QR8bitByte", undefined);

      _export("default", QR8bitByte = class QR8bitByte {
        getLength() {
          return this.data.length;
        }

        write(buffer) {
          for (var i = 0; i < this.data.length; i++) {
            // not JIS ...
            buffer.put(this.data.charCodeAt(i), 8);
          }
        }

        constructor(data) {
          this.mode = void 0;
          this.data = void 0;
          this.mode = (_crd && QRMode === void 0 ? (_reportPossibleCrUseOfQRMode({
            error: Error()
          }), QRMode) : QRMode).MODE_8BIT_BYTE;
          this.data = data;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=a740351d1a1562201364fab6ab4c0f891a6cf225.js.map