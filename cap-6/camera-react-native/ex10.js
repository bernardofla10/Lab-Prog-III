// Crie um app que tire fotos utilizando a câmera do dispositivo
// Requisitos Funcionais:
// - A foto deve aparecer em uma imagem na mesma tela
// - O usuário deve conseguir alternar entre câmera frontal e traseira
// - O app deve pedir permissão para acessar a câmera usando useCameraPermissions

import { useRef, useState } from 'react'; // importa dois hooks do React: useRef: cria uma referência para acessar a câmera; useState: cria estados para foto e câmera ativa.
import {
  Button,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableHighlight, // botão customizado com toque
  View,
} from 'react-native';
import { CameraView, useCameraPermissions } from 'expo-camera'; // importa recursos da câmera.
// CameraView: componente que mostra a câmera ao vivo; useCameraPermissions: hook para pedir/verificar permissão da câmera.

import { Ionicons } from '@expo/vector-icons'; // importa ícones usados nos botões.

export default function App() { // componente principal do app.
  const cameraRef = useRef(null); // referência usada para acessar os métodos da câmera. Permite chamar métodos para a câmera como takePictureAsync.
  const [photoUri, setPhotoUri] = useState(null); // Cria o estado da foto. photoUri guarda o caminho local da última foto tirada. Começa como null, porque ainda não há foto.
  const [facing, setFacing] = useState('back'); // Cria o estado da câmera ativa. Começa com 'back', ou seja, câmera traseira.
  const [permission, requestPermission] = useCameraPermissions(); // Verifica permissão da câmera. permission: estado atual da permissão; requestPermission: função que pede permissão ao usuário.

  if (!permission) {
    return <View />; // se a permissão ainda está carregando, retorna uma tela vazia.
  }

  if (!permission.granted) { // Verifica se a permissão ainda não foi concedida.
    return (
      <View style={styles.permissionContainer}>
        <Text style={styles.permissionText}>
          O app precisa da sua permissão para utilizar a câmera
        </Text>
        <Button title="Conceder permissão" onPress={requestPermission} />
      </View>
    );
  }

  async function takePhoto() { // cria uma função assíncrona (usa await) para tirar foto.
    if (cameraRef.current) { // Verifica se a câmera já está montada e acessível.
      const photo = await cameraRef.current.takePictureAsync(); // Tira a foto usando a câmera. await espera a captura terminar.
      setPhotoUri(photo.uri); // Salva a URI da foto no estado. Quando isso acontece, a tela atualiza e mostra a imagem.
    }
  }

  function flipCamera() { // Cria a função para alternar câmera frontal/traseira.
    setFacing((currentFacing) => (currentFacing === 'back' ? 'front' : 'back')); // se currentFacing for igual a 'back', o novo valor será 'front'. Caso contrário, o novo valor será 'back'.
  }

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Camera</Text>

      <View style={styles.cameraContainer}>
        <CameraView style={styles.camera} ref={cameraRef} facing={facing} /> {/* mostra a câmera ao vivo. */}
      </View> {/* ref={cameraRef} conecta o componente a referência e facing={facing} define se usa câmera frontal ou traseira. */}

      <View style={styles.buttonContainer}>
        <TouchableHighlight style={styles.captureButton} onPress={takePhoto}>
          <View>
            <Ionicons name="camera" size={32} color="white" />
          </View>
        </TouchableHighlight>

        <TouchableHighlight style={styles.captureButton} onPress={flipCamera}>
          <View>
            <Ionicons name="camera-reverse" size={32} color="white" />
          </View>
        </TouchableHighlight>
      </View>

      <View style={styles.previewContainer}>
        {photoUri ? ( // renderização condicional: se existe foto, mostra a imagem. se não existe, mostra um texto.
          <Image source={{ uri: photoUri }} style={styles.previewImage} />
        ) : (
          <Text style={styles.previewText}>Nenhuma foto capturada</Text>
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  permissionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
    backgroundColor: '#fff',
  },
  permissionText: {
    marginBottom: 16,
    textAlign: 'center',
    fontSize: 16,
    color: '#111',
  },
  title: {
    margin: 15,
    fontSize: 24,
    fontWeight: 'bold',
    color: '#111',
  },
  cameraContainer: {
    width: '100%',
    height: 300,
    overflow: 'hidden',
    backgroundColor: 'lightgray',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  captureButton: {
    margin: 20,
    padding: 16,
    borderRadius: 50,
    backgroundColor: '#000',
  },
  previewContainer: {
    width: '100%',
    height: 300,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    backgroundColor: 'lightgray',
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
  previewText: {
    color: '#555',
  },
});
