const URI = import.meta.env.VITE_BACKEND_URI;
const token = localStorage.getItem('token');

export async function addOrRemoveFavoriteImage() {
  try {
    const response = await fetch(`${URI}/favourite/handlefavourite`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();

    if (response.status == 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getFavoriteImages() {
  try {
    const response = await fetch(`${URI}/favourite/handlefavourite`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();

    if (response.status == 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
}
