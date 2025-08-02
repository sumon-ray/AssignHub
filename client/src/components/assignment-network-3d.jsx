"use client"

import { Canvas, useFrame } from "@react-three/fiber"
import { OrbitControls, Sphere, Line, Environment } from "@react-three/drei"
import { useRef, useMemo, useState, useEffect } from "react"
import * as THREE from "three"

// Helper component for a single node in the network
function Node({ position, color, scaleFactor = 1 }) {
  const ref = useRef(null)
  useFrame(({ clock }) => {
    if (ref.current) {
      ref.current.scale.setScalar(scaleFactor * (1 + Math.sin(clock.elapsedTime * 2) * 0.05))
    }
  })
  return (
    <Sphere ref={ref} args={[0.1, 32, 32]} position={position}>
      <meshStandardMaterial color={color} emissive={color} emissiveIntensity={0.5} roughness={0.3} metalness={0.7} />
    </Sphere>
  )
}

// Helper to generate random positions for nodes within a given range
const getRandomPosition = (range = 3) => [
  (Math.random() - 0.5) * range * 2,
  (Math.random() - 0.5) * range * 2,
  (Math.random() - 0.5) * range * 2,
]

export function AssignmentNetwork3D() {
  const [nodes, setNodes] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (typeof window !== 'undefined' && typeof THREE !== "undefined" && THREE.Vector3 && THREE.Color) {
      const numNodes = 10
      const generatedNodes = []
      for (let i = 0; i < numNodes; i++) {
        const pos = getRandomPosition(2)
        generatedNodes.push({
          position: new THREE.Vector3(pos[0], pos[1], pos[2]),
          color: new THREE.Color(`hsl(${i * 36}, 100%, 70%)`),
        })
      }
      setNodes(generatedNodes)
      setLoading(false)
    } else {
      console.warn("THREE.js or window object not fully available when generating nodes. Nodes array might be empty.")
      setLoading(false)
    }
  }, [])

  // MODIFICATION HERE: Return an array of THREE.Vector3 for the Line component
  const linePoints = useMemo(() => {
    const points = []
    if (!Array.isArray(nodes) || nodes.length === 0) {
      return [] // Return an empty array if no nodes
    }

    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i] && nodes[i].position && nodes[j] && nodes[j].position) {
          const dist = nodes[i].position.distanceTo(nodes[j].position)
          if (dist < 2.5) {
            // Add both start and end points of the line segment
            points.push(nodes[i].position)
            points.push(nodes[j].position)
          }
        }
      }
    }
    return points
  }, [nodes])

  if (loading) {
    return (
      <div className="flex items-center justify-center w-full h-full text-gray-500 dark:text-gray-400">
        Loading 3D network...
      </div>
    )
  }

  return (
    <Canvas camera={{ position: [0, 0, 5], fov: 75 }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#a78bfa" />
      <pointLight position={[-10, -10, -10]} intensity={0.8} color="#f472b6" />
      {nodes && nodes.length > 0 && nodes.map((node, i) => (
        <Node key={i} position={node.position} color={node.color} scaleFactor={1 + i * 0.05} />
      ))}
      {/* MODIFICATION HERE: Use the 'points' prop directly */}
      {linePoints.length > 0 && ( // Check if there are any points to draw a line
        <Line points={linePoints} color="#8a2be2" lineWidth={2} transparent opacity={0.6} />
      )}
      <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.5} />
      <Environment preset="studio" />
    </Canvas>
  )
}