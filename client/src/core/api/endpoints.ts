const Endpoints = {
  host: "https://radipeerreview-1.onrender.com",
  hostDev: "http://localhost:4000",
  base: "https://radipeerreview-1.onrender.com/api",
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
  review: {
    list: "/review",
    details: "/review/:id",
    create: "/review",
    delete: "/review/:id",
  },
  reviewRequest: {
    list: "/review-request",
    details: "/review-request/:id",
    create: "/review-request",
    update: "/review-request/:id",
    delete: "/review-request/:id",
  },
  radiologist: {
    add: "/radiologist",
    list: "/radiologist",
    details: "/radiologist/:id",
    update: "/radiologist/:id",
    delete: "/radiologist/:id",
  },
  notification: {
    list: "/notifications/user/:id",
    markAsRead: "/notifications/mark-as-read/:id",
  },
};
export default Endpoints;
