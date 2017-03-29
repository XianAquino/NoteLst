import React, {PropTypes} from 'react';

const Avatar = ({id, image}) => {
  const defaultImg = 'http://res.cloudinary.com/de7lidb1d/image/upload/c_crop,w_443/v1488676774/users/style_icons_product_human_best_do1.png';
  return(
    <div>
      <img src={image} alt='avatar'/>
      <form method='post'
        encType='multipart/form-data'
        action={`/api/users/${id}/changeAvatar`}>
        <input type='file' name='image'/>
        <input type='submit' value='upload'/>
      </form>
    </div>
  );
};

Avatar.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string
};

export default Avatar;
