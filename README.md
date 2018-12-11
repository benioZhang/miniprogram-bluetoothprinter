## 小程序蓝牙打印
微信小程序蓝牙打印示例，代码参考[微信小程序示例](https://github.com/wechat-miniprogram/miniprogram-demo)。官方Demo总比网上随便找的强吧。

* 测试打印机：[得力DL-581PW热敏票据打印机](https://item.jd.com/4606603.html)
* 测试设备：iPhone 6s

### 效果图
<div>
    <img src="img/screen1.png" width="400"><img src="img/screen2.png" width="400">
</div>

### 流程
* 初始化蓝牙模块 `wx.openBluetoothAdapter()`
* 搜寻附近的蓝牙外围设备 `wx.startBluetoothDevicesDiscovery()`
* 监听寻找到新设备的事件 `wx.onBluetoothDeviceFound()`
* 连接低功耗蓝牙设备 `wx.createBLEConnection()`
* 获取蓝牙设备服务 `wx.getBLEDeviceServices()`
* 获取蓝牙设备服务的特征值 `wx.getBLEDeviceCharacteristics()`
* 向低功耗蓝牙设备特征值中写入二进制数据 `wx.writeBLECharacteristicValue()`
* 关闭蓝牙模块 `wx.closeBluetoothAdapter()`

### 注意点
**1.与蓝牙设备通信很重要的就是找到对应的Characteristic。如何找到这个Characteristic？**  
目前只能一个个去试！！！如果有更好的做法请告诉我。

**2.遇到过Characteristic是支持write的，且写入成功，但是没有任何响应的情况。**  
原因未知。试试下一个特征值。

**3.写入数据包过大时，存在写入失败，但是却成功打印的情况。**  
根据[小程序文档](https://developers.weixin.qq.com/miniprogram/dev/api/wx.writeBLECharacteristicValue.html)：
> 并行调用多次会存在写失败的可能性。  
小程序不会对写入数据包大小做限制，但系统与蓝牙设备会限制蓝牙4.0单次传输的数据大小，超过最大字节数后会发生写入错误，建议每次写入不超过20字节。  
若单次写入数据过长，iOS 上存在系统不会有任何回调的情况（包括错误回调）。  

所以我们需要对写入数据做分包处理，对写入操作做延时调用
```javascript
let buffer;
const maxChunk = 20;
const delay = 20;
for (let i = 0, j = 0, length = buffer.byteLength; i < length; i += maxChunk, j++) {
    let subPackage = buffer.slice(i, i + maxChunk <= length ? (i + maxChunk) : length);
    setTimeout(this._writeBLECharacteristicValue, j * delay, subPackage);
}
```

**4.如何获取ArrayBuffer?**
```javascript
// 存储需要发送的数据，元素用2位16进制表示
let arr = [];
// 将数组转换为8位无符号整型数组
let bufferView = new Uint8Array(arr);
let buffer = bufferView.buffer;
```

**5.如何驱动打印机?**  
现在大多数 POS 打印都采用 ESC/POS 指令集，一般情况下使用ESC/POS 指令集即可。

**6.如何打印出同一行内，一部分内容居左，另一部分居右的效果？**  
这个说出来你可能不信，是算出来的，中间用空格填充。一开始我也以为有什么什么指令。后来发现想多了。

**7.打印出来的中文乱码?**  
使用[text-encoding](https://github.com/inexorabletash/text-encoding)中文进行编码。

###TODO OR NOT TODO？
* 打印图片
* 打印二维码
* 打印条码

### 参考
* [微信小程序API](https://developers.weixin.qq.com/miniprogram/dev/api/)
* [微信小程序示例](https://github.com/wechat-miniprogram/miniprogram-demo)
* [低功耗蓝牙能力](https://developers.weixin.qq.com/community/develop/doc/0008acd004ccd86b37d649ee55b009?highLine=%25E8%2593%259D%25E7%2589%2599)
* [微信小程序 - 蓝牙接口](https://www.jianshu.com/p/d01dbca67461)
* [ESC(POS)打印控制命令](http://www.xmjjdz.com/downloads/manual/cn/ESC(POS)%E6%89%93%E5%8D%B0%E6%8E%A7%E5%88%B6%E5%91%BD%E4%BB%A4.pdf)
* [ESCPOS](https://github.com/song940/node-escpos)