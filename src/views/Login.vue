<template>
    <div class="login">
      <div class="login_img"></div>
      <div class="login_text">
        <div class="title">
          <img src="../../logo.png"/>
          <h2  style="">Stellar DataView System</h2>
        </div>
        <div class="input_group">
          <div class="error_info">
            <span></span><span>错误信息显示</span>
          </div>
          <div class="input_field">
            <label class="input_label"><i class="material-icons" style="font-size: 30px">account_box</i></label>
            <input placeholder="UserName" >
          </div >
          <div class="input_field">
            <label class="input_label"><i class="material-icons"  style="font-size: 30px">vpn_key</i></label>
            <input placeholder="password" type="password">
          </div>
          <mu-switch label="Remember Me" labelClass="switch-label" trackClass="switch-track" thumbClass="switch-thumb"></mu-switch>
          <button>Login</button>
        </div>

      </div>
    </div>
</template>
<style>
  .login {
    border: 1px solid #44474a;
    position: absolute;
    left: 50%;
    top: 50%;
    width: 460px;
    height: 460px;
    margin: -230px 0 0 -230px;
    overflow: hidden;
    border-radius: 24px;
  }
  .login_img{
    background: linear-gradient(#01899c,#2f2f73);
    filter: blur(6px);
    height: 460px;
    opacity:0.97;
  }
  .login_text{
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    padding:24px;
  }
  .login_text .title{
    text-align: center;
  }
  .login_text .title img{
    width: 60px
  }
  .login_text .title h2{
    color: #f0f0f0;
    font-family:fantasy;
    font-style:oblique;
    font-size: 38px;
    text-shadow: 5px 2px 6px #232222;
  }

  .login_text .input_field{
    width: 100%;
    margin-bottom: 20px;
    background: #fff;
    border: 1px solid #ddd;
    position: relative;
  }
  .login_text .input_label{
    display: block;
    width: 35px;
    height: 35px;
    line-height: 35px;
    text-align: center;
    position: absolute;
    left: 1px;
    top: 1px;
    outline: 0;
  }
  .input_group input{
    width: 100%;
    height: 34px;
    padding: 11px 8px 11px 50px;
  }
  .input_group .error_info{
    background: #FEEEEB;
    border: 1px solid #F15532;
    color: #F15533;
    visibility: visible;
    height: 34px;
    margin-bottom: 20px;
    font-family: PingFangSC-Light,serif;
    font-size: 14px;
    padding: 5px 12px 5px 32px;

  }
  .input_group button {
    width: 100%;
    background: #fff;
    border: 1px gainsboro;
    background: linear-gradient(0,#56c1f5,#a0f5e4);
    margin-top: 24px;
    height: 34px;
    border-radius: 1rem;
  }
  .switch-label{
    color:white!important;
  }
  .switch-track{
/*    //background-color: rgba(122, 255, 253, 0.5)!important;;*/
  }
  .mu-switch-thumb{
    background-color: rgba(122, 255, 253, 0.5)!important;
  }

</style>
<script >
  import TWEEN from '@tweenjs/tween.js'

  export default{
   async mounted(){
     // document.body.style.background=`url(${require('../assets/login.jpg')})`

      let THREE= await import('three')
      var container;
      var camera, scene, renderer, particle;
      var mouseX = 0, mouseY = 0;
      var windowHalfX = window.innerWidth / 2;
      var windowHalfY = window.innerHeight / 2;

      function init() {
        container = document.getElementById( 'app' );
        camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 5000 );
        camera.position.z = 1000;
        scene = new THREE.Scene();
        var material = new THREE.SpriteMaterial( {
          map: new THREE.CanvasTexture( generateSprite() ),
          blending: THREE.AdditiveBlending
        } );
        for ( var i = 0; i < 1000; i++ ) {
          particle = new THREE.Sprite( material );
          initParticle( particle,  i*10 );
          scene.add( particle );
        }
        renderer = new THREE.WebGLRenderer({alpha:true});
        renderer.setClearColor(0x000000,0);
        renderer.setPixelRatio( window.devicePixelRatio );
        renderer.setSize( window.innerWidth, window.innerHeight );

       // renderer.clearColor()
       // renderer.domElement.style.backgroundImage=`url(${require("../assets/login.jpg")})`;
        container.appendChild( renderer.domElement );

        document.addEventListener( 'mousemove', onDocumentMouseMove, false );
        document.addEventListener( 'touchstart', onDocumentTouchStart, false );
        document.addEventListener( 'touchmove', onDocumentTouchMove, false );
        window.addEventListener( 'resize', onWindowResize, false );
      }
      function onWindowResize() {
        windowHalfX = window.innerWidth / 2;
        windowHalfY = window.innerHeight / 2;
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize( window.innerWidth, window.innerHeight );
      }
      function generateSprite() {
        var canvas = document.createElement( 'canvas' );
        canvas.width = 16;
        canvas.height = 16;

        var context = canvas.getContext( '2d' );
        var gradient = context.createRadialGradient( canvas.width / 2, canvas.height / 2, 0, canvas.width / 2, canvas.height / 2, canvas.width / 2 );
        gradient.addColorStop( 0, 'rgba(255,255,255,1)' );
        gradient.addColorStop( 0.2, 'rgba(0,255,255,1)' );
        gradient.addColorStop( 0.4, 'rgba(0,0,64,0)' );
        gradient.addColorStop( 1, 'rgba(0,0,0,0)' );
        context.fillStyle = gradient;
        context.fillRect( 0, 0, canvas.width, canvas.height );
        return canvas;
      }
      function initParticle( particle, delay ) {
        var particle = this instanceof THREE.Sprite ? this : particle;
        var delay = delay !== undefined ? delay : 0;
        particle.position.set( 0, -100, 0 );
        particle.scale.x = particle.scale.y = Math.random() * 32 + 16;
        new TWEEN.Tween( particle )
          .delay( delay )
          .to( {}, 10000 )
          .onComplete( initParticle )
          .start();
        new TWEEN.Tween( particle.position )
          .delay( delay )
          .to( { x: Math.random() * 4000 - 2000, y: Math.random() * 1000 - 500, z: Math.random() * 4000 - 2000 }, 10000 )
          .start();
        new TWEEN.Tween( particle.scale )
          .delay( delay )
          .to( { x: 0.01, y: 0.01 }, 10000 )
          .start();
      }
      //
      function onDocumentMouseMove( event ) {
        mouseX = event.clientX - windowHalfX;
        mouseY = event.clientY - windowHalfY;
      }
      function onDocumentTouchStart( event ) {
        if ( event.touches.length == 1 ) {
          event.preventDefault();
          mouseX = event.touches[ 0 ].pageX - windowHalfX;
          mouseY = event.touches[ 0 ].pageY - windowHalfY;
        }
      }
      function onDocumentTouchMove( event ) {
        if ( event.touches.length == 1 ) {
          event.preventDefault();
          mouseX = event.touches[ 0 ].pageX - windowHalfX;
          mouseY = event.touches[ 0 ].pageY - windowHalfY;
        }
      }
      //
      function animate() {
        requestAnimationFrame( animate );
        render();
      }
      function render() {
        TWEEN.update();
        camera.position.x += ( mouseX - camera.position.x ) * 0.05;
        camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
        camera.lookAt( scene.position );
        renderer.render( scene, camera );
      }
      init();
      animate();
    },
    data(){
      return {
        msg: 'hello vue'
      }
    }
  }
</script>
