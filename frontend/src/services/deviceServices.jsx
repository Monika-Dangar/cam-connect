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

    if (response) {
      // console.log(response);
      return response;
    }
  } catch (error) {
    console.log("Error in creating device: " + error);
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
      console.log(data);
      return data;
    }
  } catch (error) {
    console.log("Error in displaying devices: " + error);
  }
}

export async function editDevice(deviceId, data) {
  try {
    const response = await fetch(`${URI}/device/edit/${deviceId}`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json", // Ensure this header is set to 'application/json'
      },
      body: JSON.stringify(data),
    });

    if (response) {
      // console.log(response);
      return "Device edited successfully";
    }
  } catch (error) {
    console.log("Error in editing device: " + error);
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
      return "Deleted successfully";
    }
  } catch (error) {
    console.log("Error in removing device: " + error);
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
    console.log("accessId", accessId);
    console.log(response);
    if (response) {
      console.log(response);
      return response;
    }
    deleteSharedDevice;
  } catch (error) {
    console.log("Error in removing device access to other: " + error);
  }
}
