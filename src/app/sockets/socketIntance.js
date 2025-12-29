let io = null;

module.exports = {
  setIO: (_io) => {
    io = _io;
  },
  getIO: () => {
    if (!io) {
      throw new Error("Socket.io not initialized");
    }
    return io;
  }
};
