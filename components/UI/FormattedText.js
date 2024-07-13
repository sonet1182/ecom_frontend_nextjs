import React from 'react';

const FormattedText = ({ data }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: data }} />
  );
};

export default FormattedText;
