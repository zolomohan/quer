import firestore from '@react-native-firebase/firestore';
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
  console.log(id);
  return firestore().collection(COLLECTIONS.CUSTOMERS).doc(id).set(data);
};

const customers = {
  get,
  create,
};

export default customers;
