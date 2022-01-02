function ajaxNavigate(url){
    document.getElementById('hamburger').checked = false
    fetch('/ajax_'+url).then(function (response) {
        // The API call was successful!
        return response.json();
    }).then(function (response) {
        // This is the HTML from our response as a text string
        document.title = 'NOX \u2014 '+response.title;

        const $navTitle = $('#navdsp');
        const $mainContent = $('#main-content')

/**
 * 
 * 
 * 
 * 
 * TODO: PUSH STATE AFTER TRANSITION/LOAD
 * 
 * 
 * 
 */
const bodyHTML = document.getElementsByTagName('body')[0].innerHTML;
window.history.pushState({"html":bodyHTML,"pageTitle":document.title},"", "/"+url);

        $navTitle.add($mainContent).fadeOut(100,()=>{
            $navTitle.html(response.title)
            $mainContent.html(response.html)
            $navTitle.add($mainContent).fadeIn(100,()=>{})
        })
    }).catch(function () {
        // redirect the old fashioned way
        window.location.href = url
    });
}

window.onpopstate = function(e){
    if(e.state){
        document.getElementsByTagName('body')[0].innerHTML = e.state.html;
        document.title = e.state.pageTitle;
    }
};