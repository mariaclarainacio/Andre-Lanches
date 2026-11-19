import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../theme/theme';
import { formatarPreco } from '../data/produtos';
import { formatarDataHora } from '../utils/alerta';
import { ETAPAS, CANCELADO } from '../hooks/usePedidos';

export default function AcompanharPedido({ pedido, onVoltar, onCancelar }) {
  if (!pedido) return null;
  const cancelado = pedido.status === CANCELADO;
  const entregue = pedido.status === ETAPAS.length - 1;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onVoltar}>
        <Text style={styles.voltar}>← Meus pedidos</Text>
      </TouchableOpacity>
      <Text style={styles.titulo}>Pedido #{pedido.id}</Text>
      <Text style={styles.sub}>Feito em {formatarDataHora(pedido.criadoEm)}</Text>

      <View style={styles.card}>
        {cancelado ? (
          <Text style={styles.cancelado}>Pedido cancelado</Text>
        ) : (
          ETAPAS.map((etapa, i) => {
            const feito = i <= pedido.status;
            const atual = i === pedido.status && !entregue;
            return (
              <View key={etapa} style={styles.etapaLinha}>
                <View style={styles.coluna}>
                  <View style={[styles.bolinha, feito && styles.bolinhaOk, atual && styles.bolinhaAtual]}>
                    {feito && <Text style={styles.check}>✓</Text>}
                  </View>
                  {i < ETAPAS.length - 1 && <View style={[styles.linhaV, i < pedido.status && styles.linhaVOk]} />}
                </View>
                <Text style={[styles.etapaTxt, feito && styles.etapaTxtOk, atual && styles.etapaAtual]}>{etapa}</Text>
              </View>
            );
          })
        )}
        {!cancelado && !entregue && (
          <Text style={styles.dica}>Atualizando automaticamente…</Text>
        )}
      </View>

      <View style={styles.card}>
        <Text style={styles.secao}>Itens</Text>
        {pedido.itens.map((i) => (
          <View key={i.id} style={styles.itemBloco}>
            <View style={styles.linha}>
              <Text style={styles.txt}>{i.qtd}× {i.nome}</Text>
              <Text style={styles.txt}>{formatarPreco(i.preco * i.qtd)}</Text>
            </View>
            {!!i.obs && <Text style={styles.obs}>Obs.: {i.obs}</Text>}
          </View>
        ))}
        <View style={styles.divisor} />
        <View style={styles.linha}><Text style={styles.txt}>Subtotal</Text><Text style={styles.txt}>{formatarPreco(pedido.subtotal)}</Text></View>
        {pedido.desconto > 0 && (
          <View style={styles.linha}>
            <Text style={styles.txt}>Desconto{pedido.cupom ? ` (${pedido.cupom})` : ''}</Text>
            <Text style={styles.txt}>− {formatarPreco(pedido.desconto)}</Text>
          </View>
        )}
        <View style={styles.linha}><Text style={styles.txt}>Entrega</Text><Text style={styles.txt}>{pedido.taxa === 0 ? 'Grátis' : formatarPreco(pedido.taxa)}</Text></View>
        <View style={styles.linha}><Text style={styles.total}>Total</Text><Text style={styles.total}>{formatarPreco(pedido.total)}</Text></View>
      </View>

      <View style={styles.card}>
        <Text style={styles.secao}>Entrega e pagamento</Text>
        <Text style={styles.txt}>{pedido.endereco}</Text>
        <Text style={[styles.txt, styles.pag]}>Pagamento: {pedido.pagamento}</Text>
        {pedido.pagamento === 'Dinheiro' && pedido.troco && (
          <Text style={[styles.txt, styles.pag]}>
            {pedido.troco.precisa
              ? `Troco para ${formatarPreco(pedido.troco.paraQuanto)} (devolver ${formatarPreco(pedido.troco.paraQuanto - pedido.total)})`
              : 'Sem necessidade de troco'}
          </Text>
        )}
      </View>

      {pedido.status >= 0 && pedido.status < 2 && (
        <TouchableOpacity style={styles.cancelBtn} onPress={() => onCancelar(pedido.id)}>
          <Text style={styles.cancelTxt}>Cancelar pedido</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md },
  voltar: { color: colors.red, fontWeight: '800', marginBottom: spacing.sm },
  titulo: { color: colors.red, fontSize: 28, fontWeight: '900' },
  sub: { color: colors.muted, marginBottom: spacing.md },
  card: { backgroundColor: colors.white, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md, ...shadow },
  etapaLinha: { flexDirection: 'row', minHeight: 48 },
  coluna: { alignItems: 'center', marginRight: spacing.md },
  bolinha: { width: 24, height: 24, borderRadius: 12, backgroundColor: '#E4DCCB', alignItems: 'center', justifyContent: 'center' },
  bolinhaOk: { backgroundColor: '#2E9E4F' },
  bolinhaAtual: { borderWidth: 3, borderColor: colors.yellow },
  check: { color: colors.white, fontWeight: '900', fontSize: 13 },
  linhaV: { width: 3, flex: 1, backgroundColor: '#E4DCCB' },
  linhaVOk: { backgroundColor: '#2E9E4F' },
  etapaTxt: { color: colors.muted, fontSize: 16, paddingTop: 2 },
  etapaTxtOk: { color: colors.text },
  etapaAtual: { fontWeight: '900', color: colors.red },
  dica: { color: colors.muted, fontSize: 12, marginTop: spacing.sm },
  cancelado: { color: colors.redDark, fontWeight: '900', fontSize: 18, textAlign: 'center' },
  secao: { color: colors.red, fontWeight: '800', fontSize: 17, marginBottom: spacing.sm },
  linha: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 },
  itemBloco: { marginBottom: 2 },
  obs: { color: colors.muted, fontSize: 12, marginLeft: 4 },
  txt: { color: colors.text, fontSize: 15 },
  total: { color: colors.red, fontWeight: '900', fontSize: 18 },
  divisor: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  pag: { marginTop: 4, color: colors.muted },
  cancelBtn: { alignItems: 'center', padding: spacing.md },
  cancelTxt: { color: colors.redDark, fontWeight: '800' },
});
