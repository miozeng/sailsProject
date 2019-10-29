module.exports = {
  migrate: 'alter',
  attributes: {
    title: {
      type: 'String',
      required: true
    },
    content: {
      type: 'String',
      encrypt: true,
      required: true
    },

    writer: {
      model: 'user'
    }
  },

};
