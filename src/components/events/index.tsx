import React, {useState, useEffect} from 'react';
import api from '../../shared/api';
import {IContact} from '../../shared/interfaces';

type Props = {

}

const Events: React.ComponentType<Props> = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [events, setEvents] = useState<IContact[]>([]);

    useEffect(() => {
		async function initEvents() {
            setIsRequesting(true)
            const {data: events} = await api.get('/events')
			setIsRequesting(false)
            setIsLoading(false)
            setEvents(events);
		}

		if (!isRequesting) {
            initEvents();
        }
    }, [isLoading]);
    
    return (
        <div>
            <h2>Events</h2>
            {
                isLoading && <p>Loading...</p>
            }
            {
                !isLoading && events.map(contact => (
                    <p key={contact.id}>{contact.first_name}</p>
                ))
            }
        </div>
    )
}

export default Events;