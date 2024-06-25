const Endpoints = {
  host: process.env.NEXT_PUBLIC_API_URL as string ,
  base: function(){return this.host + "/api"},
  auth: {
    list: "/auth",
    login: "/auth/login",
    changePassoword: "/auth/changepassword",
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
    assign: "/review-request/assign/:id",
    approve: "/review-request/approve/:id",
    delete: "/review-request/:id",
  },
  radiologist: {
    add: "/radiologist",
    list: "/radiologist",
    details: "/radiologist/:id",
    update: "/radiologist/:id",
    delete: "/radiologist/:id",
    activate: "/radiologist/activate/:id",
    deactivate: "/radiologist/deactivate/:id",
  },
  notification: {
    list: "/notifications/user/:id",
    markAsRead: "/notifications/mark-as-read/:id",
  },
  config: {
    get: "/config/:key",
    update: "/config",
  },
  dashboard:{
    totalReports: "/dashboard/total-reports",
    acceptedReports: "/dashboard/accepted-reports",
    rejectedReports: "/dashboard/rejected-reports",
    pendingReports: "/dashboard/pending-reports",
    averageSuccessScore: "/dashboard/average-success-score",
    averageFailureScore: "/dashboard/average-failure-score",
    leaderboard: "/dashboard/leader-board",
  },
};
export default Endpoints;
