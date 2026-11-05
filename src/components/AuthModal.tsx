import React, { useState, useEffect } from 'react';
import {
  LockKey,
  Key,
  X,
  Eye,
  EyeSlash,
  ShieldCheck,
  WarningCircle,
  ArrowRight
} from '@phosphor-icons/react';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

const AUTHORIZED_PASS = 'Nandan@143';

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose, onSuccess }) => {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setPassword('');
      setError(false);
      setIsVerifying(false);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsVerifying(true);

    setTimeout(() => {
      if (password === AUTHORIZED_PASS) {
        sessionStorage.setItem('nandan_aerospace_auth', 'true');
        setError(false);
        onSuccess();
        onClose();
      } else {
        setError(true);
        setIsVerifying(false);
      }
    }, 250);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-md skeuo-panel rounded-none border-2 border-slate-700 p-6 sm:p-7 text-slate-100 shadow-2xl"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Cockpit Bezel Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-800/80">
          <div className="flex items-center space-x-2.5">
              <div className="w-8 h-8 rounded-none skeuo-button flex items-center justify-center text-amber-400">
                <LockKey size={18} weight="fill" />
              </div>
              <div>
                <div className="text-[10px] font-mono-tech tracking-widest text-amber-400 uppercase">
                  SECURITY TERMINAL // DSCE-AERO
                </div>
                <h3 className="text-base font-bold text-slate-100 font-heading">
                  Nandan M. Authorization
                </h3>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-7 h-7 rounded-none skeuo-button flex items-center justify-center text-slate-400 hover:text-white"
              aria-label="Close"
            >
              <X size={15} />
            </button>
          </div>

          {/* Security Subtitle */}
            <div className="my-4 p-3 rounded-none skeuo-debossed flex items-start space-x-3 text-xs">
              <ShieldCheck size={20} className="text-amber-400 shrink-0 mt-0.5" />
              <div className="text-slate-400 font-mono-tech leading-relaxed">
                Restricted access. Only <span className="text-slate-200 font-bold">Nandan M.</span> is authorized to modify flight data, rearrange aerospace sections, and upload technical documents.
              </div>
            </div>

            {/* Password Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-mono-tech text-slate-300 mb-1.5 uppercase tracking-wider">
                  Authorization Key / Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
                    <Key size={16} />
                  </div>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    autoFocus
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      if (error) setError(false);
                    }}
                    placeholder="Enter security password"
                          ? 'border border-red-500/80 shadow-[0_0_12px_rgba(239,68,68,0.3)]'
                          : 'focus:border-amber-400/70 focus:shadow-[0_0_10px_rgba(245,158,11,0.2)]'
                        }`}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-amber-400"
                tabIndex={-1}
              >
                {showPassword ? <EyeSlash size={16} /> : <Eye size={16} />}
              </button>
            </div>
            {error && (
              <div className="mt-2 text-xs font-mono-tech text-red-400 flex items-center space-x-1.5 animate-in fade-in">
                <WarningCircle size={14} weight="fill" />
                <span>ACCESS DENIED // INVALID AUTHORIZATION KEY</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="pt-2 flex items-center justify-end space-x-3">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-xs font-mono-tech text-slate-400 hover:text-slate-200 uppercase"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isVerifying || !password}
              className="skeuo-button-amber px-5 py-2 rounded-none text-xs font-mono-tech uppercase font-bold inline-flex items-center space-x-2 disabled:opacity-40"
            >
              <span>{isVerifying ? 'VERIFYING…' : 'UNLOCK EDIT MODE'}</span>
              <ArrowRight size={14} weight="bold" />
            </button>
          </div>
        </form>

        {/* Subtle Security Hash Footer */}
        <div className="mt-4 pt-3 border-t border-slate-800/80 flex items-center justify-between text-[10px] font-mono-tech text-slate-500">
          <span>DSCE-AERO // SHA-256 CIPHER</span>
          <span>FLIGHT LOG v1.4</span>
        </div>
      </div>
    </div>
  );
};

