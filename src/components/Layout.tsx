import React from 'react';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-apricot via-soft-pink to-neon-magenta/20 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute top-10 left-10 w-32 h-32 bg-neon-magenta/30 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-20 right-20 w-48 h-48 bg-apricot/40 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/4 w-24 h-24 bg-soft-pink/50 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-4xl bg-white/40 backdrop-blur-xl border border-white/50 rounded-3xl shadow-2xl p-8 md:p-12 animate-fade-in">
        <div className="absolute -top-6 -right-6 w-20 h-20 bg-neon-magenta rounded-full flex items-center justify-center shadow-lg animate-bounce">
          <span className="text-white font-bold text-xl">TWICE</span>
        </div>
        
        {children}
      </div>
    </div>
  );
};

export default Layout;
