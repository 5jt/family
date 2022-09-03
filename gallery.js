/*
    Javascript library for family.5jt.com sjt@5jt.com 9apr2010
 */
///////////////////////////////////////////////////////////////////
function loadXMLDoc(dname)
{
if (window.XMLHttpRequest) {xhttp=new XMLHttpRequest();}
else {xhttp=new ActiveXObject("Microsoft.XMLHTTP");}
xhttp.open("GET",dname,false);
xhttp.send("");
return xhttp.responseXML;
}
///////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', () => {
    xml = loadXMLDoc("gallery.xml");
    xsl = loadXMLDoc("gallery.xsl");
    console.log('Loaded XML and XSL');
    populateFor('All'); // replace article
    // setImageListeners(document.querySelectorAll('figure');
});
///////////////////////////////////////////////////////////////////
populateFor = aPerson => {
    let title = document.querySelector('body>header>h1');
    title.innerText = 'Loading…';
    // code for IE
    if (window.ActiveXObject || xhttp.responseType == "msxml-document")
      {
        let XSLTCompiled = new ActiveXObject("MSXML2.XSLTemplate");
        XSLTCompiled.stylesheet = xsl.documentElement;

        let xsltProc = XSLTCompiled.createProcessor();
        xsltProc.addParameter("myPerson", aPerson);

        xsltProc.input = xml;
        xsltProc.transform();
        ex=xsltProc.output;

        document.querySelector("article").innerHTML=ex;
        title.innerText = 'Family pictures (IE)';
      }
    // code for Chrome, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument)
      {
        let xsltProc = new XSLTProcessor();
        xsltProc.importStylesheet(xsl);
        xsltProc.setParameter(null, "myPerson", aPerson);
        let art = xsltProc.transformToFragment(xml, document);
        document.querySelector('body').replaceChild(art, document.querySelector("article"));
        title.innerText = 'Family pictures' + (aPerson=='All' ? '' : ' for ' + aPerson);
      }
    else {
        title.innerText = 'Unable to load pictures';
      }
    figs = document.querySelectorAll('figure');
    console.log(figs.length + ' images rendered');
    // callbacks for content filters
    document.querySelector('nav').addEventListener('click', e => {
        console.log('Clicked filter ' + e.target.innerText);
        if( e.target.tagName == 'LI') {
            document.querySelectorAll('nav li').className = 'tocoff';
            populateFor(e.target.innerText);
            e.target.className = 'tocon';
        }
    });
    // callbacks for click on images
    document.querySelector('section').addEventListener('click', function(e) {
        console.log('Clicked on ' + e.target.tagName);
        console.log('Handling ' + this.tagName);
        if( e.target.tagName == 'IMG') { // click only on image
            let thisImg = e.target;
            let thisFig = thisImg.parentNode;
            let open = thisFig.className == 'thumb'; // clicked thumbnail
            [...figs].forEach( fig => {
                switch( fig.className ) {
                    case 'selected': // revert to thumb
                        fig.style.maxHeight = '250px';
                        fig.style.maxWidth = '150px';
                        let img = fig.querySelector('img');
                        img.style.maxHeight = '230px';
                        img.style.maxWidth = '140px';
                        let newWid = img.offsetWidth + 'px';
                        fig.querySelector('figcaption').style.width = newWid;
                        fig.querySelector('header').style.width = newWid;
                    case 'hidden':
                        fig.className = 'thumb';
                        break;
                    default: // hide thumb
                        fig.className = 'hidden';
                }
            });
            if( open ) {
                thisFig.className = 'selected';
                thisImg.style.maxHeight = Math.floor(.8 * window.innerHeight) + 'px';
                thisImg.style.maxWidth = Math.floor(.8 * window.innerWidth) + 'px';
                let newWid = thisImg.offsetWidth + 'px';
                thisFig.querySelector('figcaption').style.width = newWid;
                thisFig.querySelector('header').style.width = newWid;
            }
        }
    });
};
// http://www.mindlence.com/WP/?page_id=224
///////////////////////////////////////////////////////////////////


//     let figs = document.querySelectorAll('figure');
//     // let images = document.querySelectorAll('img');
//     console.log('Found ' + figs.length + ' figures');
//     document.querySelector('header>h1').innerText = 'Family pictures';
//     // document.querySelector('article').style.display = 'block';

//     [...figs]
//         .forEach( fig => {
//             fig.className ='thumb'; // reveal
//             fig.addEventListener('click', function(e) {
//                 console.log('Clicked on ' + e.target.tagName);
//                 console.log('Handler running on ' + this.tagName);
//                 let open = this.className == 'thumb'; // clicked thumbnail
//                 [...figs]
//                     .forEach( fig => {
//                         switch( fig.className ) {
//                             case 'selected': // revert to thumb
//                                 fig.style.maxHeight = '250px';
//                                 fig.style.maxWidth = '150px';
//                                 let img = fig.querySelector('img');
//                                 img.style.maxHeight = '230px';
//                                 img.style.maxWidth = '140px';
//                             case 'hidden':
//                                 fig.className = 'thumb';
//                                 break;
//                             default: // hide thumb
//                                 fig.className = 'hidden';
//                         }
//                     });
//                 if( open ) {
//                     this.className = 'selected';
//                     let img = this.querySelector('img');
//                     img.style.maxHeight = Math.floor(.8 * window.innerHeight);
//                     img.style.maxWidth = Math.floor(.8 * window.innerWidth);
//                     this.style.width = img.offsetWidth+20;
//                 }
//             });
//         });

// });