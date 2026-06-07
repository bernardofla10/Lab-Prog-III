import { useState } from 'react'; // importa o hook useState, ferramenta padrão para gerenciar estados locais dentro de componentes funcionais.
import { Button, SafeAreaView, StyleSheet, Text, View } from 'react-native'; // importa os componentes visuais básicos nativos do react native.

export default function App() { // declara a função do componente App e define como exportação padrão (componente principal).
  const [count, setCount] = useState(0); // invoca o hook useState para criar o estado do contador com valor inicial 0 (count: guarda o valor atual, setCount: função que atualiza esse valor).

  function addCount() { // declara uma função para incremento do contador.
    setCount((currentCount) => currentCount + 1); // atualiza o contador usando o valor atual e somando 1. 
  } // dessa forma, usa sempre o valor mais recente do estado -> mais seguro quando a atualização depende do valor anterior: não usar setCount(count + 1);

  return ( // início do JSX (JSX permite escrever a interface parecida com HTML no JS. Em React Native, esses elementos viram componentes nativos).
    <SafeAreaView style={styles.safeArea}> 
      <View style={styles.container}>
        <Text style={styles.title}>Meu Contador</Text>
        <Text style={styles.counter}>{count}</Text>
        <View style={styles.buttonWrapper}>
          <Button title="ADD" onPress={addCount} />
        </View>
      </View>
    </SafeAreaView>
  );// Abre o container <SafeAreaView>, aplicando a regra de estilo mapeada em styles.safeArea para blindar a interface contra interferências físicas do hardware.
}// Abre uma <View> que serve como container principal do app, aplicando as regras de estilo em styles.container.
// <Text> renderiza strings com formatação visual styles.title e styles.counter. Toda vez que setCount é disparado, a linha é re-renderizada na tela.
// <View style={styles.buttonWrapper}> cria uma view secundária que serve como um invólucro de layout para o botão nativo.
// <Button> renderiza o botão com o título ADD e atributo onPress atrela o evento físico de toque do usuário à função addCount.

const styles = StyleSheet.create({ // invoca o método StyleSheet.create para criar o objeto de estilos usado pelos componentes.
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  title: {
    marginBottom: 16,
    fontSize: 20,
    fontWeight: '500',
    color: '#111',
  },
  counter: {
    marginBottom: 8,
    fontSize: 18,
    color: '#222',
  },
  buttonWrapper: {
    width: '100%',
  },
});
