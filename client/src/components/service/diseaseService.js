import axios from 'axios';

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
  addDisease:async(disease)=>{
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
  // setUser: async (id, User) => {
  //   try {
  //     console.log('setUser', { id, User });
  //     const result = await instance.put(`/users/${id}`, { User });
  //     return result;
  //   } catch (error) {
  //     console.error('Error in setUser:', error);
  //     throw error;
  //   }
  // },

  deleteDisease: async (id) => {
    try {
      const result = await instance.delete(`/diseases/${id}`);
      return result;
    } 
    catch (error) {
      console.error('Error in delete diseases:', error);
      throw error;
    }
  }
};