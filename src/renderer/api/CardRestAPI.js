//https://www.jianshu.com/p/4168efdc172b 使用async await 封装 axios
import ConfigAPI from "@/api/ConfigAPI";
import axios from "axios";


class CardRestAPI {
    constructor() {

    }

    async getCard(id) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/cards"+"?id="+id
        let url = host + path;
        
        try {
            let res = await axios({
                method: "get",
                url: url,
            });
            return new Promise((resolve, reject) => {
                resolve(res)
            })
        } catch (err) {
            // return (e.message)
            alert('服务器出错')
            console.log(err)
        }
    }
    //create new Card->link to CardList
    async createCard(cardListId,title) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/cards"
        let url = host + path;
        let formdata = new FormData();
        formdata.append("title", title)
        formdata.append("cardListId", cardListId)
        
        try {
            let res = await axios({
                method: "post",
                url: url,
                data: formdata,
            });
            return new Promise((resolve, reject) => {
                resolve(res)
            })
        } catch (err) {
            // return (e.message)
            alert('服务器出错')
            console.log(err)
        }
    }
    async updateCard(id,title) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/cards"
        let url = host + path;
        let formdata = new FormData();
        formdata.append("title", title)
        formdata.append("id", id)
        
        try {
            let res = await axios({
                method: "put",
                url: url,
                data: formdata,
            });
            return new Promise((resolve, reject) => {
                resolve(res)
            })
        } catch (err) {
            // return (e.message)
            alert('服务器出错')
            console.log(err)
        }
    }

    
}

export default new CardRestAPI();