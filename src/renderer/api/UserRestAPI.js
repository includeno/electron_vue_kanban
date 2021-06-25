import ConfigAPI from "@/api/ConfigAPI";
import axios from "axios";


class UserRestAPI {
    constructor() {

    }

    async getUser(id, name) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/users"
        let url = host + path;

        try {
            let res = await axios({
                method: "get",
                url: url,
                params: {
                    id: id,
                    name: name
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

    async createUser(name) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/users"
        let url = host + path;
        let formdata = new FormData();
        formdata.append("name", name)

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
    async updateUser(id, name) {
        let config = ConfigAPI.getActiveConfig();
        let host = config["url"];
        let path = "/v1/users"
        let url = host + path;
        let formdata = new FormData();
        formdata.append("name", name)
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

export default new UserRestAPI();