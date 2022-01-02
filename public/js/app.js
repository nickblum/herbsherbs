function navigate(el, url){
    document.getElementById('hamburger').checked = false
    const title = el.innerHTML
    const response = {html:title,pageTitle:title}
    document.getElementById("main-content").innerHTML = response.html;
    document.getElementById("navdsp").innerHTML = title
    document.title = title;

    window.history.pushState({"html":response.html,"pageTitle":response.pageTitle},"", url);
}

window.onpopstate = function(e){
    if(e.state){
        document.getElementById("main-content").innerHTML = e.state.html;
        document.title = e.state.pageTitle;
    }
};