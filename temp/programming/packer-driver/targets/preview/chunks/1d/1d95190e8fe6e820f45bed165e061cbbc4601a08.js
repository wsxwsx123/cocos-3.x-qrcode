System.register(["__unresolved_0"], function (_export, _context) {
  "use strict";

  var _cjsLoader, _cjsExports, __cjsMetaURL;

  _export("default", void 0);

  return {
    setters: [function (_unresolved_) {
      _cjsLoader = _unresolved_.default;
    }],
    execute: function () {
      _export("__cjsMetaURL", __cjsMetaURL = _context.meta.url);

      _cjsLoader.define(__cjsMetaURL, function (exports, require, module, __filename, __dirname) {
        // #region ORIGINAL CODE
        //---------------------------------------------------------------------
        // QRCode for JavaScript
        //
        // Copyright (c) 2009 Kazuhiko Arase
        //
        // URL: http://www.d-project.com/
        //
        // Licensed under the MIT license:
        //   http://www.opensource.org/licenses/mit-license.php
        //
        // The word "QR Code" is registered trademark of 
        // DENSO WAVE INCORPORATED
        //   http://www.denso-wave.com/qrcode/faqpatent-e.html
        //
        //---------------------------------------------------------------------
        //---------------------------------------------------------------------
        // QR8bitByte
        //---------------------------------------------------------------------
        function QR8bitByte(data) {
          this.mode = QRMode.MODE_8BIT_BYTE;
          this.data = data;
        }

        QR8bitByte.prototype = {
          getLength: function getLength(buffer) {
            return this.data.length;
          },
          write: function write(buffer) {
            for (var i = 0; i < this.data.length; i++) {
              // not JIS ...
              buffer.put(this.data.charCodeAt(i), 8);
            }
          }
        }; //---------------------------------------------------------------------
        // QRCode
        //---------------------------------------------------------------------

        var QRCode = function QRCode(typeNumber, errorCorrectLevel) {
          this.typeNumber = typeNumber;
          this.errorCorrectLevel = errorCorrectLevel;
          this.modules = null;
          this.moduleCount = 0;
          this.dataCache = null;
          this.dataList = new Array();
        };

        QRCode.prototype = {
          addData: function addData(data) {
            var newData = new QR8bitByte(data);
            this.dataList.push(newData);
            this.dataCache = null;
          },
          isDark: function isDark(row, col) {
            if (row < 0 || this.moduleCount <= row || col < 0 || this.moduleCount <= col) {
              throw new Error(row + "," + col);
            }

            return this.modules[row][col];
          },
          getModuleCount: function getModuleCount() {
            return this.moduleCount;
          },
          make: function make() {
            // Calculate automatically typeNumber if provided is < 1
            if (this.typeNumber < 1) {
              var typeNumber = 1;

              for (typeNumber = 1; typeNumber < 40; typeNumber++) {
                var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, this.errorCorrectLevel);
                var buffer = new QRBitBuffer();
                var totalDataCount = 0;

                for (var i = 0; i < rsBlocks.length; i++) {
                  totalDataCount += rsBlocks[i].dataCount;
                }

                for (var _i = 0; _i < this.dataList.length; _i++) {
                  var data = this.dataList[_i];
                  buffer.put(data.mode, 4);
                  buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
                  data.write(buffer);
                }

                if (buffer.getLengthInBits() <= totalDataCount * 8) break;
              }

              this.typeNumber = typeNumber;
            }

            this.makeImpl(false, this.getBestMaskPattern());
          },
          makeImpl: function makeImpl(test, maskPattern) {
            this.moduleCount = this.typeNumber * 4 + 17;
            this.modules = new Array(this.moduleCount);

            for (var row = 0; row < this.moduleCount; row++) {
              this.modules[row] = new Array(this.moduleCount);

              for (var col = 0; col < this.moduleCount; col++) {
                this.modules[row][col] = null; //(col + row) % 3;
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
          },
          setupPositionProbePattern: function setupPositionProbePattern(row, col) {
            for (var r = -1; r <= 7; r++) {
              if (row + r <= -1 || this.moduleCount <= row + r) continue;

              for (var c = -1; c <= 7; c++) {
                if (col + c <= -1 || this.moduleCount <= col + c) continue;

                if (0 <= r && r <= 6 && (c == 0 || c == 6) || 0 <= c && c <= 6 && (r == 0 || r == 6) || 2 <= r && r <= 4 && 2 <= c && c <= 4) {
                  this.modules[row + r][col + c] = true;
                } else {
                  this.modules[row + r][col + c] = false;
                }
              }
            }
          },
          getBestMaskPattern: function getBestMaskPattern() {
            var minLostPoint = 0;
            var pattern = 0;

            for (var i = 0; i < 8; i++) {
              this.makeImpl(true, i);
              var lostPoint = QRUtil.getLostPoint(this);

              if (i == 0 || minLostPoint > lostPoint) {
                minLostPoint = lostPoint;
                pattern = i;
              }
            }

            return pattern;
          },
          createMovieClip: function createMovieClip(target_mc, instance_name, depth) {
            var qr_mc = target_mc.createEmptyMovieClip(instance_name, depth);
            var cs = 1;
            this.make();

            for (var row = 0; row < this.modules.length; row++) {
              var y = row * cs;

              for (var col = 0; col < this.modules[row].length; col++) {
                var x = col * cs;
                var dark = this.modules[row][col];

                if (dark) {
                  qr_mc.beginFill(0, 100);
                  qr_mc.moveTo(x, y);
                  qr_mc.lineTo(x + cs, y);
                  qr_mc.lineTo(x + cs, y + cs);
                  qr_mc.lineTo(x, y + cs);
                  qr_mc.endFill();
                }
              }
            }

            return qr_mc;
          },
          setupTimingPattern: function setupTimingPattern() {
            for (var r = 8; r < this.moduleCount - 8; r++) {
              if (this.modules[r][6] != null) {
                continue;
              }

              this.modules[r][6] = r % 2 == 0;
            }

            for (var c = 8; c < this.moduleCount - 8; c++) {
              if (this.modules[6][c] != null) {
                continue;
              }

              this.modules[6][c] = c % 2 == 0;
            }
          },
          setupPositionAdjustPattern: function setupPositionAdjustPattern() {
            var pos = QRUtil.getPatternPosition(this.typeNumber);

            for (var i = 0; i < pos.length; i++) {
              for (var j = 0; j < pos.length; j++) {
                var row = pos[i];
                var col = pos[j];

                if (this.modules[row][col] != null) {
                  continue;
                }

                for (var r = -2; r <= 2; r++) {
                  for (var c = -2; c <= 2; c++) {
                    if (r == -2 || r == 2 || c == -2 || c == 2 || r == 0 && c == 0) {
                      this.modules[row + r][col + c] = true;
                    } else {
                      this.modules[row + r][col + c] = false;
                    }
                  }
                }
              }
            }
          },
          setupTypeNumber: function setupTypeNumber(test) {
            var bits = QRUtil.getBCHTypeNumber(this.typeNumber);

            for (var i = 0; i < 18; i++) {
              var mod = !test && (bits >> i & 1) == 1;
              this.modules[Math.floor(i / 3)][i % 3 + this.moduleCount - 8 - 3] = mod;
            }

            for (var _i2 = 0; _i2 < 18; _i2++) {
              var _mod = !test && (bits >> _i2 & 1) == 1;

              this.modules[_i2 % 3 + this.moduleCount - 8 - 3][Math.floor(_i2 / 3)] = _mod;
            }
          },
          setupTypeInfo: function setupTypeInfo(test, maskPattern) {
            var data = this.errorCorrectLevel << 3 | maskPattern;
            var bits = QRUtil.getBCHTypeInfo(data); // vertical		

            for (var i = 0; i < 15; i++) {
              var mod = !test && (bits >> i & 1) == 1;

              if (i < 6) {
                this.modules[i][8] = mod;
              } else if (i < 8) {
                this.modules[i + 1][8] = mod;
              } else {
                this.modules[this.moduleCount - 15 + i][8] = mod;
              }
            } // horizontal


            for (var _i3 = 0; _i3 < 15; _i3++) {
              var _mod2 = !test && (bits >> _i3 & 1) == 1;

              if (_i3 < 8) {
                this.modules[8][this.moduleCount - _i3 - 1] = _mod2;
              } else if (_i3 < 9) {
                this.modules[8][15 - _i3 - 1 + 1] = _mod2;
              } else {
                this.modules[8][15 - _i3 - 1] = _mod2;
              }
            } // fixed module


            this.modules[this.moduleCount - 8][8] = !test;
          },
          mapData: function mapData(data, maskPattern) {
            var inc = -1;
            var row = this.moduleCount - 1;
            var bitIndex = 7;
            var byteIndex = 0;

            for (var col = this.moduleCount - 1; col > 0; col -= 2) {
              if (col == 6) col--;

              while (true) {
                for (var c = 0; c < 2; c++) {
                  if (this.modules[row][col - c] == null) {
                    var dark = false;

                    if (byteIndex < data.length) {
                      dark = (data[byteIndex] >>> bitIndex & 1) == 1;
                    }

                    var mask = QRUtil.getMask(maskPattern, row, col - c);

                    if (mask) {
                      dark = !dark;
                    }

                    this.modules[row][col - c] = dark;
                    bitIndex--;

                    if (bitIndex == -1) {
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
        };
        QRCode.PAD0 = 0xEC;
        QRCode.PAD1 = 0x11;

        QRCode.createData = function (typeNumber, errorCorrectLevel, dataList) {
          var rsBlocks = QRRSBlock.getRSBlocks(typeNumber, errorCorrectLevel);
          var buffer = new QRBitBuffer();

          for (var i = 0; i < dataList.length; i++) {
            var data = dataList[i];
            buffer.put(data.mode, 4);
            buffer.put(data.getLength(), QRUtil.getLengthInBits(data.mode, typeNumber));
            data.write(buffer);
          } // calc num max data.


          var totalDataCount = 0;

          for (var _i4 = 0; _i4 < rsBlocks.length; _i4++) {
            totalDataCount += rsBlocks[_i4].dataCount;
          }

          if (buffer.getLengthInBits() > totalDataCount * 8) {
            throw new Error("code length overflow. (" + buffer.getLengthInBits() + ">" + totalDataCount * 8 + ")");
          } // end code


          if (buffer.getLengthInBits() + 4 <= totalDataCount * 8) {
            buffer.put(0, 4);
          } // padding


          while (buffer.getLengthInBits() % 8 != 0) {
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
        };

        QRCode.createBytes = function (buffer, rsBlocks) {
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
            var rsPoly = QRUtil.getErrorCorrectPolynomial(ecCount);
            var rawPoly = new QRPolynomial(dcdata[r], rsPoly.getLength() - 1);
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
        }; //---------------------------------------------------------------------
        // QRMode
        //---------------------------------------------------------------------


        var QRMode = {
          MODE_NUMBER: 1 << 0,
          MODE_ALPHA_NUM: 1 << 1,
          MODE_8BIT_BYTE: 1 << 2,
          MODE_KANJI: 1 << 3
        }; //---------------------------------------------------------------------
        // QRErrorCorrectLevel
        //---------------------------------------------------------------------

        var QRErrorCorrectLevel = {
          L: 1,
          M: 0,
          Q: 3,
          H: 2
        }; //---------------------------------------------------------------------
        // QRMaskPattern
        //---------------------------------------------------------------------

        var QRMaskPattern = {
          PATTERN000: 0,
          PATTERN001: 1,
          PATTERN010: 2,
          PATTERN011: 3,
          PATTERN100: 4,
          PATTERN101: 5,
          PATTERN110: 6,
          PATTERN111: 7
        }; //---------------------------------------------------------------------
        // QRUtil
        //---------------------------------------------------------------------

        var QRUtil = {
          PATTERN_POSITION_TABLE: [[], [6, 18], [6, 22], [6, 26], [6, 30], [6, 34], [6, 22, 38], [6, 24, 42], [6, 26, 46], [6, 28, 50], [6, 30, 54], [6, 32, 58], [6, 34, 62], [6, 26, 46, 66], [6, 26, 48, 70], [6, 26, 50, 74], [6, 30, 54, 78], [6, 30, 56, 82], [6, 30, 58, 86], [6, 34, 62, 90], [6, 28, 50, 72, 94], [6, 26, 50, 74, 98], [6, 30, 54, 78, 102], [6, 28, 54, 80, 106], [6, 32, 58, 84, 110], [6, 30, 58, 86, 114], [6, 34, 62, 90, 118], [6, 26, 50, 74, 98, 122], [6, 30, 54, 78, 102, 126], [6, 26, 52, 78, 104, 130], [6, 30, 56, 82, 108, 134], [6, 34, 60, 86, 112, 138], [6, 30, 58, 86, 114, 142], [6, 34, 62, 90, 118, 146], [6, 30, 54, 78, 102, 126, 150], [6, 24, 50, 76, 102, 128, 154], [6, 28, 54, 80, 106, 132, 158], [6, 32, 58, 84, 110, 136, 162], [6, 26, 54, 82, 110, 138, 166], [6, 30, 58, 86, 114, 142, 170]],
          G15: 1 << 10 | 1 << 8 | 1 << 5 | 1 << 4 | 1 << 2 | 1 << 1 | 1 << 0,
          G18: 1 << 12 | 1 << 11 | 1 << 10 | 1 << 9 | 1 << 8 | 1 << 5 | 1 << 2 | 1 << 0,
          G15_MASK: 1 << 14 | 1 << 12 | 1 << 10 | 1 << 4 | 1 << 1,
          getBCHTypeInfo: function getBCHTypeInfo(data) {
            var d = data << 10;

            while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15) >= 0) {
              d ^= QRUtil.G15 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G15);
            }

            return (data << 10 | d) ^ QRUtil.G15_MASK;
          },
          getBCHTypeNumber: function getBCHTypeNumber(data) {
            var d = data << 12;

            while (QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18) >= 0) {
              d ^= QRUtil.G18 << QRUtil.getBCHDigit(d) - QRUtil.getBCHDigit(QRUtil.G18);
            }

            return data << 12 | d;
          },
          getBCHDigit: function getBCHDigit(data) {
            var digit = 0;

            while (data != 0) {
              digit++;
              data >>>= 1;
            }

            return digit;
          },
          getPatternPosition: function getPatternPosition(typeNumber) {
            return QRUtil.PATTERN_POSITION_TABLE[typeNumber - 1];
          },
          getMask: function getMask(maskPattern, i, j) {
            switch (maskPattern) {
              case QRMaskPattern.PATTERN000:
                return (i + j) % 2 == 0;

              case QRMaskPattern.PATTERN001:
                return i % 2 == 0;

              case QRMaskPattern.PATTERN010:
                return j % 3 == 0;

              case QRMaskPattern.PATTERN011:
                return (i + j) % 3 == 0;

              case QRMaskPattern.PATTERN100:
                return (Math.floor(i / 2) + Math.floor(j / 3)) % 2 == 0;

              case QRMaskPattern.PATTERN101:
                return i * j % 2 + i * j % 3 == 0;

              case QRMaskPattern.PATTERN110:
                return (i * j % 2 + i * j % 3) % 2 == 0;

              case QRMaskPattern.PATTERN111:
                return (i * j % 3 + (i + j) % 2) % 2 == 0;

              default:
                throw new Error("bad maskPattern:" + maskPattern);
            }
          },
          getErrorCorrectPolynomial: function getErrorCorrectPolynomial(errorCorrectLength) {
            var a = new QRPolynomial([1], 0);

            for (var i = 0; i < errorCorrectLength; i++) {
              a = a.multiply(new QRPolynomial([1, QRMath.gexp(i)], 0));
            }

            return a;
          },
          getLengthInBits: function getLengthInBits(mode, type) {
            if (1 <= type && type < 10) {
              // 1 - 9
              switch (mode) {
                case QRMode.MODE_NUMBER:
                  return 10;

                case QRMode.MODE_ALPHA_NUM:
                  return 9;

                case QRMode.MODE_8BIT_BYTE:
                  return 8;

                case QRMode.MODE_KANJI:
                  return 8;

                default:
                  throw new Error("mode:" + mode);
              }
            } else if (type < 27) {
              // 10 - 26
              switch (mode) {
                case QRMode.MODE_NUMBER:
                  return 12;

                case QRMode.MODE_ALPHA_NUM:
                  return 11;

                case QRMode.MODE_8BIT_BYTE:
                  return 16;

                case QRMode.MODE_KANJI:
                  return 10;

                default:
                  throw new Error("mode:" + mode);
              }
            } else if (type < 41) {
              // 27 - 40
              switch (mode) {
                case QRMode.MODE_NUMBER:
                  return 14;

                case QRMode.MODE_ALPHA_NUM:
                  return 13;

                case QRMode.MODE_8BIT_BYTE:
                  return 16;

                case QRMode.MODE_KANJI:
                  return 12;

                default:
                  throw new Error("mode:" + mode);
              }
            } else {
              throw new Error("type:" + type);
            }
          },
          getLostPoint: function getLostPoint(qrCode) {
            var moduleCount = qrCode.getModuleCount();
            var lostPoint = 0; // LEVEL1

            for (var row = 0; row < moduleCount; row++) {
              for (var col = 0; col < moduleCount; col++) {
                var sameCount = 0;
                var dark = qrCode.isDark(row, col);

                for (var r = -1; r <= 1; r++) {
                  if (row + r < 0 || moduleCount <= row + r) {
                    continue;
                  }

                  for (var c = -1; c <= 1; c++) {
                    if (col + c < 0 || moduleCount <= col + c) {
                      continue;
                    }

                    if (r == 0 && c == 0) {
                      continue;
                    }

                    if (dark == qrCode.isDark(row + r, col + c)) {
                      sameCount++;
                    }
                  }
                }

                if (sameCount > 5) {
                  lostPoint += 3 + sameCount - 5;
                }
              }
            } // LEVEL2


            for (var _row = 0; _row < moduleCount - 1; _row++) {
              for (var _col = 0; _col < moduleCount - 1; _col++) {
                var count = 0;
                if (qrCode.isDark(_row, _col)) count++;
                if (qrCode.isDark(_row + 1, _col)) count++;
                if (qrCode.isDark(_row, _col + 1)) count++;
                if (qrCode.isDark(_row + 1, _col + 1)) count++;

                if (count == 0 || count == 4) {
                  lostPoint += 3;
                }
              }
            } // LEVEL3


            for (var _row2 = 0; _row2 < moduleCount; _row2++) {
              for (var _col2 = 0; _col2 < moduleCount - 6; _col2++) {
                if (qrCode.isDark(_row2, _col2) && !qrCode.isDark(_row2, _col2 + 1) && qrCode.isDark(_row2, _col2 + 2) && qrCode.isDark(_row2, _col2 + 3) && qrCode.isDark(_row2, _col2 + 4) && !qrCode.isDark(_row2, _col2 + 5) && qrCode.isDark(_row2, _col2 + 6)) {
                  lostPoint += 40;
                }
              }
            }

            for (var _col3 = 0; _col3 < moduleCount; _col3++) {
              for (var _row3 = 0; _row3 < moduleCount - 6; _row3++) {
                if (qrCode.isDark(_row3, _col3) && !qrCode.isDark(_row3 + 1, _col3) && qrCode.isDark(_row3 + 2, _col3) && qrCode.isDark(_row3 + 3, _col3) && qrCode.isDark(_row3 + 4, _col3) && !qrCode.isDark(_row3 + 5, _col3) && qrCode.isDark(_row3 + 6, _col3)) {
                  lostPoint += 40;
                }
              }
            } // LEVEL4


            var darkCount = 0;

            for (var _col4 = 0; _col4 < moduleCount; _col4++) {
              for (var _row4 = 0; _row4 < moduleCount; _row4++) {
                if (qrCode.isDark(_row4, _col4)) {
                  darkCount++;
                }
              }
            }

            var ratio = Math.abs(100 * darkCount / moduleCount / moduleCount - 50) / 5;
            lostPoint += ratio * 10;
            return lostPoint;
          }
        }; //---------------------------------------------------------------------
        // QRMath
        //---------------------------------------------------------------------

        var QRMath = {
          glog: function glog(n) {
            if (n < 1) {
              throw new Error("glog(" + n + ")");
            }

            return QRMath.LOG_TABLE[n];
          },
          gexp: function gexp(n) {
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
        };

        for (var i = 0; i < 8; i++) {
          QRMath.EXP_TABLE[i] = 1 << i;
        }

        for (var _i9 = 8; _i9 < 256; _i9++) {
          QRMath.EXP_TABLE[_i9] = QRMath.EXP_TABLE[_i9 - 4] ^ QRMath.EXP_TABLE[_i9 - 5] ^ QRMath.EXP_TABLE[_i9 - 6] ^ QRMath.EXP_TABLE[_i9 - 8];
        }

        for (var _i10 = 0; _i10 < 255; _i10++) {
          QRMath.LOG_TABLE[QRMath.EXP_TABLE[_i10]] = _i10;
        } //---------------------------------------------------------------------
        // QRPolynomial
        //---------------------------------------------------------------------


        function QRPolynomial(num, shift) {
          if (num.length == undefined) {
            throw new Error(num.length + "/" + shift);
          }

          var offset = 0;

          while (offset < num.length && num[offset] == 0) {
            offset++;
          }

          this.num = new Array(num.length - offset + shift);

          for (var _i11 = 0; _i11 < num.length - offset; _i11++) {
            this.num[_i11] = num[_i11 + offset];
          }
        }

        QRPolynomial.prototype = {
          get: function get(index) {
            return this.num[index];
          },
          getLength: function getLength() {
            return this.num.length;
          },
          multiply: function multiply(e) {
            var num = new Array(this.getLength() + e.getLength() - 1);

            for (var _i12 = 0; _i12 < this.getLength(); _i12++) {
              for (var j = 0; j < e.getLength(); j++) {
                num[_i12 + j] ^= QRMath.gexp(QRMath.glog(this.get(_i12)) + QRMath.glog(e.get(j)));
              }
            }

            return new QRPolynomial(num, 0);
          },
          mod: function mod(e) {
            if (this.getLength() - e.getLength() < 0) {
              return this;
            }

            var ratio = QRMath.glog(this.get(0)) - QRMath.glog(e.get(0));
            var num = new Array(this.getLength());

            for (var _i13 = 0; _i13 < this.getLength(); _i13++) {
              num[_i13] = this.get(_i13);
            }

            for (var _i14 = 0; _i14 < e.getLength(); _i14++) {
              num[_i14] ^= QRMath.gexp(QRMath.glog(e.get(_i14)) + ratio);
            } // recursive call


            return new QRPolynomial(num, 0).mod(e);
          }
        }; //---------------------------------------------------------------------
        // QRRSBlock
        //---------------------------------------------------------------------

        function QRRSBlock(totalCount, dataCount) {
          this.totalCount = totalCount;
          this.dataCount = dataCount;
        }

        QRRSBlock.RS_BLOCK_TABLE = [// L
        // M
        // Q
        // H
        // 1
        [1, 26, 19], [1, 26, 16], [1, 26, 13], [1, 26, 9], // 2
        [1, 44, 34], [1, 44, 28], [1, 44, 22], [1, 44, 16], // 3
        [1, 70, 55], [1, 70, 44], [2, 35, 17], [2, 35, 13], // 4		
        [1, 100, 80], [2, 50, 32], [2, 50, 24], [4, 25, 9], // 5
        [1, 134, 108], [2, 67, 43], [2, 33, 15, 2, 34, 16], [2, 33, 11, 2, 34, 12], // 6
        [2, 86, 68], [4, 43, 27], [4, 43, 19], [4, 43, 15], // 7		
        [2, 98, 78], [4, 49, 31], [2, 32, 14, 4, 33, 15], [4, 39, 13, 1, 40, 14], // 8
        [2, 121, 97], [2, 60, 38, 2, 61, 39], [4, 40, 18, 2, 41, 19], [4, 40, 14, 2, 41, 15], // 9
        [2, 146, 116], [3, 58, 36, 2, 59, 37], [4, 36, 16, 4, 37, 17], [4, 36, 12, 4, 37, 13], // 10		
        [2, 86, 68, 2, 87, 69], [4, 69, 43, 1, 70, 44], [6, 43, 19, 2, 44, 20], [6, 43, 15, 2, 44, 16], // 11
        [4, 101, 81], [1, 80, 50, 4, 81, 51], [4, 50, 22, 4, 51, 23], [3, 36, 12, 8, 37, 13], // 12
        [2, 116, 92, 2, 117, 93], [6, 58, 36, 2, 59, 37], [4, 46, 20, 6, 47, 21], [7, 42, 14, 4, 43, 15], // 13
        [4, 133, 107], [8, 59, 37, 1, 60, 38], [8, 44, 20, 4, 45, 21], [12, 33, 11, 4, 34, 12], // 14
        [3, 145, 115, 1, 146, 116], [4, 64, 40, 5, 65, 41], [11, 36, 16, 5, 37, 17], [11, 36, 12, 5, 37, 13], // 15
        [5, 109, 87, 1, 110, 88], [5, 65, 41, 5, 66, 42], [5, 54, 24, 7, 55, 25], [11, 36, 12], // 16
        [5, 122, 98, 1, 123, 99], [7, 73, 45, 3, 74, 46], [15, 43, 19, 2, 44, 20], [3, 45, 15, 13, 46, 16], // 17
        [1, 135, 107, 5, 136, 108], [10, 74, 46, 1, 75, 47], [1, 50, 22, 15, 51, 23], [2, 42, 14, 17, 43, 15], // 18
        [5, 150, 120, 1, 151, 121], [9, 69, 43, 4, 70, 44], [17, 50, 22, 1, 51, 23], [2, 42, 14, 19, 43, 15], // 19
        [3, 141, 113, 4, 142, 114], [3, 70, 44, 11, 71, 45], [17, 47, 21, 4, 48, 22], [9, 39, 13, 16, 40, 14], // 20
        [3, 135, 107, 5, 136, 108], [3, 67, 41, 13, 68, 42], [15, 54, 24, 5, 55, 25], [15, 43, 15, 10, 44, 16], // 21
        [4, 144, 116, 4, 145, 117], [17, 68, 42], [17, 50, 22, 6, 51, 23], [19, 46, 16, 6, 47, 17], // 22
        [2, 139, 111, 7, 140, 112], [17, 74, 46], [7, 54, 24, 16, 55, 25], [34, 37, 13], // 23
        [4, 151, 121, 5, 152, 122], [4, 75, 47, 14, 76, 48], [11, 54, 24, 14, 55, 25], [16, 45, 15, 14, 46, 16], // 24
        [6, 147, 117, 4, 148, 118], [6, 73, 45, 14, 74, 46], [11, 54, 24, 16, 55, 25], [30, 46, 16, 2, 47, 17], // 25
        [8, 132, 106, 4, 133, 107], [8, 75, 47, 13, 76, 48], [7, 54, 24, 22, 55, 25], [22, 45, 15, 13, 46, 16], // 26
        [10, 142, 114, 2, 143, 115], [19, 74, 46, 4, 75, 47], [28, 50, 22, 6, 51, 23], [33, 46, 16, 4, 47, 17], // 27
        [8, 152, 122, 4, 153, 123], [22, 73, 45, 3, 74, 46], [8, 53, 23, 26, 54, 24], [12, 45, 15, 28, 46, 16], // 28
        [3, 147, 117, 10, 148, 118], [3, 73, 45, 23, 74, 46], [4, 54, 24, 31, 55, 25], [11, 45, 15, 31, 46, 16], // 29
        [7, 146, 116, 7, 147, 117], [21, 73, 45, 7, 74, 46], [1, 53, 23, 37, 54, 24], [19, 45, 15, 26, 46, 16], // 30
        [5, 145, 115, 10, 146, 116], [19, 75, 47, 10, 76, 48], [15, 54, 24, 25, 55, 25], [23, 45, 15, 25, 46, 16], // 31
        [13, 145, 115, 3, 146, 116], [2, 74, 46, 29, 75, 47], [42, 54, 24, 1, 55, 25], [23, 45, 15, 28, 46, 16], // 32
        [17, 145, 115], [10, 74, 46, 23, 75, 47], [10, 54, 24, 35, 55, 25], [19, 45, 15, 35, 46, 16], // 33
        [17, 145, 115, 1, 146, 116], [14, 74, 46, 21, 75, 47], [29, 54, 24, 19, 55, 25], [11, 45, 15, 46, 46, 16], // 34
        [13, 145, 115, 6, 146, 116], [14, 74, 46, 23, 75, 47], [44, 54, 24, 7, 55, 25], [59, 46, 16, 1, 47, 17], // 35
        [12, 151, 121, 7, 152, 122], [12, 75, 47, 26, 76, 48], [39, 54, 24, 14, 55, 25], [22, 45, 15, 41, 46, 16], // 36
        [6, 151, 121, 14, 152, 122], [6, 75, 47, 34, 76, 48], [46, 54, 24, 10, 55, 25], [2, 45, 15, 64, 46, 16], // 37
        [17, 152, 122, 4, 153, 123], [29, 74, 46, 14, 75, 47], [49, 54, 24, 10, 55, 25], [24, 45, 15, 46, 46, 16], // 38
        [4, 152, 122, 18, 153, 123], [13, 74, 46, 32, 75, 47], [48, 54, 24, 14, 55, 25], [42, 45, 15, 32, 46, 16], // 39
        [20, 147, 117, 4, 148, 118], [40, 75, 47, 7, 76, 48], [43, 54, 24, 22, 55, 25], [10, 45, 15, 67, 46, 16], // 40
        [19, 148, 118, 6, 149, 119], [18, 75, 47, 31, 76, 48], [34, 54, 24, 34, 55, 25], [20, 45, 15, 61, 46, 16]];

        QRRSBlock.getRSBlocks = function (typeNumber, errorCorrectLevel) {
          var rsBlock = QRRSBlock.getRsBlockTable(typeNumber, errorCorrectLevel);

          if (rsBlock == undefined) {
            throw new Error("bad rs block @ typeNumber:" + typeNumber + "/errorCorrectLevel:" + errorCorrectLevel);
          }

          var length = rsBlock.length / 3;
          var list = new Array();

          for (var _i15 = 0; _i15 < length; _i15++) {
            var count = rsBlock[_i15 * 3 + 0];
            var totalCount = rsBlock[_i15 * 3 + 1];
            var dataCount = rsBlock[_i15 * 3 + 2];

            for (var j = 0; j < count; j++) {
              list.push(new QRRSBlock(totalCount, dataCount));
            }
          }

          return list;
        };

        QRRSBlock.getRsBlockTable = function (typeNumber, errorCorrectLevel) {
          switch (errorCorrectLevel) {
            case QRErrorCorrectLevel.L:
              return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 0];

            case QRErrorCorrectLevel.M:
              return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 1];

            case QRErrorCorrectLevel.Q:
              return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 2];

            case QRErrorCorrectLevel.H:
              return QRRSBlock.RS_BLOCK_TABLE[(typeNumber - 1) * 4 + 3];

            default:
              return undefined;
          }
        }; //---------------------------------------------------------------------
        // QRBitBuffer
        //---------------------------------------------------------------------


        function QRBitBuffer() {
          this.buffer = new Array();
          this.length = 0;
        }

        QRBitBuffer.prototype = {
          get: function get(index) {
            var bufIndex = Math.floor(index / 8);
            return (this.buffer[bufIndex] >>> 7 - index % 8 & 1) == 1;
          },
          put: function put(num, length) {
            for (var _i16 = 0; _i16 < length; _i16++) {
              this.putBit((num >>> length - _i16 - 1 & 1) == 1);
            }
          },
          getLengthInBits: function getLengthInBits() {
            return this.length;
          },
          putBit: function putBit(bit) {
            var bufIndex = Math.floor(this.length / 8);

            if (this.buffer.length <= bufIndex) {
              this.buffer.push(0);
            }

            if (bit) {
              this.buffer[bufIndex] |= 0x80 >>> this.length % 8;
            }

            this.length++;
          }
        };
        /**
         * 二维码组件
         */

        var CQRCode = cc.Class({
          extends: cc.Graphics,
          properties: {
            string: {
              default: 'Hello World!',

              notify(oldValue) {
                if (this.string === oldValue) {
                  return;
                }

                this.setContent();
              }

            },
            backColor: {
              type: cc.Color,
              default: cc.Color.WHITE,

              notify() {
                this.setContent();
              }

            },
            foreColor: {
              type: cc.Color,
              default: cc.Color.BLACK,

              notify(old) {
                this.node.color = this.foreColor;
                this.setContent();
              }

            },
            margin: {
              type: cc.Float,
              default: 10,

              notify(old) {
                if (old === this.margin) {
                  return;
                }

                this.setContent();
              }

            },
            _size: 200,
            size: {
              type: cc.Float,

              get() {
                return this._size;
              },

              set(value) {
                if (this._size === value) {
                  return;
                }

                this.node.setContentSize(value, value);
                this.setContent();
                this._size = value;
              }

            }
          },

          onLoad() {
            this.node.setContentSize(this._size, this._size);
            this.setContent();
          },

          setContent() {
            this.clear(); //背景色

            this.fillColor = this.backColor;
            var width = this.node.width;
            var offsetX = -width * this.node.anchorX;
            var offsetY = -width * this.node.anchorY;
            this.rect(offsetX, offsetY, width, width);
            this.fill();
            this.close(); //生成二维码数据

            var qrcode = new QRCode(-1, 2);
            qrcode.addData(this.string);
            qrcode.make();
            this.fillColor = this.foreColor;
            var size = width - this.margin * 2;
            var num = qrcode.getModuleCount();
            var tileW = size / num;
            var tileH = size / num;
            var w = Math.ceil(tileW);
            var h = Math.ceil(tileH);

            for (var row = 0; row < num; row++) {
              for (var col = 0; col < num; col++) {
                if (qrcode.isDark(row, col)) {
                  this.rect(offsetX + this.margin + col * tileW, offsetX + size - tileH - Math.round(row * tileH) + this.margin, w, h);
                  this.fill();
                }
              }
            }
          }

        });
        cc.Class.Attr.setClassAttr(CQRCode, 'lineWidth', 'visible', false);
        cc.Class.Attr.setClassAttr(CQRCode, 'lineJoin', 'visible', false);
        cc.Class.Attr.setClassAttr(CQRCode, 'lineCap', 'visible', false);
        cc.Class.Attr.setClassAttr(CQRCode, 'strokeColor', 'visible', false);
        cc.Class.Attr.setClassAttr(CQRCode, 'miterLimit', 'visible', false);
        cc.Class.Attr.setClassAttr(CQRCode, 'fillColor', 'visible', false);
        module.exports = CQRCode; // #endregion ORIGINAL CODE

        _export("default", _cjsExports = module.exports);
      }, {});
    }
  };
});
//# sourceMappingURL=1d95190e8fe6e820f45bed165e061cbbc4601a08.js.map