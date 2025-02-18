const URI = import.meta.env.VITE_BACKEND_URI;
const token = localStorage.getItem("token");
const getApprovedDevice = async () => {
  try {
    const response = await fetch(`${URI}/camera/approvedRequest`, {
      method: "GET",
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
};
const getPendingDevice = async () => {
  try {
    const response = await fetch(`${URI}/camera/pendingRequest`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    if (response.status == 200) {
      return res;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};
const getDeniedDevice = async () => {
  try {
    const response = await fetch(`${URI}/camera/notificationBar`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    if (response.status == 200) {
      return res;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};
const acceptRequests = async (deviceId, requesterId) => {
  try {
    const response = await fetch(`${URI}/camera/pendingRequest`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ deviceId, requesterId }),
    });

    if (response.status === 200) {
      const res = await response.json();

      return res;
    } else {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};
const denyRequest = async (deviceId, requesterId) => {
  try {
    const response = await fetch(`${URI}/camera/denyAccess`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ deviceId, requesterId }),
    });
    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};
const seenDenied = async (deviceId) => {
  try {
    const response = await fetch(`${URI}/camera/notificationBar`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ deviceId }),
    });

    const res = await response.json();
    return res;
  } catch (error) {
    console.log(error);
  }
};
const searchUser = async (username) => {
  try {
    const response = await fetch(`${URI}/camera/searchBar/${username}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const res = await response.json();
    if (res) {
      return res;
    }
  } catch (error) {
    console.log(error);
  }
};
const handleRequestOnSearch = async (deviceId, ownerId) => {
  try {
    const response = await fetch(`${URI}/camera/searchBar`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ deviceId, ownerId }),
    });
    const res = await response.json();

    return res;
  } catch (error) {}
};
const handleRequestStatus = async (deviceId) => {
  const response = await fetch(`${URI}/camera/requestStatus`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ deviceId }),
  });
  const res = await response.json();
  if (response.status === 200) {
    return res;
  } else {
    return res;
  }
};
export default {
  getApprovedDevice,
  getPendingDevice,
  getDeniedDevice,
  acceptRequests,
  denyRequest,
  seenDenied,
  searchUser,
  handleRequestOnSearch,
  handleRequestStatus,
};
