const spawn = require("child_process").spawn;

exports.raspistill = function(){
    this.run = "";
    this.addOptions=function(option){
        for(let i in option)
            if(typeof optionsMap[i] !== "undefined")
                options[
                    optionsMap[i].toString().toLowerCase()
                ] = option[i];
        return true;
    };
    this.getCommand=function(){
        return "raspistill "+getOptions().join(" ");
    }
    this.start=function(stdOutFun, stdErrFun, closeFun, errFun){
        rpat.run = spawn(
            "raspistill",
            getOptions(
                options
            )
        );
        if(typeof stdOutFun !== "undefined")
            rpat.run.stdout.on("data", stdOutFun);
        if(typeof stdErrFun !== "undefined")
            rpat.run.stderr.on("data", stdErrFun);
        if(typeof closeFun !== "undefined")
            rpat.run.on("close", closeFun);
        if(typeof errFun !== "undefined")
            rpat.run.on("error", errFun);
    }; 
    this.stop=function(){
       rpat.run.kill("SIGINT");
    }
    let rpat    = this,
        options = {},
        optionsMap = {
            "verticalFlip"    : "vf",
            "horizontalFlip"  : "hf",
            "rotation"        : "rot",
            "encoding"        : "e",
            "query"           : "q",
            "nopreview"       : "n",
            "width"           : "w",
            "height"          : "h",
            "shutterspeed"    : "ss",
            "timeout"         : "t",
            "timelapse"       : "tl",
            "timelap"         : "tl",
            "output"          : "o",
            "o"               : "o",
            "link"            : "l",
            "l"               : "l",
            "contrast"        : "co",
            "co"              : "co",
            "brightness"      : "br",
            "saturation"      : "sa",
            "iso"             : "ISO",
            "awb"             : "awb",
            "awbg"            : "awbg"
        };
    let getOptions = function(){
        let out = ["-v","-n"];
        for (let i in options){
            out.push("-"+i.toString());
            out.push(options[i].toString());
        }
        return out;
    };
};
