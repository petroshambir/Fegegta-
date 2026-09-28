import React, { Suspense } from 'react'
import { Canvas } from '@react-three/fiber'
import {
  Center,
  Environment,
  OrbitControls,
  useGLTF,
} from '@react-three/drei'

// ============================================================
// 3D MODEL
// ============================================================

function ProductModel({ modelUrl }) {
  const { scene } = useGLTF(modelUrl)

  return (
    <Center
      position={[0, -0.8, 0]}
      rotation={[0, 0, 0]}
    >
      <primitive
        object={scene}
        scale={1.8}
      />
    </Center>
  )
}

// ============================================================
// LOADING FALLBACK
// ============================================================

function ModelLoading() {
  return (
    <mesh>
      <sphereGeometry args={[0.08, 16, 16]} />
      <meshStandardMaterial />
    </mesh>
  )
}

// ============================================================
// PRODUCT IMAGE 3D
// ============================================================

function ProductImage3D({
  modelUrl,
  alt,
}) {
  if (!modelUrl) {
    return null
  }

  return (
    <div
      className="absolute inset-0"
      role="img"
      aria-label={alt}
    >
      <Canvas
        camera={{
          position: [0, 0.8, 4.5],
          fov: 40,
          near: 0.1,
          far: 100,
        }}
        dpr={[1, 2]}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance',
        }}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          background: 'transparent',
        }}
      >
        {/* ------------------------------------------------ */}
        {/* LIGHTING */}
        {/* ------------------------------------------------ */}

        <ambientLight intensity={1.8} />

        <directionalLight
          position={[3, 5, 4]}
          intensity={2.5}
        />

        <directionalLight
          position={[-3, 2, 2]}
          intensity={1.2}
        />

        <Environment preset="studio" />

        {/* ------------------------------------------------ */}
        {/* MODEL */}
        {/* ------------------------------------------------ */}

        <Suspense fallback={<ModelLoading />}>
          <ProductModel modelUrl={modelUrl} />
        </Suspense>

        {/* ------------------------------------------------ */}
        {/* 3D CONTROLS */}
        {/* ------------------------------------------------ */}

        <OrbitControls
          enablePan={false}
          enableZoom={true}
          enableRotate={true}
          minDistance={2.5}
          maxDistance={7}
          minPolarAngle={Math.PI * 0.25}
          maxPolarAngle={Math.PI * 0.75}
          autoRotate={false}
          autoRotateSpeed={1.5}
        />
      </Canvas>
    </div>
  )
}

export default ProductImage3D