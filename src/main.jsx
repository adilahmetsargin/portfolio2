import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  Activity,
  AlertTriangle,
  ArrowUpRight,
  BarChart3,
  Boxes,
  CarFront,
  CheckCircle2,
  ChevronRight,
  CircleGauge,
  ClipboardCheck,
  Cpu,
  DatabaseZap,
  Factory,
  Filter,
  Github,
  Hammer,
  LineChart,
  Mail,
  MapPin,
  Network,
  PackageCheck,
  Play,
  Radar,
  RefreshCw,
  Send,
  ShieldCheck,
  TrendingDown,
  Truck,
  Users,
  Wrench
} from "lucide-react";
import * as THREE from "three";
import "./styles.css";

const profile = {
  name: "Adil Ahmet Sargin",
  shortName: "Adil Sargin",
  email: "adilahmetsargin@gmail.com",
  github: "https://github.com/adilahmetsargin",
  repo: "https://github.com/adilahmetsargin/portfolio2",
  location: "Michigan"
};

const projects = [
  {
    key: "line-twin",
    name: "3D Assembly Line Digital Twin",
    url: "#line-twin",
    demoId: "line-twin",
    type: "Automotive manufacturing",
    categories: ["Automotive", "3D", "Data Apps"],
    impact: "A browser-based 3D line monitor that shows station health, takt pressure, downtime risk, and work-in-progress flow.",
    stack: ["React", "Three.js", "Simulation UI", "Operations analytics"],
    signal: "Relevant to manufacturing software, MES-adjacent dashboards, and Industry 4.0 teams",
    result: "Shows that you can combine interactive 3D, operational metrics, and business context in one usable application.",
    actions: ["Open 3D demo", "Station health", "OEE view"]
  },
  {
    key: "quality-intel",
    name: "Vehicle Quality Intelligence",
    url: "#quality-intel",
    demoId: "quality-intel",
    type: "Quality and warranty analytics",
    categories: ["Automotive", "3D", "Data Apps"],
    impact: "A quality investigation console that maps defect clusters, warranty signals, severity, and likely root-cause areas.",
    stack: ["React", "Three.js", "Data visualization", "Root-cause workflow"],
    signal: "Relevant to OEMs, suppliers, quality teams, warranty teams, and analytics roles",
    result: "Shows that you can turn messy vehicle and quality data into a decision-making interface.",
    actions: ["Open quality demo", "Defect heatmap", "Root-cause view"]
  },
  {
    key: "ops-command",
    name: "Operations Command Center",
    url: "#demo-tools",
    demoTool: "metrics",
    type: "Internal tools",
    categories: ["Internal Tools", "Data Apps"],
    impact: "A KPI console for daily operations: throughput, downtime, coverage, open issues, and shift-level movement.",
    stack: ["React", "Dashboards", "State", "Business metrics"],
    signal: "Useful for operations teams, small businesses, service departments, and managers who need one source of truth",
    result: "Shows that you can translate business questions into a practical dashboard people can use every day.",
    actions: ["Open metrics demo", "KPI cards", "Daily view"]
  },
  {
    key: "supplier-crm",
    name: "Supplier Follow-up CRM",
    url: "#demo-tools",
    demoTool: "supplier",
    type: "Business workflow",
    categories: ["Internal Tools", "Web Apps"],
    impact: "A lightweight CRM for vendor follow-up, quote status, delivery risk, owners, and next actions.",
    stack: ["React", "Forms", "Validation", "Workflow UI"],
    signal: "Relevant beyond automotive: purchasing, vendor management, recruiting pipelines, and account follow-up",
    result: "Shows product thinking around accountability, status clarity, and repeatable follow-up.",
    actions: ["Open CRM demo", "Risk filter", "Follow-up queue"]
  },
  {
    key: "handoff-board",
    name: "Shift Handoff Board",
    url: "#demo-tools",
    demoTool: "handoff",
    type: "Team communication",
    categories: ["Internal Tools", "Web Apps"],
    impact: "A simple handoff tool for open issues, blockers, owners, statuses, and notes between teams or shifts.",
    stack: ["React", "Interactive UI", "Workflow design"],
    signal: "Works for manufacturing, healthcare admin, service teams, field ops, and support teams",
    result: "Shows that small tools can remove real operational friction when they match how teams communicate.",
    actions: ["Open handoff demo", "Status filter", "Owner view"]
  },
  {
    key: "client-portal",
    name: "Client Intake Portal",
    url: "#contact",
    type: "Web application",
    categories: ["Web Apps", "Internal Tools"],
    impact: "A polished intake flow concept for collecting requests, qualifying priority, and routing the next step.",
    stack: ["React", "Forms", "UX writing", "Netlify"],
    signal: "General-purpose proof for agencies, service businesses, SaaS teams, and non-automotive roles",
    result: "Shows that you can build clear front-office experiences, not only technical dashboards.",
    actions: ["Discuss build", "Request flow", "Routing logic"]
  }
];

const projectFilters = ["All", "Automotive", "Internal Tools", "Data Apps", "3D", "Web Apps"];

const lineStations = [
  { name: "Body", health: 96, takt: "48s", wip: 12, risk: "Low" },
  { name: "Paint", health: 88, takt: "54s", wip: 8, risk: "Medium" },
  { name: "Battery", health: 73, takt: "67s", wip: 5, risk: "High" },
  { name: "Final", health: 91, takt: "51s", wip: 15, risk: "Low" }
];

const qualityZones = [
  { zone: "Front harness", claims: 37, severity: "High", action: "Inspect connector seating on build window 14B" },
  { zone: "Door seal", claims: 22, severity: "Medium", action: "Compare supplier lot and humidity window" },
  { zone: "Rear sensor", claims: 14, severity: "Low", action: "Watch calibration drift after service update" }
];

const toolIdeas = [
  {
    icon: ClipboardCheck,
    title: "Shift Handoff Board",
    text: "A clean handoff screen for open issues, blockers, part shortages, and owner notes.",
    key: "handoff"
  },
  {
    icon: DatabaseZap,
    title: "Supplier Follow-up Tracker",
    text: "A lightweight CRM for quote status, delivery risk, and next actions.",
    key: "supplier"
  },
  {
    icon: CircleGauge,
    title: "Plant Metrics Console",
    text: "A dashboard that turns daily throughput, scrap, downtime, and alerts into decisions.",
    key: "metrics"
  }
];

const handoffItems = [
  { area: "Final assembly", owner: "A. Kim", issue: "Station 4 torque check needs sign-off", status: "Open" },
  { area: "Parts cage", owner: "M. Patel", issue: "Sensor bracket reorder below threshold", status: "Watch" },
  { area: "Quality", owner: "J. Rivera", issue: "Two units require rework review at 8:30", status: "Open" }
];

const supplierRows = [
  { supplier: "Great Lakes Fasteners", item: "M8 flange bolts", due: "Today", risk: "High", owner: "Purchasing" },
  { supplier: "Motor City Plastics", item: "Interior clips", due: "Tomorrow", risk: "Medium", owner: "Sourcing" },
  { supplier: "Lansing Controls", item: "Harness sensor", due: "Friday", risk: "Low", owner: "Engineering" }
];

const metrics = [
  { label: "Throughput", value: "94%", note: "+6 vs yesterday", icon: PackageCheck },
  { label: "Downtime", value: "42m", note: "-18m this shift", icon: TrendingDown },
  { label: "Open issues", value: "7", note: "3 need owner review", icon: AlertTriangle },
  { label: "Crew coverage", value: "21/24", note: "Gap on B shift", icon: Users }
];

const capabilities = [
  ["Diagnose", "Find the real business bottleneck before writing code."],
  ["Design", "Shape small tools around how people actually work."],
  ["Build", "Ship usable React apps, dashboards, forms, automations, and data views."],
  ["Improve", "Watch adoption, remove friction, and make the workflow easier each week."]
];

function AutomotiveScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const group = new THREE.Group();
    group.position.x = 1.05;
    group.position.y = -0.04;
    scene.add(group);

    const carBody = new THREE.Mesh(
      new THREE.BoxGeometry(3.4, 0.72, 1.28, 4, 1, 2),
      new THREE.MeshStandardMaterial({
        color: 0xd8e2ea,
        metalness: 0.72,
        roughness: 0.28
      })
    );
    carBody.position.y = 0.2;
    group.add(carBody);

    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.46, 0.58, 1.02, 2, 1, 1),
      new THREE.MeshStandardMaterial({
        color: 0x2b4d5c,
        metalness: 0.35,
        roughness: 0.18,
        transparent: true,
        opacity: 0.82
      })
    );
    cabin.position.set(-0.18, 0.84, 0);
    group.add(cabin);

    const wheelMaterial = new THREE.MeshStandardMaterial({
      color: 0x14181a,
      metalness: 0.35,
      roughness: 0.42
    });
    const rimMaterial = new THREE.MeshStandardMaterial({
      color: 0xf2b84b,
      metalness: 0.7,
      roughness: 0.2
    });

    const wheels = [];
    [-1.1, 1.12].forEach((x) => {
      [-0.72, 0.72].forEach((z) => {
        const wheel = new THREE.Mesh(
          new THREE.CylinderGeometry(0.34, 0.34, 0.28, 32),
          wheelMaterial
        );
        wheel.rotation.z = Math.PI / 2;
        wheel.position.set(x, -0.24, z);
        group.add(wheel);
        wheels.push(wheel);

        const rim = new THREE.Mesh(
          new THREE.CylinderGeometry(0.16, 0.16, 0.3, 24),
          rimMaterial
        );
        rim.rotation.z = Math.PI / 2;
        rim.position.copy(wheel.position);
        group.add(rim);
        wheels.push(rim);
      });
    });

    const grid = new THREE.GridHelper(7, 18, 0xf2b84b, 0x3b5560);
    grid.position.y = -0.62;
    grid.material.transparent = true;
    grid.material.opacity = 0.34;
    scene.add(grid);

    const nodes = new THREE.Group();
    const nodeMaterial = new THREE.MeshBasicMaterial({ color: 0x5bd1c8 });
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0x5bd1c8,
      transparent: true,
      opacity: 0.42
    });

    const positions = [
      [-2.5, 1.45, -1.2],
      [-1.15, 1.85, 1.05],
      [0.2, 1.35, -1.38],
      [1.35, 1.95, 0.92],
      [2.4, 1.42, -0.72]
    ];
    positions.forEach((position, index) => {
      const node = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), nodeMaterial);
      node.position.set(...position);
      node.userData.index = index;
      nodes.add(node);
    });
    for (let index = 0; index < positions.length - 1; index += 1) {
      const geometry = new THREE.BufferGeometry().setFromPoints(
        [positions[index], positions[index + 1]].map((point) => new THREE.Vector3(...point))
      );
      nodes.add(new THREE.Line(geometry, lineMaterial));
    }
    scene.add(nodes);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.3);
    keyLight.position.set(2.5, 4, 2);
    scene.add(keyLight);
    scene.add(new THREE.AmbientLight(0xffffff, 1.2));

    camera.position.set(4.1, 2.4, 4.5);
    camera.lookAt(0, 0.35, 0);

    let frameId;
    const clock = new THREE.Clock();

    const resize = () => {
      const { clientWidth, clientHeight } = mount;
      renderer.setSize(clientWidth, clientHeight);
      camera.aspect = clientWidth / clientHeight;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      const elapsed = clock.getElapsedTime();
      group.rotation.y = -0.52 + Math.sin(elapsed * 0.35) * 0.18;
      group.rotation.x = Math.sin(elapsed * 0.24) * 0.035;
      wheels.forEach((wheel) => {
        wheel.rotation.x = elapsed * 1.8;
      });
      nodes.children.forEach((child) => {
        if (child.isMesh) {
          const pulse = 1 + Math.sin(elapsed * 2 + child.userData.index) * 0.28;
          child.scale.setScalar(pulse);
        }
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="automotive-scene" ref={mountRef} aria-label="Interactive automotive systems visual" />;
}

function AssemblyLineScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const floor = new THREE.GridHelper(8, 16, 0x5bd1c8, 0x33474b);
    floor.material.transparent = true;
    floor.material.opacity = 0.42;
    scene.add(floor);

    const line = new THREE.Group();
    scene.add(line);

    const stationMaterials = [
      new THREE.MeshStandardMaterial({ color: 0x5bd1c8, metalness: 0.35, roughness: 0.32 }),
      new THREE.MeshStandardMaterial({ color: 0xf2b84b, metalness: 0.35, roughness: 0.32 }),
      new THREE.MeshStandardMaterial({ color: 0xe46f61, metalness: 0.35, roughness: 0.32 }),
      new THREE.MeshStandardMaterial({ color: 0xd8e2ea, metalness: 0.35, roughness: 0.32 })
    ];

    const stations = [];
    [-2.7, -0.9, 0.9, 2.7].forEach((x, index) => {
      const station = new THREE.Mesh(new THREE.BoxGeometry(0.85, 0.55, 1.1), stationMaterials[index]);
      station.position.set(x, 0.28, 0);
      station.userData.index = index;
      line.add(station);
      stations.push(station);

      const tower = new THREE.Mesh(
        new THREE.CylinderGeometry(0.08, 0.08, 1.25, 18),
        new THREE.MeshStandardMaterial({ color: 0x223238, metalness: 0.5, roughness: 0.3 })
      );
      tower.position.set(x, 0.95, -0.55);
      line.add(tower);

      const beacon = new THREE.Mesh(
        new THREE.SphereGeometry(0.12, 18, 18),
        new THREE.MeshBasicMaterial({ color: index === 2 ? 0xe46f61 : index === 1 ? 0xf2b84b : 0x5bd1c8 })
      );
      beacon.position.set(x, 1.62, -0.55);
      line.add(beacon);
      stations.push(beacon);
    });

    const carriers = [];
    for (let index = 0; index < 5; index += 1) {
      const carrier = new THREE.Mesh(
        new THREE.BoxGeometry(0.46, 0.18, 0.72),
        new THREE.MeshStandardMaterial({ color: 0xd8e2ea, metalness: 0.55, roughness: 0.28 })
      );
      carrier.position.set(-3.4 + index * 1.45, 0.18, 0.82);
      line.add(carrier);
      carriers.push(carrier);
    }

    const rail = new THREE.Mesh(
      new THREE.BoxGeometry(6.6, 0.06, 0.12),
      new THREE.MeshBasicMaterial({ color: 0x5bd1c8 })
    );
    rail.position.set(0, 0.09, 0.82);
    line.add(rail);

    camera.position.set(4.3, 3.3, 4.8);
    camera.lookAt(0, 0.4, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 1.1));
    const keyLight = new THREE.DirectionalLight(0xffffff, 2.4);
    keyLight.position.set(2.5, 4, 3);
    scene.add(keyLight);

    let frameId;
    const clock = new THREE.Clock();
    const resize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      line.rotation.y = -0.38 + Math.sin(elapsed * 0.25) * 0.08;
      carriers.forEach((carrier, index) => {
        const x = ((elapsed * 0.52 + index * 1.4) % 7) - 3.5;
        carrier.position.x = x;
        carrier.position.y = 0.18 + Math.sin(elapsed * 3 + index) * 0.025;
      });
      stations.forEach((station) => {
        const pulse = 1 + Math.sin(elapsed * 2.2 + station.userData.index) * 0.04;
        station.scale.setScalar(pulse);
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="flagship-canvas" ref={mountRef} aria-label="3D assembly line digital twin scene" />;
}

function QualityVehicleScene() {
  const mountRef = useRef(null);

  useEffect(() => {
    const mount = mountRef.current;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(44, 1, 0.1, 100);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    const vehicle = new THREE.Group();
    scene.add(vehicle);

    const bodyMaterial = new THREE.MeshStandardMaterial({
      color: 0xd8e2ea,
      metalness: 0.72,
      roughness: 0.24,
      transparent: true,
      opacity: 0.9
    });
    const body = new THREE.Mesh(new THREE.BoxGeometry(3.4, 0.54, 1.35), bodyMaterial);
    vehicle.add(body);
    const cabin = new THREE.Mesh(
      new THREE.BoxGeometry(1.25, 0.52, 1.05),
      new THREE.MeshStandardMaterial({ color: 0x274a52, metalness: 0.4, roughness: 0.2 })
    );
    cabin.position.set(-0.2, 0.54, 0);
    vehicle.add(cabin);

    const heatMaterial = [
      new THREE.MeshBasicMaterial({ color: 0xe46f61, transparent: true, opacity: 0.82 }),
      new THREE.MeshBasicMaterial({ color: 0xf2b84b, transparent: true, opacity: 0.78 }),
      new THREE.MeshBasicMaterial({ color: 0x5bd1c8, transparent: true, opacity: 0.72 })
    ];
    [
      [1.35, 0.38, -0.48],
      [-0.8, 0.44, 0.62],
      [1.55, 0.25, 0.45]
    ].forEach((position, index) => {
      const hotspot = new THREE.Mesh(new THREE.SphereGeometry(0.16 + index * 0.025, 24, 24), heatMaterial[index]);
      hotspot.position.set(...position);
      hotspot.userData.index = index;
      vehicle.add(hotspot);
    });

    const ring = new THREE.Mesh(
      new THREE.TorusGeometry(2.3, 0.008, 12, 80),
      new THREE.MeshBasicMaterial({ color: 0x5bd1c8, transparent: true, opacity: 0.45 })
    );
    ring.rotation.x = Math.PI / 2;
    ring.position.y = -0.35;
    scene.add(ring);

    camera.position.set(3.6, 2.25, 4.2);
    camera.lookAt(0, 0.25, 0);
    scene.add(new THREE.AmbientLight(0xffffff, 1.15));
    const light = new THREE.DirectionalLight(0xffffff, 2.3);
    light.position.set(2, 3.5, 3);
    scene.add(light);

    let frameId;
    const clock = new THREE.Clock();
    const resize = () => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    };
    const animate = () => {
      const elapsed = clock.getElapsedTime();
      vehicle.rotation.y = -0.5 + Math.sin(elapsed * 0.35) * 0.24;
      ring.rotation.z = elapsed * 0.2;
      vehicle.children.forEach((child) => {
        if (child.userData.index !== undefined) {
          child.scale.setScalar(1 + Math.sin(elapsed * 2.8 + child.userData.index) * 0.2);
        }
      });
      renderer.render(scene, camera);
      frameId = requestAnimationFrame(animate);
    };

    resize();
    animate();
    window.addEventListener("resize", resize);
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameId);
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return <div className="flagship-canvas" ref={mountRef} aria-label="3D vehicle quality heatmap scene" />;
}

function FlagshipApps() {
  const [activeQualityZone, setActiveQualityZone] = useState(qualityZones[0]);

  return (
    <section className="section flagship-section" id="flagship-apps">
      <div className="section-heading">
        <p className="eyebrow">Flagship applications</p>
        <h2>Two portfolio projects aimed at automotive software roles.</h2>
      </div>

      <article className="flagship-app" id="line-twin">
        <div className="flagship-copy">
          <p className="eyebrow">Project 01</p>
          <h3>3D Assembly Line Digital Twin</h3>
          <p>
            A production-line monitor for supervisors and manufacturing software teams: live station
            status, bottleneck pressure, WIP movement, and OEE-style signals in one 3D interface.
          </p>
          <div className="flagship-stats">
            {lineStations.map((station) => (
              <div className="station-card" key={station.name}>
                <span className={`status-dot ${station.risk.toLowerCase()}`} />
                <strong>{station.name}</strong>
                <small>{station.health}% health · {station.takt} takt · {station.wip} WIP</small>
              </div>
            ))}
          </div>
        </div>
        <div className="flagship-visual">
          <AssemblyLineScene />
        </div>
      </article>

      <article className="flagship-app reverse" id="quality-intel">
        <div className="flagship-copy">
          <p className="eyebrow">Project 02</p>
          <h3>Vehicle Quality Intelligence</h3>
          <p>
            A quality analytics console that helps teams inspect warranty claims, defect clusters,
            severity, build windows, and likely root-cause areas without drowning in raw reports.
          </p>
          <div className="quality-layout">
            <div className="quality-list">
              {qualityZones.map((zone) => (
                <button
                  className={activeQualityZone.zone === zone.zone ? "active" : ""}
                  key={zone.zone}
                  onClick={() => setActiveQualityZone(zone)}
                  type="button"
                >
                  <span>{zone.zone}</span>
                  <small>{zone.claims} claims · {zone.severity}</small>
                </button>
              ))}
            </div>
            <div className="root-cause-card">
              <Radar size={19} />
              <strong>{activeQualityZone.severity} priority</strong>
              <p>{activeQualityZone.action}</p>
            </div>
          </div>
        </div>
        <div className="flagship-visual">
          <QualityVehicleScene />
        </div>
      </article>
    </section>
  );
}

function ToolDemo({ activeTool, setActiveTool }) {
  const [handoffStatus, setHandoffStatus] = useState("Open");
  const [supplierFilter, setSupplierFilter] = useState("All");
  const [metricMode, setMetricMode] = useState("Shift");

  const visibleHandoff = handoffItems.filter((item) => handoffStatus === "All" || item.status === handoffStatus);
  const visibleSuppliers = supplierRows.filter((row) => supplierFilter === "All" || row.risk === supplierFilter);

  return (
    <div className="demo-shell" id="demo-tools">
      <div className="demo-tabs" role="tablist" aria-label="Internal tool demos">
        {toolIdeas.map(({ icon: Icon, title, key }) => (
          <button
            className={activeTool === key ? "demo-tab active" : "demo-tab"}
            key={key}
            onClick={() => setActiveTool(key)}
            type="button"
          >
            <Icon size={18} />
            <span>{title}</span>
          </button>
        ))}
      </div>

      {activeTool === "handoff" && (
        <section className="demo-panel" aria-label="Shift handoff board demo">
          <div className="demo-panel-heading">
            <div>
              <p className="eyebrow">Live demo</p>
              <h3>Shift Handoff Board</h3>
            </div>
            <div className="segmented-control" aria-label="Handoff status filter">
              {["Open", "Watch", "All"].map((status) => (
                <button
                  className={handoffStatus === status ? "active" : ""}
                  key={status}
                  onClick={() => setHandoffStatus(status)}
                  type="button"
                >
                  {status}
                </button>
              ))}
            </div>
          </div>
          <div className="handoff-list">
            {visibleHandoff.map((item) => (
              <article className="handoff-row" key={`${item.area}-${item.issue}`}>
                <span className={item.status === "Open" ? "status-pill urgent" : "status-pill"}>{item.status}</span>
                <div>
                  <strong>{item.area}</strong>
                  <p>{item.issue}</p>
                </div>
                <small>{item.owner}</small>
              </article>
            ))}
          </div>
        </section>
      )}

      {activeTool === "supplier" && (
        <section className="demo-panel" aria-label="Supplier tracker demo">
          <div className="demo-panel-heading">
            <div>
              <p className="eyebrow">Live demo</p>
              <h3>Supplier Follow-up Tracker</h3>
            </div>
            <div className="segmented-control" aria-label="Supplier risk filter">
              {["All", "High", "Medium", "Low"].map((risk) => (
                <button
                  className={supplierFilter === risk ? "active" : ""}
                  key={risk}
                  onClick={() => setSupplierFilter(risk)}
                  type="button"
                >
                  {risk}
                </button>
              ))}
            </div>
          </div>
          <div className="supplier-table" role="table" aria-label="Supplier follow-up queue">
            <div className="supplier-row header" role="row">
              <span>Supplier</span>
              <span>Item</span>
              <span>Due</span>
              <span>Risk</span>
              <span>Owner</span>
            </div>
            {visibleSuppliers.map((row) => (
              <div className="supplier-row" role="row" key={`${row.supplier}-${row.item}`}>
                <span>{row.supplier}</span>
                <span>{row.item}</span>
                <span>{row.due}</span>
                <span><b className={`risk ${row.risk.toLowerCase()}`}>{row.risk}</b></span>
                <span>{row.owner}</span>
              </div>
            ))}
          </div>
        </section>
      )}

      {activeTool === "metrics" && (
        <section className="demo-panel" aria-label="Plant metrics console demo">
          <div className="demo-panel-heading">
            <div>
              <p className="eyebrow">Live demo</p>
              <h3>Plant Metrics Console</h3>
            </div>
            <div className="demo-actions">
              <button type="button" onClick={() => setMetricMode(metricMode === "Shift" ? "Daily" : "Shift")}>
                <RefreshCw size={16} />
                {metricMode}
              </button>
            </div>
          </div>
          <div className="metric-grid">
            {metrics.map(({ label, value, note, icon: Icon }) => (
              <article className="metric-tile" key={label}>
                <Icon size={20} />
                <strong>{value}</strong>
                <span>{label}</span>
                <small>{note}</small>
              </article>
            ))}
          </div>
          <div className="timeline">
            <span style={{ width: metricMode === "Shift" ? "68%" : "84%" }} />
          </div>
        </section>
      )}
    </div>
  );
}

function App() {
  const [activeProject, setActiveProject] = useState(projects[0]);
  const [activeFilter, setActiveFilter] = useState("All");
  const [activeTool, setActiveTool] = useState("handoff");
  const year = useMemo(() => new Date().getFullYear(), []);
  const contactHref = `mailto:${profile.email}?subject=Portfolio%20conversation&body=Hi%20${profile.shortName},%0D%0A%0D%0AI%20saw%20your%20portfolio%20and%20wanted%20to%20talk%20about%20a%20software%20or%20workflow%20project.%0D%0A`;
  const filteredProjects = useMemo(
    () => projects.filter((project) => activeFilter === "All" || project.categories.includes(activeFilter)),
    [activeFilter]
  );

  const openProject = (project, event) => {
    if (project.url.startsWith("#")) {
      event?.preventDefault();
      if (project.demoTool) {
        setActiveTool(project.demoTool);
      }
      window.setTimeout(() => {
        document.querySelector(project.url)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }, 0);
    }
  };

  return (
    <main>
      <section className="hero">
        <AutomotiveScene />
        <nav className="topbar" aria-label="Primary navigation">
          <a className="brand" href="#top" aria-label="Solution Portfolio home">
            <Factory size={20} />
            <span>Solution Portfolio</span>
          </a>
          <div className="nav-actions">
            <a href="#work">Work</a>
            <a href="#flagship-apps">Apps</a>
            <a href="#tools">Lab</a>
            <a href="#contact">Contact</a>
            <a href={contactHref} className="icon-button" aria-label="Email">
              <Mail size={18} />
            </a>
            <a href={profile.github} className="icon-button" aria-label="GitHub">
              <Github size={18} />
            </a>
          </div>
        </nav>

        <div className="hero-content" id="top">
          <div className="availability">
            <MapPin size={16} />
            Michigan based · Business-aware software builder
          </div>
          <h1>I build useful software for business problems.</h1>
          <p>
            A portfolio hub for 3D demos, data apps, internal tools, dashboards, and web products
            built around real workflows instead of generic frontend screens.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#work">
              <Play size={18} />
              View deployed work
            </a>
            <a className="secondary-action" href="#tools">
              Prototype lab
              <ChevronRight size={18} />
            </a>
            <a className="secondary-action compact" href="#contact">
              Contact
              <ChevronRight size={18} />
            </a>
            <a className="secondary-action compact" href={contactHref}>
              <Send size={18} />
              Email me
            </a>
          </div>
        </div>

        <div className="hero-strip" aria-label="Core positioning">
          <span><Wrench size={16} /> Business workflows</span>
          <span><Network size={16} /> Internal tools</span>
          <span><BarChart3 size={16} /> Data products</span>
          <span><CarFront size={16} /> 3D automotive demos</span>
        </div>
      </section>

      <section className="section intro">
        <div>
          <p className="eyebrow">The positioning</p>
          <h2>Not “just React.” The value is knowing what should be built.</h2>
        </div>
        <p>
          This portfolio is organized as one hub with multiple proof paths. Automotive teams can
          see 3D and quality analytics. General companies can see internal tools, data workflows,
          and client-facing web apps. Same builder, different business problems.
        </p>
      </section>

      <section className="section process" aria-label="Capability model">
        {capabilities.map(([title, text]) => (
          <article className="process-step" key={title}>
            <span>{title}</span>
            <p>{text}</p>
          </article>
        ))}
      </section>

      <section className="section work-section" id="work">
        <div className="section-heading">
          <p className="eyebrow">Portfolio applications</p>
          <h2>One portfolio, filtered by the problem a company cares about.</h2>
        </div>

        <div className="filter-row" aria-label="Project filters">
          {projectFilters.map((filter) => (
            <button
              className={activeFilter === filter ? "active" : ""}
              key={filter}
              onClick={() => {
                setActiveFilter(filter);
                const nextProject = projects.find((project) => filter === "All" || project.categories.includes(filter));
                setActiveProject(nextProject ?? projects[0]);
              }}
              type="button"
            >
              {filter}
            </button>
          ))}
        </div>

        <div className="work-layout">
          <div className="project-list" role="tablist" aria-label="Portfolio projects">
            {filteredProjects.map((project) => (
              <button
                className={project.name === activeProject.name ? "project-tab active" : "project-tab"}
                key={project.name}
                onClick={() => {
                  setActiveProject(project);
                }}
                type="button"
              >
                <span>{project.name}</span>
                <small>{project.type}</small>
                <em>{project.categories.join(" · ")}</em>
              </button>
            ))}
          </div>

          <article className="project-detail">
            <div className="project-detail-top">
              <div>
                <p className="eyebrow">{activeProject.type}</p>
                <h3>{activeProject.name}</h3>
              </div>
              <a
                className="icon-button strong"
                href={activeProject.url}
                onClick={(event) => openProject(activeProject, event)}
                aria-label={`Open ${activeProject.name}`}
              >
                <ArrowUpRight size={20} />
              </a>
            </div>
            <p className="impact">{activeProject.impact}</p>
            <p className="result-line">{activeProject.result}</p>
            <div className="category-row">
              {activeProject.categories.map((category) => (
                <span key={category}>{category}</span>
              ))}
            </div>
            <div className="stack-list">
              {activeProject.stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <div className="action-row">
              {activeProject.actions.map((action) => (
                <a
                  href={activeProject.url}
                  onClick={(event) => openProject(activeProject, event)}
                  key={action}
                >
                  <Filter size={15} />
                  {action}
                </a>
              ))}
            </div>
            <div className="signal">
              <ShieldCheck size={18} />
              {activeProject.signal}
            </div>
          </article>
        </div>
      </section>

      <FlagshipApps />

      <section className="section tool-section" id="tools">
        <div className="section-heading">
          <p className="eyebrow">Prototype lab</p>
          <h2>Smaller workflow tools we can keep as secondary proof.</h2>
        </div>
        <div className="tool-grid">
          {toolIdeas.map(({ icon: Icon, title, text, key }) => (
            <article className="tool-card" key={title}>
              <div className="tool-icon"><Icon size={22} /></div>
              <h3>{title}</h3>
              <p>{text}</p>
              <button
                type="button"
                onClick={() => {
                  setActiveTool(key);
                  window.setTimeout(() => {
                    document.querySelector("#demo-tools")?.scrollIntoView({ behavior: "smooth", block: "start" });
                  }, 0);
                }}
              >
                Open demo
                <ChevronRight size={16} />
              </button>
            </article>
          ))}
        </div>
        <ToolDemo activeTool={activeTool} setActiveTool={setActiveTool} />
      </section>

      <section className="section proof-band">
        <div>
          <p className="eyebrow">How I think</p>
          <h2>Software is the tool. Better operations is the outcome.</h2>
        </div>
        <div className="proof-items">
          <span><CheckCircle2 size={18} /> Map the workflow</span>
          <span><Boxes size={18} /> Structure the data</span>
          <span><Hammer size={18} /> Build the smallest useful tool</span>
          <span><LineChart size={18} /> Measure what improved</span>
        </div>
      </section>

      <section className="section contact-band" id="contact">
        <div>
          <p className="eyebrow">Next step</p>
          <h2>Let the portfolio open the right conversation.</h2>
          <p>
            The point is not to look like another frontend applicant. It is to show that you can
            walk into a business problem, understand the workflow, and build the tool that makes the work easier.
          </p>
        </div>
        <div className="contact-actions">
          <a className="primary-action" href={contactHref}>
            <Mail size={18} />
            Email me
          </a>
          <a className="secondary-action" href={profile.github}>
            <Github size={18} />
            GitHub profile
          </a>
        </div>
      </section>

      <footer>
        <span>© {year} {profile.name} · Solution Portfolio</span>
        <a href={contactHref}>{profile.email}</a>
      </footer>
    </main>
  );
}

createRoot(document.getElementById("root")).render(<App />);
