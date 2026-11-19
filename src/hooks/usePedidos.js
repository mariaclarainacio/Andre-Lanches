import { useEffect, useCallback, useRef } from 'react';
import usePersistido from './usePersistido';

export const ETAPAS = ['Pedido recebido', 'Em preparo', 'Saiu para entrega', 'Entregue'];
export const CANCELADO = -1;
const INTERVALO_MS = 8000; // a cada 8s o pedido avança uma etapa (simulação)

// Ao carregar do armazenamento a data volta como texto: converte de novo para Date.
const reviver = (lista) => lista.map((p) => ({ ...p, criadoEm: new Date(p.criadoEm) }));

export default function usePedidos() {
  const [pedidos, setPedidos] = usePersistido('pedidos', [], reviver);
  const proximoId = useRef(1001);

  const emAndamento = (p) => p.status >= 0 && p.status < ETAPAS.length - 1;
  const temAtivo = pedidos.some(emAndamento);

  // Mantém o contador à frente do maior número de pedido existente (inclusive os carregados).
  useEffect(() => {
    const maior = Math.max(1000, ...pedidos.map((p) => p.id));
    if (maior >= proximoId.current) proximoId.current = maior + 1;
  }, [pedidos]);

  // Simula o processo de entrega: avança as etapas dos pedidos ativos.
  useEffect(() => {
    if (!temAtivo) return undefined;
    const timer = setInterval(() => {
      setPedidos((lista) => lista.map((p) => (emAndamento(p) ? { ...p, status: p.status + 1 } : p)));
    }, INTERVALO_MS);
    return () => clearInterval(timer);
  }, [temAtivo]);

  const criarPedido = useCallback((dados) => {
    const id = proximoId.current++;
    setPedidos((lista) => [{ ...dados, id, criadoEm: new Date(), status: 0 }, ...lista]);
    return id;
  }, []);

  // Só dá para cancelar antes de sair para entrega.
  const cancelarPedido = useCallback((id) => {
    setPedidos((lista) => lista.map((p) => (p.id === id && p.status >= 0 && p.status < 2 ? { ...p, status: CANCELADO } : p)));
  }, []);

  const limparHistorico = useCallback(() => setPedidos((lista) => lista.filter(emAndamento)), []);

  return { pedidos, criarPedido, cancelarPedido, limparHistorico };
}
