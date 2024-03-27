import axios from 'axios';

import instance from './instance';

export default {
  getAllUsers: async () => {
    try {
      const result = await instance.get(`/users`);
      // console.log(result.data.users);
      return result.data.users;
    } catch (error) {
      console.error('Error in getUser:', error);
      throw error;
    }
  },
  addUser:async(user)=>{
    try {
      console.log(user);
      const result = await instance.post(`/users`, user);
      console.log('add user');
      return result;
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  },
  deleteUser: async (id) => {
    try {
      const result = await instance.delete(`/users/${id}`);
      console.log('deleteUser');
      return result;
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  },
  getUser: async (id) => {
    try {
      const result = await instance.get(`/users/${id}`);
      console.log('get user by TZ');
      return result;
    } catch (error) {
      console.error('Error in deleteUser:', error);
      throw error;
    }
  },
  setUser: async (id, User) => {
    try {
      console.log('setUser', { id, User });
      const result = await instance.put(`/users/${id}`, { User });
      return result;
    } catch (error) {
      console.error('Error in setUser:', error);
      throw error;
    }
  }
};