varying float vHoverArea;

void main() {
    vec3 color = vec3(vHoverArea, vHoverArea, vHoverArea);
    gl_FragColor = vec4(color, 1.0);

}