System.register(["__unresolved_0", "cc", "__unresolved_1", "__unresolved_2", "__unresolved_3", "__unresolved_4", "__unresolved_5", "__unresolved_6", "__unresolved_7"], function (_export, _context) {
  "use strict";

  var _reporterNs, _cclegacy, QRUtil, QR8bitByte, QRBitBuffer, QRRSBlock, QRPolynomial, QRErrorCorrectLevel, QRCode, _crd;

  function _reportPossibleCrUseOfQRUtil(extras) {
    _reporterNs.report("QRUtil", "./QRUtil", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQR8bitByte(extras) {
    _reporterNs.report("QR8bitByte", "./QR8bitByte", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQRBitBuffer(extras) {
    _reporterNs.report("QRBitBuffer", "./QRBitBuffer", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQRRSBlock(extras) {
    _reporterNs.report("QRRSBlock", "./QRRSBlock", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQRPolynomial(extras) {
    _reporterNs.report("QRPolynomial", "./QRPolynomial", _context.meta, extras);
  }

  function _reportPossibleCrUseOfQRErrorCorrectLevel(extras) {
    _reporterNs.report("QRErrorCorrectLevel", "./constants", _context.meta, extras);
  }

  _export("QRCode", void 0);

  return {
    setters: [function (_unresolved_) {
      _reporterNs = _unresolved_;
    }, function (_cc) {
      _cclegacy = _cc.cclegacy;
    }, function (_unresolved_2) {
      QRUtil = _unresolved_2.QRUtil;
    }, function (_unresolved_3) {
      QR8bitByte = _unresolved_3.default;
    }, function (_unresolved_4) {
      QRBitBuffer = _unresolved_4.default;
    }, function (_unresolved_5) {
      QRRSBlock = _unresolved_5.default;
    }, function (_unresolved_6) {
      QRPolynomial = _unresolved_6.default;
    }, function (_unresolved_7) {
      QRErrorCorrectLevel = _unresolved_7.QRErrorCorrectLevel;
    }, function (_unresolved_8) {
      _export("QRErrorCorrectLevel", _unresolved_8.QRErrorCorrectLevel);
    }],
    execute: function () {
      _crd = true;

      _cclegacy._RF.push({}, "8731ahp+DBBXbKD+Rj9faK7", "QRCode", undefined);

      _export("QRCode", QRCode = class QRCode {
        constructor(typeNumber, errorCorrectLevel) {
          this.typeNumber = void 0;
          this.errorCorrectLevel = void 0;
          this.modules = void 0;
          this.moduleCount = void 0;
          this.dataCache = void 0;
          this.dataList = void 0;
          this.typeNumber = typeNumber;
          this.errorCorrectLevel = errorCorrectLevel;
          this.modules = null;
          this.moduleCount = 0;
          this.dataCache = null;
          this.dataList = [];
        }

        addData(data) {
          var newData = new (_crd && QR8bitByte === void 0 ? (_reportPossibleCrUseOfQR8bitByte({
            error: Error()
          }), QR8bitByte) : QR8bitByte)(data);
          this.dataList.push(newData);
          this.dataCache = null;
        }

        isDark(row, col) {
          if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
            throw new Error(row + ',' + col);
          }

          return this.modules[row][col];
        }

        getModuleCount() {
          return this.moduleCount;
        }

        make() {
          // Calculate automatically typeNumber if provided is < 1
          if (this.typeNumber < 1) {
            var typeNumber;

            for (typeNumber = 1; typeNumber < 40; typeNumber++) {
              var rsBlocks = (_crd && QRRSBlock === void 0 ? (_reportPossibleCrUseOfQRRSBlock({
                error: Error()
              }), QRRSBlock) : QRRSBlock).getRSBlocks(typeNumber, this.errorCorrectLevel);
              var buffer = new (_crd && QRBitBuffer === void 0 ? (_reportPossibleCrUseOfQRBitBuffer({
                error: Error()
              }), QRBitBuffer) : QRBitBuffer)();
              var totalDataCount = 0;

              for (var i = 0; i < rsBlocks.length; i++) {
                totalDataCount += rsBlocks[i].dataCount;
              }

              for (var _i = 0; _i < this.dataList.length; _i++) {
                var data = this.dataList[_i];
                buffer.put(data.mode, 4);
                buffer.put(data.getLength(), (_crd && QRUtil === void 0 ? (_reportPossibleCrUseOfQRUtil({
                  error: Error()
                }), QRUtil) : QRUtil).getLengthInBits(data.mode, typeNumber));
                data.write(buffer);
              }

              if (buffer.getLengthInBits() <= totalDataCount * 8) break;
            }

            this.typeNumber = typeNumber;
          }

          this.makeImpl(false, this.getBestMaskPattern());
        }

        makeImpl(test, maskPattern) {
          this.moduleCount = this.typeNumber * 4 + 17;
          this.modules = new Array(this.moduleCount);

          for (var row = 0; row < this.moduleCount; row++) {
            this.modules[row] = new Array(this.moduleCount);

            for (var col = 0; col < this.moduleCount; col++) {
              this.modules[row][col] = null;
            }
          }

          this.setupPositionProbePattern(0, 0);
          this.setupPositionProbePattern(this.moduleCount - 7, 0);
          this.setupPositionProbePattern(0, this.moduleCount - 7);
          this.setupPositionAdjustPattern();
          this.setupTimingPattern();
          this.setupTypeInfo(test, maskPattern);

          if (this.typeNumber >= 7) {
            this.setupTypeNumber(test);
          }

          if (this.dataCache == null) {
            this.dataCache = QRCode.createData(this.typeNumber, this.errorCorrectLevel, this.dataList);
          }

          this.mapData(this.dataCache, maskPattern);
        }

        setupPositionProbePattern(row, col) {
          for (var r = -1; r <= 7; r++) {
            if (row + r <= -1 || this.moduleCount <= row + r) continue;

            for (var c = -1; c <= 7; c++) {
              if (col + c <= -1 || this.moduleCount <= col + c) continue;

              if (r >= 0 && r <= 6 && (c === 0 || c === 6) || c >= 0 && c <= 6 && (r === 0 || r === 6) || r >= 2 && r <= 4 && c >= 2 && c <= 4) {
                this.modules[row + r][col + c] = true;
              } else {
                this.modules[row + r][col + c] = false;
              }
            }
          }
        }

        getBestMaskPattern() {
          var minLostPoint = 0;
          var pattern = 0;

          for (var i = 0; i < 8; i++) {
            this.makeImpl(true, i);
            var lostPoint = (_crd && QRUtil === void 0 ? (_reportPossibleCrUseOfQRUtil({
              error: Error()
            }), QRUtil) : QRUtil).getLostPoint(this);

            if (i === 0 || minLostPoint > lostPoint) {
              minLostPoint = lostPoint;
              pattern = i;
            }
          }

          return pattern;
        }

        createMovieClip(targetMc, instanceName, depth) {
          var qrMc = targetMc.createEmptyMovieClip(instanceName, depth);
          var cs = 1;
          this.make();

          for (var row = 0; row < this.modules.length; row++) {
            var y = row * cs;

            for (var col = 0; col < this.modules[row].length; col++) {
              var x = col * cs;
              var dark = this.modules[row][col];

              if (dark) {
                qrMc.beginFill(0, 100);
                qrMc.moveTo(x, y);
                qrMc.lineTo(x + cs, y);
                qrMc.lineTo(x + cs, y + cs);
                qrMc.lineTo(x, y + cs);
                qrMc.endFill();
              }
            }
          }

          return qrMc;
        }

        setupTimingPattern() {
          for (var r = 8; r < this.moduleCount - 8; r++) {
            if (this.modules[r][6] != null) {
              continue;
            }

            this.modules[r][6] = r % 2 === 0;
          }

          for (var c = 8; c < this.moduleCount - 8; c++) {
            if (this.modules[6][c] != null) {
              continue;
            }

            this.modules[6][c] = c % 2 === 0;
          }
        }

        setupPositionAdjustPattern() {
          var pos = (_crd && QRUtil === void 0 ? (_reportPossibleCrUseOfQRUtil({
            error: Error()
          }), QRUtil) : QRUtil).getPatternPosition(this.typeNumber);

          for (var i = 0; i < pos.length; i++) {
            for (var j = 0; j < pos.length; j++) {
              var row = pos[i];
              var col = pos[j];

              if (this.modules[row][col] != null) {
                continue;
              }

              for (var r = -2; r <= 2; r++) {
                for (var c = -2; c <= 2; c++) {
                  if (r === -2 || r === 2 || c === -2 || c === 2 || r === 0 && c === 0) {
                    this.modules[row + r][col + c] = true;
                  } else {
                    this.modules[row + r][col + c] = false;
                  }
                }
              }
            }
          }
        }

        setupTypeNumber(test) {
          var bits = (_crd && QRUtil === void 0 ? (_reportPossibleCrUseOfQRUtil({
            error: Error()
          }), QRUtil) : QRUtil).getBCHTypeNumber(this.typeNumber);

          for (var i = 0; i < 18; i++) {
            var mod = !test && (bits >> i & 1) === 1;
            this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
          }

          for (var _i2 = 0; _i2 < 18; _i2++) {
            var _mod = !test && (bits >> _i2 & 1) === 1;

            this.modules[_i2 % 3 + this.moduleCount - 8 - 3][Math.floor(_i2 / 3)] = _mod;
          }
        }

        setupTypeInfo(test, maskPattern) {
          var data = this.errorCorrectLevel << 3 | maskPattern;
          var bits = (_crd && QRUtil === void 0 ? (_reportPossibleCrUseOfQRUtil({
            error: Error()
          }), QRUtil) : QRUtil).getBCHTypeInfo(data); // vertical

          for (var i = 0; i < 15; i++) {
            var mod = !test && (bits >> i & 1) === 1;

            if (i < 6) {
              this.modules[i][8] = mod;
            } else if (i < 8) {
              this.modules[i + 1][8] = mod;
            } else {
              this.modules[this.moduleCount - 15 + i][8] = mod;
            }
          } // horizontal


          for (var _i3 = 0; _i3 < 15; _i3++) {
            var _mod2 = !test && (bits >> _i3 & 1) === 1;

            if (_i3 < 8) {
              this.modules[8][this.moduleCount - _i3 - 1] = _mod2;
            } else if (_i3 < 9) {
              this.modules[8][15 - _i3 - 1 + 1] = _mod2;
            } else {
              this.modules[8][15 - _i3 - 1] = _mod2;
            }
          } // fixed module


          this.modules[this.moduleCount - 8][8] = !test;
        }

        mapData(data, maskPattern) {
          var inc = -1;
          var row = this.moduleCount - 1;
          var bitIndex = 7;
          var byteIndex = 0;

          for (var col = this.moduleCount - 1; col > 0; col -= 2) {
            if (col === 6) col--;

            while (true) {
              for (var c = 0; c < 2; c++) {
                if (this.modules[row][col - c] == null) {
                  var dark = false;

                  if (byteIndex < data.length) {
                    dark = (data[byteIndex] >>> bitIndex & 1) === 1;
                  }

                  var mask = (_crd && QRUtil === void 0 ? (_reportPossibleCrUseOfQRUtil({
                    error: Error()
                  }), QRUtil) : QRUtil).getMask(maskPattern, row, col - c);

                  if (mask) {
                    dark = !dark;
                  }

                  this.modules[row][col - c] = dark;
                  bitIndex--;

                  if (bitIndex === -1) {
                    byteIndex++;
                    bitIndex = 7;
                  }
                }
              }

              row += inc;

              if (row < 0 || this.moduleCount <= row) {
                row -= inc;
                inc = -inc;
                break;
              }
            }
          }
        }

        static createData(typeNumber, errorCorrectLevel, dataList) {
          var rsBlocks = (_crd && QRRSBlock === void 0 ? (_reportPossibleCrUseOfQRRSBlock({
            error: Error()
          }), QRRSBlock) : QRRSBlock).getRSBlocks(typeNumber, errorCorrectLevel);
          var buffer = new (_crd && QRBitBuffer === void 0 ? (_reportPossibleCrUseOfQRBitBuffer({
            error: Error()
          }), QRBitBuffer) : QRBitBuffer)();

          for (var i = 0; i < dataList.length; i++) {
            var data = dataList[i];
            buffer.put(data.mode, 4);
            buffer.put(data.getLength(), (_crd && QRUtil === void 0 ? (_reportPossibleCrUseOfQRUtil({
              error: Error()
            }), QRUtil) : QRUtil).getLengthInBits(data.mode, typeNumber));
            data.write(buffer);
          } // calc num max data.


          var totalDataCount = 0;

          for (var _i4 = 0; _i4 < rsBlocks.length; _i4++) {
            totalDataCount += rsBlocks[_i4].dataCount;
          }

          if (buffer.getLengthInBits() > totalDataCount * 8) {
            throw new Error('code length overflow. (' + buffer.getLengthInBits() + '>' + totalDataCount * 8 + ')');
          } // end code


          if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
            buffer.put(0, 4);
          } // padding


          while (buffer.getLengthInBits() % 8 !== 0) {
            buffer.putBit(false);
          } // padding


          while (true) {
            if (buffer.getLengthInBits() >= totalDataCount * 8) {
              break;
            }

            buffer.put(QRCode.PAD0, 8);

            if (buffer.getLengthInBits() >= totalDataCount * 8) {
              break;
            }

            buffer.put(QRCode.PAD1, 8);
          }

          return QRCode.createBytes(buffer, rsBlocks);
        }

        static createBytes(buffer, rsBlocks) {
          var offset = 0;
          var maxDcCount = 0;
          var maxEcCount = 0;
          var dcdata = new Array(rsBlocks.length);
          var ecdata = new Array(rsBlocks.length);

          for (var r = 0; r < rsBlocks.length; r++) {
            var dcCount = rsBlocks[r].dataCount;
            var ecCount = rsBlocks[r].totalCount - dcCount;
            maxDcCount = Math.max(maxDcCount, dcCount);
            maxEcCount = Math.max(maxEcCount, ecCount);
            dcdata[r] = new Array(dcCount);

            for (var i = 0; i < dcdata[r].length; i++) {
              dcdata[r][i] = 0xff & buffer.buffer[i + offset];
            }

            offset += dcCount;
            var rsPoly = (_crd && QRUtil === void 0 ? (_reportPossibleCrUseOfQRUtil({
              error: Error()
            }), QRUtil) : QRUtil).getErrorCorrectPolynomial(ecCount);
            var rawPoly = new (_crd && QRPolynomial === void 0 ? (_reportPossibleCrUseOfQRPolynomial({
              error: Error()
            }), QRPolynomial) : QRPolynomial)(dcdata[r], rsPoly.getLength() - 1);
            var modPoly = rawPoly.mod(rsPoly);
            ecdata[r] = new Array(rsPoly.getLength() - 1);

            for (var _i5 = 0; _i5 < ecdata[r].length; _i5++) {
              var modIndex = _i5 + modPoly.getLength() - ecdata[r].length;
              ecdata[r][_i5] = modIndex >= 0 ? modPoly.get(modIndex) : 0;
            }
          }

          var totalCodeCount = 0;

          for (var _i6 = 0; _i6 < rsBlocks.length; _i6++) {
            totalCodeCount += rsBlocks[_i6].totalCount;
          }

          var data = new Array(totalCodeCount);
          var index = 0;

          for (var _i7 = 0; _i7 < maxDcCount; _i7++) {
            for (var _r = 0; _r < rsBlocks.length; _r++) {
              if (_i7 < dcdata[_r].length) {
                data[index++] = dcdata[_r][_i7];
              }
            }
          }

          for (var _i8 = 0; _i8 < maxEcCount; _i8++) {
            for (var _r2 = 0; _r2 < rsBlocks.length; _r2++) {
              if (_i8 < ecdata[_r2].length) {
                data[index++] = ecdata[_r2][_i8];
              }
            }
          }

          return data;
        }

        static createCanvas(options) {
          var opt = Object.assign({
            width: 256,
            height: 256,
            correctLevel: (_crd && QRErrorCorrectLevel === void 0 ? (_reportPossibleCrUseOfQRErrorCorrectLevel({
              error: Error()
            }), QRErrorCorrectLevel) : QRErrorCorrectLevel).H,
            background: '#ffffff',
            foreground: '#000000'
          }, options);
          var qrcode = new QRCode(-1, opt.correctLevel);
          qrcode.addData(opt.text);
          qrcode.make();
          var canvas = document.createElement('canvas');
          canvas.width = opt.width;
          canvas.height = opt.height;
          var ctx = canvas.getContext('2d');
          var tileW = opt.width / qrcode.getModuleCount();
          var tileH = opt.height / qrcode.getModuleCount();

          for (var row = 0; row < qrcode.getModuleCount(); row++) {
            for (var col = 0; col < qrcode.getModuleCount(); col++) {
              ctx.fillStyle = qrcode.isDark(row, col) ? opt.foreground : opt.background;
              var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
              var h = Math.ceil((row + 1) * tileH) - Math.floor(row * tileH);
              ctx.fillRect(Math.round(col * tileW), Math.round(row * tileH), w, h);
            }
          }

          return canvas;
        }

        static setCanvas(id, options) {
          var parent = document.getElementById(id);
          parent.innerHTML = '';
          parent.appendChild(QRCode.createCanvas(options));
        }

      });

      QRCode.PAD0 = 0xec;
      QRCode.PAD1 = 0x11;

      _cclegacy._RF.pop();

      _crd = false;
    }
  };
});
//# sourceMappingURL=275ed8379fce8cab999cb2639e75c900be3c7936.js.map