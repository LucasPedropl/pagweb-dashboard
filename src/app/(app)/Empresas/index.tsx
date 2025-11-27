import React, { useState } from 'react';
import { Client } from '../../../types';
import { Edit2, Trash2, Plus, X, AlertTriangle, Search, Filter } from 'lucide-react';

const initialClients: Client[] = [
  { id: '1', name: 'João da Silva', status: 'Ativo', plan: 'Premium', joinDate: '15/08/2023' },
  { id: '2', name: 'Maria Oliveira', status: 'Inativo', plan: 'Básico', joinDate: '01/03/2023' },
  { id: '3', name: 'Carlos Ferreira', status: 'Ativo', plan: 'Enterprise', joinDate: '10/09/2023' },
];

export const Empresas: React.FC = () => {
  const [clients, setClients] = useState<Client[]>(initialClients);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [currentClient, setCurrentClient] = useState<Partial<Client>>({});
  const [clientToDelete, setClientToDelete] = useState<string | null>(null);

  // Handlers
  const handleOpenCreate = () => {
    setCurrentClient({ status: 'Ativo', plan: 'Básico' });
    setIsFormOpen(true);
  };

  const handleOpenEdit = (client: Client) => {
    setCurrentClient({ ...client });
    setIsFormOpen(true);
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (currentClient.id) {
      // Edit
      setClients(clients.map(c => c.id === currentClient.id ? { ...c, ...currentClient } as Client : c));
    } else {
      // Create
      const newClient: Client = {
        ...currentClient,
        id: Date.now().toString(),
        joinDate: new Date().toLocaleDateString('pt-BR'),
      } as Client;
      setClients([...clients, newClient]);
    }
    setIsFormOpen(false);
  };

  const handleOpenDelete = (id: string) => {
    setClientToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    if (clientToDelete) {
      setClients(clients.filter(c => c.id !== clientToDelete));
      setIsDeleteModalOpen(false);
      setClientToDelete(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Gestão de Clientes</h1>
          <p className="text-slate-500 mt-1">Gerencie as empresas e usuários cadastrados.</p>
        </div>
        <button 
          onClick={handleOpenCreate}
          className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-700 transition-colors shadow-sm"
        >
          <Plus size={18} />
          Nova Empresa
        </button>
      </div>
      
      {/* Filters Bar */}
      <div className="bg-white border border-slate-200 rounded-xl shadow-sm p-4 flex flex-wrap items-center justify-between gap-4">
        <div className="relative max-w-sm w-full">
          <Search size={18} className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" />
          <input 
            type="text" 
            placeholder="Buscar empresas..." 
            className="w-full pl-10 pr-4 py-2 text-sm bg-white text-slate-900 border border-slate-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 outline-none"
          />
        </div>
        <button className="flex items-center gap-2 px-3 py-2 bg-white border border-slate-300 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50 transition-colors">
          <Filter size={16} />
          Filtros
        </button>
      </div>

      {/* Table */}
      <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left min-w-[640px]">
            <thead className="bg-slate-50">
              <tr className="border-b border-slate-200">
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Nome</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Status</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Plano</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider">Data de Adesão</th>
                <th className="py-3 px-6 text-xs font-semibold text-slate-500 uppercase tracking-wider text-right">Ações</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {clients.map((client) => (
                <tr key={client.id} className="hover:bg-slate-50 transition-colors">
                  <td className="py-4 px-6 font-medium text-slate-900">{client.name}</td>
                  <td className="py-4 px-6">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-medium inline-flex items-center
                      ${client.status === 'Ativo' ? 'bg-emerald-100 text-emerald-700' : 
                        client.status === 'Inativo' ? 'bg-red-100 text-red-700' : 
                        'bg-amber-100 text-amber-700'}`}>
                      <span className={`w-1.5 h-1.5 rounded-full mr-1.5 
                        ${client.status === 'Ativo' ? 'bg-emerald-500' : 
                          client.status === 'Inativo' ? 'bg-red-500' : 
                          'bg-amber-500'}`}></span>
                      {client.status}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-slate-600">
                    <div className="inline-block px-2 py-1 bg-slate-100 rounded text-xs border border-slate-200">
                        {client.plan}
                    </div>
                  </td>
                  <td className="py-4 px-6 text-slate-500 text-sm">{client.joinDate}</td>
                  <td className="py-4 px-6">
                    <div className="flex items-center justify-end gap-2">
                        <button 
                            onClick={() => handleOpenEdit(client)}
                            className="p-1.5 text-slate-500 hover:text-indigo-600 hover:bg-indigo-50 rounded transition-colors"
                            title="Editar"
                        >
                            <Edit2 size={16} />
                        </button>
                        <button 
                            onClick={() => handleOpenDelete(client.id)}
                            className="p-1.5 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded transition-colors"
                            title="Excluir"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {clients.length === 0 && (
             <div className="p-8 text-center text-slate-500">
                 Nenhuma empresa encontrada.
             </div>
        )}
      </div>

      {/* Form Modal */}
      {isFormOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            <div className="flex justify-between items-center p-4 border-b border-slate-100 bg-slate-50">
              <h3 className="font-semibold text-slate-900">
                {currentClient.id ? 'Editar Empresa' : 'Nova Empresa'}
              </h3>
              <button onClick={() => setIsFormOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSave} className="p-4 space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Nome da Empresa</label>
                <input 
                  type="text" 
                  required
                  value={currentClient.name || ''}
                  onChange={e => setCurrentClient({...currentClient, name: e.target.value})}
                  className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Status</label>
                  <select 
                    value={currentClient.status || 'Ativo'}
                    onChange={e => setCurrentClient({...currentClient, status: e.target.value as any})}
                    className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Ativo">Ativo</option>
                    <option value="Inativo">Inativo</option>
                    <option value="Pendente">Pendente</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Plano</label>
                  <select 
                    value={currentClient.plan || 'Básico'}
                    onChange={e => setCurrentClient({...currentClient, plan: e.target.value as any})}
                    className="w-full px-3 py-2 bg-white text-slate-900 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                  >
                    <option value="Básico">Básico</option>
                    <option value="Premium">Premium</option>
                    <option value="Enterprise">Enterprise</option>
                  </select>
                </div>
              </div>
              <div className="pt-4 flex justify-end gap-2">
                <button 
                  type="button" 
                  onClick={() => setIsFormOpen(false)}
                  className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                >
                  Cancelar
                </button>
                <button 
                  type="submit" 
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                >
                  Salvar
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
           <div className="bg-white rounded-xl shadow-xl w-full max-w-sm p-6 animate-in fade-in zoom-in-95 duration-200">
              <div className="flex items-center justify-center w-12 h-12 mx-auto bg-red-100 rounded-full mb-4">
                  <AlertTriangle className="text-red-600" size={24} />
              </div>
              <h3 className="text-lg font-semibold text-center text-slate-900 mb-2">Confirmar Exclusão</h3>
              <p className="text-sm text-center text-slate-500 mb-6">
                  Tem certeza que deseja remover esta empresa? Esta ação não pode ser desfeita e removerá o acesso do usuário.
              </p>
              <div className="flex gap-3">
                  <button 
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50"
                  >
                    Cancelar
                  </button>
                  <button 
                    onClick={confirmDelete}
                    className="flex-1 px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700"
                  >
                    Excluir
                  </button>
              </div>
           </div>
        </div>
      )}
    </div>
  );
};