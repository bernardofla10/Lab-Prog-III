// Crie o aplicativo ao lado que calcula o número de Fibonacci de um dado número N
// Inclua os componentes Image, TextInput, Button e Text
// Os valores da entrada N e de FibN devem ser salvos no estado da aplicação

import { useState } from 'react';
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

const fibonacciImage =
  'https://super.abril.com.br/wp-content/uploads/2018/07/513f755d9827683068000278fibonacci_spiral_geogebra-svg.png?quality=70&w=720&crop=1';

function calculateFibonacci(n) { // função para calcular o Fibonacci de um número n.
  if (n <= 0) {
    return 0;
  }

  if (n === 1) {
    return 1;
  }

  let previous = 0;
  let current = 1;

  for (let i = 2; i <= n; i += 1) {
    const next = previous + current;
    previous = current;
    current = next;
  }

  return current;
}

export default function App() { // declara o componente principal do aplicativo
  const [n, setN] = useState(''); // cria o estado da entrada como uma string vazia. 'n' guarda o texto digitado no TextInput e 'setN' atualiza esse valor.
  const [fibN, setFibN] = useState(0); // cria o estado do resultado como 0. 'fibN' guarda o Fibonacci calculado e 'setFibN' atualiza o resultado.

  function handleCalculate() { // declara a função executada quando o botão CALCULAR é pressionado.
    const parsedN = Number.parseInt(n, 10); // converte o texto digitado em número inteiro na base 10.

    if (Number.isNaN(parsedN) || parsedN < 0) { // se a entrada não for um número válido ou for negativa, define o resultado como 0 e encerra função.
      setFibN(0);
      return;
    }

    setFibN(calculateFibonacci(parsedN)); // calcula o fibonacci do número digitado e salva o resultado no estado fibN.
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <Image
          source={{ uri: fibonacciImage }}
          style={styles.image}
          resizeMode="contain"
        />

        <TextInput
          style={styles.input}
          keyboardType="numeric"
          placeholder="Informe o valor do termo"
          placeholderTextColor="#888"
          value={n}
          onChangeText={setN}
        /> {/* liga o valor do input ao estado 'n' e sempre que o usuário digita, chama 'setN' e atualiza o estado. */}

        <View style={styles.buttonWrapper}>
          <Button title="CALCULAR" onPress={handleCalculate} />
        </View> {/* cria o botão. ao pressionar, executa handleCalculate. */}

        <Text style={styles.result}>{fibN}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
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
  image: {
    width: '100%',
    height: 150,
    marginBottom: 8,
  },
  input: {
    width: '100%',
    height: 36,
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#222',
    paddingHorizontal: 12,
    textAlign: 'center',
  },
  buttonWrapper: {
    width: '100%',
    marginBottom: 12,
  },
  result: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
});
