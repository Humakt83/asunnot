import React from 'react';

export default ({webAddress}) => {
  return (
    <iframe src={webAddress} title={webAddress}>
    </iframe>)
}