import ConfigAPI from "@/api/ConfigAPI";
import axios from "axios";


class BoardRestAPI {
  constructor() {

  }

  async getBoard(id) {
    let config = ConfigAPI.getActiveConfig();
    let host = config["url"];
    let path = "/v1/boards"
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
  async createBoard(teamId, name,backgroundColor) {
    let config = ConfigAPI.getActiveConfig();
    let host = config["url"];
    let path = "/v1/boards"
    let url = host + path;
    let formdata = new FormData();
    formdata.append("teamId", teamId)
    formdata.append("name", name)
    formdata.append("backgroundColor", backgroundColor)

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
  async updateBoard(id, teamId, name,backgroundColor) {
    let config = ConfigAPI.getActiveConfig();
    let host = config["url"];
    let path = "/v1/cards"
    let url = host + path;
    let formdata = new FormData();
    formdata.append("id", id)
    formdata.append("teamId", teamId)
    formdata.append("name", name)
    formdata.append("backgroundColor", backgroundColor)

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
  //list
  async getBoardList() {
    let config = ConfigAPI.getActiveConfig();
    let host = config["url"];
    let path = "/boardList"

    try {
      let res = await axios.get(host + path)

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

export default new BoardRestAPI();