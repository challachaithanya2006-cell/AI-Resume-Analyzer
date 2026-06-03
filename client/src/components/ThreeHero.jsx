import { useEffect, useRef } from 'react'
import * as THREE from 'three'

function ThreeHero() {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(45, host.clientWidth / host.clientHeight, 0.1, 100)
    camera.position.set(0, 0.6, 8)

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      preserveDrawingBuffer: true,
    })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(host.clientWidth, host.clientHeight)
    host.appendChild(renderer.domElement)

    const group = new THREE.Group()
    scene.add(group)

    const ringMaterial = new THREE.MeshStandardMaterial({
      color: 0x06b6d4,
      emissive: 0x083344,
      metalness: 0.55,
      roughness: 0.25,
    })
    const indigoMaterial = new THREE.MeshStandardMaterial({
      color: 0x4f46e5,
      emissive: 0x1e1b4b,
      metalness: 0.62,
      roughness: 0.22,
    })
    const barMaterial = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x164e63,
      metalness: 0.38,
      roughness: 0.32,
    })

    const torus = new THREE.Mesh(new THREE.TorusKnotGeometry(1.15, 0.16, 180, 18), ringMaterial)
    group.add(torus)

    const innerRing = new THREE.Mesh(new THREE.TorusGeometry(1.85, 0.035, 16, 120), indigoMaterial)
    innerRing.rotation.x = Math.PI / 2.6
    group.add(innerRing)

    const barGroup = new THREE.Group()
    const barHeights = [0.8, 1.4, 1.1, 1.75, 1.25, 2.05, 1.55]
    barHeights.forEach((height, index) => {
      const bar = new THREE.Mesh(new THREE.BoxGeometry(0.18, height, 0.18), barMaterial)
      bar.position.set((index - 3) * 0.32, -1.8 + height / 2, -0.75)
      barGroup.add(bar)
    })
    group.add(barGroup)

    const grid = new THREE.GridHelper(7, 14, 0x334155, 0x1e293b)
    grid.position.y = -2.25
    grid.rotation.x = 0.08
    group.add(grid)

    scene.add(new THREE.AmbientLight(0x94a3b8, 1.15))
    const key = new THREE.DirectionalLight(0xffffff, 3)
    key.position.set(3, 4, 5)
    scene.add(key)
    const cyan = new THREE.PointLight(0x06b6d4, 8, 9)
    cyan.position.set(2.2, 1.5, 3)
    scene.add(cyan)

    const setResponsiveLayout = () => {
      const isMobile = host.clientWidth < 720
      group.position.set(isMobile ? 0.35 : 2.8, isMobile ? -1.95 : -0.1, isMobile ? -0.75 : 0)
      group.scale.setScalar(isMobile ? 0.78 : 1)
      camera.position.set(0, isMobile ? 0.2 : 0.6, isMobile ? 9.2 : 8)
    }
    setResponsiveLayout()

    let frame = 0
    let animationFrame
    const animate = () => {
      frame += 0.01
      torus.rotation.x += 0.006
      torus.rotation.y += 0.01
      innerRing.rotation.z -= 0.008
      barGroup.children.forEach((bar, index) => {
        bar.scale.y = 0.86 + Math.sin(frame * 2 + index) * 0.08
      })
      group.rotation.y = Math.sin(frame) * 0.16
      renderer.render(scene, camera)
      animationFrame = window.requestAnimationFrame(animate)
    }
    animate()

    const resize = () => {
      camera.aspect = host.clientWidth / host.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(host.clientWidth, host.clientHeight)
      setResponsiveLayout()
    }
    window.addEventListener('resize', resize)

    return () => {
      window.cancelAnimationFrame(animationFrame)
      window.removeEventListener('resize', resize)
      renderer.dispose()
      host.removeChild(renderer.domElement)
      scene.traverse((object) => {
        if (object.geometry) object.geometry.dispose()
        if (object.material) object.material.dispose()
      })
    }
  }, [])

  return <div ref={hostRef} className="hero-canvas" aria-hidden="true" />
}

export default ThreeHero
