import React, {useEffect} from 'react';
import { Link } from 'react-router-dom';
import './../styles/AllStyles.css'
import backgroundImage from './../assets/background.svg'

const NotFound = () => {
    useEffect(() => {
        document.body.style.backgroundImage = `url(${backgroundImage})`;
        document.body.style.backgroundSize = 'cover';
        document.body.style.backgroundRepeat = 'no-repeat';
        document.body.style.backgroundPosition = 'center center';

        return () => {
            document.body.style.backgroundImage = '';
            document.body.style.backgroundSize = '';
            document.body.style.backgroundRepeat = '';
            document.body.style.backgroundPosition = '';
          };
      }, []);
  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/">Go Back to Homepage</Link>
    </div>
  );
};

export default NotFound;
