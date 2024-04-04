import React, { useState, useMemo } from 'react';
// You have been given a list of items you shopped from the grocery store
// You need to calculate the total amount of money you spent

export const Assignment3 = () => {
    const [items, setItems] = useState([
        { name: 'Chocolates', value: 10 },
        { name: 'Chips', value: 20 },
        { name: 'Onion', value: 30 },
        { name: 'Tomato', value: 30 },
        // Add more items as needed
    ]);
    const [count, setCount] = useState(0);
    // Your code starts here
    const totalValue = useMemo(()=>{
        console.log("inside")
        let tempValue = 0
        items.map((item)=>{tempValue += item.value});
        return tempValue
    }, [items])
    
    // Your code ends here
    return (
        <div>
            <ul>
                {items.map((item, index) => (
                    <li key={index}>{item.name} - Price: ${item.value}</li>
                ))}
            </ul>
            <p>Total Value: {totalValue}</p>
            <button onClick={()=>{setCount(count + 1)}}>{count}</button>
            <button onClick={()=>{setItems((items)=>{return [...items,{name:"blah", value: 60}]})}}>Add Item</button>
        </div>
    );
};
