import ConfigAPI from "@/api/ConfigAPI";
import axios from "axios";

//boardId->List<Label> {id,boardId,color,name}
class LabelRestAPI {
    constructor() {

    }

    async getLabel(id, boardId) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/labels"
        let url = host + path;

        try {
            let res = await axios({
                method: "get",
                url: url,
                params: {
                    id: id,
                    boardId: boardId
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

    async createLabel(boardId,name,color) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/labels"
        let url = host + path;
        let formdata = new FormData();
        formdata.append("boardId", boardId)
        formdata.append("name", name)
        formdata.append("color", color)

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
    async updateLabel(id,boardId,name,color) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/teams"
        let url = host + path;
        let formdata = new FormData();
        formdata.append("id", id)
        formdata.append("boardId", boardId)
        formdata.append("name", name)
        formdata.append("color", color)
        
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

export default new LabelRestAPI();