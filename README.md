# Projet_Fleet

    let xhr=new XMLHttpRequest();
    xhr.onloadend=function(){
        console.log(JSON.parse(this.response))
    };
    xhr.open("GET", "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=6d65c3fafe2e46113478c6e83f7afce6");
    xhr.send();