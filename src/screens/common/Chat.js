import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// hooks
import useAuthContext from '../../contexts/Auth';

// libraries
import Icon from 'react-native-vector-icons/FontAwesome5';

// styles
import colors from '../../configs/colors';

// helpers
import api from '../../api';

export default function Chat(props) {
  const [log, setLog] = useState([]);
  const [input, setInput] = useState('');
  const [chatId, setChatId] = useState();
  const auth = useAuthContext();

  const addMessage = () => {
    api.chat.send(chatId, auth.user.id, input);
    setInput('');
  };

  useEffect(() => {
    const onChatChange = (snapshot) => {
      const chatLog = [];
      snapshot.forEach((message) => {
        chatLog.push({ id: message.id, ...message.data() });
      });
      setLog(chatLog);
    };

    const listenToChatDocument = async () => {
      let _chatId = await api.chat.get(
        props.route.params.customerId,
        props.route.params.storeId,
      );

      if (!_chatId) {
        _chatId = await api.chat.create({
          customer: props.route.params.customerId,
          store: props.route.params.storeId,
        });
      }

      setChatId(_chatId);
      const unsubscribeChatListener = await api.chat.listen(
        _chatId,
        onChatChange,
      );
      return unsubscribeChatListener;
    };
    listenToChatDocument();
  }, []);

  return (
    <SafeAreaView style={styles.chatContent}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>
            {props.route.params.customerName}
          </Text>
          <TouchableOpacity>
            <Icon name="chevron-left" color={colors.primary} size={22} />
          </TouchableOpacity>
        </View>
        <FlatList
          inverted
          data={log}
          style={{ height: '85%' }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View
              style={
                item.user === auth.user.id
                  ? styles.rightMessage
                  : styles.chatMessage
              }>
              <Text style={styles.message}>{item.message}</Text>
            </View>
          )}
        />
      </View>
      <View style={styles.bottomContent}>
        <TextInput
          value={input}
          onChangeText={setInput}
          placeholder="Message here..."
          placeholderTextColor="#ffffff77"
          style={styles.chatInput}
        />
        <TouchableOpacity style={styles.chatSendIcon} onPress={addMessage}>
          <Icon name="arrow-circle-right" size={22} color={colors.white} />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  chatContent: {
    flex: 1,
    backgroundColor: colors.background,
  },
  bottomContent: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 20,
  },
  headerTitle: {
    fontSize: 30,
    color: colors.primary,
    paddingVertical: 15,
  },
  chatMessage: {
    backgroundColor: colors.primary,
    marginVertical: 10,
    paddingVertical: 12,
    width: 300,
    marginLeft: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  rightMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#555',
    marginVertical: 6,
    paddingVertical: 12,
    width: 300,
    marginRight: 10,
    borderRadius: 20,
    paddingHorizontal: 20,
  },
  username: {
    fontSize: 15,
    color: colors.white,
  },
  message: {
    marginBottom: 5,
    fontSize: 15,
  },
  chatInput: {
    height: 60,
    width: '85%',
    backgroundColor: colors.primary,
    paddingLeft: 25,
    fontSize: 18,
    color: colors.white,
  },
  chatSendIcon: {
    backgroundColor: colors.primary,
    width: '15%',
    paddingRight: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
