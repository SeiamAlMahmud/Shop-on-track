import React from 'react';

const Container = ({ children }) => {
  return (
    <div className="flex flex-col mx-auto max-w-screen-lg ">
      {children}
    </div>
  );
};

export default Container;
