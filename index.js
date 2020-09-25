const spawn = require("child_process").spawn;

exports.raspistill = function(){
    /*
     * @param object {option}
     * @public
     * @vreturn boolean
     */
    this.addOptions=function(option){
        for(let i in option)
            if(typeof optionsMap[i] !== "undefined")
                options[
                    optionsMap[i].toString().toLowerCase()
                ] = option[i];
        return true;
    };
    /*
     * @public
     */
    this.getCommand=function(){
        return "raspistill "+getOptions().join(" ");
    };
    /*
     * @param function {istdOutFun}
     * @param function {stdErrFun}
     * @param function {closeFun}
     * @param function {errFun}
     * @public
     */
    this.start=function(stdOutFun, stdErrFun, closeFun, errFun){
        run = spawn(
            "raspistill",
            getOptions(
                options
            )
        );
        if(typeof stdOutFun !== "undefined")
            run.stdout.on("data", stdOutFun);
        if(typeof stdErrFun !== "undefined")
            run.stderr.on("data", stdErrFun);
        if(typeof closeFun !== "undefined")
            run.on("close", closeFun);
        if(typeof errFun !== "undefined")
            run.on("error", errFun);
    };
    /*
     * @public
     */
    this.stop=function(){
       run.kill("SIGINT");
    };
    /*
     * @private
     * @var mixed
     */
    let run     = "";
    /*
     * @private
     * @var object
     */
    let options = {};
    /*
     * @private
     * @var object list
     */
    let optionsMap = {
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
    /*
     * @private
     * @return string
     */
    let getOptions = function(){
        let out = ["-v","-n"];
        for (let i in options){
            out.push("-"+i.toString());
            out.push(options[i].toString());
        }
        return out;
    };
};
