module.exports = {
  transform: {
    "^.+\\.(ts|tsx|js|jsx)$": "ts-jest"
  },
  moduleNameMapper: {
    '^@/(.*)$': '/home/godlord/capstone301/sportnewsapp/src/$1',
  },
  setupFilesAfterEnv: ['/home/godlord/capstone301/sportnewsapp/jest.setup.ts'], // Adjust path as needed
  // Other Jest configurations as needed
};
