/**
 * 修改自https://github.com/song940/node-escpos/blob/master/commands.js
 * ESC/POS _ (Constants)
 */
var _ = {
  LF: [0x0a],
  FS: [0x1c],
  FF: [0x0c],
  GS: [0x1d],
  DLE: [0x10],
  EOT: [0x04],
  NUL: [0x00],
  ESC: [0x1b],
  EOL: '\n',
};

/**
 * [FEED_CONTROL_SEQUENCES Feed control sequences]
 * @type {Object}
 */
_.FEED_CONTROL_SEQUENCES = {
  CTL_LF: [0x0a],   // Print and line feed
  CTL_GLF: [0x4a, 0x00],   // Print and feed paper (without spaces between lines)
  CTL_FF: [0x0c],   // Form feed
  CTL_CR: [0x0d],   // Carriage return
  CTL_HT: [0x09],   // Horizontal tab
  CTL_VT: [0x0b],   // Vertical tab
};

_.CHARACTER_SPACING = {
  CS_DEFAULT: [0x1b, 0x20, 0x00],
  CS_SET: [0x1b, 0x20]
};

_.LINE_SPACING = {
  LS_DEFAULT: [0x1b, 0x32],
  LS_SET: [0x1b, 0x33]
};

/**
 * [HARDWARE Printer hardware]
 * @type {Object}
 */
_.HARDWARE = {
  HW_INIT: [0x1b, 0x40], // Clear data in buffer and reset modes
  HW_SELECT: [0x1b, 0x3d, 0x01], // Printer select
  HW_RESET: [0x1b, 0x3f, 0x0a, 0x00], // Reset printer hardware
};

/**
 * [CASH_DRAWER Cash Drawer]
 * @type {Object}
 */
_.CASH_DRAWER = {
  CD_KICK_2: [0x1b, 0x70, 0x00], // Sends a pulse to pin 2 []
  CD_KICK_5: [0x1b, 0x70, 0x01], // Sends a pulse to pin 5 []
};

/**
 * [MARGINS Margins sizes]
 * @type {Object}
 */
_.MARGINS = {
  BOTTOM: [0x1b, 0x4f], // Fix bottom size
  LEFT: [0x1b, 0x6c], // Fix left size
  RIGHT: [0x1b, 0x51], // Fix right size
};

/**
 * [PAPER Paper]
 * @type {Object}
 */
_.PAPER = {
  PAPER_FULL_CUT: [0x1d, 0x56, 0x00], // Full cut paper
  PAPER_PART_CUT: [0x1d, 0x56, 0x01], // Partial cut paper
  PAPER_CUT_A: [0x1d, 0x56, 0x41], // Partial cut paper
  PAPER_CUT_B: [0x1d, 0x56, 0x42], // Partial cut paper
};

/**
 * [TEXT_FORMAT Text format]
 * @type {Object}
 */
_.TEXT_FORMAT = {
  TXT_NORMAL: [0x1b, 0x21, 0x00], // Normal text
  TXT_2HEIGHT: [0x1b, 0x21, 0x10], // Double height text
  TXT_2WIDTH: [0x1b, 0x21, 0x20], // Double width text
  TXT_4SQUARE: [0x1b, 0x21, 0x30], // Double width & height text

  TXT_UNDERL_OFF: [0x1b, 0x2d, 0x00], // Underline font OFF
  TXT_UNDERL_ON: [0x1b, 0x2d, 0x01], // Underline font 1-dot ON
  TXT_UNDERL2_ON: [0x1b, 0x2d, 0x02], // Underline font 2-dot ON
  TXT_BOLD_OFF: [0x1b, 0x45, 0x00], // Bold font OFF
  TXT_BOLD_ON: [0x1b, 0x45, 0x01], // Bold font ON
  TXT_ITALIC_OFF: [0x1b, 0x35], // Italic font ON
  TXT_ITALIC_ON: [0x1b, 0x34], // Italic font ON

  TXT_FONT_A: [0x1b, 0x4d, 0x00], // Font type A
  TXT_FONT_B: [0x1b, 0x4d, 0x01], // Font type B
  TXT_FONT_C: [0x1b, 0x4d, 0x02], // Font type C

  TXT_ALIGN_LT: [0x1b, 0x61, 0x00], // Left justification
  TXT_ALIGN_CT: [0x1b, 0x61, 0x01], // Centering
  TXT_ALIGN_RT: [0x1b, 0x61, 0x02], // Right justification
};

/**
 * [BARCODE_FORMAT Barcode format]
 * @type {Object}
 */
_.BARCODE_FORMAT = {
  BARCODE_TXT_OFF: [0x1d, 0x48, 0x00], // HRI barcode chars OFF
  BARCODE_TXT_ABV: [0x1d, 0x48, 0x01], // HRI barcode chars above
  BARCODE_TXT_BLW: [0x1d, 0x48, 0x02], // HRI barcode chars below
  BARCODE_TXT_BTH: [0x1d, 0x48, 0x03], // HRI barcode chars both above and below

  BARCODE_FONT_A: [0x1d, 0x66, 0x00], // Font type A for HRI barcode chars
  BARCODE_FONT_B: [0x1d, 0x66, 0x01], // Font type B for HRI barcode chars

  BARCODE_HEIGHT: function (height) { // Barcode Height [1-255]
    return [0x1d, 0x68, height];
  },
  BARCODE_WIDTH: function (width) {   // Barcode Width  [2-6]
    return [0x1d, 0x77, width];
  },
  BARCODE_HEIGHT_DEFAULT: [0x1d, 0x68, 0x64], // Barcode height default:100
  BARCODE_WIDTH_DEFAULT: [0x1d, 0x77, 0x01], // Barcode width default:1

  BARCODE_UPC_A: [0x1d, 0x6b, 0x00], // Barcode type UPC-A
  BARCODE_UPC_E: [0x1d, 0x6b, 0x01], // Barcode type UPC-E
  BARCODE_EAN13: [0x1d, 0x6b, 0x02], // Barcode type EAN13
  BARCODE_EAN8: [0x1d, 0x6b, 0x03], // Barcode type EAN8
  BARCODE_CODE39: [0x1d, 0x6b, 0x04], // Barcode type CODE39
  BARCODE_ITF: [0x1d, 0x6b, 0x05], // Barcode type ITF
  BARCODE_NW7: [0x1d, 0x6b, 0x06], // Barcode type NW7
  BARCODE_CODE93: [0x1d, 0x6b, 0x48], // Barcode type CODE93
  BARCODE_CODE128: [0x1d, 0x6b, 0x49], // Barcode type CODE128
};

/**
 * [IMAGE_FORMAT Image format]
 * @type {Object}
 */
_.IMAGE_FORMAT = {
  S_RASTER_N: [0x1d, 0x76, 0x30, 0x00], // Set raster image normal size
  S_RASTER_2W: [0x1d, 0x76, 0x30, 0x01], // Set raster image double width
  S_RASTER_2H: [0x1d, 0x76, 0x30, 0x02], // Set raster image double height
  S_RASTER_Q: [0x1d, 0x76, 0x30, 0x03], // Set raster image quadruple
};

/**
 * [BITMAP_FORMAT description]
 * @type {Object}
 */
_.BITMAP_FORMAT = {
  BITMAP_S8: [0x1b, 0x2a, 0x00],
  BITMAP_D8: [0x1b, 0x2a, 0x01],
  BITMAP_S24: [0x1b, 0x2a, 0x20],
  BITMAP_D24: [0x1b, 0x2a, 0x21]
};

/**
 * [GSV0_FORMAT description]
 * @type {Object}
 */
_.GSV0_FORMAT = {
  GSV0_NORMAL: [0x1d, 0x76, 0x30, 0x00],
  GSV0_DW: [0x1d, 0x76, 0x30, 0x01],
  GSV0_DH: [0x1d, 0x76, 0x30, 0x02],
  GSV0_DWDH: [0x1d, 0x76, 0x30, 0x03]
};

/**
 * [BEEP description]
 * @type {string}
 */
_.BEEP = [0x1b, 0x42]; // Printer Buzzer pre hex

/**
 * [COLOR description]
 * @type {Object}
 */

_.COLOR = {
  0: [0x1b, 0x72, 0x00], // black
  1: [0x1b, 0x72, 0x01] // red
};

/**
 * [exports description]
 * @type {[type]}
 */
module.exports = _;