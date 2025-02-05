const URI = import.meta.env.VITE_BACKEND_URI;
const token = localStorage.getItem("token");

export async function createDevice(data) {
  try {
    const response = await fetch(`${URI}/device/create`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();
    if (response) {
      return res;
    }
  } catch (error) {
    throw new Error(`Not able to create. Please try again later.`);
  }
}

export async function displayDevice() {
  try {
    const response = await fetch(`${URI}/device/read`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await response.json();

    if (data) {
      return data;
    }
  } catch (error) {
    throw new Error(`Error fetching devices`);
  }
}

export async function editDevice(deviceId, data) {
  try {
    const response = await fetch(`${URI}/device/edit/${deviceId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const res = await response.json();

    if (res) {
      return res.message;
    }
  } catch (error) {
    throw new Error(`No able to update. Please try again later.`);
  }
}

export async function removeDevice(deviceId) {
  try {
    const response = await fetch(`${URI}/device/delete/${deviceId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response.status === 200) {
      return await response.json();
    }
  } catch (error) {
    throw new Error(`Failed to delete the device. Please try again later.`);
  }
}

export async function removeAccessToDevice(accessId) {
  try {
    const response = await fetch(
      `${URI}/device/deleteSharedDevice/${accessId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (response.ok) {
      return response;
    }
  } catch (error) {
    throw new Error("Failed to delete the device. Please try again later.");
  }
}
