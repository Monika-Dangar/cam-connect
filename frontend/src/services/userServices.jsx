const URI = import.meta.env.VITE_BACKEND_URI;
const token = localStorage.getItem('token');

export async function userLogin(postData) {
  try {
    const response = await fetch(`${URI}/user/login`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();

    if (response.status === 200 && data.token) {
      localStorage.setItem('token', data.token);
      return data;
    }
  } catch (error) {
    throw new Error('Error occur during login. Please try again later.');
  }
}

export async function userSignup(postData) {
  try {
    const response = await fetch(`${URI}/user/signup`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(postData),
    });

    const data = await response.json();

    if (response.status == 201) {
      return data;
    }
  } catch (error) {
    throw new Error(`Error occur during signup. Please try again later.`);
  }
}
