
function dimDiff(div,nottel,tel){
    var [w,h]=[0,0];
    for (var i = 0; i < nottel.length; i++) {
        var child = nottel[i];
        [w,h]=[w+child.offsetWidth,h+child.offsetHeight];
    }
    return [(div.clientWidth-w) + "px",(div.clientHeight-h) + "px"];
}

function telescope(div){
    const children = [...div.childNodes].filter(e=> e.classList.contains("R"));
    const nottel = [...children].filter(e => e.classList.contains("nottel"));
    const tel = [...children].filter(e =>  e.classList.contains("tel"));
    /* Do some telescoping */
    if (tel.length == 1){
        const t = tel[0];
        const [dwidth,dheight] = dimDiff(div,nottel,t)
        const side = div.getAttribute('childfloat');
        const h = side=="left" || side=="right";
        const v = side=="top" || side=="bottom";
        if (h) { t.style.width = dwidth;}
        else if (v){ t.style.height = dheight;}
    }

    /* Alert Multi Telescope Issue */
    if (tel.length > 1){
        console.log("Warning. too many telescopic rects.");return;
    }

    /* Recurse */
    for (var i = 0; i < children.length; i++) {
        const child = children[i]
        telescope(child);
    }

}

function startTelescope(){
    window.onresize = function(e) {telescope(app);};
    telescope(app);
}