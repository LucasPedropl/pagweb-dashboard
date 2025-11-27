import React from 'react';

export interface Client {
  id: string;
  name: string;
  status: 'Ativo' | 'Inativo' | 'Pendente';
  plan: 'Básico' | 'Premium' | 'Enterprise';
  joinDate: string;
}

export interface Transaction {
  id: string;
  clientName: string;
  amount: number;
  status: 'Pago' | 'Pendente' | 'Falha';
  date: string;
}

export interface NavItem {
  label: string;
  href: string;
  icon: React.ComponentType<{ className?: string; size?: number | string }>;
}

export enum ReportType {
  FINANCIAL = 'Faturamento Mensal',
  GROWTH = 'Novos Clientes',
  CHURN = 'Cancelamentos'
}