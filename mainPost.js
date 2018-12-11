function getQueryStringObject() {
    var a = window.location.search.substr(1).split('&');
    if (a == "") return {};
    var b = {};
    for (var i = 0; i < a.length; ++i) {
        var p = a[i].split('=', 2);
        if (p.length == 1)
            b[p[0]] = "";
        else
            b[p[0]] = decodeURIComponent(p[1].replace(/\+/g, " "));
    }
    return b;
}

var request = new XMLHttpRequest();
var serverAddress = "https://opso.ml/board";
var data;
var getPostTF = false;
var getPostByIDTF = false;
// var serverAddress = "http://18.216.159.54/board"; +"?offset="+i

function getPost() {
    request.open("GET", serverAddress, true);
    getPostTF = true;
    request.send();
}

function getPostByID(postID) {
    getPostByIDTF = true;
    request.open("GET", serverAddress + "/" + postID, true);
    request.send();

    console.log(data);
}

request.onreadystatechange = function (event) {
    if (request.readyState == 4) {
        if (request.status == 200) {
            data = JSON.parse(JSON.parse(request.responseText));
            if (getPostTF) {
                getPostTF = false;
                var articles = dataToArticle(data);
                document.getElementById("view_wrap").innerHTML = articles;
            } else if (getPostByIDTF) {
                getPostByIDTF = false;
                var articles = dataToArticle(data);
                document.getElementById("contents_wrap").innerHTML = articles;
            }
        }
    }
}

function dataToArticle(data) {
    var articles = "";
    if (data.length == undefined) {
        var article = '<div class="view_box"><div class="userInfo"><div class="user_icon">';
        article += data.author[0];
        article += '</div><div class="user_name">';
        article += data.author;
        article += '</div><div class="post_ID">' + data.id + '</div></div><div class="view_article">';
        article += data.contents;
        article += '</div><div class="view_buttonBox"><i class="fab fa-facebook-square" onclick="popUpFacebook()"></i><div class="margin" id="buttonBox_middle"></div><i class="fab fa-twitter-square" onclick="popUpTwitter()"></i><div class="margin" id="buttonBox_middle"></div><i class="fab fa-line" onclick="popUpLine()"></i></div></div>';

        articles += article;
        return articles;
    }
    for (i = 0; i < data.length; i++) {
        var content = data[i];
        var author = content["author"];
        var contents = content["contents"];
        var article = '<div class="view_box"><div class="userInfo"><div class="user_icon">';
        article += author[0];
        article += '</div><div class="user_name">';
        article += author;
        article += '</div><div class="post_ID">' + content["id"] + '</div></div><div class="view_article">';
        article += contents;
        article += '</div><div class="view_buttonBox"><i class="fab fa-facebook-square" onclick="popUpFacebook(' + content["id"] + ')"></i><div class="margin" id="buttonBox_middle"></div><i class="fab fa-twitter-square" onclick="popUpTwitter(' + content["id"] + ')"></i><div class="margin" id="buttonBox_middle"></div><i class="fab fa-line" onclick="popUpLine(' + content["id"] + ')"></i></div></div>';

        articles += article;
    }
    return articles;
}

function clickSendBtn() {
    var authorVal = document.getElementById("post_name");
    var contentsVal = document.getElementById("post_article");
    var data = {
        author: authorVal.value,
        contents: contentsVal.value,
    };

    fetch("https://opso.ml/board", {
        method: "post",
        headers: {
            "Content-Type": "application/json; charset=UTF-8"
        },
        body: JSON.stringify(data)
    }).then();

    setTimeout(function () {
        getPost()
    }, 600);

}

function popUpTwitter(postID) {
    // window.open("https://naver.com/", "", "left=400, top=400, width=400, height=400, scrollbars=0, toolbar=0, menubar=0");
    window.open("https://twitter.com/intent/tweet?" +
        "&text=" + encodeURIComponent("WhatTimeIsItNow?") +
        "&url=" + encodeURIComponent(window.location.href+"?postID="+postID), "share!", "left=400, top=200, width=600, height=400, scrollbars= 0, toolbar=0, menubar=0"
    );
};

function popUpFacebook() {
    window.open("https://www.facebook.com/sharer/sharer.php" +
        "?u=" + encodeURIComponent(window.location.href+"?postID="+postID), "share!", "left=400, top=200, width=600, height=400, scrollbars= 0, toolbar=0, menubar=0"
    );
};

function popUpLine() {
    window.open("https://social-plugins.line.me/lineit/share" +
        "?url=" + encodeURIComponent(window.location.href+"?postID="+postID), "share!", "left=400, top=200, width=600, height=400, scrollbars= 0, toolbar=0, menubar=0"
    );
};

var qs = getQueryStringObject();
console.log(qs.postID);

if (qs.postId != undefined) {
    document.getElementById("contents_wrap").innerHTML = "";
    getPostByID(qs.postID);
} else {
    document.getElementById("contents_wrap").innerHTML = '<section class="post" id="post_wrap"><form action="https://opso.ml/board" method="POST"><textarea name="author" id="post_name" placeholder="이름"></textarea><textarea name="contents" id="post_article" placeholder="내용" rows="3"></textarea><button id="post_send" type="reset" onclick="clickSendBtn()">send</button></form></section><section class="view" id="view_wrap"></section>';
    getPost();
}

//'<section class="post" id="post_wrap"><form action="https://opso.ml/board" method="POST"><textarea name="author" id="post_name" placeholder="이름"></textarea><textarea name="contents" id="post_article" placeholder="내용" rows="3"></textarea><button id="post_send" type="reset" onclick="clickSendBtn()">send</button></form></section><section class="view" id="view_wrap"></section>';