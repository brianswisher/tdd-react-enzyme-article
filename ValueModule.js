const ValueModule = ({ data = null, user = null, date = null }) => {
  const cache = {
    data,
    date,
    user,
  };
  const values = [];

  return {
    getData() {
      return cache.data;
    },

    getDate() {
      return cache.date;
    },

    getUser() {
      return cache.user;
    },

    getUpdateTotal() {
      return values.length;
    },

    setData(newData = null, newDate = new Date().toISOString(), newUser = null) {
      if (newData !== cache.data) {
        values.push(newData);

        cache.data = values[values.length - 1];
      }

      if (newDate !== cache.date) {
        cache.date = newDate;
      }

      if (newUser !== cache.user) {
        cache.user = newUser;
      }
    },

    setDate(newDate) {
      this.setData(null, newDate || new Date().toISOString());
    },

    setUser(newUser) {
      this.setData(null, new Date().toISOString(), newUser);
    },

    toString() {
      return `data: ${cache.data}, updated: ${cache.date}, by: ${cache.user}`;
    },
  };
};

export default ValueModule;
