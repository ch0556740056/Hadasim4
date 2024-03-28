
import instance from './instance';

export default {


  getDisease: async (id) => {
    try {
      const result = await instance.get(`/diseases/${id}`);
      return result;
    } catch (error) {
      console.error('Error in get diseases:', error);
      throw error;
    }
  },
  addDisease: async (disease) => {
    try {
      console.log(disease);
      const result = await instance.post(`/diseases`, disease);
      console.log('add disease');
      return result;
    } catch (error) {
      console.error('Error in addDisease:', error);
      throw error;
    }
  },
  deleteDisease: async (id) => {
    try {
      const result = await instance.delete(`/diseases/${id}`);
      return result;
    }
    catch (error) {
      console.error('Error in delete diseases:', error);
      throw error;
    }
  },
  setDisease: async (id, disease) => {
    try {
      let result = ""
      console.log((await instance.get(`/diseases/${id}`)).data.disease !== null);
      if ((await instance.get(`/diseases/${id}`)).data.disease !== null) {
        console.log("patch");
        result = await instance.patch(`/diseases/${id}`, { disease });
      }
      else {
        console.log("add");
        result = await instance.post(`/diseases`,  disease );
      }
      return result;
    } catch (error) {
      console.error('Error in setDiseases:', error);
      throw error;
    }
  }

};