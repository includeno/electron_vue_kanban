import ConfigAPI  from "@/api/ConfigAPI";
import axios from "axios";


class BoardRestAPI{
    constructor() {
        
    }

    //get
    async getBoardList(){
        let config=ConfigAPI.getActiveConfig();
        let host=config["url"];
        let path="/boardlist"
        //const response=await axios.get(host+path);
        
        try {
            let res = await axios.get(host+path)
            
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