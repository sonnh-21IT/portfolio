import './Loading.css';
import { Spinner } from 'react-bootstrap';

export default function Loading() {
    return (
        <div className="loading-spinner-overlay">
            <Spinner animation="border" role="status" style={{ width: '3rem', height: '3rem' }}>
                <span className="visually-hidden">Loading...</span>
            </Spinner>
        </div>
    );
};