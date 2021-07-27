import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TextInput,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from 'react-native';

// libraries
import Icon from 'react-native-vector-icons/FontAwesome5';

// styles
import colors from '../../configs/colors';

// helpers
import api from '../../api';

export default function Chat(props) {
  const [log, setLog] = useState([]);
  const [input, setInput] = useState('');

  const addMessage = () => {
    api.streams.chat.messages.send(props.stream.id, input);
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

    let unsubscribeChatListener = null;
    const getChatLogs = async () => {
      unsubscribeChatListener = await api.streams.chat.listen(
        props.stream.id,
        onChatChange,
      );
    };
    // getChatLogs();

    // return () => {
    //   unsubscribeChatListener();
    // };
  }, []);

  return (
    <SafeAreaView style={styles.chatContent}>
      <View>
        <View style={styles.header}>
          <Text style={styles.headerTitle}>Queue</Text>
          <TouchableOpacity>
            <Icon name="chevron-left" color={colors.primary} size={22} />
          </TouchableOpacity>
        </View>
        <FlatList
          inverted
          data={[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}
          style={{ height: '85%' }}
          showsVerticalScrollIndicator={false}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <>
              <View style={styles.chatMessage}>
                <Text style={styles.message}>How you doing?</Text>
              </View>
              <View style={styles.rightMessage}>
                <Text style={styles.message}>How you doing?</Text>
              </View>
            </>
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
