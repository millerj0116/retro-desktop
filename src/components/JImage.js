import React from 'react';
const Jimage = ({src, alt, type, width, className}) => {
    const fullImg = (type && type === 'absolute') ? src : (type && type != 'icon') ? `${process.env.PUBLIC_URL}/img/${src}` : `${process.env.PUBLIC_URL}/img/icons/${src}`;
  return (
    <img className={(className) ? className : undefined} alt={alt} src={fullImg} draggable={false} width={(width) ? width : undefined} />
  );
};

export default Jimage;