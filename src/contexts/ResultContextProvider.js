import React, { createContext, useContext, useState } from 'react';

const ResultContext = createContext();
const baseUrl = 'https://google-search1.p.rapidapi.com/google-search'

export const ResultContextProvider = ({ children }) => {
  const [results, setResults] = useState([]);
  //const [isloading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState('Elon Musk');

  const getResults = async (type) => {
    //setIsLoading(true);

    const res = await fetch(`${baseUrl}${type}`, {
      method: 'GET',
      headers: {
        'X-RapidAPI-Host': 'google-search1.p.rapidapi.com',
        'X-RapidAPI-Key': '713de9134fmsha258b4008d46079p11b6f5jsnfaca51775668'
      },
    });

    const data = await res.json();
     console.log(data)
    if(type.includes('/news')){
      setResults(data.entries);
    } else if(type.includes('/images')){
      setResults(data.image_results);
    } else{
      setResults(data.results);
    }

    
    //setIsLoading(false);
  };

  return (
    <ResultContext.Provider value={{ getResults, results, searchTerm, setSearchTerm, }}>
      {children}
    </ResultContext.Provider>
  );
};

export const useResultContext = () => useContext(ResultContext);
