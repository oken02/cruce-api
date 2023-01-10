const { Order, Courier, User, Branch } = require("./models");
const mongooseLoader = require("./db");
const bcrypt = require("bcrypt");

const order = {
  orderId: "orden-1",
  client: {
    firstName: "Luis",
    lastName: "",
    phone: 123456789,
    address: {
      province: "Lima",
      city: "Perú",
    },
  },
  product: [
    {
      productName: "Computadora",
    },
  ],
  observations: "",
};

const adminData = {
  fullName: "Admin",
  email: "admin@gmail.com",
  dniCuil: 123456789,
  password: "admin",
  role: "ecommerce",
};

const mensajerias = [
  {
    name: "La Veloz",
    address: "dirección 1",
    manager: "Responsable 1",
    phone: 123456789,
  },
  {
    name: "La Motoneta",
    address: "dirección 1",
    manager: "Responsable 1",
    phone: 123456789,
  },
  {
    name: "Mensajería 3",
    address: "Dirección 3",
    manager: "Responsable 3",
    phone: 123456789,
  },
];

const sucursales = [
  {
    name: "Sucursal 1",
    address: "Dirección 1",
    manager: "Responsable 1",
    phone: 123456789,
  },
  {
    name: "Sucursal 2",
    address: "Dirección 2",
    manager: "Responsable 2",
    phone: 123456789,
  },
  {
    name: "Sucursal 3",
    address: "Dirección 3",
    manager: "Responsable 3",
    phone: 123456789,
  },
];

(async () => {
  await mongooseLoader();

  const admin = await User.create({ ...adminData, password: await bcrypt.hash(adminData.password, 10) });
  console.log("🤔 ~ admin creado");

  const mensajeriasRes = await Courier.create(mensajerias);
  console.log("🤔 ~ mensajerias creadas");

  const sucursalesRes = await Branch.create(sucursales);
  console.log("🤔 ~ sucursales creadas");

  const orders = new Array(10).fill().map((_, i) => {
    return { ...order, orderId: `orden-${i + 1}`, courierId: mensajeriasRes[Math.round(Math.random())]._id };
  });

  const ordersRes = await Order.create(orders);
  console.log("🤔 ~ ordenes creadas");
})();
