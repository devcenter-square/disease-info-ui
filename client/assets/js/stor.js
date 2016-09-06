var stor = {
    type: "",
    add: function (key, obj) {
        key = key.toString().toLowerCase();
        if (this.type == 1) {
            //localStorage
            window.localStorage.setItem(key, JSON.stringify(obj));
        }
        else {
            WinName.setItem(key, obj);
            WinName.save();
        }
    },
    remove: function (key) {
        key = key.toString().toLowerCase();
        if (this.type == 1) {
            //localStorage
            window.localStorage.removeItem(key);
        }
        else {
            WinName.deleteItem(key);
            WinName.save();
        }

    },
    contains: function (key) {
        key = key.toString().toLowerCase();
        if (this.type == 1) {
            //localStorage
            if (window.localStorage.getItem(key) != null) {
                return true;
            }
            else {
                return false;
            }
        }
        else {
            if (WinName.contains(key) > -1) {
                return true;
            }
            else {
                return false;
            }
        }

    },
    get: function (key) {
        key = key.toString().toLowerCase();
        if (this.type == 1) {
            //localStorage
            if (window.localStorage.getItem(key) == undefined || window.localStorage.getItem(key) == "") {
                return undefined;
            }
            return JSON.parse(window.localStorage.getItem(key));
        }
        else {
            var obj = WinName.getItem(key);
            if (obj != undefined && obj != null) {
                return obj;
            }
            else {
                return undefined;
            }

        }

    },
    gettext: function (key) {
        key = key.toString().toLowerCase();
        if (this.type == 1) {
            //localStorage
            return window.localStorage.getItem(key);
        }
        else {
            return WinName.getItem(key);
        }

    },
    supports_html5_storage: function () {
        try {
            //alert("local storage");
            return 'localStorage' in window && window['localStorage'] !== null;
        }
        catch (e) {
            //alert("winName");
            return false;
        }
    },
}
if (stor.supports_html5_storage() == true) {
    stor.type = 1;
}
else {
    stor.type = 2;
}
//LocalStorage == 1
//WinName == 2

function WinNameItem(key, value) {
    this.key = key;
    this.value = value;
    return this;
}

var WinName = {
    items: [],
    setItem: function (key, value) {
        key = key.toString().toLowerCase();
        if (this.contains(key) > -1) {
            //exists
            this.items[this.contains(key)].value = value;
        }
        else {
            this.items.push(new WinNameItem(key, value));
        }

        this.save();
    },
    getItem: function (key) {
        key = key.toString().toLowerCase();
        var i = this.contains(key);
        if (i > -1) {
            return this.items[i].value;
        }
        return undefined;
    },
    contains: function (key) {
        key = key.toString().toLowerCase();
        for (var i = 0; i < this.items.length; i++) {
            if (this.items[i].key == key) {
                return i;
            }
        }
        return -1;
    },
    deleteItem: function (key) {
        key = key.toString().toLowerCase();
        var ret = [];
        for (var i = 0; i < this.items.length ; i++) {
            if (this.items[i].key != key) {
                ret.push(this.items[i]);
            }
        }
        this.items = ret;
        this.save();
    },
    updateItem: function (key, value) {
        key = key.toString().toLowerCase();
        this.items[this.contains(key)].value = value;
        this.save();
    },
    save: function () {
        window.name = JSON.stringify(this.items);
    },
    retrieve: function () {
        try {
            this.items = JSON.parse(window.name);
        }
        catch (ex) { }
    },
    clear: function () {
        if (window.name == "" || window.name == null || window.name == undefined) {
            window.name = "[]";
        }
        else {
            this.retrieve();
        }

        //this.retrieve();
    }
}
WinName.clear();