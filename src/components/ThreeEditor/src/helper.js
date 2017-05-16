/**
 * Created by lenovo on 2017/5/9.
 */

import  'three'
import { formatTime } from '@/utils'



export function init (id) {
  let container=document.getElementById(id);
  let scene = new THREE.Scene();
  let camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 10000 );
  camera.position.z = 1000;
  let geometry = new THREE.BoxGeometry( 200, 200, 200 );
  let material = new THREE.MeshBasicMaterial( { color: 0xff0000, wireframe: true } );

  let  mesh = new THREE.Mesh( geometry, material );
  scene.add( mesh );

  let renderer = new THREE.WebGLRenderer();
  renderer.setSize( window.innerWidth, window.innerHeight );

  container.appendChild( renderer.domElement );
}


