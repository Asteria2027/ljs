import CryptoJS from 'crypto-js'  

//加密的私钥
var key = 'szljsnet';
// DES加密
export const encryptByDES = (message) => {
  //把私钥转换成16进制的字符串
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  //模式为ECB padding为Pkcs7
  var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
    mode: CryptoJS.mode.ECB,
    padding: CryptoJS.pad.Pkcs7
  });
  //加密出来是一个16进制的字符串
  return encrypted.toString();
}
//DES  ECB模式解密
export const decryptByDESModeEBC = (ciphertext) => {
  //把私钥转换成16进制的字符串
  var keyHex = CryptoJS.enc.Utf8.parse(key);
  //把需要解密的数据从16进制字符串转换成字符byte数组
  var decrypted = CryptoJS.DES.decrypt({
    ciphertext: CryptoJS.enc.Base64.parse(ciphertext)
  }, keyHex, {
      mode: CryptoJS.mode.ECB,
      padding: CryptoJS.pad.Pkcs7
    });
  //以utf-8的形式输出解密过后内容
  var result_value = decrypted.toString(CryptoJS.enc.Utf8);
  return result_value;
}