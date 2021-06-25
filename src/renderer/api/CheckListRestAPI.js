import ConfigAPI from "@/api/ConfigAPI";
import axios from "axios";


class CheckListRestAPI {
    constructor() {

    }

    async getCheckList(id) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/checkLists"
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

    async createCheckList(title) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/checkLists"
        let url = host + path;
        let formdata = new FormData();
        formdata.append("title", title)

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
    async updateCheckList(id, title) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/checkLists"
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

export default new CheckListRestAPI();