import React, { useState, useEffect } from 'react';
import {
  LayoutDashboard,
  Activity,
  Database,
  ShieldCheck,
  Settings,
  Bell,
  Search,
  Terminal,
  Cpu,
  Layers,
  ChevronRight,
  ExternalLink,
  Plus,
  RefreshCw,
  Clock,
  CheckCircle2,
  AlertCircle,
  HardDrive
} from 'lucide-react';

// --- Sub-components ---

const Sidebar = () => (
  <aside className="sidebar">
    <div style={{ padding: '32px 24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
      <div style={{ background: 'var(--primary)', padding: '8px', borderRadius: '12px', boxShadow: '0 0 15px var(--primary-glow)' }}>
        <Layers size={24} color="white" />
      </div>
      <div>
        <h1 style={{ fontSize: '1.25rem', fontWeight: 800, letterSpacing: '-0.5px' }}>NEXUS<span style={{ color: 'var(--primary)' }}>OPS</span></h1>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)', fontWeight: 500 }}>V.2.4.0 • Enterprise</p>
      </div>
    </div>

    <nav style={{ flex: 1, marginTop: '20px' }}>
      <p style={{ padding: '0 24px 10px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>General</p>
      <a href="#" className="nav-link active"><LayoutDashboard size={20} /> Dashboard</a>
      <a href="#" className="nav-link"><Activity size={20} /> Monitoring</a>
      <a href="#" className="nav-link"><Terminal size={20} /> CI/CD Pipelines</a>
      <a href="#" className="nav-link"><Database size={20} /> Infrastructure</a>

      <p style={{ padding: '30px 24px 10px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Security</p>
      <a href="#" className="nav-link"><ShieldCheck size={20} /> Vulnerabilities</a>
      <a href="#" className="nav-link"><Bell size={20} /> Incident Alerts</a>

      <p style={{ padding: '30px 24px 10px', fontSize: '0.7rem', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>System</p>
      <a href="#" className="nav-link"><Settings size={20} /> Settings</a>
    </nav>

    <div style={{ padding: '24px', borderTop: '1px solid var(--border)' }}>
      <div className="glass-card" style={{ padding: '16px', fontSize: '0.85rem' }}>
        <p style={{ color: 'var(--text-muted)', marginBottom: '8px' }}>Storage Usage</p>
        <div style={{ width: '100%', height: '6px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', marginBottom: '8px' }}>
          <div style={{ width: '74%', height: '100%', background: 'var(--primary)', borderRadius: '10px' }}></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem' }}>
          <span>1.4 TB</span>
          <span style={{ color: 'var(--text-muted)' }}>2.0 TB Total</span>
        </div>
      </div>
    </div>
  </aside>
);

const Header = () => (
  <header style={{
    height: '80px',
    borderBottom: '1px solid var(--border)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '0 40px',
    background: 'rgba(5, 7, 10, 0.8)',
    backdropFilter: 'blur(10px)',
    position: 'sticky',
    top: 0,
    zIndex: 90
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
      <div style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>
        <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
        <input
          type="text"
          placeholder="Search resources, pipelines or cluster..."
          style={{
            width: '100%',
            padding: '10px 10px 10px 40px',
            background: 'rgba(255,255,255,0.05)',
            border: '1px solid var(--border)',
            borderRadius: '12px',
            color: 'white',
            outline: 'none',
            fontSize: '0.9rem'
          }}
        />
      </div>
    </div>

    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
      <button style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
        <Plus size={18} /> New Deployment
      </button>
      <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
        JD
      </div>
    </div>
  </header>
);

const StatCard = ({ icon: Icon, label, value, trend, color }) => (
  <div className="glass-card animate-fade" style={{ padding: '24px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
      <div style={{ background: `rgba(${color}, 0.1)`, padding: '10px', borderRadius: '12px' }}>
        <Icon size={24} style={{ color: `rgb(${color})` }} />
      </div>
      <div style={{ textAlign: 'right' }}>
        <span style={{ color: trend.startsWith('+') ? 'var(--success)' : 'var(--danger)', fontSize: '0.85rem', fontWeight: 600 }}>
          {trend}
        </span>
        <p style={{ fontSize: '0.7rem', color: 'var(--text-muted)' }}>from last week</p>
      </div>
    </div>
    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '4px' }}>{label}</p>
    <h3 style={{ fontSize: '1.75rem', fontWeight: 700 }}>{value}</h3>
  </div>
);

const PipelineItem = ({ name, env, status, duration, time, onClick }) => {
  const getStatusIcon = () => {
    switch (status) {
      case 'success': return <CheckCircle2 size={18} color="var(--success)" />;
      case 'running': return <RefreshCw size={18} color="var(--primary)" className="spinning" />;
      case 'failed': return <AlertCircle size={18} color="var(--danger)" />;
      default: return null;
    }
  };

  return (
    <div
      onClick={onClick}
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '16px',
        borderBottom: '1px solid var(--border)',
        transition: 'background 0.2s',
        cursor: 'pointer'
      }} className="pipeline-row">
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
        <div style={{ width: '40px', height: '40px', borderRadius: '10px', background: 'rgba(255,255,255,0.03)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <Terminal size={20} color="var(--text-muted)" />
        </div>
        <div>
          <h4 style={{ fontSize: '0.95rem', fontWeight: 600 }}>{name}</h4>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span className={`badge ${env === 'PROD' ? 'badge-blue' : 'badge-green'}`}>{env}</span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>main branch</span>
          </div>
        </div>
      </div>

      <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
        <div style={{ textAlign: 'right' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end' }}>
            {getStatusIcon()}
            <span style={{ fontSize: '0.9rem', fontWeight: 500, textTransform: 'capitalize' }}>{status}</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>ID: #92031</p>
        </div>

        <div style={{ textAlign: 'right', minWidth: '100px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px', justifyContent: 'flex-end', color: 'var(--text-muted)' }}>
            <Clock size={14} />
            <span style={{ fontSize: '0.9rem' }}>{duration}</span>
          </div>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{time}</p>
        </div>

        <ChevronRight size={20} color="var(--text-muted)" />
      </div>
    </div>
  );
};

// --- Terminal Component ---

const TerminalLogs = ({ activePipeline }) => {
  const [logs, setLogs] = useState([
    "[INFO] Initializing worker node 08-B...",
    "[INFO] Fetching latest commit 4f2a1...",
    "[DEBUG] Checking dependency tree...",
  ]);

  useEffect(() => {
    if (!activePipeline) return;

    setLogs(prev => [...prev, `[SYSTEM] Intercepting logs for ${activePipeline}...`]);

    const messages = [
      "Starting build sequence...",
      "Resolving @nexus/core-utils...",
      "Compiling assets (Production)",
      "Optimizing bundles...",
      "Running security audit...",
      "Pushing to Docker Registry...",
      "Deploying to K8s cluster alpha...",
      "Health check passed. Done."
    ];

    let i = 0;
    const interval = setInterval(() => {
      if (i < messages.length) {
        setLogs(prev => [...prev.slice(-15), `[${new Date().toLocaleTimeString()}] ${messages[i]}`]);
        i++;
      } else {
        clearInterval(interval);
      }
    }, 1500);

    return () => clearInterval(interval);
  }, [activePipeline]);

  return (
    <div style={{
      background: '#000',
      borderRadius: '12px',
      padding: '20px',
      marginTop: '24px',
      border: '1px solid var(--border)',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '0.8rem',
      color: '#aaddff',
      height: '240px',
      overflowY: 'auto',
      boxShadow: '0 10px 30px rgba(0,0,0,0.5)'
    }}>
      <div style={{ display: 'flex', gap: '8px', marginBottom: '12px', color: '#666' }}>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ff5f56' }}></div>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#ffbd2e' }}></div>
        <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#27c93f' }}></div>
        <span style={{ marginLeft: '8px', color: '#555' }}>nexus-cli / pipeline-logs</span>
      </div>
      {logs.map((log, i) => (
        <div key={i} style={{ marginBottom: '4px' }}>
          <span style={{ color: '#555', marginRight: '8px' }}>$</span>
          {log}
        </div>
      ))}
      <div className="terminal-cursor"></div>
    </div>
  );
};

// --- Modal Component ---

const DeploymentModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      background: 'rgba(0,0,0,0.8)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 1000,
      padding: '20px'
    }} onClick={onClose}>
      <div
        className="glass-card"
        style={{ width: '100%', maxWidth: '500px', padding: '32px', position: 'relative' }}
        onClick={e => e.stopPropagation()}
      >
        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '24px' }}>Deploy New Resource</h3>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Resource Type</label>
          <select style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white' }}>
            <option>Microservice (Node/React)</option>
            <option>Database (PostgreSQL)</option>
            <option>Gateway Config</option>
            <option>Redis Cache</option>
          </select>
        </div>

        <div style={{ marginBottom: '20px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Destination Cluster</label>
          <select style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white' }}>
            <option>us-east-cluster-01 (Prod)</option>
            <option>eu-west-staging-04</option>
            <option>global-edge-nodes</option>
          </select>
        </div>

        <div style={{ marginBottom: '32px' }}>
          <label style={{ display: 'block', fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '8px' }}>Commit Reference</label>
          <input type="text" placeholder="main@HEAD" style={{ width: '100%', padding: '12px', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)', borderRadius: '10px', color: 'white' }} />
        </div>

        <div style={{ display: 'flex', gap: '12px' }}>
          <button
            onClick={onClose}
            style={{ flex: 1, padding: '12px', background: 'transparent', border: '1px solid var(--border)', borderRadius: '10px', color: 'white', fontWeight: 600, cursor: 'pointer' }}
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            style={{ flex: 1, padding: '12px', background: 'var(--primary)', border: 'none', borderRadius: '10px', color: 'white', fontWeight: 600, cursor: 'pointer' }}
          >
            Confirm Deploy
          </button>
        </div>
      </div>
    </div>
  );
};

// --- Main Page ---

const Dashboard = () => {
  const [selectedPipeline, setSelectedPipeline] = useState('nexus-api-gateway');
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="main-content">
      <header style={{
        height: '80px',
        borderBottom: '1px solid var(--border)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 40px',
        background: 'rgba(5, 7, 10, 0.8)',
        backdropFilter: 'blur(10px)',
        position: 'sticky',
        top: 0,
        zIndex: 90
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flex: 1 }}>
          <div style={{ position: 'relative', maxWidth: '400px', width: '100%' }}>
            <Search size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input
              type="text"
              placeholder="Search resources, pipelines or cluster..."
              style={{
                width: '100%',
                padding: '10px 10px 10px 40px',
                background: 'rgba(255,255,255,0.05)',
                border: '1px solid var(--border)',
                borderRadius: '12px',
                color: 'white',
                outline: 'none',
                fontSize: '0.9rem'
              }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <button
            onClick={() => setIsModalOpen(true)}
            style={{ background: 'var(--primary)', color: 'white', border: 'none', padding: '10px 20px', borderRadius: '10px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
          >
            <Plus size={18} /> New Deployment
          </button>
          <div style={{ width: '40px', height: '40px', borderRadius: '12px', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>
            JD
          </div>
        </div>
      </header>

      <div style={{ padding: '32px 40px' }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '8px' }}>Dashboard Overview</h2>
          <p style={{ color: 'var(--text-muted)' }}>Health and performance metrics across all infrastructure clusters.</p>
        </div>

        <div className="dashboard-grid" style={{ padding: 0 }}>
          <StatCard
            icon={Cpu}
            label="Average CPU Usage"
            value="42.8%"
            trend="+2.4%"
            color="59, 130, 246"
          />
          <StatCard
            icon={HardDrive}
            label="Active Clusters"
            value="12"
            trend="Stable"
            color="16, 185, 129"
          />
          <StatCard
            icon={Activity}
            label="Requests /sec"
            value="4.2k"
            trend="-12%"
            color="245, 158, 11"
          />
          <StatCard
            icon={ShieldCheck}
            label="Security Score"
            value="98/100"
            trend="+1"
            color="139, 92, 246"
          />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '24px', marginTop: '32px' }}>
          {/* Recent Pipelines */}
          <div>
            <div className="glass-card animate-fade" style={{ animationDelay: '0.2s' }}>
              <div style={{ padding: '24px', borderBottom: '1px solid var(--border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 600 }}>Active Pipelines</h3>
                <button style={{ background: 'transparent', border: 'none', color: 'var(--primary)', fontSize: '0.9rem', fontWeight: 600, cursor: 'pointer' }}>View All</button>
              </div>
              <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
                <PipelineItem onClick={() => setSelectedPipeline('nexus-api-gateway')} name="nexus-api-gateway" env="PROD" status="success" duration="4m 12s" time="2 mins ago" />
                <PipelineItem onClick={() => setSelectedPipeline('auth-service-micro')} name="auth-service-micro" env="STAGING" status="running" duration="1m 45s" time="Just now" />
                <PipelineItem onClick={() => setSelectedPipeline('data-sync-worker')} name="data-sync-worker" env="PROD" status="failed" duration="12s" time="15 mins ago" />
                <PipelineItem onClick={() => setSelectedPipeline('edge-cdn-handler')} name="edge-cdn-handler" env="PROD" status="success" duration="8m 33s" time="1 hour ago" />
                <PipelineItem onClick={() => setSelectedPipeline('user-profile-v3')} name="user-profile-v3" env="PROD" status="success" duration="3m 50s" time="3 hours ago" />
              </div>
            </div>

            <TerminalLogs activePipeline={selectedPipeline} />
          </div>

          {/* Infrastructure Health */}
          <div className="glass-card animate-fade" style={{ animationDelay: '0.3s', padding: '24px' }}>
            <h3 style={{ fontSize: '1.1rem', fontWeight: 600, marginBottom: '24px' }}>Resource Health</h3>

            {[
              { name: 'K8s cluster-alpha', status: 'online', load: 68 },
              { name: 'Redis persistence', status: 'online', load: 24 },
              { name: 'Postgres master', status: 'warning', load: 89 },
              { name: 'Elasticsearch-01', status: 'online', load: 45 },
              { name: 'S3 storage bucket', status: 'online', load: 12 },
            ].map((item, i) => (
              <div key={i} style={{ marginBottom: '20px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <span className={`status-dot status-${item.status}`}></span>
                    <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{item.name}</span>
                  </div>
                  <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>{item.load}%</span>
                </div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                  <div style={{
                    width: `${item.load}%`,
                    height: '100%',
                    background: item.load > 80 ? 'var(--danger)' : item.load > 60 ? 'var(--warning)' : 'var(--success)',
                    borderRadius: '10px'
                  }}></div>
                </div>
              </div>
            ))}

            <div style={{ marginTop: '32px', padding: '16px', borderRadius: '12px', background: 'rgba(245, 158, 11, 0.05)', border: '1px dashed rgba(245, 158, 11, 0.3)' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <AlertCircle size={20} color="var(--warning)" />
                <div>
                  <h4 style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--warning)' }}>Critical Alert</h4>
                  <p style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '4px' }}>Postgres master instance is approaching max storage capacity. Upgrade recommended.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DeploymentModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />

      <style>{`
        .spinning {
          animation: spin 2s linear infinite;
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .pipeline-row:hover {
          background: rgba(255,255,255,0.02);
        }
        .terminal-cursor {
          display: inline-block;
          width: 8px;
          height: 16px;
          background: #27c93f;
          animation: blink 1s step-end infinite;
          vertical-align: middle;
          margin-left: 4px;
        }
        @keyframes blink {
          50% { opacity: 0; }
        }
      `}</style>
    </div>
  );
};


export default function App() {
  return (
    <div className="app-container">
      <Sidebar />
      <Dashboard />
    </div>
  );
}
