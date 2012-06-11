(function(){
    // @interface
    var SCPOPUP,
    // Data
    shortcuts,
    // Classes
    Popup,
    Handler,
    // Helpers
    tableFromObject = function(objs){},
    addListner = function(type,obj,fn){},
    log = function(){};

    // Main
    $(function(){
        var dom = $("#scpopup")[0],
        handler = {};
        $.extend(dom,Popup);
        $.extend(window,Handler);
    });

    Popup = {
        update : function(opts){
            log("hgoe");
        }
    };

    Handler = {
        dom : function(){ return $("#scpopup")[0]; },
        head : function(){ return $("#scpopup-h")[0]; },
        body : function(){ return $("#scpopup-b")[0]; },
        table : function(){ return $("#scpopup-b table")[0]; },
        current : [],
        keysStr : function(arr){ 
            var str = "",i,max;
            for(i = 0 , max = arr.length ; i < max ; i++){
                str += arr[i] + " + "; 
            }
            return str;
        },
        onfocus : function(e){
            if(this.dom().style.display == "block"){
                this.dom().style.display = "none";
            }
        },
        onkeydown : function(e){
            var kc = this.getKeyChar(e.keyCode);
            if(this.current.length === 0){
                this.dom().style.display = "block";
            };
            if(this.current.indexOf(kc) < 0){
                this.current.push(kc);
                this.head().innerHTML = this.keysStr(this.current);
                log(filterShotcuts(this.current).length);
                if(current.length > 0){
                    $(this.table()).remove();
                };
                this.body().appendChild(tableFromObject(filterShotcuts(this.current))); 
                log(this.current);
            };
        },
        onkeypress: function(e){
            e.preventDefault(); 
        },
        onkeyup : function(e){
            var p = this.dom(),
            kc = this.getKeyChar(e.keyCode),
            kl = this.current.indexOf(kc);

            if(this.current.length > 0){
                if(kl > -1){
                    this.current.splice(kl,1);
                    log(this.current);
                    this.head().innerHTML = this.keysStr(this.current);
                    $(this.table()).remove();
                    this.body().appendChild(tableFromObject(filterShotcuts(this.current)));
                }
            };

            if(this.current.length === 0){
                p.style.display = "none";
            };
        },
        getKeyChar : function(code) {
            var nums = ["0","1","2","3","4","5","6","7","8","9"],
            alps = ["a","b","c","d","e","f","g","h","i","j","k","l","m","n","o","p","q","r","s","t","u","v","w","x","y","z"],
            metas = ["shift","ctrl","option"];
            if(16 <= code && code <= 18){
                return metas[code-16];
            }else if(48 <= code && code <= 57){
                return nums[code-48];
            }else if(65 <= code && code <= 90){
                return alps[code-65];
            }else if(91 || 93){
                return "⌘";
            }else{
                return false;
            };
        }
    };

    tableFromObject = function(objs){
        var table = document.createElement("table"),
        tbody = document.createElement("tbody"),
        i,j;

        for(i = 0 ; i < objs.length ; i++){
            var tr = document.createElement("tr"),
            t = document.createElement("td"),
            d = document.createElement("td");

            t.className = "title";
            for(j = 0 ; j < objs[i]["keys"].length ; j++){
                var c = objs[i]["keys"][j];
                t.innerHTML +=  c;
                if(j !== objs[i]["keys"].length - 1){
                    t.innerHTML += " + ";
                }
            }
            d.innerHTML  = objs[i]["fn"];
            d.className = "desc";
            tr.appendChild(t);
            tr.appendChild(d);
            tbody.appendChild(tr);
        };
        table.appendChild(tbody);
        return table;
    }


    addListner = function(type,obj,fn){
        if(obj.addEventListener){
            obj.addEventListener(type,fn,false);
        }else if(obj.attachEvent){
            obj.attachEvent("on"+type,fn,false);
        }
    }

    addListnersFromObj = function(type,to,from) {
        switch (type) {
            case "key" :
                addListner("keydown",to,from.onkeydown);
                addListner("keypress",to,from.onkeypress);
                addListner("keyup",to,from.onkeyup);
                break;
            default :
        }
    }

    filterShotcuts = function(arr) {
        var i,j,k;
        buffer = [];
        results = [];
        for(i = 0 ; i < shortcuts.length ; i++){
            for(j = 0 ; j < arr.length ; j++){
                if(shortcuts[i]["keys"].indexOf(arr[j]) === -1){
                    break;
                }else if(j === arr.length - 1){
                    results.push(shortcuts[i]);
                }
            };
        };
        return results;
    };

    log = function(t){
        console.log(t);
    }

    shortcuts = [
        { keys : ["⌘","l"] , fn :  "urlをハイライト表示します。" },
        { keys : ["⌘","option","f"] , fn :  "アドレスバーに「?」を入力します。「?」に続けて検索キーワードを入力すると、既定の検索エンジンを使用して検索を行います。" },
        { keys : ["option"] , fn :  "を押しながら左矢印キーを押す アドレスバー内の前の単語にカーソルを移動します。" },
        { keys : ["option"] , fn :  "を押しながら右矢印キーを押す アドレスバー内の次の単語にカーソルを移動します。" },
        { keys : ["shift","option"] , fn :  "を押しながら左矢印キーを押す   アドレスバー内の前の単語をハイライト表示します。" },
        { keys : ["shift","option"] , fn :  "を押しながら右矢印キーを押す   アドレスバー内の次の単語をハイライト表示します。" },
        { keys : ["⌘","delete"] , fn :  "アドレスバー内のカーソルの前にある単語を削除します。" },
        { keys : ["⌘","p"] , fn :  "現在のページを印刷します。" },
        { keys : ["⌘","shift","p"] , fn :  "[ページ設定] ダイアログを開きます。" },
        { keys : ["⌘","s"] , fn :  "現在のページを保存します。" },
        { keys : ["⌘","shift","i"] , fn :  "現在のページをメールで送信します。" },
        { keys : ["⌘","r"] , fn :  "現在のページを再度読み込みます。" },
        { keys : ["⌘","-"] , fn :  "現在のページの読み込みを停止します。" },
        { keys : ["⌘","f"] , fn :  "検索バーを開きます。" },
        { keys : ["⌘","g"] , fn :  "検索バーに入力したキーワードの次の一致を表示します。" },
        { keys : ["⌘","shift","g"] , fn :  "検索バーに入力したキーワードの前の一致を表示します。" },
        { keys : ["shift","enter"] , fn :  "検索バーに入力したキーワードの前の一致を表示します。" },
        { keys : ["⌘","e"] , fn : "選択部分を検索に使用します。" },
        { keys : ["⌘","j"] , fn : "選択ページにジャンプします。" },
        { keys : ["⌘","option","i"] , fn : "デベロッパーツールを開きます。" },
        { keys : ["⌘","option","j"] , fn : "javascriptコンソールを開きます。" },
        { keys : ["⌘","option","u"] , fn :  "現在のページのソースを開きます。" },
        { keys : ["option"] , fn :  "を押しながらリンクをクリックする リンク先をダウンロードします。" },
        { keys : ["⌘","d"] , fn :  "現在のウェブページをブックマークとして保存します。" },
        { keys : ["⌘","shift","d"] , fn : "開いているすべてのタブを新しい1 つのフォルダにブックマークとして保存します。" },
        { keys : ["⌘","shift","f"], fn : "ページを全画面モードで開きます。もう一度 ⌘ + shift + f を押すと全画面モードを終了します。" },
        { keys : ["⌘","+"] , fn :"ページ全体を拡大表示します。" },
        { keys : ["⌘","-"] , fn : "ページ全体を縮小表示します。" },
        { keys : ["⌘","0"] , fn : "ページ全体を通常のサイズに戻します。" },
        { keys : ["⌘","shift","h"] , fn : "現在のタブでホームページを開きます。" },
        { keys : ["space"] , fn :  "ウェブページを下にスクロールします。" },
        { keys : ["⌘","option","f"] , fn :  "ウェブを検索します。" },
        { keys : ["⌘","c"] , fn :  "クリップボードにコンテンツをコピーします。" },
        { keys : ["⌘","option","c"] , fn :  "現在表示しているページのurl をクリップボードにコピーします。" },
        { keys : ["⌘","v"] , fn :  "クリップボードからコンテンツを貼り付けます。" },
        { keys : ["⌘","shift","option","v"] , fn :  "コンテンツを元の書式設定なしで貼り付けます。" },
        { keys : ["⌘","x"] , fn :  "または shift + delete コンテンツを削除して、クリップボードにコピーします。" },
        { keys : ["⌘","z"] , fn :  "最後の操作を取り消します。" },
        { keys : ["⌘","shift","z"] , fn :  "最後の操作をやり直します。" },
        { keys : ["⌘","x"] , fn :  "ハイライト表示されたコンテンツを削除して、クリップボードにコピーします（カット）。" },
        { keys : ["⌘","a"] , fn :  "現在のページのテキストをすべて選択します。" },
        { keys : ["⌘",":"] , fn :  "[スペルと文法]ダイアログを開きます。" },
        { keys : ["⌘",";"] , fn :  "現在のページのスペルと文法をチェックします。" }
    ];

}());
