"use client";

import { useFrame } from "@react-three/fiber";
import { useEffect, useRef, useMemo } from "react";
import { Vector3, Color } from "three";

export default function NeuralNetwork({ sectionColors }) {
  const pointsRef = useRef();
  const linesRef = useRef();
  const scrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      scrollY.current =
        window.scrollY / (document.body.scrollHeight - window.innerHeight);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const points = useMemo(() => {
    const count = 100;
    const points = [];
    const radius = 3;

    for (let i = 0; i < count; i++) {
      const theta = 2 * Math.PI * Math.random();
      const phi = Math.acos(2 * Math.random() - 1);
      const r = radius * Math.cbrt(Math.random()); 

      const x = r * Math.sin(phi) * Math.cos(theta);
      const y = r * Math.sin(phi) * Math.sin(theta);
      const z = r * Math.cos(phi);

      points.push(new Vector3(x, y, z));
    }

    return points;
  }, []);

  const connections = useMemo(() => {
    const connections = [];
    const maxDistance = 1.5;

    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        const dist = points[i].distanceTo(points[j]);
        if (dist < maxDistance) {
          connections.push({
            start: points[i],
            end: points[j],
            distance: dist,
            index: connections.length,
          });
        }
      }
    }

    return connections;
  }, [points]);

  useFrame((state) => {
    if (!pointsRef.current || !linesRef.current) return;

    const time = state.clock.getElapsedTime();
    const scroll = scrollY.current;
    const pointPositions = pointsRef.current.geometry.attributes.position.array;
    const pointSizes = pointsRef.current.geometry.attributes.size.array;
    const pointColors = pointsRef.current.geometry.attributes.color.array;

    for (let i = 0; i < points.length; i++) {
      const i3 = i * 3;
      const point = points[i];

      const breatheFactor = Math.sin(time * 0.5 + i * 0.1) * 0.05;

      pointPositions[i3] = point.x * (1 + breatheFactor);
      pointPositions[i3 + 1] = point.y * (1 + breatheFactor);
      pointPositions[i3 + 2] = point.z * (1 + breatheFactor);

      const distFromCenter = point.length();

      const phase =
        (scroll * 15 - distFromCenter * 2 + time * 1.5) % (2 * Math.PI);
      const activation = Math.pow((Math.cos(phase) + 1) / 2, 2);

      pointSizes[i] = 0.08 + activation * 0.35;

      let baseColor = new Color(sectionColors.baseColor);
      let activeColor = new Color(sectionColors.activeColor);

      const finalColor = baseColor.clone().lerp(activeColor, activation);
      pointColors[i3] = finalColor.r;
      pointColors[i3 + 1] = finalColor.g;
      pointColors[i3 + 2] = finalColor.b;
    }

    pointsRef.current.geometry.attributes.position.needsUpdate = true;
    pointsRef.current.geometry.attributes.size.needsUpdate = true;
    pointsRef.current.geometry.attributes.color.needsUpdate = true;

    const linePositions = linesRef.current.geometry.attributes.position.array;
    const lineColors = linesRef.current.geometry.attributes.color.array;

    for (let i = 0; i < connections.length; i++) {
      const connection = connections[i];
      const i6 = i * 6;

      const startIdx = points.indexOf(connection.start) * 3;
      const endIdx = points.indexOf(connection.end) * 3;

      linePositions[i6] = pointPositions[startIdx];
      linePositions[i6 + 1] = pointPositions[startIdx + 1];
      linePositions[i6 + 2] = pointPositions[startIdx + 2];

      linePositions[i6 + 3] = pointPositions[endIdx];
      linePositions[i6 + 4] = pointPositions[endIdx + 1];
      linePositions[i6 + 5] = pointPositions[endIdx + 2];

      const phase =
        (scroll * 15 - connection.distance * 3 + time * 1.5) % (2 * Math.PI);
      const activation = Math.pow((Math.cos(phase) + 1) / 2, 1.5);

      let baseColor = new Color(sectionColors.baseColor);
      let activeColor = new Color(sectionColors.activeColor);

      const finalColor = baseColor.clone().lerp(activeColor, activation);

      const i12 = i * 12;
      for (let j = 0; j < 2; j++) {
        const j3 = j * 3;
        lineColors[i12 + j3] = finalColor.r;
        lineColors[i12 + j3 + 1] = finalColor.g;
        lineColors[i12 + j3 + 2] = finalColor.b;
      }
    }

    linesRef.current.geometry.attributes.position.needsUpdate = true;
    linesRef.current.geometry.attributes.color.needsUpdate = true;

    const rotationSpeed = 0.05 + scroll * 0.1;
    pointsRef.current.rotation.y += rotationSpeed * 0.01;
    linesRef.current.rotation.y += rotationSpeed * 0.01;
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={points.length}
            array={new Float32Array(points.length * 3)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-size"
            count={points.length}
            array={new Float32Array(points.length)}
            itemSize={1}
          />
          <bufferAttribute
            attach="attributes-color"
            count={points.length}
            array={new Float32Array(points.length * 3)}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.1} sizeAttenuation vertexColors />
      </points>

      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={connections.length * 2}
            array={new Float32Array(connections.length * 6)}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={connections.length * 2}
            array={new Float32Array(connections.length * 6)}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial attach="material" vertexColors linewidth={2} />
      </lineSegments>
    </group>
  );
}
