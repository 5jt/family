/*
	Javascript library for family.5jt.com sjt@5jt.com 9apr2010
 */
///////////////////////////////////////////////////////////////////
function loadXMLDoc(filename)
{
if (window.ActiveXObject)
  {
  xhttp = new ActiveXObject("Msxml2.XMLHTTP");
  }
else 
  {
  xhttp = new XMLHttpRequest();
  }
xhttp.open("GET", filename, false);
try {xhttp.responseType = "msxml-document"} catch(err) {} // Helping IE11
xhttp.send("");
return xhttp.responseXML;
}
///////////////////////////////////////////////////////////////////
let displayResult = aPerson => {
	nColumns = max(floor(getWidth()/350),1);
	xml = loadXMLDoc("gallery.xml");
	xsl = loadXMLDoc("gallery.xsl");
	// code for IE
	if (window.ActiveXObject || xhttp.responseType == "msxml-document")
	  {
		let XSLTCompiled = new ActiveXObject("MSXML2.XSLTemplate");
		XSLTCompiled.stylesheet = xsl.documentElement;

		let xsltProc = XSLTCompiled.createProcessor();
		xsltProc.addParameter("cellsPerRow", nColumns);
		xsltProc.addParameter("myPerson", aPerson);

		xsltProc.input = xml;
		xsltProc.transform();
		ex=xsltProc.output;

		document.getElementById("WRAPPER").innerHTML=ex;
	  }
	// code for Chrome, Firefox, Opera, etc.
	else if (document.implementation && document.implementation.createDocument)
	  {
		let xsltProc = new XSLTProcessor();
		xsltProc.importStylesheet(xsl);
		xsltProc.setParameter(null, "cellsPerRow", nColumns);
		xsltProc.setParameter(null, "myPerson", aPerson);
		let resultDocument = xsltProc.transformToFragment(xml, document);
		let body = document.getElementById("debody");
		body.replaceChild(resultDocument, document.getElementById("WRAPPER"));
	  }
}
// http://www.mindlence.com/WP/?page_id=224
///////////////////////////////////////////////////////////////////
function floor (x) {return x-x%1;}
///////////////////////////////////////////////////////////////////
function getWidth() 
// http://www.howtocreate.co.uk/tutorials/javascript/browserwindow
{
var myWidth = 0;
if( typeof( window.innerWidth ) == 'number' ) {
	//Non-IE
	myWidth = window.innerWidth;
	myHeight = window.innerHeight;
} else if( document.documentElement && document.documentElement.clientWidth ) 
{
	//IE 6+ in 'standards compliant mode'
	myWidth = document.documentElement.clientWidth;
} else if( document.body && document.body.clientWidth ) 
{
	//IE 4 compatible
	myWidth = document.body.clientWidth;
}
return myWidth;
}
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
function loadXMLObj(dname)
{
var XML = new ActiveXObject("MSXML2.FreeThreadedDomDocument");
XML.async = "false";
XML.load(dname);
return XML;
}
///////////////////////////////////////////////////////////////////
function max (x,y) {return x>y ? x : y;}
