import firestore from '@react-native-firebase/firestore';
import COLLECTIONS from '../configs/firestore';

const get = async (customer, store) => {
  const query = await firestore()
    .collection(COLLECTIONS.CHAT)
    .where('customer', '==', customer)
    .where('store', '==', store)
    .get();

  if (query._docs.length > 0) {
    return query._docs[0].id;
  }
  return null;
};

const create = async (doc) => {
  const newChat = await firestore().collection(COLLECTIONS.CHAT).add(doc);
  return newChat.id;
};

const listen = async (docId, onChange) => {
  return firestore()
    .collection(COLLECTIONS.CHAT)
    .doc(docId)
    .collection(COLLECTIONS.MESSAGES)
    .orderBy('createdAt', 'desc')
    .onSnapshot(onChange);
};

const send = async (docId, doc) => {
  return firestore()
    .collection(COLLECTIONS.CHAT)
    .doc(docId)
    .collection(COLLECTIONS.MESSAGES)
    .add(doc);
};

const chat = {
  get,
  create,
  listen,
  send,
};

export default chat;
