System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, QRMode, QRMaskPattern, QRMath, QRPolynomial, _crd, QRUtil;

  function _reportPossibleCrUseOfQRMode(extras) {
    _reporterNs.report("QRMode", "./constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQRMaskPattern(extras) {
    _reporterNs.report("QRMaskPattern", "./constants", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQRMath(extras) {
    _reporterNs.report("QRMath", "./QRMath", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQRPolynomial(extras) {
    _reporterNs.report("QRPolynomial", "./QRPolynomial", _context.meta, extras);
  }

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      QRMode = _unresolved_2.QRMode;
      QRMaskPattern = _unresolved_2.QRMaskPattern;
    }, function (_unresolved_3) {
      QRMath = _unresolved_3.QRMath;
    }, function (_unresolved_4) {
      QRPolynomial = _unresolved_4.default;
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "2adf4nF3hdCzKsJwsWibE4O", "QRUtil", undefined);

      _export("QRUtil", QRUtil = {
        PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
        G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
        G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
        G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,

        getBCHTypeInfo(data) {
          let d = data << 10;

          while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
            d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
          }

          return (data << 10 | d) ^ QRUtil.G15_MASK;
        },

        getBCHTypeNumber(data) {
          let d = data << 12;

          while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
            d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
          }

          return data << 12 | d;
        },

        getBCHDigit(data) {
          let digit = 0;

          while (data !== 0) {
            digit++;
            data >>>= 1;
          }

          return digit;
        },

        getPatternPosition(typeNumber) {
          return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
        },

        getMask(maskPattern, i, j) {
          switch (maskPattern) {
            case (_crd && QRMaskPattern === void 0 ? (_reportPossibleCrUseOfQRMaskPattern({
              error: Error()
            }), QRMaskPattern) : QRMaskPattern).PATTERN000:
              return (i + j) % 2 === 0;

            case (_crd && QRMaskPattern === void 0 ? (_reportPossibleCrUseOfQRMaskPattern({
              error: Error()
            }), QRMaskPattern) : QRMaskPattern).PATTERN001:
              return i % 2 === 0;

            case (_crd && QRMaskPattern === void 0 ? (_reportPossibleCrUseOfQRMaskPattern({
              error: Error()
            }), QRMaskPattern) : QRMaskPattern).PATTERN010:
              return j % 3 === 0;

            case (_crd && QRMaskPattern === void 0 ? (_reportPossibleCrUseOfQRMaskPattern({
              error: Error()
            }), QRMaskPattern) : QRMaskPattern).PATTERN011:
              return (i + j) % 3 === 0;

            case (_crd && QRMaskPattern === void 0 ? (_reportPossibleCrUseOfQRMaskPattern({
              error: Error()
            }), QRMaskPattern) : QRMaskPattern).PATTERN100:
              return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 === 0;

            case (_crd && QRMaskPattern === void 0 ? (_reportPossibleCrUseOfQRMaskPattern({
              error: Error()
            }), QRMaskPattern) : QRMaskPattern).PATTERN101:
              return i * j % 2 + i * j % 3 === 0;

            case (_crd && QRMaskPattern === void 0 ? (_reportPossibleCrUseOfQRMaskPattern({
              error: Error()
            }), QRMaskPattern) : QRMaskPattern).PATTERN110:
              return (i * j % 2 + i * j % 3) % 2 === 0;

            case (_crd && QRMaskPattern === void 0 ? (_reportPossibleCrUseOfQRMaskPattern({
              error: Error()
            }), QRMaskPattern) : QRMaskPattern).PATTERN111:
              return (i * j % 3 + (i + j) % 2) % 2 === 0;

            default:
              throw new Error('bad maskPattern:' + maskPattern);
          }
        },

        getErrorCorrectPolynomial(errorCorrectLength) {
          let a = new (_crd && QRPolynomial === void 0 ? (_reportPossibleCrUseOfQRPolynomial({
            error: Error()
          }), QRPolynomial) : QRPolynomial)([1], 0);

          for (let i = 0; i < errorCorrectLength; i++) {
            a = a.multiply(new (_crd && QRPolynomial === void 0 ? (_reportPossibleCrUseOfQRPolynomial({
              error: Error()
            }), QRPolynomial) : QRPolynomial)([1, (_crd && QRMath === void 0 ? (_reportPossibleCrUseOfQRMath({
              error: Error()
            }), QRMath) : QRMath).gexp(i)], 0));
          }

          return a;
        },

        getLengthInBits(mode, type) {
          if (type >= 1 && type < 10) {
            // 1 - 9
            switch (mode) {
              case (_crd && QRMode === void 0 ? (_reportPossibleCrUseOfQRMode({
                error: Error()
              }), QRMode) : QRMode).MODE_NUMBER:
                return 10;

              case (_crd && QRMode === void 0 ? (_reportPossibleCrUseOfQRMode({
                error: Error()
              }), QRMode) : QRMode).MODE_ALPHA_NUM:
                return 9;

              case (_crd && QRMode === void 0 ? (_reportPossibleCrUseOfQRMode({
                error: Error()
              }), QRMode) : QRMode).MODE_8BIT_BYTE:
                return 8;

              case (_crd && QRMode === void 0 ? (_reportPossibleCrUseOfQRMode({
                error: Error()
              }), QRMode) : QRMode).MODE_KANJI:
                return 8;

              default:
                throw new Error('mode:' + mode);
            }
          } else if (type < 27) {
            // 10 - 26
            switch (mode) {
              case (_crd && QRMode === void 0 ? (_reportPossibleCrUseOfQRMode({
                error: Error()
              }), QRMode) : QRMode).MODE_NUMBER:
                return 12;

              case (_crd && QRMode === void 0 ? (_reportPossibleCrUseOfQRMode({
                error: Error()
              }), QRMode) : QRMode).MODE_ALPHA_NUM:
                return 11;

              case (_crd && QRMode === void 0 ? (_reportPossibleCrUseOfQRMode({
                error: Error()
              }), QRMode) : QRMode).MODE_8BIT_BYTE:
                return 16;

              case (_crd && QRMode === void 0 ? (_reportPossibleCrUseOfQRMode({
                error: Error()
              }), QRMode) : QRMode).MODE_KANJI:
                return 10;

              default:
                throw new Error('mode:' + mode);
            }
          } else if (type < 41) {
            // 27 - 40
            switch (mode) {
              case (_crd && QRMode === void 0 ? (_reportPossibleCrUseOfQRMode({
                error: Error()
              }), QRMode) : QRMode).MODE_NUMBER:
                return 14;

              case (_crd && QRMode === void 0 ? (_reportPossibleCrUseOfQRMode({
                error: Error()
              }), QRMode) : QRMode).MODE_ALPHA_NUM:
                return 13;

              case (_crd && QRMode === void 0 ? (_reportPossibleCrUseOfQRMode({
                error: Error()
              }), QRMode) : QRMode).MODE_8BIT_BYTE:
                return 16;

              case (_crd && QRMode === void 0 ? (_reportPossibleCrUseOfQRMode({
                error: Error()
              }), QRMode) : QRMode).MODE_KANJI:
                return 12;

              default:
                throw new Error('mode:' + mode);
            }
          } else {
            throw new Error('type:' + type);
          }
        },

        getLostPoint(qrCode) {
          const moduleCount = qrCode.getModuleCount();
          let lostPoint = 0; // LEVEL1

          for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount; col++) {
              let sameCount = 0;
              const dark = qrCode.isDark(row, col);

              for (let r = -1; r <= 1; r++) {
                if (row + r < 0 || moduleCount <= row + r) {
                  continue;
                }

                for (let c = -1; c <= 1; c++) {
                  if (col + c < 0 || moduleCount <= col + c) {
                    continue;
                  }

                  if (r === 0 && c === 0) {
                    continue;
                  }

                  if (dark === qrCode.isDark(row + r, col + c)) {
                    sameCount++;
                  }
                }
              }

              if (sameCount > 5) {
                lostPoint += 3 + sameCount - 5;
              }
            }
          } // LEVEL2


          for (let row = 0; row < moduleCount - 1; row++) {
            for (let col = 0; col < moduleCount - 1; col++) {
              let count = 0;
              if (qrCode.isDark(row, col)) count++;
              if (qrCode.isDark(row + 1, col)) count++;
              if (qrCode.isDark(row, col + 1)) count++;
              if (qrCode.isDark(row + 1, col + 1)) count++;

              if (count === 0 || count === 4) {
                lostPoint += 3;
              }
            }
          } // LEVEL3


          for (let row = 0; row < moduleCount; row++) {
            for (let col = 0; col < moduleCount - 6; col++) {
              if (qrCode.isDark(row, col) && !qrCode.isDark(row, col + 1) && qrCode.isDark(row, col + 2) && qrCode.isDark(row, col + 3) && qrCode.isDark(row, col + 4) && !qrCode.isDark(row, col + 5) && qrCode.isDark(row, col + 6)) {
                lostPoint += 40;
              }
            }
          }

          for (let col = 0; col < moduleCount; col++) {
            for (let row = 0; row < moduleCount - 6; row++) {
              if (qrCode.isDark(row, col) && !qrCode.isDark(row + 1, col) && qrCode.isDark(row + 2, col) && qrCode.isDark(row + 3, col) && qrCode.isDark(row + 4, col) && !qrCode.isDark(row + 5, col) && qrCode.isDark(row + 6, col)) {
                lostPoint += 40;
              }
            }
          } // LEVEL4


          let darkCount = 0;

          for (let col = 0; col < moduleCount; col++) {
            for (let row = 0; row < moduleCount; row++) {
              if (qrCode.isDark(row, col)) {
                darkCount++;
              }
            }
          }

          const ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
          lostPoint += ratio * 10;
          return lostPoint;
        }

      });

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=bf3a38fc1573559761fbcd33dcb5659a510379da.js.map