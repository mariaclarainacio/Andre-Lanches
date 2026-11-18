import React, { useState } from 'react';
import { ScrollView, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

import Header from './src/components/Header';
import BannerPromocao from './src/components/BannerPromocao';
import ListaProdutos from './src/components/ListaProdutos';
import SobreNos from './src/components/SobreNos';
import Contato from './src/components/Contato';
import EntregaFlutuante from './src/components/EntregaFlutuante';
import { colors } from './src/theme/theme';
import { produtos, promocao, TELEFONE_EXIBICAO, TELEFONE_LINK } from './src/data/produtos';

export default function App() {
  const [tela, setTela] = useState('lanches');

  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.safe} edges={['top', 'left', 'right', 'bottom']}>
        <StatusBar style="light" backgroundColor={colors.red} />
        <Header telaAtiva={tela} onNavegar={setTela} />

        <KeyboardAvoidingView style={styles.flex} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
          <ScrollView
            contentContainerStyle={styles.conteudo}
            keyboardShouldPersistTaps="handled"
            showsVerticalScrollIndicator={false}
          >
            {tela === 'lanches' && (
              <>
                <BannerPromocao
                  titulo={promocao.titulo}
                  descricao={promocao.descricao}
                  preco={promocao.preco}
                />
                <ListaProdutos produtos={produtos} />
              </>
            )}
            {tela === 'sobre' && <SobreNos />}
            {tela === 'contato' && <Contato />}
          </ScrollView>
        </KeyboardAvoidingView>

        <EntregaFlutuante telefone={TELEFONE_EXIBICAO} link={TELEFONE_LINK} />
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
