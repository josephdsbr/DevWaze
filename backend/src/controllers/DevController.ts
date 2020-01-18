import api from '../services/api';
import Dev from '../models/Dev';
import parseStringAsArray from '../utils/parseStringAsArray';

class DevController {
  index = async (request, response) => {
    const devs = await Dev.find();
    return response.json(devs);
  }

  store = async (request, response) => {
    const {github_username, techs, latitude, longitude} = request.body;

    let dev = await Dev.findOne({ github_username });

    if (dev) {
      return response.status(400).json({ error: 'Dev já registrado'})
    }

    const resAPI = await api.get(github_username);
    
    const { name = login, avatar_url, bio } = resAPI.data;
  
    const techsList = parseStringAsArray(techs);
    const location = {
      type: 'Point',
      coordinates: [longitude, latitude]
    }
  
    dev = await Dev.create({
      github_username,
      name,
      avatar_url,
      biography: bio,
      techs: techsList,
      location
    })
  
    return response.json(dev)
  }
}

export default new DevController();