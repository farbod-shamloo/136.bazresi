import api from "@/utils/axios";

export const getCurrentUsers = (): void => {
    new Promise((resolve, reject) => {
      api
        .get("/SSO/GetCurrentUser")
        .then((res) => {
          console.log(res.data);
          resolve(res.data);
        })
        .catch((err) => {
          console.error("API Error:", err);
          reject(err);
        });
    });
  };
  

  export const getCaptcha = async (): Promise<any> => {
    try {
      const res = await api.get("/Authenticate/CreateExternalCaptcha");
      return res.data;
    } catch (err) {
      console.error("Captcha API Error:", err);
      throw err;
    }
  };