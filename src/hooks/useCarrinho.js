import { useCallback } from 'react';
import usePersistido from './usePersistido';
import { CUPONS } from '../data/entrega';
import { calcularTotais } from '../utils/totais';

// Estado do carrinho: { [idProduto]: { qtd, obs } } + cupom aplicado. Persistido no aparelho.
export default function useCarrinho(produtos) {
  const [carrinho, setCarrinho] = usePersistido('carrinho', {});
  const [cupom, setCupom] = usePersistido('cupom', null);

  const adicionar = useCallback((id) => {
    setCarrinho((c) => ({ ...c, [id]: { obs: '', ...c[id], qtd: (c[id] ? c[id].qtd : 0) + 1 } }));
  }, []);

  const remover = useCallback((id) => {
    setCarrinho((c) => {
      const item = c[id];
      if (!item) return c;
      if (item.qtd > 1) return { ...c, [id]: { ...item, qtd: item.qtd - 1 } };
      const resto = { ...c };
      delete resto[id];
      return resto;
    });
  }, []);

  const definirObs = useCallback((id, obs) => {
    setCarrinho((c) => (c[id] ? { ...c, [id]: { ...c[id], obs } } : c));
  }, []);

  const limpar = useCallback(() => {
    setCarrinho({});
    setCupom(null);
  }, []);

  // Retorna true se o código existe e foi aplicado.
  const aplicarCupom = useCallback((texto) => {
    const codigo = texto.trim().toUpperCase();
    if (!CUPONS[codigo]) return false;
    setCupom(codigo);
    return true;
  }, []);
  const removerCupom = useCallback(() => setCupom(null), []);

  const itens = produtos
    .filter((p) => carrinho[p.id])
    .map((p) => ({ ...p, qtd: carrinho[p.id].qtd, obs: carrinho[p.id].obs || '' }));
  const qtdTotal = itens.reduce((s, i) => s + i.qtd, 0);
  const subtotal = itens.reduce((s, i) => s + i.qtd * i.preco, 0);
  const totais = calcularTotais(subtotal, itens.length ? cupom : null);

  return {
    carrinho, itens, qtdTotal, subtotal, ...totais,
    cupom: itens.length ? cupom : null,
    adicionar, remover, definirObs, limpar, aplicarCupom, removerCupom,
  };
}
