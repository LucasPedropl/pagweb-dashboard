import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet } from 'react-router-dom';
import { Sidebar } from './src/components/layout/aside/Sidebar';
import { Navbar } from './src/components/layout/navBar/Navbar';
import { MobileNav } from './src/components/layout/mobileNav';
import { Dashboard } from './src/app/(app)/Dashboard';
import { Empresas } from './src/app/(app)/Empresas';
import { Planos } from './src/app/(app)/Planos';
import { Assinaturas } from './src/app/(app)/Assinaturas';
import { Relatorios } from './src/app/(app)/Relatorios';
import { Menu } from './src/app/(app)/Menu';
import { Pagamentos } from './src/app/(app)/Pagamentos';
import { Historico } from './src/app/(app)/Historico';
import { Configuracoes } from './src/app/(app)/Configuracoes';
import { DuvidasSuporte } from './src/app/(app)/DuvidasSuporte';
import { Login } from './src/app/(auth)/login';
import { Cadastro } from './src/app/(auth)/cadastro';

// PagWeb Layout Component
const AppLayout: React.FC = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <div className="flex h-screen bg-slate-50 overflow-hidden">
      {/* Desktop Sidebar - Hidden on Mobile */}
      <Sidebar 
        isCollapsed={isCollapsed}
        toggleCollapse={() => setIsCollapsed(!isCollapsed)}
      />
      
      {/* 
         Removed 'transition-all' from this div to fix the modal overlay z-index issue.
         When a parent has a transform or transition, fixed children are relative to the parent, not the viewport.
      */}
      <div className="flex-1 flex flex-col min-w-0 duration-300">
        <Navbar onMenuClick={() => {}} />
        
        {/* Main Content with bottom padding for mobile nav */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>

        {/* Mobile Bottom Navigation */}
        <MobileNav />
      </div>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <HashRouter>
      <Routes>
        {/* Auth Group */}
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />

        {/* App Group */}
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="empresas" element={<Empresas />} />
          <Route path="planos" element={<Planos />} />
          <Route path="assinaturas" element={<Assinaturas />} />
          <Route path="pagamentos" element={<Pagamentos />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="historico" element={<Historico />} />
          <Route path="configuracoes" element={<Configuracoes />} />
          <Route path="suporte" element={<DuvidasSuporte />} />
          <Route path="menu" element={<Menu />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;