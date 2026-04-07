import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import vertexShader from './shaders/Sphere.vertex.glsl?raw';
import fragmentShader from './shaders/Sphere.fragment.glsl?raw';
import { useRef } from 'react';
import { Vector3 } from 'three';

const ThreeCanvas = () => {
    return (
        <Canvas>
            <color attach="background" args={['#111111']} />
            <OrbitControls makeDefault />
            <Sphere />
        </Canvas>
    );
};
export default ThreeCanvas;

function Sphere() {
    const uTime = useRef({ value: 0.0 });
    const mousePosition = useRef({ value: new Vector3(0, 0 - 5) });
    const { camera, pointer, raycaster, scene } = useThree();

    useFrame((_, delta) => {
        uTime.current.value += delta;
        let mouseTarget = new Vector3();

        raycaster.setFromCamera(pointer, camera);
        const intersects = raycaster.intersectObject(scene, true);

        if (intersects?.length > 0) {
            mouseTarget = intersects[0].point;
        }

        if (mouseTarget) {
            mousePosition.current.value.lerp(mouseTarget, delta * 10);
        } else {
            mousePosition.current.value.lerp(new Vector3(0, 0, 0), delta);
        }
    });
    return (
        <mesh>
            <icosahedronGeometry args={[3.0, 64]} />
            <shaderMaterial
                args={[
                    {
                        vertexShader,
                        fragmentShader,
                        uniforms: {
                            uTime: uTime.current,
                            uMousePosition: mousePosition.current,
                        },
                        wireframe: true,
                    },
                ]}
            />
        </mesh>
    );
}
