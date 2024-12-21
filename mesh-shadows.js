AFRAME.registerComponent('mesh-shadows', {
    init: function(){
        this.el.addEventListener('model-loaded', ()=>{
            const el = this.el;
            const obj = el.getObject3D('mesh');

            obj.traverse(function(node){
                if(node.isMesh){
                    node.castShadow = true;
                    node.receiveShadow=false;
                    node.material.shadowSide = 1;
                    node.material.roughness = 0.75;

                    if(node.material.map){
                        node.material.map.encoding = THREE.LinearEncoding;
                    };
                };// end of node
            });// end of traverse
        });// end of eventlistner
    },// end of init
});// end of component