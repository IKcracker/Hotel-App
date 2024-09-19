import { uploadBytes, getDownloadURL, ref } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { db2 } from '../Firebase/config';
import { useDispatch } from 'react-redux';
import { createRooms } from '../Redux/roomSlice';
import { getRoom } from '../Database/rooms';

function AddRoom({ target,rooms }) {
  const [inputs, setInputs] = useState({img:[] , adult: 1 , children:1 , price:1000,category:'deluxe',size:'single'});
  const [loading, setLoading] = useState(false);
  const [zoom, setZoom] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    inputs.img.length > 0 && setZoom(inputs.img[0]);
  }, [inputs.img]);
 
  useEffect(() => {
    if (target?.id && rooms.update) {
      (async () => {
        const res = await getRoom(target.category, target.id);
        delete res['rating'];
        setInputs({ ...inputs, ...res });
      })();
    }
    else{
        setInputs(old => ({...old , img:[] , adult: 1 , children:1 , price:1000,category:'Deluxe',size:'Small'}))
    }
  }, [rooms]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);

    files.forEach(async (file) => {
      const colRef = ref(db2, 'images/' + file.name);
      try {
        setLoading(true);
        await uploadBytes(colRef, file);
        const image = await getDownloadURL(colRef);
        if (image) {
          setLoading(false);
          setInputs((prev) => ({
            ...prev,
            img: [...(prev.img || []), image],
          }));
        }
      } catch (error) {
        setLoading(false);
        console.log(error.message);
      }
    });
  };

  const handleChanges = (e) => {
    const { name, value } = e.target;
    setInputs((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createRooms({...inputs , status:"available"}));
    setInputs(old => ({...old , img:[] , adult: 1 , children:1 , price:1000,category:'Deluxe',size:'Dmall'}))
  };

  return (
    <div className="adding-box">
      <form onChange={handleChanges} onSubmit={handleSubmit}>
        <input type="file" multiple name="pic" onChange={handleImageUpload} />
        <div>
          <label htmlFor="adult">Adult:</label>
          <input type="number" name="adult" id="adult" value={inputs.adult} />
          <label htmlFor="children">Children:</label>
          <input
            type="number"
            name="children"
            id="children"
            value={inputs.children}
          />
        </div>
        <div>
          <label htmlFor="price">Price:</label>
          <input
            type="number"
            name="price"
            id="price"
            value={inputs.price}
          />
        </div>
        <select name="category" value={inputs.category}>
          <option value="Deluxe">Deluxe</option>
          <option value="Luxury">Luxury</option>
          <option value="Leneral">General</option>
        </select>
        <select name="size" value={inputs.size}>
          <option value="single">Single</option>
          <option value="double">Double</option>
        </select>
        <button className="btn">{target?.id ? 'Update' : 'Add'}</button>
      </form>

      {inputs.img.length > 0 && (
        <div className="image-box">
          <div>
            {zoom && <img src={zoom} alt="zoom" width="100%" height="200px" />}
            <div className="img-box">
              {inputs.img.map((imgUrl, index) =>
                !loading ? (
                  <img
                    src={imgUrl}
                    alt="room"
                    width="100px"
                    key={index}
                    onClick={() => setZoom(imgUrl)}
                  />
                ) : (
                  <p key={index}>Loading...</p>
                )
              )}
            </div>
            <h4>{inputs.category}</h4>
            <h5>{inputs.size}</h5>
            <div className="visitors">
              <p>
                Adult: <h3>{inputs.adult}</h3>
              </p>
              <p>
                Children: <h3>{inputs.children}</h3>
              </p>
            </div>
            <h3>
              R<h1>{inputs.price}</h1>
            </h3>
          </div>
        </div>
      )}
    </div>
  );
}

export default AddRoom;
