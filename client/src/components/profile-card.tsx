import { useRef, useState, useEffect, MouseEvent, TouchEvent } from "react";

interface ProfileCardProps {
  avatarUrl: string;
  iconUrl?: string;
  grainUrl?: string;
  innerGradient?: string;
  behindGlowEnabled?: boolean;
  behindGlowColor?: string;
  behindGlowSize?: string;
  className?: string;
  enableTilt?: boolean;
  enableMobileTilt?: boolean;
  mobileTiltSensitivity?: number;
  miniAvatarUrl?: string;
  name?: string;
  title?: string;
  handle?: string;
  status?: string;
  contactText?: string;
  showUserInfo?: boolean;
  onContactClick?: () => void;
}

export function ProfileCard({
  avatarUrl,
  iconUrl,
  grainUrl,
  innerGradient = "linear-gradient(135deg, rgba(125, 190, 255, 0.2) 0%, rgba(125, 190, 255, 0) 100%)",
  behindGlowEnabled = true,
  behindGlowColor = "rgba(125, 190, 255, 0.67)",
  behindGlowSize = "50%",
  className = "",
  enableTilt = true,
  enableMobileTilt = false,
  mobileTiltSensitivity = 5,
  miniAvatarUrl,
  name = "Javi A. Torres",
  title = "Software Engineer",
  handle = "javicodes",
  status = "Online",
  contactText = "Contact",
  showUserInfo = true,
  onContactClick,
}: ProfileCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [glowX, setGlowX] = useState(50);
  const [glowY, setGlowY] = useState(50);

  useEffect(() => {
    if (!enableMobileTilt) return;

    const handleOrientation = (event: DeviceOrientationEvent) => {
      if (event.beta !== null && event.gamma !== null) {
        const tiltX = Math.max(-20, Math.min(20, event.beta / mobileTiltSensitivity));
        const tiltY = Math.max(-20, Math.min(20, event.gamma / mobileTiltSensitivity));
        setRotateX(tiltX);
        setRotateY(tiltY);
      }
    };

    window.addEventListener("deviceorientation", handleOrientation);
    return () => window.removeEventListener("deviceorientation", handleOrientation);
  }, [enableMobileTilt, mobileTiltSensitivity]);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!enableTilt || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const centerX = rect.width / 2;
    const centerY = rect.height / 2;

    const rotateXValue = ((y - centerY) / centerY) * -10;
    const rotateYValue = ((x - centerX) / centerX) * 10;

    setRotateX(rotateXValue);
    setRotateY(rotateYValue);

    const glowXValue = (x / rect.width) * 100;
    const glowYValue = (y / rect.height) * 100;

    setGlowX(glowXValue);
    setGlowY(glowYValue);
  };

  const handleMouseLeave = () => {
    if (!enableTilt) return;
    setRotateX(0);
    setRotateY(0);
    setGlowX(50);
    setGlowY(50);
  };

  return (
    <div
      className={`relative w-full max-w-sm mx-auto ${className}`}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {behindGlowEnabled && (
        <div
          ref={glowRef}
          className="absolute inset-0 rounded-3xl opacity-50 blur-3xl transition-all duration-300"
          style={{
            background: `radial-gradient(circle at ${glowX}% ${glowY}%, ${behindGlowColor} 0%, transparent ${behindGlowSize})`,
          }}
        />
      )}

      <div
        ref={cardRef}
        className="relative rounded-3xl overflow-hidden transition-transform duration-300 ease-out"
        style={{
          transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
          transformStyle: "preserve-3d",
        }}
      >
        <div className="relative aspect-[3/4] bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
          {iconUrl && (
            <div
              className="absolute inset-0 opacity-5"
              style={{
                backgroundImage: `url(${iconUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            />
          )}

          {grainUrl && (
            <div
              className="absolute inset-0 opacity-30 mix-blend-overlay"
              style={{
                backgroundImage: `url(${grainUrl})`,
                backgroundSize: "cover",
              }}
            />
          )}

          <div
            className="absolute inset-0"
            style={{
              background: innerGradient,
            }}
          />

          <div className="relative h-full p-8 flex flex-col">
            <div className="flex-1 flex items-center justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/30 to-blue-600/30 rounded-full blur-2xl animate-pulse" />
                <img
                  src={avatarUrl}
                  alt={name}
                  className="relative w-48 h-48 rounded-full object-cover border-4 border-white/10 shadow-2xl"
                />
              </div>
            </div>

            {showUserInfo && (
              <div className="bg-black/20 backdrop-blur-md rounded-2xl p-6 border border-white/10">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {miniAvatarUrl && (
                      <img
                        src={miniAvatarUrl}
                        alt={name}
                        className="w-12 h-12 rounded-full border-2 border-white/20"
                      />
                    )}
                    <div>
                      <h3 className="text-white font-bold text-lg">{name}</h3>
                      <p className="text-gray-400 text-sm">{title}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                    <span className="text-gray-400 text-xs">{status}</span>
                  </div>
                </div>

                <p className="text-gray-400 text-sm mb-4">@{handle}</p>

                <button
                  onClick={onContactClick}
                  className="w-full bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-200 transform hover:scale-105 active:scale-95"
                >
                  {contactText}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
