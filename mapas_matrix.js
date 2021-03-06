///////////Creación variable mapa/////////// 
var map = L.map('map', {
		zoomControl: false,
		center: [39.5, -2.5],
		zoom: 8,
		minZoom: 3,
		maxZoom: 20,
		maxBounds: [
			[20, -50],
			[50, 50]
			],
	});



///////////Funcionalidades estructura del visor///////////

//Layers on top

map.createPane('límites');
// This pane is above markers but below popups
map.getPane('límites').style.zIndex = 650;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('límites').style.pointerEvents = 'none';
//Labels on top
map.createPane('labels');
// This pane is above markers but below popups
map.getPane('labels').style.zIndex = 800;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('labels').style.pointerEvents = 'none';
//bindTooltip on top
map.createPane('popups');
// el popup aparece al arrastar encima de todo pero debajo del popup que aparece al clicar
map.getPane('popups').style.zIndex = 1000;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups').style.pointerEvents = 'none';
//bindPopup on top
map.createPane('popups1');
// aparece por encima de todas las capas
map.getPane('popups1').style.zIndex = 1500;
// Layers in this pane are non-interactive and do not obscure mouse/touch events
map.getPane('popups1').style.pointerEvents = 'none';



//Barra de interacción de capas	tantaas sildebar como grupos de capas


var sidebar = L.control.sidebar('sidebar', { closeButton:true, position: 'left' });
	map.addControl(sidebar);
	sidebar.hide();			
	sidebar.show();
	sidebar.toggle();
var visible = sidebar.isVisible();
var button = new L.Control.Button(L.DomUtil.get('helpbutton'), { toggleButton: 'active', position: 'topleft'});
	button.addTo(map);
	button.on('click', function () {
	 if (button.isToggled()) {
			sidebar.hide();
		} else {
			sidebar.show();
		}
	});
var sidebar2 = L.control.sidebar('sidebar2', { closeButton:true, position: 'right' });
	map.addControl(sidebar2);
	sidebar2.hide();			
	sidebar2.show();
	sidebar2.toggle();
var visible2 = sidebar.isVisible();

//Buscador
var geocoder = L.Control.geocoder({ position: 'topleft',
	//defaultMarkGeocode: false
	}).addTo(map);

///////////Diseño caracteriticas basicas del visor///////////
//Título
var title2 = L.control({position: 'topright'});
	title2.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info2');
	 div.innerHTML +=
	 'VISOR CARTOGRÁFICO<br><br><h3>Brechas de género del desempleo por sectores.<h4>Municipios de Castilla-La Mancha.';
	 return div;
	};
	title2.addTo(map);

//Logo Matrix	
var title1 = L.control({position: 'bottomright'});
	title1.onAdd = function (map) {
var div = L.DomUtil.create('div', 'info1');
	 div.innerHTML +=
	 '<a href="https://www.fundacionmatrix.es"><img src="images/matrix_nuevo.png" width="100px" height="55px"></img></a>'; 
	 return div;
	};
	title1.addTo(map);
		//Logo proyecto

var title4 = L.control({position: 'bottomright'});
	title4.onAdd = function (map) {
var div = L.DomUtil.create('div','info4');
	 div.innerHTML +=
	 '<a><img src="images/logo_brela.png" width="100px" height="70px" ></img></a>';
	 return div;
	};
	title4.addTo(map); 

	//Logo mayorsig
/*var title3 = L.control({position: 'bottomright'});
	title3.onAdd = function (map) {
var div = L.DomUtil.create('div','info3');
	 div.innerHTML +=
	 '<a><img src="images/MAYORSIG.jpg" width="90px" height="63px" ></img></a>';
	 return div;
	};
	title3.addTo(map);  
*/

///////////Cartografía de referencia///////////
var Mapa_fondo = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2021 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	}).addTo(map);		
//			var positron = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB'
//			}).addTo(map);
//			var positronLabels = L.tileLayer('http://{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}.png', {
//			attribution: '©OpenStreetMap, ©CartoDB',
//			pane: 'labels'
//			}).addTo(map);
var osm = L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy'
	});
var osm1 = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/{z}/{x}/{y}.png', {
	maxZoom: 18,
	opacity: 0,
	attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
	});
var osm2 = new L.TileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
	minZoom: 0, 
	maxZoom: 13,
	});
var osm3 = L.tileLayer('http://{s}.tiles.wmflabs.org/bw-mapnik/ {z}/{x}/{y}.png', { maxZoom: 18, opacity: 0.4, 
	attribution: '<a href="http://www.openstreetmap.org/copyright">OpenStreetMap </a>| Map data © 2021 <a href="https://www.fundacionmatrix.es"><strong>Fundación Matrix</strong></a>',
	});


//Límites
/*var comunidades = L.geoJson(comunidades, {
	color: "#17202A", 
	weight: 1.4,
	opacity: 0.3,
	fillOpacity: 0,
		attribution: '| © <a href="http://www.ign.es">Instituto Geográfico Nacional |'			
	}).addTo(map);
*/


///////////Otras funcionalidades

//minimapa	
var miniMap = new L.Control.MiniMap(osm2, { toggleDisplay: true, position:"bottomright", width:100,height:100,}).addTo(map); 					
//zoomHome
var zoomHome = L.Control.zoomHome({ position: 'topleft', homeCoordinates:[39.5, -3], zoomHomeTitle:'Posición inicial'}).addTo(map);
//fullscreen						
var fsControl = new L.Control.FullScreen();
	map.addControl(fsControl);
	map.on('enterFullscreen', function(){
	if(window.console) window.console.log('enterFullscreen');
	});
	map.on('exitFullscreen', function(){
	if(window.console) window.console.log('exitFullscreen');
	});
	L.control.scale().addTo(map);

///////////Estilo de las capas especificas del visor///////////


//capas de limites

//prov_limit.js

function styleprov(feature) {
	return {
		//fillColor: getColor1(feature.properties.), aqui relleno no se asocia a ningun valor
		weight: 1.3,
		opacity: 1,
		color: 'black',
		//dashArray: '0',
		fillOpacity: 0
	};

};




//estilo y popups de brecha de genero desempleo en agrario


function getColor1(a) {
	return a <= -80 ? '#2C83B9' :
	a <= -60 ? '#63ABAF' :
	a <= -40 ? '#9FD2A7' :
	a <= -20 ? '#C7E9AD':
	a <= 0.0000001  ? '#EEF8B9' :
	a <= 20 ? '#FFEEA9' :
	a <= 40 ? '#FECA81' :
	a <= 60  ? '#F89D5A' :
	a <= 80  ? '#E75B3A' :
	a <= 100  ? '#D7191B' :	
		'YELLOW';
};


function style1(feature) {
	return {
		fillColor: getColor1(feature.properties.bg_AGRICUL), // MUY IMPORTANTE, NO OLVIDAR PONER NOMBRE DE CAMPO EN TABLA.(DESPUES DE PROPERTIES)
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

function popup1(feature, layer) {

	if (feature.properties && feature.properties.bg_AGRICUL) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.nameunit_3.toLocaleString()+"<br>"
            	+"<strong>Brecha de género: </strong>"+feature.properties.bg_AGRICUL.toFixed(0).toLocaleString().replace(".",",")+"%",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};



var geojson1 = L.geoJson(desempleo,{
	style: style1,
	onEachFeature: popup1
});




//estilos y pop up brecha de genero desempleo construccion

function getColor2(a) {
	return a <= -80 ? '#2C83B9' :
	a <= -60 ? '#63ABAF' :
	a <= -40 ? '#9FD2A7' :
	a <= -20 ? '#C7E9AD':
	a <= 0.0000001  ? '#EEF8B9' :
	a <= 20 ? '#FFEEA9' :
	a <= 40 ? '#FECA81' :
	a <= 60  ? '#F89D5A' :
	a <= 80  ? '#E75B3A' :
	a <= 100  ? '#D7191B' :	
		'YELLOW';
};


function style2(feature) {
	return {
		fillColor: getColor2(feature.properties.bg_CONSTRU),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};
function popup2(feature, layer) {

	if (feature.properties && feature.properties.bg_CONSTRU) {
		layer.bindTooltip("<div id='custom'>"
		+"<strong>Municipio: </strong>"+feature.properties.nameunit_3.toLocaleString()+"<br>"
             
            	+"<strong>Brecha de género: </strong>"+feature.properties.bg_CONSTRU.toFixed(0).toLocaleString().replace(".",",")+"%",

			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};




var geojson2 = L.geoJson(desempleo, {
	style: style2,
	onEachFeature: popup2


});


//estilos y pop up brecha de genero desempleo industria


function getColor3(a) {
	return a <= -80 ? '#2C83B9' :
	a <= -60 ? '#63ABAF' :
	a <= -40 ? '#9FD2A7' :
	a <= -20 ? '#C7E9AD':
	a <= 0.0000001  ? '#EEF8B9' :
	a <= 20 ? '#FFEEA9' :
	a <= 40 ? '#FECA81' :
	a <= 60  ? '#F89D5A' :
	a <= 80  ? '#E75B3A' :
	a <= 100  ? '#D7191B' :	
		'YELLOW';
};

function style3(feature) {
	return {
		fillColor: getColor3(feature.properties.bg_INDUSTR),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};

function popup3(feature, layer) {

	if (feature.properties && feature.properties.bg_INDUSTR) {
		layer.bindTooltip("<div id='custom'>"
             	+"<strong>Municipio: </strong>"+feature.properties.nameunit_3.toLocaleString()+"<br>"
		
		+"<strong>Brecha de género: </strong>"+feature.properties.bg_INDUSTR.toFixed(0).toLocaleString().replace(".",",")+"%",
			
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};


var geojson3 = L.geoJson(desempleo, {
	style: style3,
	onEachFeature: popup3
});


//estilos y pop up brecha de genero desempleo servicios


function getColor4(a) {
	return a <= -80 ? '#2C83B9' :
	a <= -60 ? '#63ABAF' :
	a <= -40 ? '#9FD2A7' :
	a <= -20 ? '#C7E9AD':
	a <= 0.0000001  ? '#EEF8B9' :
	a <= 20 ? '#FFEEA9' :
	a <= 40 ? '#FECA81' :
	a <= 60  ? '#F89D5A' :
	a <= 80  ? '#E75B3A' :
	a <= 100  ? '#D7191B' :	
		'YELLOW';
};

function style4(feature) {
	return {
		fillColor: getColor4(feature.properties.bg_SERVICI),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};
function popup4(feature, layer) {

	if (feature.properties && feature.properties.bg_SERVICI) {
		layer.bindTooltip("<div id='custom'>"
             	+"<strong>Municipio: </strong>"+feature.properties.nameunit_3.toLocaleString()+"<br>"
		
		+"<strong>Brecha de género: </strong>"+feature.properties.bg_SERVICI.toFixed(0).toLocaleString().replace(".",",")+"%",
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};


var geojson4 = L.geoJson(desempleo, {
	style: style4,
	onEachFeature: popup4
});


//estilos y pop up brecha de genero desempleo sin ocupacion previa


function getColor5(a) {
	return a <= -80 ? '#2C83B9' :
	a <= -60 ? '#63ABAF' :
	a <= -40 ? '#9FD2A7' :
	a <= -20 ? '#C7E9AD':
	a <= 0.0000001  ? '#EEF8B9' :
	a <= 20 ? '#FFEEA9' :
	a <= 40 ? '#FECA81' :
	a <= 60  ? '#F89D5A' :
	a <= 80  ? '#E75B3A' :
	a <= 100  ? '#D7191B' :	
		'YELLOW';
};

function style5(feature) {
	return {
		fillColor: getColor4(feature.properties.bg_SECTOR),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};
function popup5(feature, layer) {

	if (feature.properties && feature.properties.bg_SECTOR) {
		layer.bindTooltip("<div id='custom'>"
             	+"<strong>Municipio: </strong>"+feature.properties.nameunit_3.toLocaleString()+"<br>"
		
		+"<strong>Brecha de género: </strong>"+feature.properties.bg_SECTOR.toFixed(0).toLocaleString().replace(".",",")+"%",
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};


var geojson5 = L.geoJson(desempleo, {
	style: style5,
	onEachFeature: popup5
});


//estilos y pop up de clasificacion brecha de genero en el desempleo


function getColor6(a) {
	return a == 'Masculinización moderada agraria \ny ligera en construcción,\n y feminización moderada en servicios' ? '#fff385' :
	a == 'Masculinización moderada en \n construcción y feminización \n intensa en servicios' ? '#52d89d' :
		a == 'Masculinización ligera \n en servicios' ? '#3428e4' :
		'YELLOW';
};

function style6(feature) {
	return {
		fillColor: getColor6(feature.properties.paro_gr_gr),
		weight: 1,
		opacity: 1,
		color: 'black',
		dashArray: '0',
		fillOpacity: 1
	};

};
function popup6(feature, layer) {

	if (feature.properties && feature.properties.paro_gr_gr) {
		layer.bindTooltip("<div id='custom'>"
             	+"<strong>Municipio: </strong>"+feature.properties.nameunit_3.toLocaleString()+"<br>"
		
		+"<strong>Clase: </strong>"+feature.properties.paro_gr_gr,
			{direction:"centerleft",sticky:true, permanente:true,offset:[0,-5], pane: 'popups',});	
	};
};


var geojson6 = L.geoJson(desempleo, {
	style: style6,
	onEachFeature: popup6
});



//capas de limites. La última capa en declarar se ubica siempre encima de las demás.

// rios.js
/*
function stylerios(feature) {
	return {
		//fillColor: getColor1(feature.properties.), aqui relleno no se asocia a ningun valor
		weight: 3,
		opacity: 1,
		color: '#42f5ef',
		dashArray: '0',
		//fillOpacity: 0.8
	};

};

var rios = L.geoJson(rios,{
	style: stylerios,
	
}).addTo(map);

//Buscador de ríos
var searchControl = new L.Control.Search({
       layer: rios,
       propertyName: 'NOM_RIO',
       marker: false,
		moveToLocation: function(latlng) {
			console.log(latlng +" Coordinates");
  			map.setView(latlng, 10); // set the zoom
		}
});

map.addControl(searchControl);
*/

//Renombrado y ordenado de capas mapas geojson
var prov = L.geoJson(prov_limit,{
	style : styleprov
});


var mapa1 = L.layerGroup([geojson1,prov]).addTo(map);
var mapa2 = L.layerGroup([geojson2,prov]);
var mapa3 = L.layerGroup([geojson3,prov]);
var mapa4 = L.layerGroup([geojson4,prov]);
//var mapa5 = L.layerGroup([geojson5,prov]);
var mapa6 = L.layerGroup([geojson6,prov]);


// LISTA DESPLEGABLE

var baseTree = [
	{ label: "<strong>Limpiar mapa", layer: osm3 },
	{
	label: '<strong>Brechas de género del desempleo por sectores. Municipios de Castilla-La Mancha.',
	children: [
	
	    	{ label: "Brecha de género en el desempleo en el sector Agricultura",layer: mapa1},
		{ label: "Brecha de género en el desempleo en el sector Construcción",layer: mapa2},
	    	{ label: "Brecha de género en el desempleo en el sector Industria",layer: mapa3},
		{ label: "Brecha de género en el desempleo en el sector Servicios",layer: mapa4},
		//{ label: "Brecha de género en el desempleo de personas sin ocupación previa",layer: mapa5},
		{ label: "Clasificación de municipios de Castilla-La Mancha por su brecha de género en el desempleo",layer: mapa6}
		
		 ]
	},
	];
	
	
// var overlayTree = {
// 	label: 'Mapas de prov',
// 	children: [
	
// 		//{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
// 		{ label: "Map", layer: prov},
// 		]
// };	

var overlayTree = {
	label: 'Mapas de referencia',
	children: [
	
		//{ label: "<b>Límites de Comunidades Autónomas", layer: comunidades},
		{ label: "OpenStreetMap", layer: osm}
		]
};	

// sector agrario

var htmlLegend1 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Brecha de género en el desempleo en el sector Agricultura'+"<\h2>",
			style: style1,
			layer: geojson1,
			elements: [{


				label:"<h4>"+  '<br>Diferencias por municipio en el índice de concentración de desempleo.<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> %'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '-100 ‒ -80'+"</strong><\h15>",html: '',style: {'background-color': '#2c83b9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-80 ‒ -60'+"</strong><\h15>",html: '',style: {'background-color': '#63abaf','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-60 ‒ -40'+"</strong><\h15>",html: '',style: {'background-color': '#9fd2a7','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-40 ‒ -20'+"</strong><\h15>",html: '',style: {'background-color': '#c7e9ad','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-20 ‒ 0'+"</strong><\h15>",html: '',style: {'background-color': '#eef8b9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '0 ‒ 20'+"</strong><\h15>",html: '',style: {'background-color': '#ffeea9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '20 ‒ 40'+"</strong><\h15>",html: '',style: {'background-color': '#feca81','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '40 ‒ 60'+"</strong><\h15>",html: '',style: {'background-color': '#f89d5a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '60 ‒ 80'+"</strong><\h15>",html: '',style: {'background-color': '#e75b3a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '80 ‒ 100'+"</strong><\h15>",html: '',style: {'background-color': '#d7191b','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {	

				label: "<h5>" +'<BR><i>Fuente: Elaboración propia a partir de datos del Observatorio del Mercado de Trabajo de Castilla-La Mancha y del Instituto Nacional de Estadística (2021).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend1);


// sector de la construcción


var htmlLegend2 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Brecha de género en el desempleo en el sector Construcción'+"<\h2>",
			style: style2,
			layer: geojson2,
			elements: [{


				label:"<h4>"+  '<br>Diferencias por municipio en el índice de concentración de desempleo.<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> %'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '-100 ‒ -80'+"</strong><\h15>",html: '',style: {'background-color': '#2c83b9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-80 ‒ -60'+"</strong><\h15>",html: '',style: {'background-color': '#63abaf','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-60 ‒ -40'+"</strong><\h15>",html: '',style: {'background-color': '#9fd2a7','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-40 ‒ -20'+"</strong><\h15>",html: '',style: {'background-color': '#c7e9ad','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-20 ‒ 0'+"</strong><\h15>",html: '',style: {'background-color': '#eef8b9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '0 ‒ 20'+"</strong><\h15>",html: '',style: {'background-color': '#ffeea9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '20 ‒ 40'+"</strong><\h15>",html: '',style: {'background-color': '#feca81','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '40 ‒ 60'+"</strong><\h15>",html: '',style: {'background-color': '#f89d5a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '60 ‒ 80'+"</strong><\h15>",html: '',style: {'background-color': '#e75b3a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '80 ‒ 100'+"</strong><\h15>",html: '',style: {'background-color': '#d7191b','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {	
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia a partir de datos del Observatorio del Mercado de Trabajo de Castilla-La Mancha y del Instituto Nacional de Estadística (2021).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend2);


// sector de la industria


var htmlLegend3 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Brecha de género en el desempleo en el sector Industria'+"<\h2>",
			style: style3,
			layer: geojson3,
			elements: [{


				label:"<h4>"+  '<br>Diferencias por municipio en el índice de concentración de desempleo.<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br>'+' %'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '-100 ‒ -80'+"</strong><\h15>",html: '',style: {'background-color': '#2c83b9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-80 ‒ -60'+"</strong><\h15>",html: '',style: {'background-color': '#63abaf','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-60 ‒ -40'+"</strong><\h15>",html: '',style: {'background-color': '#9fd2a7','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-40 ‒ -20'+"</strong><\h15>",html: '',style: {'background-color': '#c7e9ad','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-20 ‒ 0'+"</strong><\h15>",html: '',style: {'background-color': '#eef8b9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '0 ‒ 20'+"</strong><\h15>",html: '',style: {'background-color': '#ffeea9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '20 ‒ 40'+"</strong><\h15>",html: '',style: {'background-color': '#feca81','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '40 ‒ 60'+"</strong><\h15>",html: '',style: {'background-color': '#f89d5a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '60 ‒ 80'+"</strong><\h15>",html: '',style: {'background-color': '#e75b3a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '80 ‒ 100'+"</strong><\h15>",html: '',style: {'background-color': '#d7191b','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {	
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia a partir de datos del Observatorio del Mercado de Trabajo de Castilla-La Mancha y del Instituto Nacional de Estadística (2021).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend3);



// sector servicios


var htmlLegend4 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Brecha de género en el desempleo en el sector Servicios'+"<\h2>",
			style: style4,
			layer: geojson4,
			elements: [{


				label:"<h4>"+  '<br>Diferencias por municipio en el índice de concentración de desempleo.<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> %'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '-100 ‒ -80'+"</strong><\h15>",html: '',style: {'background-color': '#2c83b9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-80 ‒ -60'+"</strong><\h15>",html: '',style: {'background-color': '#63abaf','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-60 ‒ -40'+"</strong><\h15>",html: '',style: {'background-color': '#9fd2a7','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-40 ‒ -20'+"</strong><\h15>",html: '',style: {'background-color': '#c7e9ad','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-20 ‒ 0'+"</strong><\h15>",html: '',style: {'background-color': '#eef8b9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '0 ‒ 20'+"</strong><\h15>",html: '',style: {'background-color': '#ffeea9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '20 ‒ 40'+"</strong><\h15>",html: '',style: {'background-color': '#feca81','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '40 ‒ 60'+"</strong><\h15>",html: '',style: {'background-color': '#f89d5a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '60 ‒ 80'+"</strong><\h15>",html: '',style: {'background-color': '#e75b3a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '80 ‒ 100'+"</strong><\h15>",html: '',style: {'background-color': '#d7191b','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {	
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia a partir de datos del Observatorio del Mercado de Trabajo de Castilla-La Mancha y del Instituto Nacional de Estadística (2021).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend4);


// sin ocupación previa
/*
var htmlLegend5 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Brecha de género en el desempleo de personas sin ocupación previa'+"<\h2>",
			style: style5,
			layer: geojson5,
			elements: [{


				label:"<h4>"+  '<br>Diferencias por municipio en el índice de concentración de desempleo entre hombres y mujeres sin ocupación previa<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> %'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h3>"+  '-100 ‒ -80'+"</strong><\h15>",html: '',style: {'background-color': '#2c83b9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-80 ‒ -60'+"</strong><\h15>",html: '',style: {'background-color': '#63abaf','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-60 ‒ -40'+"</strong><\h15>",html: '',style: {'background-color': '#9fd2a7','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-40 ‒ -20'+"</strong><\h15>",html: '',style: {'background-color': '#c7e9ad','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-20 ‒ 0'+"</strong><\h15>",html: '',style: {'background-color': '#eef8b9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '0 ‒ 20'+"</strong><\h15>",html: '',style: {'background-color': '#ffeea9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '20 ‒ 40'+"</strong><\h15>",html: '',style: {'background-color': '#feca81','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '40 ‒ 60'+"</strong><\h15>",html: '',style: {'background-color': '#f89d5a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '60 ‒ 80'+"</strong><\h15>",html: '',style: {'background-color': '#e75b3a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '80 ‒ 100'+"</strong><\h15>",html: '',style: {'background-color': '#d7191b','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {	
				
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia a partir de datos del Instituto de Estadística de Castilla-La Mancha (2020)<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend5);

*/
// clasificación

var htmlLegend6 = L.control.htmllegend({
		position: 'bottomleft',
		legends: [{
			name: "<h2>"+ 'Clasificación de municipios de Castilla-La Mancha por su brecha de género en el desempleo (2020)'+"<\h2>",
			style: style6,
			layer: geojson6,
			elements: [{


				label:"<h4>"+  '<br>Clases de municipios definidos por un método multivariante a partir de variables de brecha de género en el desempleo por sectores de actividad y desempleo de personas sin ocupación previa.<br><br>'+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
		        label:"<h3>"+  '<br> '+"<\h4>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'}}, {
				label:"<strong><h2>"+  'A. Masculinización moderada agraria <br>y ligera en construcción,<br> y feminización moderada en servicios'+"</strong><\h15>",html: '',style: {'background-color': '#fff385','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h2>"+  'B. Masculinización moderada en <br> construcción y feminización <br> intensa en servicios'+"</strong><\h15>",html: '',style: {'background-color': '#52d89d','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h2>"+  'C. Masculinización ligera <br> en servicios'+"</strong><\h15>",html: '',style: {'background-color': '#3428e4','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				/*label:"<strong><h3>"+  '-40 ‒ -20'+"</strong><\h15>",html: '',style: {'background-color': '#c7e9ad','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {
				label:"<strong><h3>"+  '-20 ‒ 0'+"</strong><\h15>",html: '',style: {'background-color': '#eef8b9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '0 ‒ 20'+"</strong><\h15>",html: '',style: {'background-color': '#ffeea9','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '20 ‒ 40'+"</strong><\h15>",html: '',style: {'background-color': '#feca81','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '40 ‒ 60'+"</strong><\h15>",html: '',style: {'background-color': '#f89d5a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '60 ‒ 80'+"</strong><\h15>",html: '',style: {'background-color': '#e75b3a','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {		
				label:"<strong><h3>"+  '80 ‒ 100'+"</strong><\h15>",html: '',style: {'background-color': '#d7191b','width': '40px','height': '13px', 'border': 'black 1px solid'}}, {	
				*/
				label: "<h5>" +'<BR><i>Fuente: Elaboración propia a partir de datos del Observatorio del Mercado de Trabajo de Castilla-La Mancha y del Instituto Nacional de Estadística (2021).<i><BR>'+"<\h5>",html: '',style: {'background-color': 'write','width': '0px','height': '0px'},																
			}]
		}],
		collapseSimple: true,  // if true, legend entries that are from a simple renderer will use compact presentation
		detectStretched: true,  // if true, will test to see if legend entries look stretched.  These are usually in sets of 3 with the middle element having no label.
		collapsedOnInit: false,  // if true, legends will be collapsed when a new instance is initialized.
		defaultOpacity: 0.5, // default opacity for layers in specified in legends.
		visibleIcon: '',// 'leaflet-html-legend-icon-eye',  // css class for the visible icon on opacity slider
		hiddenIcon: '',//'leaflet-html-legend-icon-eye-slash',  // css class for the hidden icon on opacity slider
		toggleIcon:'',// 'leaflet-html-legend-icon-eye-slash'  // css class for the icon on visibility toggle button
	}).addTo(map);
	map.addControl(htmlLegend6);


//Visualizar capas
// L.control.layers(baseLayers, overlays,{collapsed:true, position: 'topright',}).addTo(map);
L.control.layers.tree(baseTree, overlayTree).addTo(map);

//boton de informacion 
var button2 = new L.Control.Button(L.DomUtil.get('helpbutton2'), { toggleButton: 'active', position: 'topright'});
	button2.addTo(map);
	button2.on('click', function () {
	 if (button2.isToggled()) {
			sidebar2.hide();
		} else {
			sidebar2.show();
		}
	});