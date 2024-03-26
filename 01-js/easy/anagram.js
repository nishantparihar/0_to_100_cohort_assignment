/*
  Write a function `isAnagram` which takes 2 parameters and returns true/false if those are anagrams or not.
  What's Anagram?
  - A word, phrase, or name formed by rearranging the letters of another, such as spar, formed from rasp.
*/

function isAnagram(str1, str2) {

  str1 = str1.toLowerCase();
  str2 = str2.toLowerCase();

  let letters = {};

  for(let i = 0; i < str1.length; i++){
      if(letters.hasOwnProperty(str1[i]))
          letters[str1[i]] += 1;
      else
          letters[str1[i]] = 1;
      
  }   
  console.log(letters)

  for(let i = 0; i < str2.length; i++){
    if(letters.hasOwnProperty(str2[i]) && letters[str2[i]]!==0)
       letters[str2[i]] -= 1;
    else
         return false;
    
}

  for(let key in letters)
       if(letters[key] > 0) return false

  return true;

}

module.exports = isAnagram;
