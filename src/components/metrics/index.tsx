import React, {useState, useEffect} from 'react';
import api from '../../shared/api';
import {IContact} from '../../shared/interfaces';

type Props = {

}

const Metrics: React.ComponentType<Props> = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [isRequesting, setIsRequesting] = useState<boolean>(false);
    const [metrics, setMetrics] = useState<IContact[]>([]);

    useEffect(() => {
		async function initMetrics() {
            setIsRequesting(true)
            const {data: metrics} = await api.get('/metrics')
			setIsRequesting(false)
            setIsLoading(false)
            setMetrics(metrics);
		}

		if (!isRequesting) {
            initMetrics();
        }
    }, [isLoading]);
    
    return (
        <div>
            <h2>Metrics</h2>
            {
                isLoading && <p>Loading...</p>
            }
            {
                !isLoading && metrics.map(contact => (
                    <p key={contact.id}>{contact.first_name}</p>
                ))
            }
        </div>
    )
}

export default Metrics;