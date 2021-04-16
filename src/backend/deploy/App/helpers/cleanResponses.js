const cleaner = (record) => {
  /**
    {
      "Items": [
        {
          "pk": "RULES#123",
          "sk": "xxxx#321",
          "prior": 1
        }
      ],
      "Count": 1,
      "ScannedCount": 1
    }
    */
  const { Items } = record;
  const formattedRecord = { ...record };
  formattedRecord.Items = Items.map((item) => {
    const { pk, sk, ...attributes } = item;
    return {
      pk: pk.substring(pk.indexOf("#") + 1),
      sk: sk.substring(sk.indexOf("#") + 1),
      ...attributes,
    };
  });
  return formattedRecord;
};
module.exports = cleaner;
