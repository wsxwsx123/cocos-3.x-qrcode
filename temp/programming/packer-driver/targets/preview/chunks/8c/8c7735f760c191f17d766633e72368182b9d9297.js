System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, QRMath, i, _i, _i2;

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "0810725v9dMC6vT6jS4cmzZ", "QRMath", undefined);

      _export("QRMath", QRMath = {
        glog(n) {
          if (n < 1) {
            throw new Error('glog(' + n + ')');
          }

          return QRMath.LOG_TABLE[n];
        },

        gexp(n) {
          while (n < 0) {
            n += 255;
          }

          while (n >= 256) {
            n -= 255;
          }

          return QRMath.EXP_TABLE[n];
        },

        EXP_TABLE: new Array(256),
        LOG_TABLE: new Array(256)
      });

      for (i = 0; i < 8; i++) {
        QRMath.EXP_TABLE[i] = 1 << i;
      }

      for (_i = 8; _i < 256; _i++) {
        QRMath.EXP_TABLE[_i] = QRMath.EXP_TABLE[_i - 4] ^ QRMath.EXP_TABLE[_i - 5] ^ QRMath.EXP_TABLE[_i - 6] ^ QRMath.EXP_TABLE[_i - 8];
      }

      for (_i2 = 0; _i2 < 255; _i2++) {
        QRMath.LOG_TABLE[QRMath.EXP_TABLE[_i2]] = _i2;
      }

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=8c7735f760c191f17d766633e72368182b9d9297.js.map