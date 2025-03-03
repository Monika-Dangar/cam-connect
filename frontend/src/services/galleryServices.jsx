const URI = import.meta.env.VITE_BACKEND_URI;
const token = localStorage.getItem('token');

export async function addOrRemoveFavoriteImage(imageId, deviceId) {
  try {
    console.log(`imageID: ${imageId}`);

    const response = await fetch(`${URI}/favourite/handlefavourite`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageId, deviceId }),
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

export async function getAllImages(tag, deviceIds, startDate, endDate, cursor) {
  try {
    const response = await fetch(`${URI}/gallery/filteredImages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tag, deviceIds, startDate, endDate, cursor }),
    });
    const res = await response.json();

    if (response.status == 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function addTagToImage(imageId, tag) {
  try {
    const response = await fetch(`${URI}/tag/handleTag`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageId, tag }),
    });
    const res = await response.json();

    if (response.status == 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getTagsOfImage(imageId) {
  try {
    const response = await fetch(`${URI}/tag/tagOfParticularImage`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ imageId }),
    });
    const res = await response.json();

    if (response.status == 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAllTags() {
  try {
    const response = await fetch(`${URI}/tag/allTags`, {
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

export async function removeTag(tagId) {
  try {
    const response = await fetch(`${URI}/tag/handleTag`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tagId }),
    });
    const res = await response.json();

    if (response.status == 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
}

export async function getAllDevices() {
  try {
    const response = await fetch(`${URI}/device/read`, {
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

export async function filterImages(tag, deviceIds, startDate, endDate) {
  try {
    const response = await fetch(`${URI}/gallery/filteredImages`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ tag, deviceIds, startDate, endDate }),
    });
    const res = await response.json();

    console.log(res);
    if (response.status == 200) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
}
