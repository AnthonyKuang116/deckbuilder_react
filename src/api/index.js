import axios from 'axios';

export async function fetchCards({ name, text } ={}) {
    let URL = `https://api.magicthegathering.io/v1/cards?`
  try {
      if(name){
          URL += `name=${ name }&`;
      }
      if(text){
          URL += `text=${ text }`;
      }
    const { data } = await axios.get(URL);

    return data.cards || [];
  } catch (error) {
    throw error;
  }
}