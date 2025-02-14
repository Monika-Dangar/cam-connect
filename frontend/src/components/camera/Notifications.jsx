import UserListCard from "./UserListCard";
import emptyImg from "../../assets/empty.png";
import { Typography } from "@mui/material";

const Notifications = ({ type, groupData, setDeviceDeniedData, fetch }) => {
  return (
    <>
      <>
        {groupData.length > 0 ? (
          groupData.map((data) => {
            return (
              <UserListCard
                key={data.requester._id}
                type={type}
                requester={data.requester}
                devices={data.devices}
                setDeviceData={setDeviceDeniedData}
                fetch={fetch}
              />
            );
          })
        ) : (
          <>
            <img src={emptyImg} className="emptyImage"></img>

            <Typography
              variant="h6"
              className="emptyText"
              sx={{ ml: 22, mt: 5 }}
            >
              No alert for access denied
            </Typography>
          </>
        )}
      </>
    </>
  );
};

export default Notifications;
