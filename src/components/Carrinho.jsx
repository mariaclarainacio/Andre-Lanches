import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { colors, spacing, radius, shadow } from '../theme/theme';
import { formatarPreco } from '../data/produtos';
import { PEDIDO_MINIMO, PAGAMENTOS, CUPONS } from '../data/entrega';
import { mostrarAlerta } from '../utils/alerta';

// Aceita "50", "50,00" ou "50.5"; retorna NaN se não for número.
const lerValor = (texto) => Number(texto.trim().replace(',', '.'));

export default function Carrinho({
  itens, subtotal, desconto, taxa, total, cupom,
  onAdd, onRemove, onObs, onAplicarCupom, onRemoverCupom, onLimpar, onFinalizar, onVoltar,
}) {
  const [endereco, setEndereco] = useState('');
  const [pagamento, setPagamento] = useState(PAGAMENTOS[0]);
  const [codigo, setCodigo] = useState('');
  const [precisaTroco, setPrecisaTroco] = useState(false);
  const [valorTroco, setValorTroco] = useState('');

  const falta = PEDIDO_MINIMO - subtotal;
  const abaixoMinimo = falta > 0;

  if (itens.length === 0) {
    return (
      <View style={styles.vazio}>
        <Text style={styles.vazioEmoji}>🛒</Text>
        <Text style={styles.titulo}>Seu carrinho está vazio</Text>
        <Text style={styles.sub}>Escolha seus lanches no cardápio.</Text>
        <TouchableOpacity style={styles.botao} onPress={onVoltar}>
          <Text style={styles.botaoTxt}>Ver cardápio</Text>
        </TouchableOpacity>
      </View>
    );
  }

  const aplicar = () => {
    if (!codigo.trim()) return;
    if (onAplicarCupom(codigo)) {
      setCodigo('');
    } else {
      mostrarAlerta('Cupom inválido', 'Confira o código e tente novamente.');
    }
  };

  const finalizar = () => {
    if (abaixoMinimo) return;
    if (!endereco.trim()) {
      mostrarAlerta('Endereço obrigatório', 'Informe o endereço de entrega.');
      return;
    }

    let troco = null;
    if (pagamento === 'Dinheiro') {
      if (precisaTroco) {
        const paraQuanto = lerValor(valorTroco);
        if (Number.isNaN(paraQuanto) || paraQuanto < total) {
          mostrarAlerta('Valor para troco inválido', `Informe com quanto você vai pagar (no mínimo ${formatarPreco(total)}).`);
          return;
        }
        troco = { precisa: true, paraQuanto };
      } else {
        troco = { precisa: false };
      }
    }
    onFinalizar({ endereco: endereco.trim(), pagamento, troco });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>Carrinho</Text>
      <Text style={styles.sub}>Pedido no André Lanches</Text>

      {itens.map((i) => (
        <View key={i.id} style={styles.item}>
          <View style={styles.itemTopo}>
            <View style={styles.itemInfo}>
              <Text style={styles.itemNome}>{i.nome}</Text>
              <Text style={styles.itemPreco}>{formatarPreco(i.preco)}</Text>
            </View>
            <View style={styles.stepper}>
              <TouchableOpacity style={styles.stepBtn} onPress={() => onRemove(i.id)}>
                <Text style={styles.stepTxt}>−</Text>
              </TouchableOpacity>
              <Text style={styles.qtd}>{i.qtd}</Text>
              <TouchableOpacity style={styles.stepBtn} onPress={() => onAdd(i.id)}>
                <Text style={styles.stepTxt}>+</Text>
              </TouchableOpacity>
            </View>
          </View>
          <TextInput
            style={styles.obs}
            value={i.obs}
            onChangeText={(t) => onObs(i.id, t)}
            placeholder="Observação (ex.: sem cebola)"
            placeholderTextColor={colors.muted}
            maxLength={80}
          />
        </View>
      ))}

      <TouchableOpacity style={styles.maisItens} onPress={onVoltar}>
        <Text style={styles.maisItensTxt}>Adicionar mais itens</Text>
      </TouchableOpacity>

      <View style={styles.card}>
        <Text style={styles.label}>Cupom de desconto</Text>
        {cupom ? (
          <View style={styles.cupomAplicado}>
            <Text style={styles.cupomTxt}>🎟️ {cupom} — {CUPONS[cupom].descricao}</Text>
            <TouchableOpacity onPress={onRemoverCupom}><Text style={styles.cupomX}>✕</Text></TouchableOpacity>
          </View>
        ) : (
          <View style={styles.cupomLinha}>
            <TextInput
              style={[styles.input, styles.cupomInput]}
              value={codigo}
              onChangeText={setCodigo}
              placeholder="Ex.: COMBO10"
              placeholderTextColor={colors.muted}
              autoCapitalize="characters"
              autoCorrect={false}
            />
            <TouchableOpacity style={styles.aplicar} onPress={aplicar}>
              <Text style={styles.aplicarTxt}>Aplicar</Text>
            </TouchableOpacity>
          </View>
        )}

        <Text style={styles.label}>Endereço de entrega</Text>
        <TextInput
          style={styles.input}
          value={endereco}
          onChangeText={setEndereco}
          placeholder="Rua, número, bairro"
          placeholderTextColor={colors.muted}
        />
        <Text style={styles.label}>Pagamento</Text>
        <View style={styles.chips}>
          {PAGAMENTOS.map((p) => (
            <TouchableOpacity key={p} style={[styles.chip, pagamento === p && styles.chipAtivo]} onPress={() => setPagamento(p)}>
              <Text style={[styles.chipTxt, pagamento === p && styles.chipTxtAtivo]}>{p}</Text>
            </TouchableOpacity>
          ))}
        </View>

        {pagamento === 'Dinheiro' && (
          <>
            <Text style={styles.label}>Precisa de troco?</Text>
            <View style={styles.chips}>
              {[['Não', false], ['Sim', true]].map(([rotulo, valor]) => (
                <TouchableOpacity key={rotulo} style={[styles.chip, precisaTroco === valor && styles.chipAtivo]} onPress={() => setPrecisaTroco(valor)}>
                  <Text style={[styles.chipTxt, precisaTroco === valor && styles.chipTxtAtivo]}>{rotulo}</Text>
                </TouchableOpacity>
              ))}
            </View>
            {precisaTroco && (
              <>
                <Text style={styles.label}>Troco para quanto?</Text>
                <TextInput
                  style={styles.input}
                  value={valorTroco}
                  onChangeText={setValorTroco}
                  placeholder="Ex.: 50"
                  placeholderTextColor={colors.muted}
                  keyboardType="decimal-pad"
                />
                {!Number.isNaN(lerValor(valorTroco)) && lerValor(valorTroco) >= total && valorTroco.trim() !== '' && (
                  <Text style={styles.trocoInfo}>Seu troco: {formatarPreco(lerValor(valorTroco) - total)}</Text>
                )}
              </>
            )}
          </>
        )}
      </View>

      <View style={styles.card}>
        <Linha rotulo="Subtotal" valor={formatarPreco(subtotal)} />
        {desconto > 0 && <Linha rotulo="Desconto" valor={`− ${formatarPreco(desconto)}`} verde />}
        <Linha rotulo="Entrega" valor={taxa === 0 ? 'Grátis' : formatarPreco(taxa)} verde={taxa === 0} />
        <View style={styles.divisor} />
        <Linha rotulo="Total" valor={formatarPreco(total)} forte />
      </View>

      {abaixoMinimo && (
        <Text style={styles.aviso}>
          Faltam {formatarPreco(falta)} para o pedido mínimo de {formatarPreco(PEDIDO_MINIMO)}.
        </Text>
      )}

      <TouchableOpacity style={[styles.botao, abaixoMinimo && styles.botaoOff]} onPress={finalizar} disabled={abaixoMinimo}>
        <Text style={styles.botaoTxt}>Finalizar pedido</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={onLimpar} style={styles.limpar}>
        <Text style={styles.limparTxt}>Esvaziar carrinho</Text>
      </TouchableOpacity>
    </View>
  );
}

function Linha({ rotulo, valor, forte, verde }) {
  return (
    <View style={styles.linha}>
      <Text style={[styles.linhaTxt, forte && styles.forte, verde && styles.verde]}>{rotulo}</Text>
      <Text style={[styles.linhaTxt, forte && styles.forte, verde && styles.verde]}>{valor}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: spacing.md },
  vazio: { padding: spacing.xl, alignItems: 'center' },
  vazioEmoji: { fontSize: 56, marginBottom: spacing.md },
  titulo: { color: colors.red, fontSize: 28, fontWeight: '900', textAlign: 'center' },
  sub: { color: colors.muted, textAlign: 'center', marginBottom: spacing.md, marginTop: 2 },
  item: { backgroundColor: colors.white, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.sm, ...shadow },
  itemTopo: { flexDirection: 'row', alignItems: 'center' },
  itemInfo: { flex: 1 },
  itemNome: { color: colors.text, fontWeight: '800', fontSize: 16 },
  itemPreco: { color: colors.muted, marginTop: 2 },
  obs: { marginTop: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border, paddingVertical: 6, fontSize: 13, color: colors.text },
  stepper: { flexDirection: 'row', alignItems: 'center' },
  stepBtn: { width: 34, height: 34, borderRadius: 17, backgroundColor: colors.yellow, alignItems: 'center', justifyContent: 'center' },
  stepTxt: { color: colors.red, fontSize: 20, fontWeight: '900', lineHeight: 22 },
  qtd: { minWidth: 32, textAlign: 'center', fontWeight: '800', color: colors.text, fontSize: 16 },
  maisItens: { backgroundColor: colors.yellowSoft, borderRadius: radius.md, paddingVertical: 12, alignItems: 'center', marginVertical: spacing.sm, borderWidth: 1, borderColor: colors.border },
  maisItensTxt: { color: colors.red, fontWeight: '800' },
  card: { backgroundColor: colors.white, borderRadius: radius.md, padding: spacing.md, marginBottom: spacing.md, ...shadow },
  label: { color: colors.red, fontWeight: '700', marginBottom: spacing.xs, marginTop: spacing.sm },
  input: { borderWidth: 1.5, borderColor: colors.border, borderRadius: radius.sm, paddingHorizontal: spacing.md, paddingVertical: 10, fontSize: 15, color: colors.text, backgroundColor: colors.yellowSoft },
  cupomLinha: { flexDirection: 'row', alignItems: 'center' },
  cupomInput: { flex: 1, marginRight: spacing.sm },
  aplicar: { backgroundColor: colors.red, borderRadius: radius.pill, paddingVertical: 11, paddingHorizontal: spacing.md },
  aplicarTxt: { color: colors.white, fontWeight: '800' },
  cupomAplicado: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', backgroundColor: '#E6F4EA', borderRadius: radius.sm, padding: spacing.sm + 2 },
  cupomTxt: { color: '#1E7B3A', fontWeight: '800', flex: 1 },
  cupomX: { color: colors.muted, fontSize: 18, paddingHorizontal: spacing.sm },
  chips: { flexDirection: 'row' },
  trocoInfo: { color: '#1E7B3A', fontWeight: '700', marginTop: spacing.xs },
  chip: { paddingVertical: 8, paddingHorizontal: spacing.md, borderRadius: radius.pill, backgroundColor: colors.yellowSoft, borderWidth: 1, borderColor: colors.border, marginRight: spacing.sm },
  chipAtivo: { backgroundColor: colors.red, borderColor: colors.red },
  chipTxt: { color: colors.red, fontWeight: '700' },
  chipTxtAtivo: { color: colors.white },
  linha: { flexDirection: 'row', justifyContent: 'space-between', marginVertical: 3 },
  linhaTxt: { color: colors.text, fontSize: 15 },
  forte: { fontWeight: '900', fontSize: 18, color: colors.red },
  verde: { color: '#1E7B3A', fontWeight: '700' },
  divisor: { height: 1, backgroundColor: colors.border, marginVertical: spacing.sm },
  aviso: { color: colors.redDark, textAlign: 'center', marginBottom: spacing.sm, fontWeight: '600' },
  botao: { backgroundColor: colors.red, borderRadius: radius.pill, paddingVertical: 14, paddingHorizontal: spacing.lg, alignItems: 'center' },
  botaoOff: { opacity: 0.45 },
  botaoTxt: { color: colors.white, fontWeight: '800', fontSize: 16 },
  limpar: { alignItems: 'center', padding: spacing.md },
  limparTxt: { color: colors.muted, fontWeight: '700' },
});
