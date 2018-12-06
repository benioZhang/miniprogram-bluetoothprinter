const commands = require('commands');
const TextEncoder = require('text-encoding/index').TextEncoder;

const printerJobs = function () {
  this._queue = [commands.HARDWARE.HW_INIT];
  this._encoder = new TextEncoder("gb2312", {NONSTANDARD_allowLegacyEncoding: true});
};

/**
 * 打印文字
 * @param  {string} content  文字内容
 */
printerJobs.prototype.print = function (content) {
  if (content) {
    let uint8Array = this._encoder.encode(content);
    let encoded = Array.from(uint8Array);
    this._queue.push.apply(this._queue, encoded);
  }
  this._queue.push(commands.LF);
  return this;
};

/**
 * 打印文字并换行
 * @param  {string}  content  文字内容
 */
printerJobs.prototype.println = function (content = '') {
  return this.print(content + commands.EOL);
};

/**
 * 设置对齐方式
 * @param {string} align 对齐方式 LT/CT/RT
 */
printerJobs.prototype.setAlign = function (align) {
  this._queue.push.apply(this._queue, commands.TEXT_FORMAT['TXT_ALIGN_' + align.toUpperCase()]);
  return this;
};

/**
 * 设置字体
 * @param  {string} family A/B/C
 */
printerJobs.prototype.setFont = function (family) {
  this._queue.push.apply(this._queue, commands.TEXT_FORMAT['TXT_FONT_' + family.toUpperCase()]);
  return this;
};

/**
 * 设定字体尺寸
 * @param  {int} width 字体宽度 1~2
 * @param  {int} height 字体高度 1~2
 */
printerJobs.prototype.setSize = function (width, height) {
  if (2 >= width && 2 >= height) {
    this._queue.push.apply(this._queue, commands.TEXT_FORMAT.TXT_NORMAL);
    if (2 === width && 2 === height) {
      this._queue.push.apply(this._queue, commands.TEXT_FORMAT.TXT_4SQUARE);
    } else if (1 === width && 2 === height) {
      this._queue.push.apply(this._queue, commands.TEXT_FORMAT.TXT_2HEIGHT);
    } else if (2 === width && 1 === height) {
      this._queue.push.apply(this._queue, commands.TEXT_FORMAT.TXT_2WIDTH);
    }
  }
  return this;
};

/**
 * 设定字体是否加粗
 * @param  {boolean} bold
 */
printerJobs.prototype.setBold = function (bold) {
  if (typeof bold !== 'boolean') {
    bold = true;
  }
  this._queue.push.apply(this._queue, bold ? commands.TEXT_FORMAT.TXT_BOLD_ON : commands.TEXT_FORMAT.TXT_BOLD_OFF);
  return this;
};

/**
 * 设定是否开启下划线
 * @param  {boolean} underline
 */
printerJobs.prototype.setUnderline = function (underline) {
  if (typeof underline !== 'boolean') {
    underline = true;
  }
  this._queue.push.apply(this._queue, underline ? commands.TEXT_FORMAT.TXT_UNDERL_ON : commands.TEXT_FORMAT.TXT_UNDERL_OFF);
  return this;
};
/**
 * 返回ArrayBuffer
 */
printerJobs.prototype.buffer = function () {
  return new Uint8Array(this._queue).buffer;
};

module.exports = printerJobs;