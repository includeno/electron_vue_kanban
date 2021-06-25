//https://www.jianshu.com/p/4168efdc172b 使用async await 封装 axios
import ConfigAPI from "@/api/ConfigAPI";
import axios from "axios";


class CardListRestAPI {
    constructor() {

    }
    //获取
    async getCardList(id) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/cardLists"
        let url = host + path;

        try {
            let res = await axios({
                method: "get",
                url: url,
                params: {
                    id: id,
                }
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

    //创建
    async createCardList(boardId, title,index) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/cardLists"
        let url = host + path;
        let formdata = new FormData();
        formdata.append("boardId", boardId)
        formdata.append("title", title)
        formdata.append("index", index)
        

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

    //更新 显示名称
    async updateCardList(id, boardId, title) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/teams"
        let url = host + path;
        let formdata = new FormData();
        
        formdata.append("id", id)
        formdata.append("boardId", boardId)
        formdata.append("title", title)

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

    //更新卡片列表位置 包括看板和看板位置
    async updateCardListIndex(id,boardId, title,index) {
        
    }
    
}

export default new CardListRestAPI();