import React, { useState, useEffect, useRef } from 'react';
import { Eye, EyeOff, Check, ArrowRight, Shield, Zap, Lock, Mail } from 'lucide-react';

export default function App() {
  const [isSignUp, setIsSignUp] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [email, setEmail] = useState('yatingzang0215@gmail.com');
  const [password, setPassword] = useState('password123');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const canvasRef = useRef(null);

  // Background Isometric Canvas Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = canvas.parentElement.clientWidth;
      canvas.height = canvas.parentElement.clientHeight;
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particle Matrix Data
    const particles = [];
    for (let i = 0; i < 40; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2 + 1,
        speedX: (Math.random() - 0.5) * 0.4,
        speedY: (Math.random() - 0.5) * 0.4,
        opacity: Math.random() * 0.5 + 0.2
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Dark Tech Background Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      bgGrad.addColorStop(0, '#0a0d14');
      bgGrad.addColorStop(0.5, '#05070a');
      bgGrad.addColorStop(1, '#020305');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Isometric Grid
      ctx.strokeStyle = 'rgba(24, 45, 85, 0.25)';
      ctx.lineWidth = 1;

      const gridSize = 40;
      for (let x = -canvas.width; x < canvas.width * 2; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x - canvas.height * 1.5, canvas.height * 1.5);
        ctx.stroke();

        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x + canvas.height * 1.5, canvas.height * 1.5);
        ctx.stroke();
      }

      // Draw Isometric depot blocks
      const drawBlock = (isoX, isoY, w, h, depth, color, glow = false) => {
        const screenX = canvas.width * 0.35 + (isoX - isoY) * 1.2;
        const screenY = canvas.height * 0.3 + (isoX + isoY) * 0.6;

        ctx.save();
        ctx.translate(screenX, screenY);

        // Top face
        ctx.fillStyle = color.top;
        ctx.beginPath();
        ctx.moveTo(0, -depth);
        ctx.lineTo(w, -depth + w * 0.5);
        ctx.lineTo(w - h, -depth + (w + h) * 0.5);
        ctx.lineTo(-h, -depth + h * 0.5);
        ctx.closePath();
        ctx.fill();

        // Left face
        ctx.fillStyle = color.left;
        ctx.beginPath();
        ctx.moveTo(-h, -depth + h * 0.5);
        ctx.lineTo(w - h, -depth + (w + h) * 0.5);
        ctx.lineTo(w - h, (w + h) * 0.5);
        ctx.lineTo(-h, h * 0.5);
        ctx.closePath();
        ctx.fill();

        // Right face
        ctx.fillStyle = color.right;
        ctx.beginPath();
        ctx.moveTo(w - h, -depth + (w + h) * 0.5);
        ctx.lineTo(w, -depth + w * 0.5);
        ctx.lineTo(w, w * 0.5);
        ctx.lineTo(w - h, (w + h) * 0.5);
        ctx.closePath();
        ctx.fill();

        if (glow) {
          ctx.strokeStyle = '#0088ff';
          ctx.lineWidth = 1.5;
          ctx.shadowColor = '#00a2ff';
          ctx.shadowBlur = 15;
          ctx.stroke();
        }

        ctx.restore();
      };

      // Depot Structures
      drawBlock(-50, 40, 90, 90, 20, { top: '#151b26', left: '#0e121a', right: '#0b0d13' });
      drawBlock(80, -20, 110, 80, 25, { top: '#1c2436', left: '#121824', right: '#0d111a' });
      drawBlock(-20, -60, 70, 70, 45, { top: '#101726', left: '#0a0f1a', right: '#070a12' }, true);

      // Neon Blue Glowing Platform Structure
      const pulse = Math.sin(time * 2) * 0.2 + 0.8;
      drawBlock(20, 20, 100, 100, 30, {
        top: `rgba(0, 120, 255, ${0.4 * pulse})`,
        left: `rgba(0, 70, 180, ${0.6 * pulse})`,
        right: `rgba(0, 40, 120, ${0.8 * pulse})`
      }, true);

      // Animated Particles
      particles.forEach(p => {
        p.x += p.speedX;
        p.y += p.speedY;

        if (p.x < 0) p.x = canvas.width;
        if (p.x > canvas.width) p.x = 0;
        if (p.y < 0) p.y = canvas.height;
        if (p.y > canvas.height) p.y = 0;

        ctx.fillStyle = `rgba(0, 162, 255, ${p.opacity})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      });

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div style={{
      display: 'flex',
      minHeight: '100vh',
      width: '100vw',
      backgroundColor: '#05070a',
      color: '#ffffff',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
      overflow: 'hidden'
    }}>
      {/* Left Visual Area */}
      <div style={{
        flex: 1.2,
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        padding: '40px',
        borderRight: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <canvas ref={canvasRef} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1 }} />
        
        {/* Top Overlay Branding */}
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '12px' }}>
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '8px',
            background: 'linear-gradient(135deg, #0055ff, #00a2ff)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(0, 162, 255, 0.4)'
          }}>
            <Zap size={20} color="#fff" />
          </div>
          <span style={{ fontWeight: '700', fontSize: '18px', letterSpacing: '0.5px' }}>SMART SITE</span>
        </div>

        {/* Bottom Status Info */}
        <div style={{ position: 'relative', zIndex: 2, background: 'rgba(10, 15, 25, 0.7)', backdropFilter: 'blur(10px)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(255, 255, 255, 0.08)', maxWidth: '380px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '6px' }}>
            <span style={{ width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#00ff88', boxShadow: '0 0 10px #00ff88' }}></span>
            <span style={{ fontSize: '12px', color: '#8a99ad', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: '600' }}>Oil Depot Grid Live</span>
          </div>
          <p style={{ margin: 0, fontSize: '13px', color: '#c0cbdb', lineHeight: '1.4' }}>
            Automated site control matrix connected. Monitoring pressure, storage units & telemetry stream.
          </p>
        </div>
      </div>

      {/* Right Form Area */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '40px',
        backgroundColor: '#090b10',
        boxSizing: 'border-box'
      }}>
        <div style={{ width: '100%', maxWidth: '380px' }}>
          
          {isSubmitted ? (
            <div style={{ textAlign: 'center', padding: '30px 0' }}>
              <div style={{
                width: '64px',
                height: '64px',
                borderRadius: '50%',
                backgroundColor: 'rgba(0, 122, 255, 0.1)',
                color: '#007aff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px'
              }}>
                <Check size={32} />
              </div>
              <h2 style={{ fontSize: '24px', marginBottom: '10px', fontWeight: '600' }}>Access Granted</h2>
              <p style={{ color: '#8a99ad', fontSize: '14px', marginBottom: '24px' }}>
                Welcome to Smart Site System for Oil Depots. Redirecting to dashboard...
              </p>
              <button 
                onClick={() => setIsSubmitted(false)}
                style={{
                  padding: '10px 20px',
                  backgroundColor: 'transparent',
                  border: '1px solid rgba(255, 255, 255, 0.1)',
                  color: '#fff',
                  borderRadius: '6px',
                  cursor: 'pointer'
                }}
              >
                Back to Form
              </button>
            </div>
          ) : (
            <>
              <h1 style={{ fontSize: '32px', fontWeight: '500', marginBottom: '12px', letterSpacing: '-0.5px' }}>
                {isSignUp ? 'Sign up' : 'Sign in'}
              </h1>
              <p style={{ color: '#7a899c', fontSize: '14px', lineHeight: '1.5', marginBottom: '32px' }}>
                Welcome to the Smart Site System for Oil Depots.<br />
                {isSignUp ? 'Register as a member to experience.' : 'Enter your credentials to access.'}
              </p>

              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                
                {/* Email Field */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#9ba8b8', marginBottom: '8px' }}>
                    E-mail
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '14px 16px',
                        backgroundColor: '#1b1e24',
                        border: '1px solid transparent',
                        borderRadius: '6px',
                        color: '#ffffff',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div>
                  <label style={{ display: 'block', fontSize: '13px', color: '#9ba8b8', marginBottom: '8px' }}>
                    Password
                  </label>
                  <div style={{ position: 'relative' }}>
                    <input
                      type={showPassword ? 'text' : 'password'}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                      style={{
                        width: '100%',
                        padding: '14px 44px 14px 16px',
                        backgroundColor: '#1b1e24',
                        border: '1px solid transparent',
                        borderRadius: '6px',
                        color: '#ffffff',
                        fontSize: '14px',
                        outline: 'none',
                        boxSizing: 'border-box'
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: 'absolute',
                        right: '12px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        color: '#657487',
                        cursor: 'pointer',
                        padding: 0
                      }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </button>
                  </div>
                </div>

                {/* Terms Checkbox */}
                {isSignUp && (
                  <div 
                    onClick={() => setAgreeTerms(!agreeTerms)}
                    style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', marginTop: '4px' }}
                  >
                    <div style={{
                      width: '18px',
                      height: '18px',
                      borderRadius: '4px',
                      backgroundColor: agreeTerms ? '#007aff' : '#1b1e24',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.2s'
                    }}>
                      {agreeTerms && <Check size={14} color="#fff" />}
                    </div>
                    <span style={{ fontSize: '13px', color: '#8a99ad' }}>
                      I agree to the terms of service
                    </span>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  style={{
                    width: '100%',
                    padding: '14px',
                    backgroundColor: '#007aff',
                    color: '#ffffff',
                    border: 'none',
                    borderRadius: '6px',
                    fontSize: '14px',
                    fontWeight: '500',
                    cursor: 'pointer',
                    marginTop: '12px',
                    transition: 'background-color 0.2s',
                    boxShadow: '0 4px 12px rgba(0, 122, 255, 0.3)'
                  }}
                >
                  {isSignUp ? 'Create Account' : 'Sign In'}
                </button>
              </form>

              {/* Bottom Toggle */}
              <div style={{ marginTop: '40px', textAlign: 'center', fontSize: '13px', color: '#657487' }}>
                {isSignUp ? 'Already a member? ' : "Don't have an account? "}
                <button
                  onClick={() => setIsSignUp(!isSignUp)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#007aff',
                    cursor: 'pointer',
                    padding: 0,
                    fontSize: '13px'
                  }}
                >
                  {isSignUp ? 'Sign in' : 'Sign up'}
                </button>
              </div>
            </>
          )}

        </div>
      </div>
    </div>
  );
}