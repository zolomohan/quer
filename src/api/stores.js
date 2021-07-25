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

const stores = {
  get,
  create,
  queue: {
    listen: listenQueue,
  },
};

export default stores;
