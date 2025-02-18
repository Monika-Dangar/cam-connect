import '../../css/gallery/gallery.css';
import ImageCard from './ImageCard';
import AnchorTemporaryDrawer from '../drawer/Drawer';

const Gallery = () => {
  return (
    <>
      <main className="mainContainer ">
      <AnchorTemporaryDrawer />
        <div className="imgCardContainer">
          <ImageCard />
          <ImageCard />
          <ImageCard />
          <ImageCard />
        </div>
      </main>
    </>
  );
};

export default Gallery;
