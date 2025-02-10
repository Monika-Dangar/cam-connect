import UserListCard from "./UserListCard";

const ApprovedRequest = ({
  handleModal,
  approvedDeviceData,
  type,
  response,
  setDeviceData,
}) => {
  return (
    <>
      {/* i will map this*/}
      {approvedDeviceData.length > 0 ? (
        approvedDeviceData.map((approveData) => {
          return (
            <UserListCard
              key={approveData._id}
              type={type}
              handleModal={handleModal}
              deviceData={approveData}
              response={response}
              setDeviceData={setDeviceData}
            />
          );
        })
      ) : (
        <p>No Device data is approved</p>
      )}
    </>
  );
};

export default ApprovedRequest;
