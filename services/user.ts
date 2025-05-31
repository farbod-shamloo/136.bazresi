import api from "@/utils/axios";

export const getCurrentUsers = () => {
  return new Promise((resolve, reject) => {
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

export const getCaptcha = () => {
  return new Promise((resolve, reject) => {
    api
      .get("/Authenticate/CreateExternalCaptcha")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error("Captcha API Error:", err);
        reject(err);
      });
  });
};

export const createCaptcha = () => {
  return new Promise((resolve, reject) => {
    api
      .get("/Authenticate/CreateCaptcha")
      .then((res) => {
        resolve(res.data);
      })
      .catch((err) => {
        console.error("Captcha API Error:", err);
        reject(err);
      });
  });
};

export const generateExternalUserRegisterOTPWithCaptcha = (formData) => {
  return new Promise((resolve, reject) => {
    api
      .post(
        "/Register/GenerateExternalUserRegisterOTPWithCaptcha",
        formData,
        // {
        //   headers: { accept: "*/*" },
        // }
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.error("Register OTP API Error:", error);
        reject(error);
      });
  });
};


export const LoginWithExternalCaptcha = (formData) => {
  return new Promise((resolve, reject) => {
    api
      .post(
        "/Authenticate/LoginWithExternalCaptcha",
        formData,
      )
      .then((res) => {
        resolve(res.data);
      })
      .catch((error) => {
        console.error("Register OTP API Error:", error);
        reject(error);
      });
  });
};
