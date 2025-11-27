import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Users, 
  CreditCard, 
  DollarSign, 
  FileBarChart, 
  Activity,
  Settings, 
  Wallet,
  ChevronLeft
} from 'lucide-react';
import { NavItem } from '../../../types';

interface SidebarProps {
  isCollapsed: boolean;
  toggleCollapse: () => void;
}

const navItems: NavItem[] = [
  { label: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { label: 'Clientes', href: '/empresas', icon: Users },
  { label: 'Assinaturas', href: '/planos', icon: CreditCard },
  { label: 'Pagamentos', href: '/pagamentos', icon: DollarSign },
  { label: 'Relatórios', href: '/relatorios', icon: FileBarChart },
  { label: 'Histórico', href: '/historico', icon: Activity },
];

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed, toggleCollapse }) => {
  return (
    <aside 
      className={`
        hidden lg:flex flex-col relative
        border-r border-slate-200 bg-white shadow-none
        transition-all duration-300 ease-in-out
        ${isCollapsed ? 'w-20' : 'w-64'}
      `}
    >
      {/* Header / Logo */}
      <div className="flex items-center h-[65px] px-6 border-b border-slate-200 flex-shrink-0">
        <div className="flex items-center gap-2 font-bold text-2xl text-slate-800 overflow-hidden whitespace-nowrap">
          <Wallet className="min-w-7 w-7 h-7 text-slate-800" />
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0 hidden' : 'opacity-100'}`}>
            PagWeb
          </span>
        </div>
      </div>

      {/* Collapse Toggle Button - Positioned between Logo area and Menu area */}
      <button
        onClick={toggleCollapse}
        className="absolute top-[65px] -right-3 -translate-y-1/2 w-6 h-6 bg-white border border-slate-300 text-slate-600 rounded-full flex items-center justify-center hover:bg-slate-100 shadow-sm z-50 transition-transform duration-300"
      >
        <ChevronLeft size={14} className={`transition-transform duration-300 ${isCollapsed ? 'rotate-180' : ''}`} />
      </button>

      {/* Navigation */}
      <nav className="p-4 space-y-2 flex-1 overflow-y-auto">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.href}
              to={item.href}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap group
                ${isActive 
                  ? 'bg-slate-800 text-white font-semibold' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
                ${isCollapsed ? 'justify-center px-2' : ''}
              `}
              title={isCollapsed ? item.label : ''}
            >
              <Icon size={20} className="min-w-[20px]" />
              <span className={`transition-all duration-300 ${isCollapsed ? 'w-0 hidden' : 'w-auto'}`}>
                {item.label}
              </span>
            </NavLink>
          );
        })}
      </nav>

      {/* Settings at Bottom */}
      <div className="p-4 border-t border-slate-200">
        <NavLink
          to="/configuracoes"
          className={({ isActive }) => `
            flex items-center gap-3 px-4 py-2.5 rounded-lg transition-colors whitespace-nowrap
            ${isActive 
              ? 'bg-slate-800 text-white font-semibold' 
              : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'}
            ${isCollapsed ? 'justify-center px-2' : ''}
          `}
          title={isCollapsed ? "Configurações" : ''}
        >
          <Settings size={20} className="min-w-[20px]" />
          <span className={`transition-all duration-300 ${isCollapsed ? 'w-0 hidden' : 'w-auto'}`}>
            Configurações
          </span>
        </NavLink>
      </div>
    </aside>
  );
};