import { OrbitControls } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import vertexShader from './shaders/Sphere.vertex.glsl?raw';
import fragmentShader from './shaders/Sphere.fragment.glsl?raw';
import { useRef } from 'react';

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

    useFrame((_, delta) => {
        uTime.current.value += delta;
    });
    return (
        <mesh>
            <icosahedronGeometry args={[3.0, 16]} />
            <shaderMaterial
                args={[
                    {
                        vertexShader,
                        fragmentShader,
                        uniforms: {
                            uTime: uTime.current,
                        },
                        wireframe: true,
                    },
                ]}
            />
        </mesh>
    );
}
