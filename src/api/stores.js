import firestore from '@react-native-firebase/firestore';
import COLLECTIONS from '../configs/firestore';

const get = async (id) => {
  const store = await firestore().collection(COLLECTIONS.STORES).doc(id).get();
  if (!store.exists) {
    return { exists: false };
  }
  return { exists: true, data: store.data() };
};

const create = (id, data) => {
  return firestore().collection(COLLECTIONS.STORES).doc(id).set(data);
};

const listenQueue = (id, onChange) => {
  const unsubscribe = firestore()
    .collection(COLLECTIONS.STORES)
    .doc(id)
    .collection(COLLECTIONS.QUEUE)
    .orderBy('createdAt', 'asc')
    .onSnapshot(onChange);
  return unsubscribe;
};

const next = async (user_id, store_id) => {
  firestore()
    .collection(COLLECTIONS.STORES)
    .doc(store_id)
    .collection(COLLECTIONS.QUEUE)
    .doc(user_id)
    .delete();

  firestore()
    .collection(COLLECTIONS.CUSTOMERS)
    .doc(user_id)
    .collection(COLLECTIONS.QUEUE)
    .doc(store_id)
    .delete();
};

const stores = {
  get,
  create,
  queue: {
    listen: listenQueue,
    next: next,
  },
};

export default stores;
