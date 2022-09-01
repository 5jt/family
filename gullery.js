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
window.addEventListener('load', (event) => {
    console.log('Page has loaded');
    let title = document.querySelector('body>header>h1');
    title.innerText = 'Loading…';
    xml = loadXMLDoc("gullery.xml");
    xsl = loadXMLDoc("gullery.xsl");
    // code for IE
    if (window.ActiveXObject || xhttp.responseType == "msxml-document")
      {
        let XSLTCompiled = new ActiveXObject("MSXML2.XSLTemplate");
        XSLTCompiled.stylesheet = xsl.documentElement;

        let xsltProc = XSLTCompiled.createProcessor();
        // xsltProc.addParameter("cellsPerRow", nColumns);
        // xsltProc.addParameter("myPerson", aPerson);

        xsltProc.input = xml;
        xsltProc.transform();
        ex=xsltProc.output;

        document.getElementById("WRAPPER").innerHTML=ex;
        title.innerText = 'Family pictures (IE)';
      }
    // code for Chrome, Firefox, Opera, etc.
    else if (document.implementation && document.implementation.createDocument)
      {
        let xsltProc = new XSLTProcessor();
        xsltProc.importStylesheet(xsl);
        // xsltProc.setParameter(null, "cellsPerRow", nColumns);
        // xsltProc.setParameter(null, "myPerson", aPerson);
        let resultDocument = xsltProc.transformToFragment(xml, document);
        let body = document.getElementById("debody");
        body.replaceChild(resultDocument, document.getElementById("WRAPPER"));
        title.innerText = 'Family pictures';
      }
    else {
        title.innerText = 'Unable to load pictures';
      }
});
// http://www.mindlence.com/WP/?page_id=224


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