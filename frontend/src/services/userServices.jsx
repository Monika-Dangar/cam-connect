const URI = import.meta.env.VITE_BACKEND_URI;

export async function userLogin(postData) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${URI}/user/login`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();

    if (response.status === 200 && data.token) {
      console.log(data.token, "user services");
      localStorage.setItem("token", data.token);
      return {
        success: true,
        data: data,
      };
    } else {
      return {
        success: false,
        data: data,
      };
    }
  } catch (error) {
    throw new Error("Error occur during login. Please try again later.");
  }
}

export async function userSignup(postData) {
  try {
    const token = localStorage.getItem("token");

    const response = await fetch(`${URI}/user/signup`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();

    if (response.status == 201) {
      return {
        success: true,
        data: data,
      };
    } else {
      return {
        success: false,
        data: data,
      };
    }
  } catch (error) {
    throw new Error(`Error occur during signup. Please try again later.`);
  }
}
