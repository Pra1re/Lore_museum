import { Canvas, useFrame } from '@react-three/fiber'
import { OrbitControls, Html } from '@react-three/drei'
import { useRef, useMemo, useState, useEffect } from 'react'
import * as THREE from 'three'
import { Link } from 'react-router-dom'
import './ArcaneMap.css'

function getTerrainHeight(x, z) {
  return Math.sin(x * 0.3) * Math.cos(z * 0.3) * 1.5 + 
         Math.sin(x * 0.1 + z * 0.15) * 2.5 +
         Math.sin(x * 0.8 - z * 0.5) * 0.4
}

function RegionMarker({ position, name, details, setPaused }) {
  const y = getTerrainHeight(position[0], position[2])
  const [hovered, setHovered] = useState(false)
  
  return (
    <group 
      position={[position[0], y, position[2]]}
      onPointerOver={(e) => { 
        e.stopPropagation()
        setHovered(true)
        setPaused(true)
        document.body.style.cursor = 'pointer' 
      }}
      onPointerOut={(e) => { 
        e.stopPropagation()
        setHovered(false)
        setPaused(false)
        document.body.style.cursor = 'auto' 
      }}
    >
      {/* Elegant minimalist pin */}
      <mesh position={[0, 0.4, 0]}>
        <sphereGeometry args={[0.06, 16, 16]} />
        <meshBasicMaterial color={hovered ? "#fff" : "#00e5ff"} />
      </mesh>
      <mesh position={[0, 0.2, 0]}>
        <cylinderGeometry args={[0.01, 0.01, 0.4, 8]} />
        <meshBasicMaterial color={hovered ? "#fff" : "#00e5ff"} transparent opacity={0.8} />
      </mesh>
      {/* Clean text label */}
      <Html position={[0, 0.7, 0]} center style={{ pointerEvents: 'none' }}>
        <div className={`region-label ${hovered ? 'region-label--hovered' : ''}`}>
          <span className="region-label__dot" style={{ backgroundColor: hovered ? '#fff' : '#00e5ff', boxShadow: hovered ? '0 0 8px #fff' : '0 0 8px #00e5ff' }}></span>
          {name}
        </div>
        {hovered && (
          <div className="region-details-modal">
            <div className="region-details__header">{name}</div>
            <div className="region-details__body">{details}</div>
            <div className="region-details__scanline"></div>
          </div>
        )}
      </Html>
    </group>
  )
}

function HologramTerrain() {
  const group = useRef()
  const [isPaused, setPaused] = useState(false)
  const rotationY = useRef(0)
  
  // Generate uneven terrain map
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(40, 40, 80, 80)
    geo.rotateX(-Math.PI / 2) // lay flat
    
    // Deform vertices to make rugged topography
    const pos = geo.attributes.position
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i)
      const z = pos.getZ(i)
      pos.setY(i, getTerrainHeight(x, z))
    }
    geo.computeVertexNormals()
    return geo
  }, [])

  // Slow ambient rotation using delta to allow seamless pausing
  useFrame((state, delta) => {
    if (!isPaused) {
      rotationY.current += delta * 0.015
    }
    group.current.rotation.y = rotationY.current
  })

  return (
    <group ref={group}>
      {/* Solid dark base to hide lines behind hills */}
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#02040a" />
      </mesh>
      
      {/* Glowing Hextech wireframe */}
      <mesh geometry={geometry}>
        <meshBasicMaterial color="#00e5ff" wireframe transparent opacity={0.25} />
      </mesh>
      
      {/* Secondary lower layer for depth */}
      <mesh geometry={geometry} position={[0, -1.5, 0]}>
        <meshBasicMaterial color="#b026ff" wireframe transparent opacity={0.1} />
      </mesh>

      {/* Regions */}
      <RegionMarker setPaused={setPaused} position={[3, 0, 4]} name="PILTOVER" details="The City of Progress. A gleaming utopia of science, commerce, and Hextech innovation." />
      <RegionMarker setPaused={setPaused} position={[-5, 0, -2]} name="ZAUN" details="The Undercity. A toxic, resilient reflection of Piltover built on chemtech and struggle." />
      <RegionMarker setPaused={setPaused} position={[8, 0, -6]} name="STILLWATER HOLD" details="A brutal offshore penitentiary where enemies of Piltover are forgotten." />
      <RegionMarker setPaused={setPaused} position={[-6, 0, 7]} name="THE LANES" details="The bustling, neon-lit heart of Zaun's black market and underground culture." />
      <RegionMarker setPaused={setPaused} position={[0, 0, 0]} name="HEXTECH GATES" details="Massive arcane teleporters that cement Piltover's dominance over global trade." />
      <RegionMarker setPaused={setPaused} position={[4, 0, 8]} name="ACADEMY OF PILTOVER" details="The premier institution of learning where Heimerdinger, Jayce, and Viktor researched." />
      <RegionMarker setPaused={setPaused} position={[-9, 0, -5]} name="FIRELIGHT BASE" details="A hidden sanctuary centered around a giant tree, safe from Silco's shimmer trade." />
      <RegionMarker setPaused={setPaused} position={[-3, 0, -8]} name="SILCO'S OFFICE" details="The nerve center of Zaun's industrial underworld, submerged in toxic chem-fumes." />
      <RegionMarker setPaused={setPaused} position={[10, 0, 3]} name="BRIDGE OF PROGRESS" details="The heavily guarded span connecting the wealth of Piltover to the smog of Zaun." />
      <RegionMarker setPaused={setPaused} position={[-12, 0, 2]} name="THE SUMP" details="The deepest, most toxic level of Zaun where only the most desperate survive." />
    </group>
  )
}

function MapControls() {
  const [isSpaceDown, setIsSpaceDown] = useState(false)

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') setIsSpaceDown(true)
    }
    const handleKeyUp = (e) => {
      if (e.code === 'Space') setIsSpaceDown(false)
    }
    window.addEventListener('keydown', handleKeyDown)
    window.addEventListener('keyup', handleKeyUp)
    return () => {
      window.removeEventListener('keydown', handleKeyDown)
      window.removeEventListener('keyup', handleKeyUp)
    }
  }, [])

  return (
    <OrbitControls 
      enableZoom={true} 
      enablePan={true} 
      screenSpacePanning={false}
      minPolarAngle={0} 
      maxPolarAngle={Math.PI / 2 - 0.1}
      mouseButtons={isSpaceDown ? {
        LEFT: THREE.MOUSE.PAN,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.ROTATE
      } : {
        LEFT: THREE.MOUSE.ROTATE,
        MIDDLE: THREE.MOUSE.DOLLY,
        RIGHT: THREE.MOUSE.PAN
      }}
    />
  )
}

export default function ArcaneMap() {
  return (
    <div className="arcane-map-container">
      <div className="arcane-map-overlay">
        <Link to="/" className="arcane-map-back">&larr; Back to Realms</Link>
        <h1 className="arcane-map-title">TOPOGRAPHIC RECORD</h1>
        <p className="arcane-map-subtitle">Hold [SPACE] + Drag to pan across regions.</p>
      </div>
      
      <div className="arcane-map-canvas">
        <Canvas camera={{ position: [0, 10, 15], fov: 60 }}>
          <color attach="background" args={['#050508']} />
          <ambientLight intensity={1} />
          <HologramTerrain />
          <MapControls />
        </Canvas>
      </div>
      
      <div className="arcane-map-scanline"></div>
    </div>
  )
}
