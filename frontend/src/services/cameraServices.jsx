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
const acceptRequests = async (deviceId, requesterId) => {
  const response = await fetch(`${URI}/camera/pendingRequest`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ deviceId, requesterId }),
  });
  const res = await response.json();
  return res;
};
export default { getApprovedDevice, getPendingDevice, acceptRequests };
