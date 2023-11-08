System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, QRMode, QRErrorCorrectLevel, QRMaskPattern;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "7df675QrwhGmoshNHw/UNW4", "constants", undefined);

      _export("QRMode", QRMode = {
        MODE_NUMBER: 1 << 0,
        MODE_ALPHA_NUM: 1 << 1,
        MODE_8BIT_BYTE: 1 << 2,
        MODE_KANJI: 1 << 3
      });

      _export("QRErrorCorrectLevel", QRErrorCorrectLevel = {
        L: 1,
        M: 0,
        Q: 3,
        H: 2
      });

      _export("QRMaskPattern", QRMaskPattern = {
        PATTERN000: 0,
        PATTERN001: 1,
        PATTERN010: 2,
        PATTERN011: 3,
        PATTERN100: 4,
        PATTERN101: 5,
        PATTERN110: 6,
        PATTERN111: 7
      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=cfe2f0aa3906a3cbe6b220e35b012f06013ebe91.js.map