export const store = {
  state: {
    currentUser: null,
    users: [],
    messages: [],
    groups: [],
    groupMessages: [],
    selectedContact: null,
  },

  listeners: [],

  subscribe(listener) {
    this.listeners.push(listener);
  },

  setState(newState) {
    this.state = { ...this.state, ...newState };
    this.listeners.forEach(listener => listener(this.state));
  },

  getState() {
    return this.state;
  }
};
