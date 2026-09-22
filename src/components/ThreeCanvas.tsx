import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { Scene3DConfig } from '../types';
import { playBounceSound } from '../utils/audio';

interface ThreeCanvasProps {
  config: Scene3DConfig;
  isFocused?: boolean;
  onFocusChange?: (focused: boolean) => void;
  triggerBounceKey?: number;
}

function createDiamondGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  const indices: number[] = [];

  const topY = 3.2;
  const tableY = 2.4;
  const tableR = 4.2;
  const girdleY = 0.5;
  const girdleR = 7.5;
  const bottomY = -7.5;
  const segments = 8;

  // 0: top center
  points.push(new THREE.Vector3(0, topY, 0));

  // 1..8: table ring
  for (let i = 0; i < segments; i++) {
    const angle = (i / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * tableR, tableY, Math.sin(angle) * tableR));
  }

  // 9..16: girdle ring (shifted by half segment)
  for (let i = 0; i < segments; i++) {
    const angle = ((i + 0.5) / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(Math.cos(angle) * girdleR, girdleY, Math.sin(angle) * girdleR));
  }

  // 17: bottom culet
  points.push(new THREE.Vector3(0, bottomY, 0));
  const bottomIdx = points.length - 1;

  for (let i = 0; i < segments; i++) {
    const next = (i + 1) % segments;
    const tCurrent = 1 + i;
    const tNext = 1 + next;
    const gCurrent = 1 + segments + i;
    const gNext = 1 + segments + next;

    // Top table facet
    indices.push(0, tCurrent, tNext);

    // Crown facets
    indices.push(tCurrent, gCurrent, tNext);
    indices.push(tNext, gCurrent, gNext);

    // Pavilion facets (to bottom tip)
    indices.push(gCurrent, bottomIdx, gNext);
  }

  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(points.length * 3);
  for (let i = 0; i < points.length; i++) {
    positions[i * 3] = points[i].x;
    positions[i * 3 + 1] = points[i].y;
    positions[i * 3 + 2] = points[i].z;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

function createStarGeometry(): THREE.BufferGeometry {
  const points: THREE.Vector3[] = [];
  const indices: number[] = [];

  const pointsCount = 10; // 5 outer points, 5 inner valleys
  const outerR = 8.5;
  const innerR = 3.6;
  const depthZ = 3.2;

  // 0: front center apex
  points.push(new THREE.Vector3(0, 0, depthZ));
  // 1: back center apex
  points.push(new THREE.Vector3(0, 0, -depthZ));

  // 2..11: perimeter points in XY plane
  for (let i = 0; i < pointsCount; i++) {
    const angle = (i / pointsCount) * Math.PI * 2 - Math.PI / 2;
    const r = i % 2 === 0 ? outerR : innerR;
    points.push(new THREE.Vector3(Math.cos(angle) * r, -Math.sin(angle) * r, 0));
  }

  // Faces
  for (let i = 0; i < pointsCount; i++) {
    const next = (i + 1) % pointsCount;
    const currentIdx = 2 + i;
    const nextIdx = 2 + next;

    // Front facet
    indices.push(0, currentIdx, nextIdx);
    // Back facet
    indices.push(1, nextIdx, currentIdx);
  }

  const geo = new THREE.BufferGeometry();
  const positions = new Float32Array(points.length * 3);
  for (let i = 0; i < points.length; i++) {
    positions[i * 3] = points[i].x;
    positions[i * 3 + 1] = points[i].y;
    positions[i * 3 + 2] = points[i].z;
  }
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  geo.setIndex(indices);
  geo.computeVertexNormals();
  return geo;
}

export const ThreeCanvas: React.FC<ThreeCanvasProps> = ({
  config,
  isFocused = false,
  onFocusChange,
  triggerBounceKey = 0,
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const isFocusedRef = useRef(isFocused);
  isFocusedRef.current = isFocused;
  const bounceImpulseRef = useRef<((scale?: number) => void) | null>(null);
  const lastBounceKey = useRef(triggerBounceKey);

  useEffect(() => {
    if (triggerBounceKey && triggerBounceKey !== lastBounceKey.current) {
      lastBounceKey.current = triggerBounceKey;
      if (bounceImpulseRef.current) {
        bounceImpulseRef.current(1.6);
      }
    }
  }, [triggerBounceKey]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // 1. Scene setup
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 28;

    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 2. Ambient & Point Lighting for solid materials
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);
    scene.add(ambientLight);

    const pointLight1 = new THREE.PointLight(0x06b6d4, 2, 80);
    pointLight1.position.set(20, 20, 15);
    scene.add(pointLight1);

    const pointLight2 = new THREE.PointLight(0xa855f7, 2, 80);
    pointLight2.position.set(-20, -20, 15);
    scene.add(pointLight2);

    // 3. Particles
    const particlesCount = config.particlesDensity;
    const posArray = new Float32Array(particlesCount * 3);

    for (let i = 0; i < particlesCount * 3; i++) {
      posArray[i] = (Math.random() - 0.5) * 85;
    }

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute(
      'position',
      new THREE.BufferAttribute(posArray, 3)
    );

    const particleColorMap = {
      cyan: 0x06b6d4,
      purple: 0xa855f7,
      emerald: 0x10b981,
      amber: 0xf59e0b,
    };

    const particlesMaterial = new THREE.PointsMaterial({
      size: 0.16,
      color: particleColorMap[config.colorScheme] || 0x06b6d4,
      transparent: true,
      opacity: 0.85,
    });

    const particlesMesh = new THREE.Points(particlesGeometry, particlesMaterial);
    scene.add(particlesMesh);

    // 4. Central 3D Geometry
    let geometry: THREE.BufferGeometry;
    switch (config.shape) {
      case 'icosahedron':
        geometry = new THREE.IcosahedronGeometry(7, 2);
        break;
      case 'torus':
        geometry = new THREE.TorusGeometry(8, 2.5, 30, 100);
        break;
      case 'octahedron':
        geometry = new THREE.OctahedronGeometry(8, 2);
        break;
      case 'dodecahedron':
        geometry = new THREE.DodecahedronGeometry(7.5, 1);
        break;
      case 'sphere':
        geometry = new THREE.SphereGeometry(7.2, 32, 24);
        break;
      case 'diamond':
        geometry = createDiamondGeometry();
        break;
      case 'star':
        geometry = createStarGeometry();
        break;
      case 'torusknot':
      default:
        geometry = new THREE.TorusKnotGeometry(7.5, 2.3, 110, 16);
        break;
    }

    let material: THREE.Material;
    if (config.wireframe) {
      material = new THREE.MeshNormalMaterial({ wireframe: true });
    } else {
      material = new THREE.MeshStandardMaterial({
        color: particleColorMap[config.colorScheme],
        roughness: 0.25,
        metalness: 0.8,
        wireframe: false,
      });
    }

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0, 0, -8);
    scene.add(mesh);

    // 4.1 Cannon.es Physics Engine Integration
    const world = new CANNON.World();
    world.gravity.set(0, 0, 0); // Zero-gravity space simulation with elastic anchor spring
    const defaultContactMaterial = new CANNON.ContactMaterial(
      world.defaultMaterial,
      world.defaultMaterial,
      {
        friction: 0.15,
        restitution: 0.88, // High elastic bounce off boundaries and impacts
      }
    );
    world.addContactMaterial(defaultContactMaterial);

    // Bounding walls to make object bounce realistically inside the viewport
    const wallThickness = 1.0;
    const createWall = (position: CANNON.Vec3, size: CANNON.Vec3) => {
      const wallBody = new CANNON.Body({
        type: CANNON.Body.STATIC,
        mass: 0,
        material: world.defaultMaterial,
      });
      wallBody.addShape(new CANNON.Box(size));
      wallBody.position.copy(position);
      world.addBody(wallBody);
      return wallBody;
    };

    // Elastic physical bounding cage around the camera focus area
    createWall(new CANNON.Vec3(0, -11, 0), new CANNON.Vec3(25, wallThickness, 25)); // Floor
    createWall(new CANNON.Vec3(0, 11, 0), new CANNON.Vec3(25, wallThickness, 25));  // Ceiling
    createWall(new CANNON.Vec3(-18, 0, 0), new CANNON.Vec3(wallThickness, 25, 25)); // Left
    createWall(new CANNON.Vec3(18, 0, 0), new CANNON.Vec3(wallThickness, 25, 25));  // Right
    createWall(new CANNON.Vec3(0, 0, -16), new CANNON.Vec3(25, 25, wallThickness)); // Back
    createWall(new CANNON.Vec3(0, 0, 10), new CANNON.Vec3(25, 25, wallThickness));  // Front

    // Geometry matching shape for Cannon.es rigid body
    let physicsShape: CANNON.Shape;
    switch (config.shape) {
      case 'sphere':
        physicsShape = new CANNON.Sphere(7.2);
        break;
      case 'star':
        physicsShape = new CANNON.Box(new CANNON.Vec3(6.5, 6.5, 2.8));
        break;
      case 'diamond':
        physicsShape = new CANNON.Sphere(6.8);
        break;
      case 'torus':
      case 'torusknot':
        physicsShape = new CANNON.Sphere(7.5);
        break;
      case 'octahedron':
      case 'icosahedron':
      case 'dodecahedron':
      default:
        physicsShape = new CANNON.Sphere(7.0);
        break;
    }

    const physicsBody = new CANNON.Body({
      mass: 3.0,
      shape: physicsShape,
      material: world.defaultMaterial,
      linearDamping: 0.22,
      angularDamping: 0.16,
      position: new CANNON.Vec3(0, 0, -8),
    });
    world.addBody(physicsBody);

    // Collision acoustic feedback when bouncing off walls or receiving hard impacts
    const handleCollision = (e: { contact?: { getImpactVelocityAlongNormal: () => number } }) => {
      if (!isFocusedRef.current) return;
      const impactVelocity = e.contact ? Math.abs(e.contact.getImpactVelocityAlongNormal()) : 2;
      if (impactVelocity > 1.2) {
        playBounceSound(Math.min(260 + impactVelocity * 28, 640));
      }
    };
    physicsBody.addEventListener('collide', handleCollision);

    // Secondary subtle geometric ring around it
    const ringGeo = new THREE.RingGeometry(14, 14.3, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: particleColorMap[config.colorScheme],
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.2,
      wireframe: true,
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.position.set(0, 0, -10);
    scene.add(ringMesh);

    // 5. Dynamic Cursor Particle Trail System
    const trailPalette = {
      cyan: {
        primary: new THREE.Color(0x06b6d4),
        accent: new THREE.Color(0xbae6fd),
      },
      purple: {
        primary: new THREE.Color(0xa855f7),
        accent: new THREE.Color(0xf5d0fe),
      },
      emerald: {
        primary: new THREE.Color(0x10b981),
        accent: new THREE.Color(0xa7f3d0),
      },
      amber: {
        primary: new THREE.Color(0xf59e0b),
        accent: new THREE.Color(0xfef08a),
      },
    };

    const currentThemeColors = trailPalette[config.colorScheme] || trailPalette.cyan;

    // Soft radial glow particle texture
    const createGlowTexture = () => {
      const texCanvas = document.createElement('canvas');
      texCanvas.width = 64;
      texCanvas.height = 64;
      const ctx = texCanvas.getContext('2d');
      if (!ctx) return null;

      const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.9)');
      gradient.addColorStop(0.55, 'rgba(255, 255, 255, 0.35)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, 64, 64);

      const texture = new THREE.CanvasTexture(texCanvas);
      return texture;
    };

    const glowTexture = createGlowTexture();

    const TRAIL_COUNT = 180;
    const trailPositions = new Float32Array(TRAIL_COUNT * 3);
    const trailColors = new Float32Array(TRAIL_COUNT * 3);

    for (let i = 0; i < TRAIL_COUNT; i++) {
      trailPositions[i * 3 + 2] = -9999;
    }

    const trailGeometry = new THREE.BufferGeometry();
    trailGeometry.setAttribute('position', new THREE.BufferAttribute(trailPositions, 3));
    trailGeometry.setAttribute('color', new THREE.BufferAttribute(trailColors, 3));

    const trailMaterial = new THREE.PointsMaterial({
      size: 1.4,
      vertexColors: true,
      transparent: true,
      opacity: 0.95,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: glowTexture,
    });

    const trailMesh = new THREE.Points(trailGeometry, trailMaterial);
    scene.add(trailMesh);

    interface TrailParticle {
      active: boolean;
      x: number;
      y: number;
      z: number;
      vx: number;
      vy: number;
      vz: number;
      life: number;
      maxLife: number;
      color: THREE.Color;
    }

    const trailPool: TrailParticle[] = Array.from({ length: TRAIL_COUNT }, () => ({
      active: false,
      x: 0,
      y: 0,
      z: -9999,
      vx: 0,
      vy: 0,
      vz: 0,
      life: 0,
      maxLife: 1,
      color: new THREE.Color(),
    }));

    let nextParticleIdx = 0;

    // Helper to unproject 2D screen coordinates into 3D world space at target plane
    const unprojectToWorld = (clientX: number, clientY: number, targetZ: number) => {
      const ndcX = (clientX / window.innerWidth) * 2 - 1;
      const ndcY = -(clientY / window.innerHeight) * 2 + 1;

      const vec = new THREE.Vector3(ndcX, ndcY, 0.5);
      vec.unproject(camera);
      const dir = vec.sub(camera.position).normalize();
      if (Math.abs(dir.z) < 0.0001) return new THREE.Vector3(0, 0, targetZ);
      const dist = (targetZ - camera.position.z) / dir.z;
      return camera.position.clone().add(dir.multiplyScalar(dist));
    };

    // 6. Mouse & Scroll Interaction
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;
    let scrollY = window.scrollY;

    let isPointerActive = false;
    let pointerPos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    let prevPointerWorld: THREE.Vector3 | null = null;
    let pointerFadeTimeout: NodeJS.Timeout | null = null;

    const emitTrailAt = (clientX: number, clientY: number) => {
      pointerPos.x = clientX;
      pointerPos.y = clientY;
      isPointerActive = true;

      if (pointerFadeTimeout) clearTimeout(pointerFadeTimeout);
      pointerFadeTimeout = setTimeout(() => {
        isPointerActive = false;
        prevPointerWorld = null;
      }, 350);
    };

    const handleMouseMove = (event: MouseEvent) => {
      targetX = (event.clientX / window.innerWidth - 0.5) * 2;
      targetY = (event.clientY / window.innerHeight - 0.5) * 2;
      emitTrailAt(event.clientX, event.clientY);
    };

    const handleScroll = () => {
      scrollY = window.scrollY;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    window.addEventListener('scroll', handleScroll, { passive: true });

    // Drag interaction when 3D object is in focus mode with Cannon.es physics & bounce
    let isDragging = false;
    let isInteracting = false;
    let resumeTimeout: NodeJS.Timeout | null = null;
    let previousMousePosition = { x: 0, y: 0 };
    let dragStartTime = 0;
    let startMousePos = { x: 0, y: 0 };
    let recentDeltas: { dx: number; dy: number }[] = [];

    const applyBounceImpulse = (forceScale = 1.0) => {
      if (!isFocusedRef.current) return;
      const angle = Math.random() * Math.PI * 2;
      const impulseX = Math.cos(angle) * (8 + Math.random() * 6) * forceScale;
      const impulseY = (Math.sin(angle) * 5 + 6) * forceScale;
      const impulseZ = (Math.random() - 0.5) * 8 * forceScale;

      physicsBody.applyImpulse(
        new CANNON.Vec3(impulseX, impulseY, impulseZ),
        new CANNON.Vec3(
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2,
          (Math.random() - 0.5) * 2
        )
      );
      physicsBody.angularVelocity.x += (Math.random() - 0.5) * 8 * forceScale;
      physicsBody.angularVelocity.y += (Math.random() - 0.5) * 8 * forceScale;
      physicsBody.angularVelocity.z += (Math.random() - 0.5) * 5 * forceScale;
      playBounceSound(420);
    };
    bounceImpulseRef.current = applyBounceImpulse;

    const startInteraction = (clientX: number, clientY: number) => {
      if (!isFocusedRef.current) return;
      isDragging = true;
      isInteracting = true;
      dragStartTime = performance.now();
      startMousePos = { x: clientX, y: clientY };
      previousMousePosition = { x: clientX, y: clientY };
      recentDeltas = [];

      if (resumeTimeout) {
        clearTimeout(resumeTimeout);
        resumeTimeout = null;
      }
    };

    const updateInteraction = (clientX: number, clientY: number) => {
      if (!isDragging || !isFocusedRef.current) return;
      const deltaX = clientX - previousMousePosition.x;
      const deltaY = clientY - previousMousePosition.y;

      recentDeltas.push({ dx: deltaX, dy: deltaY });
      if (recentDeltas.length > 5) recentDeltas.shift();

      // Apply torque to Cannon.es body (realistic physics spin)
      const rotTorque = 0.045;
      physicsBody.angularVelocity.y += deltaX * rotTorque;
      physicsBody.angularVelocity.x += deltaY * rotTorque;

      // Impart linear momentum to Cannon.es body for elastic pull
      const linearPull = 0.08;
      physicsBody.velocity.x += deltaX * linearPull;
      physicsBody.velocity.y -= deltaY * linearPull;

      previousMousePosition = { x: clientX, y: clientY };
    };

    const endInteraction = (clientX?: number, clientY?: number) => {
      if (!isDragging) return;
      isDragging = false;
      const dragDuration = performance.now() - dragStartTime;
      const totalMoved =
        clientX !== undefined && clientY !== undefined
          ? Math.hypot(clientX - startMousePos.x, clientY - startMousePos.y)
          : 0;

      // Click or tap on object: triggers dynamic bounce impulse
      if (dragDuration < 280 && totalMoved < 12) {
        applyBounceImpulse(1.3);
      } else if (recentDeltas.length > 0) {
        let avgDx = 0;
        let avgDy = 0;
        for (const d of recentDeltas) {
          avgDx += d.dx;
          avgDy += d.dy;
        }
        avgDx /= recentDeltas.length;
        avgDy /= recentDeltas.length;

        // Fling Cannon.es body with realistic momentum
        const flingLinear = 0.35;
        const flingAngular = 0.16;
        physicsBody.velocity.x += avgDx * flingLinear;
        physicsBody.velocity.y -= avgDy * flingLinear;
        physicsBody.velocity.z += (Math.random() - 0.5) * 5;

        physicsBody.angularVelocity.y += avgDx * flingAngular;
        physicsBody.angularVelocity.x += avgDy * flingAngular;
        physicsBody.angularVelocity.z += (Math.random() - 0.5) * 3;
      }

      if (resumeTimeout) clearTimeout(resumeTimeout);
      resumeTimeout = setTimeout(() => {
        isInteracting = false;
      }, 1600);
    };

    const onMouseDown = (e: MouseEvent) => {
      startInteraction(e.clientX, e.clientY);
    };

    const onMouseMove = (e: MouseEvent) => {
      updateInteraction(e.clientX, e.clientY);
    };

    const onMouseUp = (e: MouseEvent) => {
      endInteraction(e.clientX, e.clientY);
    };

    canvas.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', onMouseUp);
    canvas.addEventListener('mouseleave', onMouseUp);

    // Touch interaction for mobile
    const onTouchStart = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        emitTrailAt(e.touches[0].clientX, e.touches[0].clientY);
      }
      if (!isFocusedRef.current || e.touches.length !== 1) return;
      startInteraction(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        emitTrailAt(e.touches[0].clientX, e.touches[0].clientY);
      }
      if (!isDragging || !isFocusedRef.current || e.touches.length !== 1) return;
      updateInteraction(e.touches[0].clientX, e.touches[0].clientY);
    };

    const onTouchEnd = (e: TouchEvent) => {
      const touch = e.changedTouches[0];
      endInteraction(touch ? touch.clientX : undefined, touch ? touch.clientY : undefined);
    };

    canvas.addEventListener('touchstart', onTouchStart, { passive: true });
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend', onTouchEnd);

    // 7. Responsive Resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    };

    window.addEventListener('resize', handleResize);

    // 8. Animation Loop
    let animationFrameId: number;
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      const delta = clock.getDelta();
      const speedMultiplier = config.speed;

      // Smooth camera zoom interpolation when focused
      const targetCamZ = isFocusedRef.current ? 14 : 28;
      camera.position.z += (targetCamZ - camera.position.z) * 0.06;

      // Smooth mouse interpolation (easing)
      mouseX += (targetX - mouseX) * 0.05;
      mouseY += (targetY - mouseY) * 0.05;

      // Dynamic Particle Trail Emission following cursor
      const targetPlaneZ = isFocusedRef.current ? 4 : 2;
      if (isPointerActive) {
        const currentPointerWorld = unprojectToWorld(pointerPos.x, pointerPos.y, targetPlaneZ);

        if (!prevPointerWorld) {
          prevPointerWorld = currentPointerWorld.clone();
        }

        const dist = prevPointerWorld.distanceTo(currentPointerWorld);
        const steps = Math.min(Math.max(Math.ceil(dist / 0.4), 2), 6);

        for (let s = 0; s < steps; s++) {
          const t = s / steps;
          const interpX = prevPointerWorld.x + (currentPointerWorld.x - prevPointerWorld.x) * t;
          const interpY = prevPointerWorld.y + (currentPointerWorld.y - prevPointerWorld.y) * t;
          const interpZ = prevPointerWorld.z + (currentPointerWorld.z - prevPointerWorld.z) * t;

          const p = trailPool[nextParticleIdx];
          nextParticleIdx = (nextParticleIdx + 1) % TRAIL_COUNT;

          p.active = true;
          p.x = interpX + (Math.random() - 0.5) * 0.35;
          p.y = interpY + (Math.random() - 0.5) * 0.35;
          p.z = interpZ + (Math.random() - 0.5) * 0.35;

          const angle = Math.random() * Math.PI * 2;
          const speed = Math.random() * 0.6 + 0.15;
          p.vx = Math.cos(angle) * speed;
          p.vy = Math.sin(angle) * speed;
          p.vz = (Math.random() - 0.5) * 0.4;

          p.maxLife = Math.random() * 0.4 + 0.5;
          p.life = p.maxLife;

          p.color.copy(Math.random() > 0.3 ? currentThemeColors.primary : currentThemeColors.accent);
        }

        prevPointerWorld.copy(currentPointerWorld);
      }

      // Update and animate trail particles
      const posAttr = trailGeometry.attributes.position as THREE.BufferAttribute;
      const colAttr = trailGeometry.attributes.color as THREE.BufferAttribute;

      for (let i = 0; i < TRAIL_COUNT; i++) {
        const p = trailPool[i];
        if (!p.active) {
          posAttr.setXYZ(i, 0, 0, -9999);
          colAttr.setXYZ(i, 0, 0, 0);
          continue;
        }

        p.life -= delta * 1.3;
        if (p.life <= 0) {
          p.active = false;
          posAttr.setXYZ(i, 0, 0, -9999);
          colAttr.setXYZ(i, 0, 0, 0);
          continue;
        }

        // Particle floating drift with smooth dampening
        p.x += p.vx * delta * 4;
        p.y += p.vy * delta * 4;
        p.z += p.vz * delta * 4;
        p.vx *= 0.96;
        p.vy *= 0.96;
        p.vz *= 0.96;

        const progress = p.life / p.maxLife;
        const alpha = Math.sin(progress * Math.PI);

        posAttr.setXYZ(i, p.x, p.y, p.z);
        colAttr.setXYZ(i, p.color.r * alpha, p.color.g * alpha, p.color.b * alpha);
      }

      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;

      // Cannon.es Physics Simulation Step
      world.step(1 / 60, Math.min(delta, 0.1), 3);

      if (isFocusedRef.current) {
        // Zero-G restorative anchor spring force keeping object centered with elastic bounce
        const springK = isDragging ? 5.0 : 9.0;
        const dampingC = 2.2;

        const fx = -physicsBody.position.x * springK - physicsBody.velocity.x * dampingC;
        const fy = -physicsBody.position.y * springK - physicsBody.velocity.y * dampingC;
        const fz = -physicsBody.position.z * springK - physicsBody.velocity.z * dampingC;

        physicsBody.applyForce(new CANNON.Vec3(fx, fy, fz), physicsBody.position);

        // Gentle ambient rotation when object is resting and not interacting
        if (!isInteracting && !isDragging) {
          physicsBody.angularVelocity.x += 0.08 * delta * speedMultiplier;
          physicsBody.angularVelocity.y += 0.12 * delta * speedMultiplier;
        }

        // Sync Cannon.es physical rigid body state to Three.js mesh
        mesh.position.set(
          physicsBody.position.x,
          physicsBody.position.y,
          physicsBody.position.z
        );
        mesh.quaternion.set(
          physicsBody.quaternion.x,
          physicsBody.quaternion.y,
          physicsBody.quaternion.z,
          physicsBody.quaternion.w
        );
      } else {
        // Scroll effect on 3D mesh when in standard background view
        const scrollOffset = scrollY * 0.008;
        const targetMeshY = -scrollOffset * 0.5;
        const targetMeshZ = -8 - scrollOffset * 0.8;

        physicsBody.position.set(0, targetMeshY, targetMeshZ);
        physicsBody.velocity.set(0, 0, 0);

        mesh.position.y += (targetMeshY - mesh.position.y) * 0.06;
        mesh.position.z += (targetMeshZ - mesh.position.z) * 0.06;
        mesh.position.x += (0 - mesh.position.x) * 0.06;

        mesh.rotation.x += 0.4 * delta * speedMultiplier;
        mesh.rotation.y += 0.5 * delta * speedMultiplier;
        mesh.rotation.z += 0.1 * delta * speedMultiplier;

        physicsBody.quaternion.set(
          mesh.quaternion.x,
          mesh.quaternion.y,
          mesh.quaternion.z,
          mesh.quaternion.w
        );
      }

      // Ring mesh follows the central mesh position
      ringMesh.position.set(mesh.position.x, mesh.position.y, mesh.position.z - 2);
      ringMesh.rotation.z -= 0.2 * delta * speedMultiplier;
      ringMesh.rotation.x = mouseX * 0.3;
      ringMesh.rotation.y = mouseY * 0.3;

      // Particle mesh reaction
      particlesMesh.rotation.y = mouseX * 0.6 + (isFocusedRef.current ? 0 : scrollY * 0.008 * 0.1);
      particlesMesh.rotation.x = -mouseY * 0.6;
      particlesMesh.rotation.z += 0.05 * delta * speedMultiplier;

      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount or config change
    return () => {
      cancelAnimationFrame(animationFrameId);
      physicsBody.removeEventListener('collide', handleCollision);
      bounceImpulseRef.current = null;
      if (resumeTimeout) clearTimeout(resumeTimeout);
      if (pointerFadeTimeout) clearTimeout(pointerFadeTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);

      canvas.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup', onMouseUp);
      canvas.removeEventListener('mouseleave', onMouseUp);
      canvas.removeEventListener('touchstart', onTouchStart);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend', onTouchEnd);

      trailGeometry.dispose();
      trailMaterial.dispose();
      if (glowTexture) glowTexture.dispose();

      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particlesGeometry.dispose();
      particlesMaterial.dispose();
      renderer.dispose();
    };
  }, [config]);

  return (
    <canvas
      id="webgl-bg"
      ref={canvasRef}
      className={`fixed top-0 left-0 w-full h-full transition-all duration-500 ${
        isFocused
          ? 'z-40 pointer-events-auto cursor-grab active:cursor-grabbing bg-slate-950/75 backdrop-blur-sm'
          : '-z-10 pointer-events-none'
      }`}
    />
  );
};
