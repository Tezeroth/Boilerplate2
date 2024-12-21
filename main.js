/* jshint esversion: 9 */
/* global THREE, AFRAME */
/* Ada Rose Cannon's components from XR boilerplate file */
/* https://github.com/AdaRoseCannon/aframe-xr-boilerplate/tree/glitch */
/* Change teleport gesture from 'point' to 'horns' */

/* Attach to objects that will follow or appear attached to Player */
AFRAME.registerComponent("xr-follow", {
    schema: {},
    init() {
    },
    tick() {
      const scene = this.el.sceneEl;
      const camera = scene.camera;
      const object3D = this.el.object3D;
      camera.getWorldPosition(object3D.position);
      object3D.parent.worldToLocal(object3D.position);
    }
  });
  
  /* Turn physics off and on when object is grabbed then released */
  AFRAME.registerComponent("toggle-physics", {
    events: {
      pickup: function() {
        this.el.addState('grabbed');
      },
      putdown: function(e) {
        this.el.removeState('grabbed');
        if (e.detail.frame && e.detail.inputSource) {
          const referenceSpace = this.el.sceneEl.renderer.xr.getReferenceSpace();
          const pose = e.detail.frame.getPose(e.detail.inputSource.gripSpace, referenceSpace);
          if (pose && pose.angularVelocity) {
            this.el.components['physx-body'].rigidBody.setAngularVelocity(pose.angularVelocity);
          }
          if (pose && pose.linearVelocity) {
            this.el.components['physx-body'].rigidBody.setLinearVelocity(pose.linearVelocity);
          }
        }
      }
    }
  });
  
  /* Add labels to hands to show pose detection */
  window.addEventListener("DOMContentLoaded", function() {
    const sceneEl = document.querySelector("a-scene");// do we need this?
    const cameraRig = document.getElementById("cameraRig");// do we need this?
    
    const labels = Array.from(document.querySelectorAll('.pose-label'));
    for (const el of labels) {
      el.parentNode.addEventListener('pose', function (event) {
        el.setAttribute('text', 'value', event.detail.pose);
      });
      el.parentNode.addEventListener('gamepad', function (event) {
        el.setAttribute('text', 'value', event.detail.event);
      });
    }
  });