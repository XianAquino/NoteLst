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
    const {disableUpload, invalidImg, uploadImg} = this.state;
    const invalidImgWarning = invalidImg ? <span className='warning-msg'>Invalid image file</span> : null;
    return(
      <div className='avatar-settings col-xs-12 col-sm-4 col-md-4 col-lg-4'>
        <img src={image || defaultImg} alt='avatar'/>
        <form method='post'
          encType='multipart/form-data'
          action={`/api/users/${id}/changeAvatar`}>
          <input
            className='upload-file'
            value={uploadImg}
            placeholder='No file selected'
            disabled='disabled'
          />
          {invalidImgWarning}
          <div className='input-file'>
              <input
                type='file'
                onChange={this.handleImage}
                className='upload'
                name='image'
              />
              <span>Choose File</span>
          </div>
          <input
            className={ `upload-btn ${disableUpload ? 'disable-upload' : null}`}
            type='submit'
            value='Upload'
            disabled={disableUpload}
          />
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
