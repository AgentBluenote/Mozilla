// three.js cube drawing

var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );
var renderer = new THREE.WebGLRenderer();
var cube;

renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

		var loader = new THREE.TextureLoader();

        loader.load( 'textures/metal003.png', function ( texture ) {
          // load a texture, set wrap mode to repeat
			texture.wrapS = THREE.RepeatWrapping;
			texture.wrapT = THREE.RepeatWrapping;
			texture.repeat.set( 2, 2 );

			var geometry = new THREE.BoxGeometry(1.5,1.5,1.5);
			var material = new THREE.MeshLambertMaterial( { map: texture, shading: THREE.FlatShading } );
			cube = new THREE.Mesh( geometry, material );
			scene.add( cube );

			render();
		} );


camera.position.z = 5;

var light = new THREE.AmbientLight( 'rgb(255,255,255)' ); // soft white light
scene.add( light );

// White directional light at half intensity shining from the top.
//var directionalLight = new THREE.DirectionalLight( 0xffffff, 1 );
//directionalLight.position.set( 0, 1, 0 );
//scene.add( directionalLight );

// white spotlight shining from the side, casting shadow
var spotLight = new THREE.SpotLight( 'rgb(255,255,255)' );
spotLight.position.set( 100, 1000, 1000 );
spotLight.castShadow = true;
spotLight.shadowMapWidth = 1024;
spotLight.shadowMapHeight = 1024;
spotLight.shadowCameraNear = 500;
spotLight.shadowCameraFar = 4000;
spotLight.shadowCameraFov = 30;
scene.add( spotLight );

//render the scene

function render() {
  requestAnimationFrame(render);

  cube.rotation.x += 0.01;
  cube.rotation.y += 0.01;

  renderer.render(scene, camera);
}