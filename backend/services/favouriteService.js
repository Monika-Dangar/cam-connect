const favouriteRepo = require("../repository/favouriteRepo");
const messages = require("../utils/constants").default;
const handleFavourite = async (data) => {
  const alreadyExists = await favouriteRepo.findImageExists(data.imageId);
  if (alreadyExists.length !== 0) {
    const response = await favouriteRepo.removeFromFavourite(data.imageId);
    return {
      response,
      message: messages.favourite.unmarkAsFavourite,
    };
  } else {
    const response = await favouriteRepo.addToFavourite(data);
    return {
      response,
      message: messages.favourite.markAsFavourite,
    };
  }
};
const getFavourite = async (userId) => {
  const response = await favouriteRepo.getFavourite(userId);
  if (response.length !== 0) {
    return Object.values(
      response.reduce((acc, curr) => {
        if (curr && !acc[curr._id]) {
          const formattedCurr = {
            ...curr,
            createdAt: curr.createdAt.toUTCString(),
            updatedAt: curr.updatedAt.toUTCString(),
          };
          acc[curr._id] = formattedCurr;
        }
        return acc;
      }, {})
    );
  } else {
    return null;
  }
};
module.exports = {
  handleFavourite,
  getFavourite,
};
