import axios from 'axios';
import superagent from 'superagent';
import { format } from 'date-fns';
import Swal from 'sweetalert2';

const API_URL = 'http://localhost:4000';

export const postRegister = async (data) => {
  try {
    const response = await fetch(`${API_URL}/users/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    return result;
  } catch (error) {
    console.error('Error during registration:', error);
    throw error;
  }
};
