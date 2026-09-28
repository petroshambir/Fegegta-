import React, { Suspense, useEffect } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { useTexture } from '@react-three/drei'
import * as THREE from 'three'

function ProductImageMesh({ image }) {
  const texture = useTexture(image)
  const { viewport } = useThree()

  useEffect(() => {
    if (!texture) return

    texture.colorSpace = THREE.SRGBColorSpace
    texture.minFilter = THREE.LinearFilter
    texture.magFilter = THREE.LinearFilter
    texture.needsUpdate = true
  }, [texture])

  const imageWidth =
    texture.image?.naturalWidth ||
    texture.image?.width ||
    1

  const imageHeight =
    texture.image?.naturalHeight ||
    texture.image?.height ||
    1

  const imageRatio = imageWidth / imageHeight

  let width = viewport.width * 0.88
  let height = width / imageRatio

  if (height > viewport.height * 0.92) {
    height = viewport.height * 0.92
    width = height * imageRatio
  }

  return (
    <mesh
      position={[0, 0, 0]}
      rotation={[0.015, -0.025, 0]}
      scale={[width, height, 1]}
    >
      <planeGeometry args={[1, 1, 32, 32]} />

      <meshBasicMaterial
        map={texture}
        side={THREE.DoubleSide}
        transparent={false}
        opacity={1}
        toneMapped={false}
      />
    </mesh>
  )
}

function ProductImage3D({ image, alt }) {
  if (!image) {
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
          position: [0, 0, 5],
          fov: 45,
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
          pointerEvents: 'none',
        }}
      >
        <Suspense fallback={null}>
          <ProductImageMesh image={image} />
        </Suspense>
      </Canvas>
    </div>
  )
}

export default ProductImage3D