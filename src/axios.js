import axios from "axios";

const instance = axios.create({
  baseURL: 'https://api-hizxdoa2fa-uc.a.run.app'  // The API (cloud function) URL
        // http://127.0.0.1:5001/clone-f93da/us-central1/api
});

export default instance;
