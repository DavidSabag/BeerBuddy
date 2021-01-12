import axios from 'axios';

const baseURL = `https://api.punkapi.com/v2/beers`;

const getNextPage = pageNumber => getBeers(`${baseURL}?page=${pageNumber}&per_page=10`);

const getFoodPairing = foodName => getBeers(`${baseURL}?food=${foodName}`);

const getBeers = async (apiFormat) => {
    try{
        return await axios.get(apiFormat)
        
    }
    catch(err){
        return {
            status: err.response.data.statusCode,
            error: {
                errType: err.response.data.error,
                msg: err.response.data.message,
            }
        }
    }
}

const beerApi = {
    getNextPage,
    getFoodPairing,
}

export default beerApi