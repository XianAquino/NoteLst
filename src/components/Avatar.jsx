import React, {Component, PropTypes} from 'react';

class Avatar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      uploadImg: '',
      invalidImg: false,
      disableUpload: true
    }
    this.handleImage = this.handleImage.bind(this);
  }

  handleImage(e) {
    this.setState({uploadImg: e.target.value}, () => {
      if (!this.validateImg(this.state.uploadImg)) {
        this.setState({invalidImg: true});
      } else {
        this.setState({
          disableUpload: false,
          invalidImg: false
        });
      }
    });
  }

  validateImg(image) {
    return Boolean(image.match(/.(jpg|jpeg|png|gif)$/i));
  }

  render() {
    const defaultImg = 'http://res.cloudinary.com/de7lidb1d/image/upload/c_crop,w_443/v1488676774/users/style_icons_product_human_best_do1.png';
    const {id, image} = this.props;
    const {disableUpload, invalidImg} = this.state;
    const invalidImgWarning = invalidImg ? <span>Ivalid image file</span> : null;
    return(
      <div>
        <img src={image} alt='avatar'/>
        <form method='post'
          encType='multipart/form-data'
          action={`/api/users/${id}/changeAvatar`}>
          <input onChange={this.handleImage} type='file' name='image'/>
          {invalidImgWarning}
          <input type='submit' value='upload' disabled={disableUpload}/>
        </form>
      </div>
    );
  }
};

Avatar.propTypes = {
  id: PropTypes.number,
  image: PropTypes.string
};

export default Avatar;
