(function(){
    Array.prototype.contain = function(elem){
        var i;
        var max = this.length;
        for(i = max - 1 ; i > -1 ; i -= 1){
            if(this[i] === elem){
                return i;
                break;
            }
        }
        return -1;
    }

    Array.prototype.sum = function(){
        var i,
            max = this.length,
            sum;
        for(i = 0 ; i < max ; i++){
            if(typeof this[i] === "number"){
                sum  += this[i];
            }
        }
        return sum;
    }

    Object.prototype.appendChilds = function(){
        var arr = [],
            obj = {};
        if(arguments.length === 1){
            // When array
            if(typeof arguments.push === "function"){
                arr = arguments[i];
                for(var i = 0 , max = arr.length ; i < max ; i++){
                    this.appendChild(arr[i]);
                }
            }
        }else if(arguments.length > 1){
            // When array with arguments
            for(var i = 0 , max = arguments.length ; i < max ; i++){
                this.appendChild(arguments[i]);
            }
        }
    }
    var shortcuts = {
        "ctrl" : {
            "F" : "Foward",
            "A" : "At begining of the line",
            "E" : "End of the line",
            "N" : "Next line",
            "P" : "Previous line",
            "B" : "Back"
        },
        "ctrl+shift" : {
        },
        "ctrl+alt" : {
        },
        "ctrl+Command" : {
        },
        "shift" : {
        },
        "shift+alt" : {
        },
        "shift+Command" : {
        },
        "Command" : {
        },
        "Command+alt" : {
        },
        "alt": {
        },
        "shift+Command" : {
        },
        "shift+alt" : {
        },
    }
    // Key Codes are as follows :
    // Tab : 9
    // shift : 16
    // alt/alt : 18
    // ctrl : 17
    // Space : 32
    // Command : 91
        handlingKeys = [];
    var PopUp = function () {
        var p = document.createElement("div");
        p.id = "cmpopup";
        p.header = document.createElement("div");
        p.body   = document.createElement("table");
        p.appendChilds(p.header,p.body);
        return p;
    }

    var popup = PopUp();
    window.onfocus = function(){
        if(handlingKeys.length > 0){
            handlingKeys = [];
        }
        if(typeof popup !== "undefined"){
            if(popup.style.display === "block"){
                popup.style.display = "none";
                poppup.removeChild(popup.lastChild);
            }
        }
    }
    window.onload = function() {
        var metakeys = [9,16,17,18,32,91];
        document.body.appendChild(popup);
        this.onkeydown = function(e){
            console.log(e.keyCode);
            if(metakeys.contain(e.keyCode) > -1){
                var key = getKeyChar(handlingKeys),
                    scs = shortcuts[key];
                handlingKeys.push(e.keyCode);
                popup.style.display = "block";
                popup.appendChild(tableFromObject(shortcuts[getDisp(handlingKeys)])); 
                console.log(handlingKeys);
            }
        };
        this.onkeypress = function(e){
            e.preventDefault();
        }
        this.onkeyup = function(e){
            if(handlingKeys.contain(e.keyCode) > -1){
                var l = handlingKeys.contain(e.keyCode);
                handlingKeys.splice(l,1);
                console.log(handlingKeys);
                if(handlingKeys.length > 0){
                    popup.appendChild(tableFromObject(shortcuts[getDisp(handlingKeys)]));
                }else{
                    popup.style.display = "none";
                }
            }else{
                console.log(handlingKeys.contain(e.keyCode));
                console.log("nothing to remove");
            }
        };
    };
    function tableFromObject (obj){
        var table = document.createElement("table"),
            tbody = document.createElement("tbody"),
            header= document.createElement("div");
        header.innerHTML = getDisp(handlingKeys); 
        for(i in obj){
           tr = document.createElement("tr"),
           title = document.createElement("td");
           desc  = document.createElement("td");
           title.innerHTML = i;
           desc.innerHTML  = obj[i];
           tr.appendChild(title);
           tr.appendChild(desc);
           tbody.appendChild(tr);
        }
        table.appendChild(header);
        table.appendChild(tbody);
        return table;
    }
    function getDisp (chk) {
        var disp;
        for(var i = 0 , max = chk.length ; i < max ; i++){
            if(i > 0) {
                disp += "+";
                disp += getKeyChar(chk[i]);
            }else{
                disp = getKeyChar(chk[i]);
            }
        }
        return disp;
    }
    function getKeyChar (kc) {
        switch (kc) {
        // Tab
        case 9 : 
            return "Tab";
            break;
        // ctrl
        case 16 : 
            return "shift";
            break;
        // Shit
        case 17 :
            return "ctrl";
            break;
        // alt
        case 18 :
            return "alt";
            break;
        // Space 
        case 32 : 
            return "Space";
            break;
        // Command
        case 91 :
            return "Command";
            break;
        default : 
            return false;
        }
    }
}());
