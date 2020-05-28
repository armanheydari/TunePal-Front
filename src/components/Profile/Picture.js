import React from 'react';
import { Carousel } from 'antd';

class Picture extends React.Component {
    render() {
        return (
            <div className="Profile_picture">
                <Carousel>
                   {
                       this.props.images.map(image => {
                           return (
                               <div key={image.id} >
                                   <img alt="" src={image.image} />
                               </div>
                           );
                       })
                   } 
                </Carousel>
            </div>
        );
    }
}

export default Picture;