import UserListCard from "./UserListCard";

const ApprovedRequest = ({ type, groupData, setDeviceApprovedData }) => {
  return (
    <>
      {groupData.length > 0 ? (
        groupData.map((data) => {
          return (
            <UserListCard
              key={data.requester._id}
              type={type}
              requester={data.requester}
              devices={data.devices}
              setDeviceData={setDeviceApprovedData}
            />
          );
        })
      ) : (
        <p>No device data found</p>
      )}
    </>
  );
};

export default ApprovedRequest;
