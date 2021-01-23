import axios from 'axios';
const KEY = 'AIzaSyBOBI3Sfrn0awpb-p5AGVHv-dyiTg3Z1Dw';

export default axios.create({
    baseURL: 'https://www.googleapis.com/youtube/v3',
    params: {
        part: 'snippet',
        maxResults: 6,
        key: KEY
    }
})