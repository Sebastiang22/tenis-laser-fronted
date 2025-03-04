import React from 'react';
import { Store, Customer } from '../types';
import { Users, ArrowLeft } from 'lucide-react';

interface CustomerListProps {
  store: Store;
  onSelectCustomer: (customer: Customer) => void;
  onBack: () => void;
}

export function CustomerList({ store, onSelectCustomer, onBack }: CustomerListProps) {
  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-red-600 mb-6 hover:text-red-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a tiendas
      </button>
      
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Clientes de {store.name}
      </h2>
      
      <div className="grid gap-4">
        {store.customers.map((customer) => (
          <div
            key={customer.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectCustomer(customer)}
          >
            <div className="flex items-center gap-3 mb-4">
              <Users className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  {customer.name}
                </h3>
                <p className="text-sm text-gray-500">
                  Cédula: {customer.document}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                Número de créditos: {customer.creditos_no_cancelados}
              </span>
              <span className="px-3 py-1 rounded-full text-sm bg-red-100 text-red-800">
                Cliente Activo
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}