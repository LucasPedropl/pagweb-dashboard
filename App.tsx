import React, { useState } from 'react';
import { HashRouter, Routes, Route, Navigate, Outlet, useNavigate } from 'react-router-dom';
import { Sidebar } from './src/components/layout/aside/Sidebar';
import { Navbar } from './src/components/layout/navBar/Navbar';
import { MobileNav } from './src/components/layout/mobileNav';
import { Dashboard } from './src/app/(app)/Dashboard';
import { Empresas } from './src/app/(app)/Empresas';
import { Planos } from './src/app/(app)/Planos';
import { Relatorios } from './src/app/(app)/Relatorios';
import { Menu } from './src/app/(app)/Menu';
import { Login } from './src/app/(auth)/login';
import { Cadastro } from './src/app/(auth)/cadastro';
import { LogOut, User, Shield } from 'lucide-react';

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
      
      <div className="flex-1 flex flex-col min-w-0 transition-all duration-300">
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

// Placeholders for routes requested but not fully implemented in snippet
const Pagamentos = () => (
  <div>
    <h1 className="text-3xl font-bold text-slate-800">Histórico de Pagamentos</h1>
    <div className="mt-8 bg-white p-6 rounded-xl border border-slate-200">
        <p className="text-slate-500">Módulo de pagamentos em desenvolvimento.</p>
    </div>
  </div>
);

const Historico = () => (
    <div>
      <h1 className="text-3xl font-bold text-slate-800">Histórico de Atividades</h1>
      <p className="text-slate-500 mt-4">Log de eventos do sistema.</p>
    </div>
);

const Configuracoes = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-slate-800">Configurações</h1>
        <p className="text-slate-500 mt-1">Gerencie suas preferências e conta.</p>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200">
           <h2 className="text-lg font-semibold text-slate-900">Perfil</h2>
           <p className="text-sm text-slate-500">Informações pessoais e de conta.</p>
        </div>
        <div className="p-6 space-y-4">
           <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600">
                    <User size={20} />
                 </div>
                 <div>
                    <p className="font-medium text-slate-900">Dados da Conta</p>
                    <p className="text-sm text-slate-500">Admin User (admin@pagweb.com)</p>
                 </div>
              </div>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Editar</button>
           </div>
           
           <div className="flex items-center justify-between p-4 rounded-lg border border-slate-100 hover:bg-slate-50 transition-colors">
              <div className="flex items-center gap-4">
                 <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-600">
                    <Shield size={20} />
                 </div>
                 <div>
                    <p className="font-medium text-slate-900">Segurança</p>
                    <p className="text-sm text-slate-500">Senha e autenticação</p>
                 </div>
              </div>
              <button className="text-sm font-medium text-indigo-600 hover:text-indigo-700">Alterar</button>
           </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-200 bg-red-50/30">
            <h2 className="text-lg font-semibold text-red-700">Ações da Conta</h2>
        </div>
        <div className="p-6">
            <button 
                onClick={() => navigate('/login')}
                className="flex items-center gap-2 px-4 py-2 bg-white text-red-600 hover:bg-red-50 hover:border-red-200 rounded-lg border border-slate-200 transition-colors font-medium shadow-sm"
            >
                <LogOut size={18} />
                Sair do Sistema
            </button>
        </div>
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
          <Route path="pagamentos" element={<Pagamentos />} />
          <Route path="relatorios" element={<Relatorios />} />
          <Route path="historico" element={<Historico />} />
          <Route path="configuracoes" element={<Configuracoes />} />
          <Route path="menu" element={<Menu />} />
        </Route>

        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </HashRouter>
  );
};

export default App;