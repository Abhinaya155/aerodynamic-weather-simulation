import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

function FlightSimulation() {
    const mountRef = useRef(null);

    useEffect(() => {
        const mount = mountRef.current;
        if (!mount) return;

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(
            75, 
            window.innerWidth / window.innerHeight, 
            0.1, 
            1000
        );

        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        mount.appendChild(renderer.domElement);

        const geometry = new THREE.BoxGeometry(2, 1, 5);
        const material = new THREE.MeshBasicMaterial({ color: 0x0077ff });
        const airplane = new THREE.Mesh(geometry, material);
        scene.add(airplane);

        camera.position.z = 10;

        const animate = () => {
            requestAnimationFrame(animate);
            airplane.rotation.x += 0.01;
            renderer.render(scene, camera);
        };
        animate();

        // Cleanup function to prevent memory leaks
        return () => {
            if (mount) {
                mount.removeChild(renderer.domElement);
            }
            renderer.dispose();
        };
    }, []);

    return <div ref={mountRef} />;
}

export default FlightSimulation;

