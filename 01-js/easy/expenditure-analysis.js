/*
  Implement a function `calculateTotalSpentByCategory` which takes a list of transactions as parameter
  and return a list of objects where each object is unique category-wise and has total price spent as its value.
  transactions is an array where each
  Transaction - an object like 
  {
		id: 1,
		timestamp: 1656076800000,
		price: 10,
		category: 'Food',
		itemName: 'Pizza',
	}
  Output - [{ category: 'Food', totalSpent: 10 }] // Can have multiple categories, only one example is mentioned here
*/

function calculateTotalSpentByCategory(transactions) {
    spentByCat = [];

    for(let i = 0; i < transactions.length; i++){
      let tempObj = transactions[i];
      let tempCategory = tempObj["category"];
      let tempPrice = tempObj["price"];
      let found = false;
      for (let obj of spentByCat) {
        if (obj["category"] === tempCategory) {
          obj["totalSpent"] += tempPrice;
          found = true;
          break;
        }
      }

      if(found === false){
          tempSpentObj = {category: tempCategory, totalSpent: tempPrice};
          spentByCat.push(tempSpentObj);
      }

    }

  return spentByCat;
}

module.exports = calculateTotalSpentByCategory;
