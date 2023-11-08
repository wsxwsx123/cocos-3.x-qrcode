System.register(["__unresolved_0", "cc", "__unresolved_1"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, QRMath, QRPolynomial, _crd;

  function _reportPossibleCrUseOfQRMath(extras) {
    _reporterNs.report("QRMath", "./QRMath", _context.meta, extras);
  }

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      QRMath = _unresolved_2.QRMath;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2fc2b7WSJhJqZbYSCNJdV1X", "QRPolynomial", undefined);

      _export("default", QRPolynomial = class QRPolynomial {
        constructor(num, shift) {
          this.num = void 0;

          if (num.length == null) {
            throw new Error(num.length + '/' + shift);
          }

          let offset = 0;

          while (offset < num.length && num[offset] === 0) {
            offset++;
          }

          this.num = new Array(num.length - offset + shift);

          for (let i = 0; i < num.length - offset; i++) {
            this.num[i] = num[i + offset];
          }
        }

        get(index) {
          return this.num[index];
        }

        getLength() {
          return this.num.length;
        }

        multiply(e) {
          const num = new Array(this.getLength() + e.getLength() - 1);

          for (let i = 0; i < this.getLength(); i++) {
            for (let j = 0; j < e.getLength(); j++) {
              num[i + j] ^= (_crd && QRMath === void 0 ? (_reportPossibleCrUseOfQRMath({
                error: Error()
              }), QRMath) : QRMath).gexp((_crd && QRMath === void 0 ? (_reportPossibleCrUseOfQRMath({
                error: Error()
              }), QRMath) : QRMath).glog(this.get(i)) + (_crd && QRMath === void 0 ? (_reportPossibleCrUseOfQRMath({
                error: Error()
              }), QRMath) : QRMath).glog(e.get(j)));
            }
          }

          return new QRPolynomial(num, 0);
        }

        mod(e) {
          if (this.getLength() - e.getLength() < 0) {
            return this;
          }

          const ratio = (_crd && QRMath === void 0 ? (_reportPossibleCrUseOfQRMath({
            error: Error()
          }), QRMath) : QRMath).glog(this.get(0)) - (_crd && QRMath === void 0 ? (_reportPossibleCrUseOfQRMath({
            error: Error()
          }), QRMath) : QRMath).glog(e.get(0));
          const num = new Array(this.getLength());

          for (let i = 0; i < this.getLength(); i++) {
            num[i] = this.get(i);
          }

          for (let i = 0; i < e.getLength(); i++) {
            num[i] ^= (_crd && QRMath === void 0 ? (_reportPossibleCrUseOfQRMath({
              error: Error()
            }), QRMath) : QRMath).gexp((_crd && QRMath === void 0 ? (_reportPossibleCrUseOfQRMath({
              error: Error()
            }), QRMath) : QRMath).glog(e.get(i)) + ratio);
          } // recursive call


          return new QRPolynomial(num, 0).mod(e);
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=59fbb771b106f0f90eb71af9298d5ecfad95f403.js.map