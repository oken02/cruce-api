const ENV = process.env.ENV;

const DEV = {
  DB_CONNECTION: "mongodb://127.0.0.1:27017/cruce",
};

const PROD = {
  DB_CONNECTION: "mongodb://127.0.0.1:27017/cruce",
};

module.exports = (() => {
  switch (ENV) {
    case "PROD":
      return PROD;
    case "DEV":
      return DEV;
    default:
      console.error(`${ENV} no es un ambiente soprtado.`);
      break;
  }
})();
