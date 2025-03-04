export interface Store {
  id: number;
  name: string;
  location: string;
  customers: Customer[];
}

export interface Customer {
  id: number;
  name: string;
  document: string;
  telefono: string;
  creditos_no_cancelados: number;
  credits: Credit[];
}

export interface Credit {
  id: number;
  amount: number;
  date: string;
  status: 'active' | 'completed';
  installments: Installment[];
}

export interface Installment {
  id: number;
  number: number;
  amount: number;
  dueDate: string;
  status: 'paid' | 'pending';
}