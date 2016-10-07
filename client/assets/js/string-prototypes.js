String.prototype.EncodeURI = function (a) { String.prototype._replace = function (a, b) { var c = this.valueOf(), d = "", e = c.indexOf(a); if (e >= 0) { for (var f = e + a.length - 1, g = 0; g < e; g++) d += c.charAt(g); for (var h = 0; h < b.length; h++) d += b.charAt(h); var i = c.substring(f + 1, c.length); d += c.length > f + 1 + a.length ? i._replace(a, b) : i } else d += c; return c = "", c = d }, a = a || []; var b = this; if (!b) return ""; b = b.toString(), b = b.trim(), b = b.replace(/\"/g, ""), b = b.replace(/\ /g, "-"), b = b.replace(/\"/g, ""), b = b.replace(/\&amp\;/g, "and"), b = b.replace(/\&/, "and"); for (var c = 0; c < 48; c++) { var d = String.fromCharCode(c); (null == a || !a.indexOf(String.fromCharCode(c)) >= 0 && "-" != String.fromCharCode(c)) && (b = b._replace(d, "")._replace(d, "")) } for (var c = 58; c < 65; c++) { var d = String.fromCharCode(c); (null == a || !a.indexOf(String.fromCharCode(c)) >= 0 && "-" != String.fromCharCode(c)) && (b = b._replace(d, "")._replace(d, "")) } for (var c = 123; c < 200; c++) { var d = String.fromCharCode(c); (null == a || !a.indexOf(String.fromCharCode(c)) >= 0 && "-" != String.fromCharCode(c)) && (b = b._replace(d, "")._replace(d, "")) } return b.toLowerCase().replace(/-$/, "").replace(/^-/, "").replace(/-+/g, "-") };

String.isNullOrEmpty = function (str) {
    return str == null || str == '';
}

String.prototype._charMatch = function (s2) {
    var s2 = s2.toString().toLowerCase();
    var s1 = this.valueOf().toLowerCase();
    var size = Math.max(s1.length, s2.length);
    var count = 0;
    for (var i = 0; i < Math.min(s2.length, s1.length) ; i++) {
        if (s1.charAt(i) === s2.charAt(i)) count++;
    }
    return count / size;
}

String.prototype._stringMatch = function (s2) {
    s2 = s2.toString();
    var s1 = this.valueOf();
    var start = 0;
    var end = 1;
    var substr = "";
    var s = "";
    while (end <= s2.length) {
        if (s1.indexOf(s2.substring(start, end)) > 0) {
            s = s2.substring(start, end);
            end += 1
        }
        else {
            substr += s;
            s = "";
            start = end;
            end += 1;
        }
    }
    substr += s;
    var score = 0;
    if (s1.charAt(0) == s2.charAt(0)) score += 0.1;
    if (s1[s1.length - 1] == s2[s2.length - 1]) score += 0.1;
    if (s1.length == s2.length) score += (0.1);
    score += ((substr.length / ((s1.length + s2.length) / 2)) * 0.8) * this._charMatch(s2);
    return score;
}

String.prototype._looksLikeItContains = function (f) {
    var s = this.valueOf();
    var start = 0;
    var end = start + f.length;
    var maxval = 0;
    while (end <= s.length) {
        var sub = s.substring(start, end).toString();
        //console.log(sub + ' ' + sub._stringMatch(f));
        maxval = Math.max(sub._stringMatch(f), maxval);
        start++;
        end++;
    }
    return maxval;
}