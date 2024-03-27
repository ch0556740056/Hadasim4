import axios from 'axios';

import instance from './instance';

export default {
 
  deleteVaccination: async (id) => {
    try {
      const result = await instance.delete(`/vaccinations/${id}`);
      console.log('deleteVaccination');
      return result;
    } catch (error) {
      console.error('Error in deleteVaccination:', error);
      throw error;
    }
  },
  addVaccination:async(vaccination)=>{
    try {
      console.log(vaccination);
      const result = await instance.post(`/vaccinations`, vaccination);
      console.log('add vaccinations');
      return result;
    } catch (error) {
      console.error('Error in addVaccination:', error);
      throw error;
    }
  },
  getVaccination: async (id) => {
    try {
      const result = await instance.get(`/vaccinations/${id}`);
      console.log('get Vaccination by TZ');
      return result;
    } catch (error) {
      console.error('Error in getVaccination:', error);
      throw error;
    }
  },
  setVaccination: async (id, User) => {
    try {
      console.log('setUser', { id, User });
      const result = await instance.put(`/vaccinations/${id}`, { User });
      return result;
    } catch (error) {
      console.error('Error in setVaccination:', error);
      throw error;
    }
  },

};