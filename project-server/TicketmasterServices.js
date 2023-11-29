// TicketmasterService.js
const { TICKET_MASTER_API_KEY, TICKET_MASTER_API_SECRET } = require("./config");
import axios from 'axios';

const API_KEY = TICKET_MASTER_API_KEY;
const BASE_URL = 'https://app.ticketmaster.com/discovery/v2/';

const query = "concert";

const TicketmasterService = {
  searchEvents: async () => {
    try {
      const response = await axios.get(`${BASE_URL}events.json`, {
        params: {
          apikey: API_KEY,
          keyword: query,
        },
      });

      return response.data._embedded.events;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },
};

export default TicketmasterService;
