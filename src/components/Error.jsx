import React from 'react';
import { BiError } from 'react-icons/bi';

const Error = ({ title = 'Something went wrong. Please try again.' }) => (
  <div className="w-full flex flex-col justify-center items-center text-center bg-red-500/10 p-6 rounded-lg border border-red-400 mt-10">
    <BiError size={50} className="text-red-400 mb-2" />
    <h1 className="font-bold text-xl text-white">{title}</h1>
  </div>
);

export default Error;
