import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import axios from 'axios';

export const useZohoStore = defineStore('zoho', () => {
  const zohoInitialized = ref(false);
  const contacts = ref([]);
  
  // Load access token from localStorage, if it exists
  const access_token = ref(localStorage.getItem('zoho_access_token') || null);
  
  const refresh_token = import.meta.env.VITE_REFRESH_TOKEN;
  const client_id = import.meta.env.VITE_CLIENT_ID;
  const secret_id = import.meta.env.VITE_SECRET_ID;
  
  // Computed property to keep access_token in sync with localStorage
  const syncedAccessToken = computed({
    get() {
      return access_token.value;
    },
    set(value) {
      access_token.value = value;
      if (value) {
        localStorage.setItem('zoho_access_token', value);
      } else {
        localStorage.removeItem('zoho_access_token');
      }
    }
  });
  
  // Method to refresh the access token
  const refreshAccesstoken = async () => {
    try {
      const data = new URLSearchParams();
      data.append('refresh_token', refresh_token);
      data.append('client_id', client_id);
      data.append('client_secret', secret_id);
      data.append('grant_type', 'refresh_token');

      const response = await axios.post('https://accounts.zoho.com/oauth/v2/token', data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      syncedAccessToken.value = response.data.access_token; // Update the token and sync with localStorage
      console.log('Access token refreshed:', syncedAccessToken.value);
    } catch (error) {
      console.error('Error refreshing access token:', error);
      throw new Error('Failed to refresh access token');
    }
  };

  // Method to fetch contacts from Zoho
  const fetchContact = async (q='',retryCount = 0) => {
    try {
      // Ensure the access token is available
      if (!syncedAccessToken.value) {
        await refreshAccesstoken();
      }

      const response = await axios.get('https://www.zohoapis.com/crm/v2/Contacts?email='+q+'&first_name='+q, {
        headers: {
          Authorization: `Zoho-oauthtoken ${syncedAccessToken.value}`,
        },
      });

      contacts.value = response.data.data;
      console.log('Contacts fetched:', contacts.value);
    } catch (error) {
      console.error('Error fetching contacts:', error);

      // Handle token expiration and refresh it if necessary
      if (error.response && error.response.status === 401 && retryCount < 3) {
        console.log(`Retrying... (${retryCount + 1}/3)`);
        await refreshAccesstoken();
        await fetchContact(retryCount + 1);
      } else if (retryCount >= 3) {
        console.error('Max retry attempts reached. Unable to fetch contacts.');
        throw new Error('Max retry attempts reached.');
      }
    }
  };

  const createContact = async (contactData, retryCount = 0) => {
    try {
        // Ensure the access token is available
        if (!syncedAccessToken.value) {
            await refreshAccesstoken();
        }

        const response = await axios.post('https://www.zohoapis.com/crm/v2/Contacts', 
          contactData, {
            headers: {
                Authorization: `Zoho-oauthtoken ${syncedAccessToken.value}`,
                'Content-Type': 'application/json'
            },
        });
        
        return response.data.data;
    } catch (error) {
        if (error.response && error.response.status === 401 && retryCount < 3) {
            console.log(`Retrying... (${retryCount + 1}/3)`);
            await refreshAccesstoken();
            return await createContact(contactData, retryCount + 1);
        } else if (retryCount >= 3) {
            throw new Error('Max retry attempts reached.');
        } else {
            //throw error;
        }
    }
};

  return {
    zohoInitialized,
    contacts,
    access_token: syncedAccessToken, // Use the synced token
    refreshAccesstoken,
    fetchContact,
    createContact
  };
});
