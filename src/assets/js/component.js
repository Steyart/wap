import axios from 'axios';
import router from '../../router'
import apiUrl from './apiHeader.js';

// var instance = axios.create();
// instance.defaults.timeout = 10000;
// instance.defaults.headers.post['Content-Type'] = 'application/*';

const headerUrl = apiUrl.__proto__.apiUrl();
const headerApi = apiUrl.__proto__.api();

axios.jsonp = (url,data)=>{
    if(!url)
        throw new Error('url is necessary')
    const callback = 'CALLBACK' + Math.random().toString().substr(9,18)
    const JSONP = document.createElement('script')
          JSONP.setAttribute('type','text/javascript')

    const headEle = document.getElementsByTagName('head')[0]

    let ret = '';
    if(data){
        if(typeof data === 'string')
            ret = '&' + data;
        else if(typeof data === 'object') {
            for(let key in data)
                ret += '&' + key + '=' + encodeURIComponent(data[key]);
        }
        ret += '&_time=' + Date.now();
    }
    JSONP.src = `${url}?callback=${callback}${ret}`;
    return new Promise((resolve,reject) => {
        window[callback] = r => {
          resolve(r)
          headEle.removeChild(JSONP)
          delete window[callback]
        }
        // console.log(headEle)
        headEle.appendChild(JSONP)
    })
}

class Pubilc{
    get(url, params = {}) {
        return new Promise((resolve, reject) => {
            axios.get(
                headerUrl.apiUrl + url,
                params,
                {
                    headers:headerApi,
                    'content-type' : 'application/x-www-form-urlencoded'
                }
            ).then(res => {
                if(res.data.code === 10) {
                    // MessageBox('提示', '登录失效,请重新登录');
                    // MessageBox.alert('登录失效,请重新登录', '提示').then(action => {   
                    //     /* router.push("/login"); */
                    // }).catch(() => {
                        console.log('登录失效,请重新登录');
                    // });;
                }
                resolve(res.data);
            }).catch(error => {
                reject(error);
            })
        })
    };
    post(url, params = {}) {
        return new Promise((resolve, reject) => {
            console.log(headerApi);
            axios.post(
                url,
                params,
                {
                    headers:headerApi,
                }
            ).then(res => {
                if(res.data.code === 10) {
                    // MessageBox('提示', '登录失效,请重新登录');
                    // MessageBox.alert('登录失效,请重新登录', '提示').then(action => {   
                    //     /* router.push("/login"); */
                    // }).catch(() => {
                        console.log('登录失效,请重新登录');
                    // });
                }
                resolve(res.data);
            }).catch(error => {
                reject(error);
            })
        })
    };
    jsonp(url, params = {}){
        return new Promise((resolve, reject) => {
            axios.jsonp(
                headerUrl.apiUrl + url,
                params,
                {
                    headers:headerApi,
                }
            )  
            .then(res => resolve(res.data))        
            .catch(err => reject(err))
        })
    };
    copy(obj){
        let objcopy = Array.isArray(obj) ? [] : {};
        if (obj && typeof obj === "object") {
            for (let key in obj) {
                if (obj.hasOwnProperty(key)) {
                    //判断ojb子元素是否为对象，如果是，递归复制
                    if (obj[key] && typeof obj[key] === "object") {
                        objcopy[key] = pubilc.copy(obj[key]);
                    } else {
                        //如果不是，简单复制
                        objcopy[key] = obj[key];
                    }
                }
            }
        }
        return objcopy;
    };
    cacheStorage(name,link,type,data,callback) {
        let request = new RequestStorage(name,link,type,data);
        request.post((res)=>{
            callback(res);
        })
    }
}
let pubilc = new Pubilc();
export default pubilc;

class RequestStorage extends Pubilc{
    /**
     * 
     * @param {String} name 保存的Storage名称
     * @param {String} link 请求的地址
     * @param {String} type 保存到local 或者 session
     * @param {Array} data 请求所需要的参数
     */
    constructor(name,link,type,data,props){
        super(props)
        this.name = name;
        this.link = link;
        this.type = type;
        this.data = data;
    };
    post(callback){
        pubilc.post(this.link,this.data).then((res)=> {
            callback(res);
        });
    };
    storage(callback){
        if(this.type == 'local'){
            let dom = localStorage.getItem(this.name);
            // console.log(dom);
            if(!appFunc.prototype.isEmpty(dom)){
                dom = JSON.parse(dom);
                callback(dom)
            }else{
                this.post((res)=>{
                    if(res.code == 0){
                        localStorage.setItem(this.name,JSON.stringify(res));
                    }
                    callback(res)
                });
            }
        }else if(this.type == 'session'){
            let dom = sessionStorage.getItem(this.name);
            if(!appFunc.prototype.isEmpty(dom)){
                dom = JSON.parse(dom);
                callback(dom)
            }else{
                this.post((res)=>{
                    if(res.code == 0){
                        sessionStorage.setItem(this.name,JSON.stringify(res));
                    }
                    callback(res)
                });
            }
        }
    };
    getData(callback){
        this.storage((res)=>{
            callback(res);
        })
    }
}
