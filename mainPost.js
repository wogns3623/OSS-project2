var request = new XMLHttpRequest();
var serverAddress = "https://opso.ml/board";
// var serverAddress = "http://18.216.159.54/board";

function getPost() {
    request.open("GET", serverAddress, true);
    request.send();
}

getPost();

// request.onload = function() {
//   if (request.status === 200 || request.status === 201) {
//     console.log(request.responseText);
//   } else {
//     console.error(request.responseText);
//   }
// };

request.onreadystatechange = function (event) {
    if (request.readyState == 4) {
        if (request.status == 200) {
            var data = JSON.parse(JSON.parse(request.responseText));
            var articles = "";
            for (i = 0; i < data.length; i++) {
                content = data[i];
                author = content["author"];
                contents = content["contents"];
                article = '<div class="view_box"><div class="userInfo"><div class="user_icon">';
                article += author[0];
                article += '</div><div class="user_name">';
                article += author;
                article += '</div></div><div class="view_article">';
                article += contents;
                article += '</div><div class="view_buttonBox"><i class="fab fa-facebook-square" onclick="popUpFacebook()"></i><div class="margin" id="buttonBox_middle"></div><i class="fab fa-twitter-square" onclick="popUpTwitter()"></i><div class="margin" id="buttonBox_middle"></div><i class="fab fa-line"></i></div></div>';

                articles += article;
            }
            document.getElementById("view_wrap").innerHTML = articles;
        }
    }
}

function clickSendBtn() {
    // var authorVal = document.getElementById("post_name");
    // var contentsVal = document.getElementById("post_article");
    // var data = {
    //     author: authorVal.value,
    //     contents: contentsVal.value,
    // };

    // request.open("POST", serverAddress, true);
    // request.setRequestHeader('Content-Type', 'application/json');
    // request.send( JSON.stringify(data) );
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

function popUpTwitter(){
    // window.open("https://naver.com/", "", "left=400, top=400, width=400, height=400, scrollbars=0, toolbar=0, menubar=0");
    window.open("https://twitter.com/intent/tweet?"
    +"&text="+encodeURIComponent("WhatTimeIsItNow?")
    +"&url="+encodeURIComponent(window.location.href)
    , "share!"
    , "left=400, top=200, width=600, height=400, scrollbars= 0, toolbar=0, menubar=0"
    );
};

function popUpFacebook(){
    window.open("https://www.facebook.com/sharer/sharer.php"
    +"?u="+encodeURIComponent(window.location.href)
    , "share!"
    , "left=400, top=200, width=600, height=400, scrollbars= 0, toolbar=0, menubar=0"
    );
};