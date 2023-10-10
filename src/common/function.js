import { Dimensions } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import CryptoJS from "react-native-crypto-js";
const { width, height } = Dimensions.get('window');
global.Logged = 0
global.user = ''
export const screenDiagonal = () => {
  var d = Math.sqrt((width * width) + (height * height));
  d = parseFloat(d.toFixed(2));
  return d;
}

export const RNGet = async (key) => {
  let value = await AsyncStorage.getItem(key);
  if (value != null) {
    return JSON.parse(value);
  }
  else {
    return false
  }
}

export const RNStore = async (key, data) => {
  let value = await AsyncStorage.setItem(key, JSON.stringify(data));
  if (value != null) {
    return value;
  }
  else {
    return false
  }
}
export const RNremove = async (key) => {
  let value = await AsyncStorage.removeItem(key);
  if (value != null) {
    console.log(value, 'here');
    return value;
  }
  else {
    return false
  }
}

export const camelCase = (str) => {
  let m = str.replace(str[0], str[0].toUpperCase())
  return m;
}
global.URLS = 'https://redmine.epixel.in'

export const FetchData = async (data) => {
  let datas = {}
  // url, method, headers, body
  let originalText = ''
  let result = await RNGet('api-key')
  if (result) {
    let bytes = CryptoJS.AES.decrypt(result.key, 'AltraSec');
    originalText = bytes.toString(CryptoJS.enc.Utf8);
  }
  else {
    return 'something went wrong'
  }
  let header = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    'X-Redmine-API-Key': originalText
  }
  datas['headers'] = header;
  // let body = {}
  let url = data.url ?? ''
  if (!data.url) {
    return 'Soemthing went wrong';
  }
  if (data.body) {
    datas['body'] = JSON.stringify(data.body);
    // body = 
  }
  if (data.method) {
    datas['method'] = data?.method;
  }
  if (data.url && data.params) {
    url += '?'
    Object.keys(data.params).map(item => { url += item + '=' + data.params[item] + '&' })
  }
  const response = await fetch(url, datas);
  // method: data?.method,
  // headers: header,
  // body: JSON.stringify(body)
  // headers: {
  //   Accept: 'application/json',
  //   'Content-Type': 'application/json',
  // },
  // body: JSON.stringify({
  //   firstParam: 'yourValue',
  //   secondParam: 'yourOtherValue',
  // }),

  if (response.status == 401) {
    return '401'
  }
  else {
    const json = await response.json();
    return json;
  }


}

export const getToday = () => {
  // var date = new Date().getDate(); //Current Date
  // var month = new Date().getMonth() + 1; //Current Month
  // var year = new Date().getFullYear(); //Current Year
  var hours = new Date().getHours(); //Current Hours
  var min = new Date().getMinutes(); //Current Minutes
  var sec = new Date().getSeconds(); //Current Seconds
  return (hours + ':' + min + ':' + sec);

}

export function onlyUnique(value, index, self) {
  return self.indexOf(value) === index;
}