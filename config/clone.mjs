import v8 from 'v8';

const structuredClone = obj => {
  return v8.deserialize(v8.serialize(obj));
};

export default structuredClone;