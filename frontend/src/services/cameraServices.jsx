const URI = import.meta.env.VITE_BACKEND_URI;
const token = localStorage.getItem("token");
const getApprovedDevice = async () => {
  const response = await fetch(`${URI}/camera/approvedRequest`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await response.json();

  return res;
};
const getPendingDevice = async () => {
  const response = await fetch(`${URI}/camera/pendingRequest`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await response.json();
  return res;
};
const getDeniedDevice = async () => {
  const response = await fetch(`${URI}/camera/notificationBar`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await response.json();
  return res;
};
const acceptRequests = async (deviceId, requesterId) => {
  const response = await fetch(`${URI}/camera/pendingRequest`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ deviceId, requesterId }),
  });
  console.log(response);
  if (response.status === 200) {
    const res = await response.json();
    return res;
  } else {
    const res = await response.json();
    console.log(res);
    return res;
  }
};
const denyRequest = async (deviceId, requesterId) => {
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
};
const seenDenied = async (deviceId, requesterId) => {
  const response = await fetch(`${URI}/camera/notificationBar`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ deviceId, requesterId }),
  });
  const res = await response.json();
  return res;
};
const searchUser = async (username) => {
  const response = await fetch(`${URI}/camera/searchBar/${username}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const res = await response.json();
  console.log(res);
  if (res) {
    return res;
  }
};
const handleRequestOnSearch = async (deviceId, ownerId) => {
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
};
