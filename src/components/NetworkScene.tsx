import { Canvas, useFrame } from '@react-three/fiber'
import { useMemo, useRef } from 'react'
import * as THREE from 'three'

const NODE_COUNT = 70
const CONNECT_DIST = 2.6

function generateNodes() {
  const nodes: THREE.Vector3[] = []
  for (let i = 0; i < NODE_COUNT; i++) {
    nodes.push(
      new THREE.Vector3(
        (Math.random() - 0.5) * 14,
        (Math.random() - 0.5) * 9,
        (Math.random() - 0.5) * 6,
      ),
    )
  }
  return nodes
}

function Graph() {
  const group = useRef<THREE.Group>(null)
  const nodes = useMemo(() => generateNodes(), [])

  const linePositions = useMemo(() => {
    const positions: number[] = []
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (nodes[i].distanceTo(nodes[j]) < CONNECT_DIST) {
          positions.push(nodes[i].x, nodes[i].y, nodes[i].z, nodes[j].x, nodes[j].y, nodes[j].z)
        }
      }
    }
    return new Float32Array(positions)
  }, [nodes])

  const pointPositions = useMemo(() => {
    const arr = new Float32Array(nodes.length * 3)
    nodes.forEach((n, i) => {
      arr[i * 3] = n.x
      arr[i * 3 + 1] = n.y
      arr[i * 3 + 2] = n.z
    })
    return arr
  }, [nodes])

  useFrame((state, delta) => {
    if (!group.current) return
    group.current.rotation.y += delta * 0.035
    group.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.05) * 0.08

    const { x, y } = state.pointer
    group.current.rotation.y += x * 0.0003
    group.current.rotation.x += y * 0.0002
  })

  return (
    <group ref={group}>
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[linePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#22c55e" transparent opacity={0.18} />
      </lineSegments>

      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[pointPositions, 3]} />
        </bufferGeometry>
        <pointsMaterial color="#4ade80" size={0.09} sizeAttenuation transparent opacity={0.85} />
      </points>
    </group>
  )
}

export default function NetworkScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 9], fov: 50 }} dpr={[1, 1.5]}>
        <Graph />
      </Canvas>
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-term-bg/40 via-term-bg/70 to-term-bg" />
    </div>
  )
}
