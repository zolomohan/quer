import { firebase } from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import api from '.';
import COLLECTIONS from '../configs/firestore';

const get = async (id) => {
  const customer = await firestore()
    .collection(COLLECTIONS.CUSTOMERS)
    .doc(id)
    .get();
  if (!customer.exists) {
    return { exists: false };
  }
  return { exists: true, data: customer.data() };
};

const create = (id, data) => {
  return firestore().collection(COLLECTIONS.CUSTOMERS).doc(id).set(data);
};

const enqueue = async (store_id, user, data) => {
  const store = await api.stores.get(store_id);

  firestore()
    .collection(COLLECTIONS.CUSTOMERS)
    .doc(user.id)
    .collection(COLLECTIONS.QUEUE)
    .doc(store_id)
    .set({ ...store.data, createdAt: firebase.firestore.Timestamp.now() });

  firestore()
    .collection(COLLECTIONS.STORES)
    .doc(store_id)
    .collection(COLLECTIONS.QUEUE)
    .doc(user.id)
    .set({ ...user, createdAt: firebase.firestore.Timestamp.now() });
};

const listenQueue = (id, onChange) => {
  const unsubscribe = firestore()
    .collection(COLLECTIONS.CUSTOMERS)
    .doc(id)
    .collection(COLLECTIONS.QUEUE)
    .orderBy('createdAt', 'asc')
    .onSnapshot(onChange);
  return unsubscribe;
};

const customers = {
  get,
  create,
  queue: {
    enqueue,
    listen: listenQueue,
  },
};

export default customers;
