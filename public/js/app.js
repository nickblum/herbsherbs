function ajaxNavigate(url){
    document.getElementById('hamburger').checked = false
    fetch(url+'.json').then(function (response) {
        // The API call was successful!
        return response.json()
    }).then(function (response) {
        // This is the HTML from our response as a text string
        document.title = 'NOX \u2014 '+response.title

        const $navTitle = $('#navdsp');
        const $mainContent = $('#main-content')
        $navTitle.add($mainContent).fadeOut(100,()=>{
            $navTitle.html(response.title)
            $mainContent.html(response.html)
            $navTitle.add($mainContent).fadeIn(100,()=>{})
        })

        window.history.pushState({"html":response.html,"pageTitle":response.title},"", url);
    }).catch(function () {
        // redirect the old fashioned way
        window.location.href = url
    });
}
window.onload = function(){
    const mainContent = document.getElementById('main-content').innerHTML
    const navTitle = document.getElementById('navdsp').innerHTML
    window.history.pushState({"html":mainContent,"pageTitle":navTitle},"", window.location.href);
}
window.onpopstate = function(e){
    console.log(e.state)
    if (e.state){
        document.getElementById('main-content').innerHTML = e.state.html
        document.getElementById('navdsp').innerHTML = e.state.pageTitle
        document.title = 'NOX \u2014 ' + e.state.pageTitle
    } else {
        window.history.back()
    }
};