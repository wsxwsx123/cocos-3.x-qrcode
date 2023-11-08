System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, _crd, QRMath, i, i, i;

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

      for (i = 8; i < 256; i++) {
        QRMath.EXP_TABLE[i] = QRMath.EXP_TABLE[i - 4] ^ QRMath.EXP_TABLE[i - 5] ^ QRMath.EXP_TABLE[i - 6] ^ QRMath.EXP_TABLE[i - 8];
      }

      for (i = 0; i < 255; i++) {
        QRMath.LOG_TABLE[QRMath.EXP_TABLE[i]] = i;
      }

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=d6e335b4c7883560b6006eee07b6596b58315b79.js.map