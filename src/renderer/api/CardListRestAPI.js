//https://www.jianshu.com/p/4168efdc172b 使用async await 封装 axios
import ConfigAPI from "@/api/ConfigAPI";
import axios from "axios";


class CardListRestAPI {
    constructor() {

    }
    async getCardList() {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/cardLists"
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


    updateCardList() {

    }
    //TODO

    //create new CardList->link to Board
    async createCardList(boardId, title, cardListId) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/card/create"
        let url = host + path;
        let formdata = new FormData();
        formdata.append("boardId", boardId)
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
}

export default new CardListRestAPI();