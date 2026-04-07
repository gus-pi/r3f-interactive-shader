import { OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import vertexShader from './shaders/Sphere.vertex.glsl?raw';
import fragmentShader from './shaders/Sphere.fragment.glsl?raw';

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
    return (
        <mesh>
            <icosahedronGeometry args={[3.0, 16]} />
            <shaderMaterial
                args={[
                    {
                        vertexShader,
                        fragmentShader,
                        wireframe: true,
                    },
                ]}
            />
        </mesh>
    );
}
