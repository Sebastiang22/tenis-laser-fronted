import { Store, Customer, Credit } from "./types";
import { API_URL } from "./config"; // Importar la URL de la API

export async function getTiendas(): Promise<Store[]> {
  const response = await fetch(`${API_URL}/tiendas`);
  const data = await response.json();
  // Se asume que la API retorna un arreglo de objetos con { id, nombre, creditos_confirmados }
  return data.map((tienda: any) => ({
    id: tienda.id,
    name: tienda.nombre,
    location: "", // no se proporciona la ubicación en la respuesta
    customers: [], // se obtendrán vía otra ruta
    activeCredits: tienda.creditos_confirmados // Agregar créditos activos
  }));
}

export async function getClientesByTienda(tiendaId: number): Promise<Customer[]> {
  const response = await fetch(`${API_URL}/clientes/${tiendaId}`);
  const data = await response.json();
  // Se asume que la API retorna: [{ id, nombre, cedula, creditos_no_cancelados, celular }]
  return data.map((cliente: any) => ({
    id: cliente.id,
    name: cliente.nombre,
    document: cliente.cedula, // Cambiar a cédula
    celular: cliente.celular, // Obtener el número de celular
    creditos_no_cancelados: cliente.creditos_no_cancelados, // Agregar créditos no cancelados
    credits: [] // se obtendrán vía otra ruta
  }));
}

export async function getCreditosByCliente(clienteId: number): Promise<Credit[]> {
  const response = await fetch(`${API_URL}/creditos/${clienteId}`);
  const data = await response.json();
  /*  
    Se asume que la API retorna objetos con la siguiente estructura:
    {
      "credito_id": 4,
      "valorArticulo": 399900.0,
      "valorCredito": 447888.0,
      "estado": "Pagado",
      "cuotas": [
          {
              "numero": 1,
              "precio": 111972.0,
              "estado": "Pagada",
              "fechaVencimiento": "2025-03-14",
              "fechaPago": "2025-02-12",
              "montoAbono": 111972.0
          },
          (...)
      ],
      "fechaSolicitud": "2025-02-12"
    }
  */
  return data.map((credito: any) => ({
    id: credito.credito_id,
    amount: credito.valorCredito,
    date: credito.fechaSolicitud,
    status: credito.estado === "Pagado" ? "completed" : 
            credito.estado === "En Mora" ? "overdue" : 
            "confirmed",
    installments: credito.cuotas.map((cuota: any) => ({
      id: cuota.numero,
      number: cuota.numero,
      amount: cuota.precio,
      dueDate: cuota.fechaVencimiento,
      status: cuota.estado === "Pagada" ? "paid" : "pending"
    }))
  }));
} 