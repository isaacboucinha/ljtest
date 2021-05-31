const prod = {
  urls: {
    API_URL: 'https://isaac-ljtest.herokuapp.com/',
  }
}

const dev = {
  urls: {
    API_URL: 'http://localhost:3000'
  }
};

export const configs = process.env.NODE_ENV === 'development' ? dev : prod;
