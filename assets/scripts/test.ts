import { _decorator, Color, Component, Node } from "cc";
import * as cc from "cc";
import { QRErrorCorrectLevel } from "./QRcode/constants";
import { QRCode } from "./QRcode/QRCode";
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
  /**
   *
   * @param ctxNode 显示的节点
   * @param url 文本内容
   * @param Wcolor 白块颜色
   * @param Hcolor 黑块颜色
   */
  QRCreate(url, Wcolor = Color.WHITE, Hcolor = Color.BLACK) {
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
        if (qrcode.isDark(row, col)) {
          this.ctx.fillColor = Hcolor;
        } else {
          this.ctx.fillColor = Wcolor;
        }
        this.ctx.fill();
      }
    }
  }
}
