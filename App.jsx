import React, { useState } from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Header from './src/components/Header';
import FadeIn from './src/components/FadeIn';
import BannerPromocao from './src/components/BannerPromocao';
import ListaProdutos from './src/components/ListaProdutos';
import SobreNos from './src/components/SobreNos';
import Contato from './src/components/Contato';
import Carrinho from './src/components/Carrinho';
import AcompanharPedido from './src/components/AcompanharPedido';
import MeusPedidos from './src/components/MeusPedidos';
import EntregaFlutuante from './src/components/EntregaFlutuante';
import usePedidos from './src/hooks/usePedidos';
import useCarrinho from './src/hooks/useCarrinho';
import { mostrarAlerta } from './src/utils/alerta';
import { colors } from './src/theme/theme';
import { produtos, promocao, TELEFONE_EXIBICAO } from './src/data/produtos';
import { WHATSAPP_LINK } from './src/data/entrega';

export default function App() {
  const [tela, setTela] = useState('lanches');
  const [pedidoAbertoId, setPedidoAbertoId] = useState(null);
  const cesta = useCarrinho(produtos);
  const { pedidos, criarPedido, cancelarPedido, limparHistorico } = usePedidos();

  const finalizar = ({ endereco, pagamento, troco }) => {
    const id = criarPedido({
      itens: cesta.itens,
      subtotal: cesta.subtotal,
      desconto: cesta.desconto,
      cupom: cesta.cupom,
      taxa: cesta.taxa,
      total: cesta.total,
      endereco,
      pagamento,
      troco,
    });
    cesta.limpar();
    setPedidoAbertoId(id);
    setTela('acompanhar');
    mostrarAlerta('Pedido enviado!', `Seu pedido #${id} foi recebido e já está sendo preparado.`);
  };

  const abrirPedido = (id) => {
    setPedidoAbertoId(id);
    setTela('acompanhar');
  };

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="light" backgroundColor={colors.red} />
        <Header telaAtiva={tela} onNavegar={setTela} qtdCarrinho={cesta.qtdTotal} />

        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.conteudo}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            <FadeIn key={tela}>
              {tela === 'lanches' && (
                <>
                  <BannerPromocao titulo={promocao.titulo} descricao={promocao.descricao} preco={promocao.preco} />
                  <ListaProdutos produtos={produtos} carrinho={cesta.carrinho} onAdd={cesta.adicionar} onRemove={cesta.remover} />
                </>
              )}
              {tela === 'sobre' && <SobreNos onPedir={() => setTela('lanches')} />}
              {tela === 'contato' && <Contato />}
              {tela === 'carrinho' && (
                <Carrinho
                  itens={cesta.itens}
                  subtotal={cesta.subtotal}
                  desconto={cesta.desconto}
                  taxa={cesta.taxa}
                  total={cesta.total}
                  cupom={cesta.cupom}
                  onAdd={cesta.adicionar}
                  onRemove={cesta.remover}
                  onObs={cesta.definirObs}
                  onAplicarCupom={cesta.aplicarCupom}
                  onRemoverCupom={cesta.removerCupom}
                  onLimpar={cesta.limpar}
                  onFinalizar={finalizar}
                  onVoltar={() => setTela('lanches')}
                />
              )}
              {tela === 'pedidos' && (
                <MeusPedidos pedidos={pedidos} onAbrir={abrirPedido} onIrCardapio={() => setTela('lanches')} onLimpar={limparHistorico} />
              )}
              {tela === 'acompanhar' && (
                <AcompanharPedido
                  pedido={pedidos.find((p) => p.id === pedidoAbertoId)}
                  onVoltar={() => setTela('pedidos')}
                  onCancelar={cancelarPedido}
                />
              )}
            </FadeIn>
          </ScrollView>
        </KeyboardAvoidingView>

        <EntregaFlutuante telefone={TELEFONE_EXIBICAO} link={WHATSAPP_LINK} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  safe: { flex: 1, backgroundColor: colors.yellow },
  flex: { flex: 1 },
  // paddingBottom evita que o botão flutuante cubra o último item
  conteudo: { paddingTop: 16, paddingBottom: 120 },
});
