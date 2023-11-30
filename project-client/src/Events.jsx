
import PropTypes from "prop-types";
import { getEvents } from "./api";
import { useEffect, useState } from "react";
import "./Events.css";

const Events = ({submissionInfo, vacationButton, setVacationButton, cityName}) => {
    const [events, setEvents] = useState([]); 
    const [loading, setLoading] = useState(true);
    function convertTo12HourFormat(time) {
        if (!time) {
            return "N/A"; 
        }
        const [hours, minutes] = time.split(':');
        const parsedTime = new Date(0, 0, 0, hours, minutes);
        const options = { hour: 'numeric', minute: 'numeric', hour12: true };
        return parsedTime.toLocaleTimeString('en-US', options);
      }
    useEffect(() => {
        setLoading(true);
        if (vacationButton) {
            setLoading(false);
            getEvents(cityName,
             submissionInfo.checkInDate+"T12:00:00Z", 
             submissionInfo.checkOutDate+"T12:00:00Z").then((events)=> {
                console.log('events: ', events);
                setEvents(events);
                setLoading(false);
             })
        } else {
            setLoading(false);
        }
    }, [vacationButton]);

    return (
        <div className="events-grid">
        {loading && <p>Loading events...</p>}
        {!loading && events.length === 0 && <h1>No events found for location or date</h1>}
        {!loading &&
          events.map((event) => (
            <div key={event.id} className="event-card">
              <h3>Name: {event.name}</h3>
              {event.images && event.images.length > 0 && (
                <img src={event.images[0].url} alt={`Event Image`} width={300} height={200} />
              )}
              {event.dates && event.dates.start && (
                <p>
                  Date and Time: {event.dates.start.localDate}{' '}
                  {convertTo12HourFormat(event.dates.start.localTime)}
                </p>
              )}
              {event.priceRanges && event.priceRanges.length > 0 && (
                <p>
                  Price Range: ${event.priceRanges[0].min} - ${event.priceRanges[0].max}
                </p>
              )}
              {event._embedded && event._embedded.venues && event._embedded.venues.length > 0 && (
                <div>
                  <p>Venue: {event._embedded.venues[0].name}</p>
                  <p>
                    Address: {event._embedded.venues[0].address.line1}, {event._embedded.venues[0].city.name},{' '}
                    {event._embedded.venues[0].country.name} {event._embedded.venues[0].postalCode}
                  </p>
                </div>
              )}
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                Event Link
              </a>
            </div>
          ))}
      </div>
    );
  };

Events.propTypes = {
    // selectedHotel: PropTypes.object.isRequired,
    // selectedFlight: PropTypes.object.isRequired,
    vacationButton: PropTypes.object.isRequired,
    setVacationButton: PropTypes.object.isRequired,
    submissionInfo: PropTypes.shape({
      origin: PropTypes.string.isRequired,
      destination: PropTypes.string.isRequired,
      budget: PropTypes.number.isRequired,
      checkInDate: PropTypes.string.isRequired,
      checkOutDate: PropTypes.string.isRequired,
      numOfTravelers: PropTypes.number.isRequired,
    }).isRequired,
  };

export default Events;
