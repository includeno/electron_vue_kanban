import axios from "axios";

export default function postfunction(url,formdata){
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

export default function getfunction(url){
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