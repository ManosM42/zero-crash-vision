import { useEffect, useRef, useCallback } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import screenSrc from "@/assets/screen.png";

gsap.registerPlugin(ScrollTrigger);

interface MacBookIntroProps { onComplete: () => void; }

function easeInOut(t: number) {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}
function box(w: number, h: number, d: number, mat: THREE.Material) {
  return new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
}

export function MacBookIntro({ onComplete }: MacBookIntroProps) {
  const canvasRef     = useRef<HTMLCanvasElement>(null);
  const matrixRef     = useRef<HTMLCanvasElement>(null);
  const containerRef  = useRef<HTMLDivElement>(null);
  const stateRef      = useRef({ progress: 0 });
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const mc = matrixRef.current!;
    const ctx = mc.getContext("2d")!;
    const resize = () => { mc.width = window.innerWidth; mc.height = window.innerHeight; };
    resize();
    window.addEventListener("resize", resize);
    const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ0123456789ABCDEF";
    const cols = Math.floor(mc.width / 16);
    const drops: number[] = Array.from({ length: cols }, () => Math.random() * -50);
    let raf: number, last = 0;
    function draw(now: number) {
      raf = requestAnimationFrame(draw);
      if (now - last < 50) return; last = now;
      ctx.fillStyle = "rgba(0,0,0,0.18)"; ctx.fillRect(0, 0, mc.width, mc.height);
      for (let i = 0; i < drops.length; i++) {
        const ch = chars[Math.floor(Math.random() * chars.length)];
        const y = drops[i] * 16, x = i * 16;
        ctx.fillStyle = "#ffd700"; ctx.shadowColor = "#ffa500"; ctx.shadowBlur = 8;
        ctx.font = "bold 14px monospace"; ctx.fillText(ch, x, y);
        ctx.fillStyle = "rgba(180,120,0,0.55)"; ctx.shadowBlur = 0;
        ctx.font = "13px monospace";
        ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, y - 16);
        if (y > mc.height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 0.55;
      }
      ctx.shadowBlur = 0;
    }
    raf = requestAnimationFrame(draw);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);

  const setupScene = useCallback(() => {
    const canvas    = canvasRef.current!;
    const container = containerRef.current!;
    const W = () => window.innerWidth, H = () => window.innerHeight;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setSize(W(), H());
    renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.4;
    renderer.setClearColor(0x000000, 0);

    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, W() / H(), 0.01, 100);
    camera.position.set(0, 2.2, 11);
    camera.lookAt(0, 0.3, 0);

    scene.add(new THREE.AmbientLight(0xfff8e7, 0.6));
    const keyLight = new THREE.DirectionalLight(0xfff0c0, 3.5);
    keyLight.position.set(4, 7, 6); scene.add(keyLight);
    const rimLight = new THREE.DirectionalLight(0xffd700, 2.0); rimLight.position.set(-5,3,-3); scene.add(rimLight);
    const fillLight = new THREE.DirectionalLight(0xffe8a0, 0.8); fillLight.position.set(0,2,8); scene.add(fillLight);
    const kbLight = new THREE.PointLight(0xffd700, 0, 2.0);
    kbLight.position.set(0, 0.18, 0.3); scene.add(kbLight);

    const GOLD      = new THREE.MeshStandardMaterial({ color: 0xc8a84b, metalness: 0.97, roughness: 0.12 });
    const GOLD_DARK = new THREE.MeshStandardMaterial({ color: 0xa0842a, metalness: 0.96, roughness: 0.18 });
    const GOLD_SHIN = new THREE.MeshStandardMaterial({ color: 0xe8c060, metalness: 0.99, roughness: 0.05 });
    const BEZEL     = new THREE.MeshStandardMaterial({ color: 0x050503, roughness: 0.97 });
    const HINGE_M   = new THREE.MeshStandardMaterial({ color: 0x8b6914, metalness: 0.92, roughness: 0.22 });
    const RUBBER    = new THREE.MeshStandardMaterial({ color: 0x080808, roughness: 1.0 });
    const PORT_M    = new THREE.MeshStandardMaterial({ color: 0x060604, roughness: 0.7 });
    const TRACK_M   = new THREE.MeshStandardMaterial({ color: 0xb89030, metalness: 0.85, roughness: 0.20 });

    const mb = new THREE.Group(); scene.add(mb);

    const base = box(3.2, 0.075, 2.15, GOLD); mb.add(base);
    ([
      [3.22,0.008,0.006,0,0.037,1.075],[3.22,0.008,0.006,0,0.037,-1.075],
      [0.006,0.008,2.16,-1.603,0.037,0],[0.006,0.008,2.16,1.603,0.037,0],
    ] as [number,number,number,number,number,number][]).forEach(([w,h,d,x,y,z]) => {
      const c = box(w,h,d,GOLD_SHIN); c.position.set(x,y,z); mb.add(c);
    });
    const pr = box(3.0,0.003,1.55,GOLD_DARK); pr.position.set(0,0.039,0.18); mb.add(pr);
    const tpB = box(1.09,0.002,0.72,GOLD_DARK); tpB.position.set(0,0.039,0.82); mb.add(tpB);
    const tp  = box(1.05,0.003,0.68,TRACK_M);   tp.position.set(0,0.041,0.82);  mb.add(tp);
    ([-1.28,1.14] as number[]).forEach(sx => {
      for (let i = 0; i < 5; i++) {
        const g = box(0.018,0.01,0.28,new THREE.MeshStandardMaterial({color:0x0a0804,roughness:1}));
        g.position.set(sx+i*0.038,0.04,-0.42); mb.add(g);
      }
    });
    const fGeo = new THREE.CylinderGeometry(0.055,0.055,0.018,16);
    ([[-1.36,-0.046,-0.88],[1.36,-0.046,-0.88],[-1.36,-0.046,0.90],[1.36,-0.046,0.90]] as [number,number,number][])
      .forEach(([x,y,z]) => { const f = new THREE.Mesh(fGeo,RUBBER); f.position.set(x,y,z); mb.add(f); });
    const pGeo = new THREE.BoxGeometry(0.11,0.042,0.025);
    ([-0.28,0.12] as number[]).forEach(z => {
      const p = new THREE.Mesh(pGeo,PORT_M); p.rotation.y=Math.PI/2; p.position.set(-1.615,0.005,z); mb.add(p);
    });
    const jk = new THREE.Mesh(new THREE.CylinderGeometry(0.024,0.024,0.025,16),PORT_M);
    jk.rotation.z=Math.PI/2; jk.position.set(1.615,0.005,0.42); mb.add(jk);

    const keyMeshes: THREE.Mesh[] = [];
    const kb = new THREE.Group(); kb.position.set(0,0.041,0.12); mb.add(kb);
    ([
      {n:14,w:0.175,x:-1.195,z:-0.595},{n:13,w:0.185,x:-1.175,z:-0.375},
      {n:13,w:0.185,x:-1.175,z:-0.155},{n:11,w:0.185,x:-0.990,z:0.065},
      {n:10,w:0.185,x:-0.905,z:0.285},
    ]).forEach(({n,w,x,z}) => {
      for (let i = 0; i < n; i++) {
        const mat = new THREE.MeshStandardMaterial({color:0x1a1500,roughness:0.90,emissive:new THREE.Color(1,0.8,0.1),emissiveIntensity:0});
        const k = new THREE.Mesh(new THREE.BoxGeometry(w,0.009,0.165),mat);
        k.position.set(x+i*(w+0.032),0.005,z); kb.add(k); keyMeshes.push(k);
      }
    });
    const spMat = new THREE.MeshStandardMaterial({color:0x1a1500,roughness:0.90,emissive:new THREE.Color(1,0.8,0.1),emissiveIntensity:0});
    const spKey = new THREE.Mesh(new THREE.BoxGeometry(1.08,0.009,0.165),spMat);
    spKey.position.set(0,0.005,0.505); kb.add(spKey); keyMeshes.push(spKey);

    // ── LID ──────────────────────────────────────────────────────────────────
    const lidPivot = new THREE.Group();
    lidPivot.position.set(0, 0.037, -1.075);
    mb.add(lidPivot);

    const lidShell = box(3.2, 0.042, 2.18, GOLD);
    lidShell.position.set(0, 0, 1.09); lidPivot.add(lidShell);

    const hs = box(2.85,0.03,0.07,HINGE_M); hs.position.set(0,0,0.035); lidPivot.add(hs);

    const BM = BEZEL;
    const bzTop  = box(3.14, 0.003, 0.09, BM); bzTop.position.set(0,  0.022, 0.085); lidPivot.add(bzTop);
    const bzBot  = box(3.14, 0.003, 0.09, BM); bzBot.position.set(0,  0.022, 2.055); lidPivot.add(bzBot);
    const bzL    = box(0.09, 0.003, 1.88, BM); bzL.position.set(-1.525, 0.022, 1.07); lidPivot.add(bzL);
    const bzR    = box(0.09, 0.003, 1.88, BM); bzR.position.set( 1.525, 0.022, 1.07); lidPivot.add(bzR);

    const logoMat = new THREE.MeshStandardMaterial({color:0xd4a827,metalness:0.98,roughness:0.04,emissive:new THREE.Color(1.0,0.7,0.0),emissiveIntensity:0});
    const logo = new THREE.Mesh(new THREE.CircleGeometry(0.16,64),logoMat);
    logo.rotation.x = -Math.PI/2;
    logo.position.set(0, 0.023, 1.09);
    lidPivot.add(logo);

    // ── SCREEN ───────────────────────────────────────────────────────────────
    const SCREEN_W = 2.72;
    const SCREEN_H = 1.76;

    const screenTex = new THREE.TextureLoader().load(screenSrc);
    screenTex.colorSpace = THREE.SRGBColorSpace;
    screenTex.anisotropy  = renderer.capabilities.getMaxAnisotropy();
    screenTex.minFilter   = THREE.LinearMipmapLinearFilter;
    // flipY stays at default (true) — correct orientation
    // wrapS/wrapT stay at default — no repeat needed

    const screenMat = new THREE.MeshBasicMaterial({
      map:  screenTex,
      side: THREE.DoubleSide,
    });

    const screenMesh = new THREE.Mesh(new THREE.PlaneGeometry(3.14, 2.10), screenMat);
    screenMesh.position.set(0, -0.023, 1.02);
    // ONLY change from your version: -Math.PI/2 instead of +Math.PI/2
    screenMesh.rotation.set(Math.PI / 2, 0, 0);
    lidPivot.add(screenMesh);

    // GSAP
    const state = stateRef.current;
    gsap.timeline({
      scrollTrigger:{trigger:container,start:"top top",end:"bottom bottom",scrub:1.4},
    }).to(state,{progress:1,ease:"none"});
    gsap.to(canvas,{
      opacity:0,
      scrollTrigger:{trigger:container,start:"96% bottom",end:"bottom bottom",scrub:true,
        onLeave:()=>onCompleteRef.current()},
    });

    let rafId: number;
    const clock    = new THREE.Clock();
    const keyPhase = keyMeshes.map(()=>Math.random()*Math.PI*2);

    function tick() {
      rafId = requestAnimationFrame(tick);
      const p = state.progress, t = clock.getElapsedTime();

      mb.position.y = Math.sin(t*0.48)*0.028*(1-p);
      mb.rotation.y = Math.sin(t*0.26)*0.014*(1-p);

      lidPivot.rotation.x = -Math.PI*0.575*easeInOut(Math.min(1,p/0.55));

      logoMat.emissiveIntensity = easeInOut(Math.max(0,Math.min(1,(p-0.28)/0.34)))*0.4;

      const kbE = easeInOut(Math.max(0,Math.min(1,(p-0.35)/0.25)));
      kbLight.intensity = kbE*1.5;
      keyMeshes.forEach((mesh,i)=>{
        (mesh.material as THREE.MeshStandardMaterial).emissiveIntensity=kbE*(0.06+0.03*(0.5+0.5*Math.sin(t*1.8+keyPhase[i])));
      });
      spMat.emissiveIntensity = kbE*0.07;

      const camE = easeInOut(Math.max(0,(p-0.45)/0.55));
      camera.position.set(0, 2.2+(1.023-2.2)*camE, 11+(-1.30-11)*camE);
      camera.fov = 42-camE*20;
      camera.updateProjectionMatrix();
      camera.lookAt(0, 0.3+(1.023-0.3)*camE, -1.342*camE);

      renderer.render(scene, camera);
    }
    tick();

    const onResize = () => { renderer.setSize(W(),H()); camera.aspect=W()/H(); camera.updateProjectionMatrix(); };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", onResize);
      ScrollTrigger.getAll().forEach(s=>s.kill());
      renderer.dispose(); screenTex.dispose();
    };
  }, []);

  useEffect(() => { const c = setupScene(); return c; }, [setupScene]);

  return (
    <div style={{position:"relative",background:"#000"}}>
      <div ref={containerRef} style={{height:"400vh",position:"relative"}}>
        <canvas ref={matrixRef} style={{position:"fixed",top:0,left:0,width:"100%",height:"100vh",zIndex:10,display:"block",pointerEvents:"none"}}/>
        <canvas ref={canvasRef} style={{position:"fixed",top:0,left:0,width:"100%",height:"100vh",zIndex:12,display:"block",pointerEvents:"none"}}/>
        <div style={{position:"fixed",bottom:"2rem",left:"50%",transform:"translateX(-50%)",zIndex:20,display:"flex",flexDirection:"column",alignItems:"center",gap:"8px",color:"rgba(255,215,0,0.45)",fontSize:"11px",fontFamily:"system-ui",letterSpacing:"0.16em",textTransform:"uppercase",pointerEvents:"none"}}>
          <span>Scroll to explore</span>
          <div style={{width:"1px",height:"36px",background:"linear-gradient(to bottom,rgba(255,215,0,.6),transparent)",animation:"scrollLine 1.8s ease-in-out infinite"}}/>
        </div>
      </div>
      <style>{`@keyframes scrollLine{0%,100%{opacity:.28}50%{opacity:1}}`}</style>
    </div>
  );
}