import fs from "fs";
const file = "KanbanConfig.json";

class ConfigAPI {
    constructor() {

    }
    getDefaultConfigItem() {
        return {
            url: "",
            username: "",
            password: "",
            id: "",
        }
    }
    getDefaultConfig() {
        return {
            "configList":{},
            "activeConfig":""
        }
    }
    //获取当前激活的配置
    getConfigList() {
        let config = JSON.parse(fs.readFileSync(file, "utf8"));
        
        return config["configList"];
    }
    //获取当前激活的配置
    getActiveConfig() {
        let config = JSON.parse(fs.readFileSync(file, "utf8"));
        for(var i=0;i<config["configList"].length;i++){
            let id=config["configList"][i]["id"];
            console.log("11log: "+id+" "+JSON.stringify(config["configList"][i]))
            if(String(id)==config["activeConfig"]){
                
                return config["configList"][i];
            }
            else{
                
            }
        }
        
        return {};
    }
    //激活配置
    activateConfig(id) {
        let config = this.getActiveConfig();
        config["activeConfig"] = id;
        fs.writeFileSync(file, JSON.stringify(config));
    }
    getConfigOrCreate() {
        if (!fs.existsSync(file)) {
            fs.writeFileSync(file, "");
            return this.getDefaultConfig();
        }
        else {
            let config = JSON.parse(fs.readFileSync(file, "utf8"));
            return config;
        }
    }
    setConfig(configList,activeConfig){
        let exist=false;
        for(var temp in configList){
            if(temp.id==activeConfig){
                exist=true;
            }
        }
        if(exist==false){
            activeConfig="0";
        }
        let config={"configList":configList,"activeConfig":activeConfig}
        fs.writeFileSync(file, JSON.stringify(config));
    }

}

export default new ConfigAPI();