import UserListCard from "./UserListCard";

const Notifications = ({ type, groupData }) => {
  return (
    <>
      <>
        {/* i will map this */}
        {groupData.length > 0 ? (
          groupData.map((data) => {
            return (
              <UserListCard
                key={data.requester._id}
                type={type}
                requester={data.requester}
                devices={data.devices}
              />
            );
          })
        ) : (
          <p>No device data found</p>
        )}
      </>
    </>
  );
};

export default Notifications;
