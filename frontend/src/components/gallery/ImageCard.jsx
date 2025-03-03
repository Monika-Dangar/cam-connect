import '../../css/gallery/imageCard.css';
import React, { useState } from 'react';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import {
  addOrRemoveFavoriteImage,
  addTagToImage,
  getTagsOfImage,
  removeTag,
} from '../../services/galleryServices';

const ImageCard = ({ imgDetails, type, favDetails, setFetchAgain }) => {
  const [tagMessage, setTagMessage] = useState('');
  const [imageModal, setImageModal] = useState(false);
  const [tagModal, setTagModal] = useState(false);
  const [displayTags, setDisplayTags] = useState([]);

  const handleAddOrRemoveFav = async (imageId, deviceId) => {
    const response = await addOrRemoveFavoriteImage(imageId, deviceId);
    if (response) {
      //   console.log(response);
    }
    setFetchAgain((prev) => !prev);
  };

  const handleAddTag = async (e, imageId) => {
    e.preventDefault();
    const response = await addTagToImage(imageId, tagMessage);
    setTagMessage('');
  };

  const handleGetTagOfImageByID = async (imageId) => {
    const response = await getTagsOfImage(imageId);
    if (response.response) {
      //   console.log(response);
      setDisplayTags(response.response);
    }
    setTagModal((prev) => !prev);
  };

  const handleRemoveTag = async (tagId) => {
    const response = await removeTag(tagId);
    setTagModal(false);
  };
  return (
    <>
      {type == 'AllImages' ? (
        <div className="imageCard">
          <div className="imageContainer">
            <button className="imageButton" onClick={() => setImageModal(true)}>
              <img className="image" src={imgDetails?.imagePath} alt={imgDetails?.format} />
            </button>
            <div className="imageOverlay">
              <div className="imageDeviceContainer">
                <p className="imageDeviceName">{imgDetails.deviceId.deviceName}</p>
                <p className="imageDeviceType">{imgDetails.deviceId.deviceType}</p>
              </div>

              <div className="imageTimeContainer">
                <p className="imageDate">{imgDetails?.createdAt.slice(0, 16)}</p>
                <p className="imageTime">{imgDetails?.createdAt.slice(17, 25)}</p>
              </div>
            </div>
          </div>
          <div className="addTag">
            <div className="addTagContainer">
              <input
                type="text"
                value={tagMessage}
                onChange={(e) => setTagMessage(e.target.value)}
                placeholder="Add tag..."
                className="addTagInput"
              />
              <AddIcon onClick={(e) => handleAddTag(e, imgDetails._id)} className="addIcon" />
            </div>

            <button onClick={() => handleGetTagOfImageByID(imgDetails._id)} className="showTagsBtn">
              Show tags
            </button>

            <button onClick={() => handleAddOrRemoveFav(imgDetails._id, imgDetails.deviceId._id)}>
              {favDetails.some((fav) => fav.imageId._id === imgDetails._id) ? (
                <BookmarkIcon className="favIcon" />
              ) : (
                <BookmarkBorderIcon className="favIcon" />
              )}
            </button>
          </div>
        </div>
      ) : (
        <div className="imageCard">
          <div className="imageContainer">
            <img
              className="image"
              src={imgDetails?.imageId.imagePath}
              alt={imgDetails.imageId.format}
            />
            <div className="imageOverlay">
              <div className="imageDeviceContainer">
                <p className="imageDeviceName">{imgDetails?.deviceId?.deviceName}</p>
                <p className="imageDeviceType">{imgDetails?.deviceId?.deviceType}</p>
              </div>

              <div className="imageTimeContainer">
                <p className="imageDate">{imgDetails?.createdAt.slice(0, 16)}</p>
                <p className="imageTime">{imgDetails?.createdAt.slice(17, 25)}</p>
              </div>
            </div>
          </div>
          <div className="addTag">
            <div className="addTagContainer">
              <AddIcon />
              <input type="text" placeholder="Add tag..." className="addTagInput" />
            </div>
            <button onClick={() => handleAddOrRemoveFav(imgDetails._id)}>
              <BookmarkIcon className="favIcon" />
            </button>
          </div>
        </div>
      )}

      {imageModal && (
        <div className="modal">
          <div className="modalContent">
            <button className="closeBtn" onClick={() => setImageModal(false)}>
              <CloseIcon />
            </button>
            <h2>Image Details</h2>
            <img src={imgDetails?.imagePath} alt={imgDetails?.format} />
            <p className="deviceDetail1">Device Name: {imgDetails.deviceId.deviceName}</p>
            <p className="deviceDetail2">Device Type: {imgDetails.deviceId.deviceType}</p>
            <p>Created At: {imgDetails?.createdAt}</p>
            <span>Tags: </span>
            {displayTags.length && displayTags.length > 0 ? (
              displayTags.map((tag) => <span key={tag._id}>{tag.tag}, </span>)
            ) : (
              <span>No tags</span>
            )}
          </div>
        </div>
      )}

      {tagModal && (
        <div className="modal">
          <div className="modalContent">
            <button className="closeBtn" onClick={() => setTagModal(false)}>
              <CloseIcon />
            </button>
            <span>Tags: </span>
            {displayTags.length && displayTags.length > 0 ? (
              displayTags.map((tag) => (
                <>
                  <span key={tag._id} className="tagStyle">
                    {tag.tag}
                  </span>
                  <button onClick={() => handleRemoveTag(tag._id)} className="closeTagIcon">
                    <CloseIcon />
                  </button>
                </>
              ))
            ) : (
              <span>No tags</span>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default ImageCard;
