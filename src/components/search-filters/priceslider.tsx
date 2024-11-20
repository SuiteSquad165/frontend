'use client';
import React, { useState } from 'react';
import { DualRangeSlider } from '@/components/shadcn-ui/dualrangeslider';
import SearchBarItemForm from '../hotel-search-bar/searchbaritemform';

const PriceSlider = () => {
  const [values, setValues] = useState([0, 100]);

  return (
    <div className="w-full flex-col">
        <input type="number" className='w-1/4 border-2' value="0"></input>
        <span> to </span>
        <input type="number" className='w-1/4 border-2' value="1000"></input>
        <br></br>
        <br></br>
        <br></br>
        <DualRangeSlider
        label={(value) => value}
        value={values}
        onValueChange={setValues}
        min={0}
        max={2000}
        step={1}
        />
    </div>
  );
};

export default PriceSlider;