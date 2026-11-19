import { useState, useEffect } from 'react';
import { carregar, salvar } from '../utils/armazenamento';

// Igual ao useState, mas carrega o valor salvo ao abrir o app e salva a cada mudança.
// aoCarregar (opcional) converte o que veio do armazenamento (ex.: texto -> Date).
export default function usePersistido(chave, inicial, aoCarregar) {
  const [valor, setValor] = useState(inicial);
  const [pronto, setPronto] = useState(false);

  useEffect(() => {
    let ativo = true;
    carregar(chave).then((salvo) => {
      if (!ativo) return;
      if (salvo !== null) setValor(aoCarregar ? aoCarregar(salvo) : salvo);
      setPronto(true);
    });
    return () => { ativo = false; };
  }, [chave]);

  useEffect(() => {
    if (pronto) salvar(chave, valor);
  }, [chave, valor, pronto]);

  return [valor, setValor, pronto];
}
