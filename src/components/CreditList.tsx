import React from 'react';
import { Credit, Customer } from '../types';
import { CreditCard, ArrowLeft } from 'lucide-react';

interface CreditListProps {
  customer: Customer;
  onSelectCredit: (credit: Credit) => void;
  onBack: () => void;
}

export function CreditList({ customer, onSelectCredit, onBack }: CreditListProps) {
  return (
    <div>
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-red-600 mb-6 hover:text-red-700"
      >
        <ArrowLeft className="w-4 h-4" />
        Volver a clientes
      </button>
      
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
          Créditos de {customer.name}
        </h2>
        <p className="text-gray-600">
          Documento: {customer.document}
        </p>
        <p className="text-gray-600">
          Celular: {customer.celular}
        </p>
      </div>
      
      <div className="grid gap-4">
        {customer.credits.map((credit) => (
          <div
            key={credit.id}
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow cursor-pointer"
            onClick={() => onSelectCredit(credit)}
          >
            <div className="flex items-center gap-3 mb-4">
              <CreditCard className="w-6 h-6 text-red-600" />
              <div>
                <h3 className="text-lg font-semibold text-gray-800">
                  ${credit.amount.toLocaleString()}
                </h3>
                <p className="text-sm text-gray-500">
                  Fecha: {credit.date}
                </p>
                <p className="text-sm text-gray-500">
                  Estado: {credit.status === 'completed' ? 'Pagado' : credit.status === 'overdue' ? 'En Mora' : 'Activo'}
                </p>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm text-gray-600">
                {credit.installments.length} cuotas
              </span>
              <span className={`px-3 py-1 rounded-full text-sm ${
                credit.status === 'overdue' 
                  ? 'bg-red-100 text-red-800' 
                  : credit.status === 'completed' 
                  ? 'bg-gray-100 text-gray-800' 
                  : 'bg-yellow-100 text-yellow-800'
              }`}>
                {credit.status === 'completed' ? 'Pagado' : credit.status === 'overdue' ? 'En Mora' : 'Activo'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}