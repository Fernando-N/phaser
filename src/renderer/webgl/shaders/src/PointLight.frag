#define SHADER_NAME PHASER_POINTLIGHT_FS

precision mediump float;

uniform vec2 uResolution;

varying vec4 lightPosition;
varying vec4 lightColor;
varying float lightRadius;
varying float lightFalloff;
varying float lightAttenuation;

void main ()
{
    vec2 center = (lightPosition.xy + 1.0) * uResolution.xy * 0.5;

    float distToSurf = length(center - gl_FragCoord.xy);

    float radius = 1.0 - distToSurf / lightRadius;
    // float radiusF = 1.0 - distToSurf / lightFalloff;

    float intensity = smoothstep(0.0, 1.0, radius * lightAttenuation);

    // float intensity = clamp(smoothstep(0.0, 1.0, radius * lightAttenuation), 0.0005, 1.0);

    vec4 color = vec4(intensity, intensity, intensity, 0.0) * lightColor;

    // if (distToSurf > lightRadius)
    // {
    //     color = mix(lightColor, vec4(0.0, 0.0, 0.0, 1.0), distToSurf);
    // }

    gl_FragColor = vec4(color.rgb * lightColor.a, color.a);
}
