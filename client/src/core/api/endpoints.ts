const Endpoints = {
  host: "https://radipeerreview.onrender.com",
  hostDev: "http://localhost:4000",
  base: "https://radipeerreview.onrender.com/api",
  baseDev: "http://localhost:4000/api",
  auth: {
    login: "/auth/login",
  },
  report: {
    list: "/report",
    details: "/report/:id",
    create: "/report",
    update: "/report/:id",
    delete: "/report/:id",
  },
  radiologist: {
    add: "/radiologist",
    list: "/radiologist",
    details: "/radiologist/:id",
    update: "/radiologist/:id",
    delete: "/radiologist/:id",
  },
};
export default Endpoints;
