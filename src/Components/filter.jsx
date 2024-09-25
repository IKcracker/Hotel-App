import React, { useState } from 'react';

const Filter = ({ onFilter }) => {
    const [category, setCategory] = useState("");
    const [priceRange, setPriceRange] = useState([0, 10000]);
    const [size, setSize] = useState("");

    const handleFilter = () => {
        onFilter({ category, priceRange, size });
    };

    return (
        <div className="filter">
            <select value={category} onChange={(e) => setCategory(e.target.value)}>
                <option value="">All Categories</option>
                <option value="Deluxe">Deluxe</option>
                <option value="Luxury">Luxury</option>
                <option value="General">General</option>
            </select>
            <input 
                type="range" 
                min="0" 
                max="10000" 
                value={priceRange[1]} 
                onChange={(e) => setPriceRange([0, e.target.value])} 
            />
            <input 
                type="text" 
                placeholder="Size" 
                value={size} 
                onChange={(e) => setSize(e.target.value)} 
            />
            <button onClick={handleFilter}>Filter</button>
        </div>
    );
};

export default Filter;
