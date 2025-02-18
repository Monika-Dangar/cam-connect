import '../../css/gallery/gallery.css';
import ImageCard from './ImageCard';
import AnchorTemporaryDrawer from '../drawer/Drawer';

const Gallery = () => {
  return (
    <>
      <AnchorTemporaryDrawer />
      <div className="imgCardContainer">
        <ImageCard />
        <ImageCard />
        <ImageCard />
        <ImageCard />
      </div>
    </>
  );
};

export default Gallery;
