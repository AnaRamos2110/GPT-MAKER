import { StatusBar } from 'expo-status-bar';
import { useState, useRef } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, Keyboard, KeyboardAvoidingView, Platform, TextInput, TouchableOpacityProps, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Tipo das mensagens exibidas no chat

// id => identificador único p/ o FlatList
// role => quem enviou a mensagem (user ou assistant)
// text => conteúdo da mensagem

type ChatMessage = {
    id: string;
    role: 'user' | 'assistant';
    text: string;
}

export default function App() {
    const [ input, setInput] = useState("");
    const [ loading, setLoading ] = useState(false);
    const [ messages, setMessages] = useState<ChatMessage[]>([{
        id: "1",
        role: "assistant",
        text: "Olá! Posso te ajudar com o agendamento na Alquimistic Barber. Me diga o que você deseja.",
    },
    ])
    const flatListRef = useRef<FlatList<ChatMessage>>(null);
    const apiURL = process.env.EXPO_PUBLIC_API_URL;
    const contextId = "sessao-anonima-app";

    async function handleSend(){
        const text = input.trim();
        if (!text || loading ) return;
        Keyboard.dismiss();
        const userMessage : ChatMessage = {
            id: String(Date.now()),
            role : "user",
            text,
        }

        setMessages((prev) => [...prev, userMessage]);
        setInput("");
        setLoading(true);
        const apiURL = 
        Platform.OS === "android" 
        ? "http://10.244.134.77:3000":
          "http://127.0.0.1:3000";

          try {
            
          } catch (error) {
            const errorMessage: ChatMessage = {
                id: String(Date.now() + 2),
                role: "assistant",
                text: "Ocorreu um erro ao processar sua solicitação. Por favor, tente novamente.",
            };
            setMessages((prev) => [...prev, errorMessage]
        );

    } finally {
        setLoading(false);
        setTimeout( () => {
            flatListRef.current?.scrollToEnd({ animated: true });
        })
    }
    
}


/*  Função usada pelo FlatList para desenhar cada mensagem*/ 

  function renderItem({ item } : { item: ChatMessage}){
      const isUser = item.role === "user";
      return (
          <View style={[
              styles.messageContainer,
              isUser ? styles.userMessageContainer : styles.assistantMessageContainer
          ]}>
              <Text style={[styles.messageText, isUser && styles.userMessageText]}>
                  {item.text}
              </Text>
          </View>
      )
  }

  return(
    <SafeAreaView>
      <KeyboardAvoidingView>
        {/* Cabeçalho do app */}
        <View>
          <Text>Barbearia Agenda</Text>
          <Text>Assistente Virtual</Text>
        </View>
        {/* Lista de mensagens */}
        <FlatList 
          ref={flatListRef}
          data={messages}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          contentContainerStyle={styles.listContent}
        />

        {/* Indicador visual enquanto aguarda a resposta da API */}
        {loading && (
          <View>
            <ActivityIndicator />
            <Text>Aguarde...</Text>
          </View>
        )}
        {/* Área inferior com input e botão de envio*/}
        <View>
          <TextInput/>
          <TouchableOpacity>
            <Text>Enviar</Text>
          </TouchableOpacity>
        </View>



      </KeyboardAvoidingView>
    </SafeAreaView>
  )

}





























    const styles = StyleSheet.create({

  safe: {

    flex: 1,

    backgroundColor: "#111827",

  },

  container: {

    flex: 1,

  },

  header: {

    paddingHorizontal: 16,

    paddingTop: 18,

    paddingBottom: 12,

    borderBottomWidth: 1,

    borderBottomColor: "#1f2937",

  },

  headerTitle: {

    color: "#fff",

    fontSize: 22,

    fontWeight: "700",

  },

  headerSubtitle: {

    color: "#9ca3af",

    fontSize: 14,

    marginTop: 4,

  },

  listContent: {

    padding: 16,

    gap: 12,

  },

  messageContainer: {

    maxWidth: "85%",

    padding: 12,

    borderRadius: 14,

  },

  userMessageContainer: {

    alignSelf: "flex-end",

    backgroundColor: "#2563eb",

  },

  assistantMessageContainer: {

    alignSelf: "flex-start",

    backgroundColor: "#1f2937",

  },

  messageText: {

    color: "#fff",

    fontSize: 15,

    lineHeight: 22,

  },

  userMessageText: {

    color: "#fff",

  },

  loadingBox: {

    flexDirection: "row",

    alignItems: "center",

    gap: 8,

    paddingHorizontal: 16,

    paddingBottom: 8,

  },

  loadingText: {

    color: "#d1d5db",

  },

  inputArea: {

    flexDirection: "row",

    alignItems: "flex-end",

    padding: 12,

    borderTopWidth: 1,

    borderTopColor: "#1f2937",

    backgroundColor: "#111827",

    gap: 8,

  },

  input: {

    flex: 1,

    minHeight: 48,

    maxHeight: 120,

    backgroundColor: "#fff",

    borderRadius: 12,

    paddingHorizontal: 12,

    paddingVertical: 10,

    fontSize: 15,

  },

  sendButton: {

    backgroundColor: "#22c55e",

    paddingHorizontal: 16,

    paddingVertical: 14,

    borderRadius: 12,

  },

  sendButtonText: {

    color: "#111827",

    fontWeight: "700",

  },

});

