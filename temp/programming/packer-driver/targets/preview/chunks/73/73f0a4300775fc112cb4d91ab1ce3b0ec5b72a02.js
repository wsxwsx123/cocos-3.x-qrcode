System.register(["cc"], function (_export, _context) {
  "use strict";

  var _cclegacy, QRBitBuffer, _crd;

  _export("default", void 0);

  return {
    setters: [function (_cc) {
      _cclegacy = _cc.cclegacy;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "83455JMF+xDIKGSX1KmSHD1", "QRBitBuffer", undefined);

      _export("default", QRBitBuffer = class QRBitBuffer {
        constructor() {
          this.buffer = void 0;
          this.length = void 0;
          this.buffer = [];
          this.length = 0;
        }

        get(index) {
          var bufIndex = Math.floor(index / 8);
          return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) === 1;
        }

        put(num, length) {
          for (var i = 0; i < length; i++) {
            this.putBit((num >>> length - i - 1 & 1) === 1);
          }
        }

        getLengthInBits() {
          return this.length;
        }

        putBit(bit) {
          var bufIndex = Math.floor(this.length / 8);

          if (this.buffer.length <= bufIndex) {
            this.buffer.push(0);
          }

          if (bit) {
            this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
          }

          this.length++;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=73f0a4300775fc112cb4d91ab1ce3b0ec5b72a02.js.map