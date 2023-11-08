import { _decorator, Component, Node } from "cc";
import { QRCode, QRErrorCorrectLevel } from "./QRCode";
import * as cc from "cc";
const { ccclass, property } = _decorator;

@ccclass("test")
export class test extends Component {
  @property(cc.Node)
  ctxNode: Node;
  ctx: cc.Graphics;

  start() {
    this.ctx = this.ctxNode.getComponent(cc.Graphics);
    if (!this.ctx) {
      this.ctx = this.ctxNode.addComponent(cc.Graphics);
    }

    //我的qq链接
    this.QRCreate("https://qm.qq.com/q/z6T5CRZbfc&personal_qrcode_source=3");
  }

  //输入框 内容发生变化
  editBoxChange(data: String) {
    cc.log(data);
    this.QRCreate(data);
  }

  //绘制二维码
  QRCreate(url) {
    //根据QRCode来生成二维码数据
    var qrcode = new QRCode(-1, QRErrorCorrectLevel.H);
    qrcode.addData(url);
    qrcode.make();

    this.ctx.fillColor = cc.Color.BLACK;
    let roll = Math.floor(qrcode.getModuleCount());
    //块宽高
    var tileW = this.ctxNode.getComponent(cc.UITransform).width / roll;
    var tileH = this.ctxNode.getComponent(cc.UITransform).height / roll;
    this.ctx.clear();
    for (var row = 0; row < qrcode.getModuleCount(); row++) {
      for (var col = 0; col < qrcode.getModuleCount(); col++) {
        if (qrcode.isDark(row, col)) {
          var w = Math.ceil((col + 1) * tileW) - Math.floor(col * tileW);
          var h = Math.ceil((row + 1) * tileW) - Math.floor(row * tileW);
          let posx =
            Math.round(col * tileW) -
            this.ctxNode.getComponent(cc.UITransform).width / 2;
          let posy =
            Math.round(row * tileH) -
            this.ctxNode.getComponent(cc.UITransform).height / 2;

          this.ctx.rect(posx, posy, w, h);
          //颜色
          this.ctx.fillColor = cc.Color.WHITE;
          this.ctx.fill();
        }
      }
    }
  }

}
