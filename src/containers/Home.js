import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

const Home = () => 
{
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search)
        if (queryParams.has('state')) {
            queryParams.delete('state')
        }
        if (queryParams.has('code')) {
            queryParams.delete('code')
        }
        if (queryParams.has('scope')) {
            queryParams.delete('scope')
        }
        if (queryParams.has('authuser')) {
            queryParams.delete('authuser')
        }
        if (queryParams.has('prompt')) {
            queryParams.delete('prompt')
        }

        navigate(queryParams.toString(), { replace: true }); 
        
      }, []);

    return (
        <div className='container'>
            <div className="jumbotron mt-5">
                <h1 className="display-4">Welcome to Auto Generations</h1>
                <p className="lead">Auto Generations allows you to automate your ecommerce print stores with ease</p>
                <hr className="my-4" />
                <p>Connect your Etsy, Shopify, and other ecomerce stores to Auto Generations to start fulfilling orders automatically. Generate content with the built in 
                    MidJourney dashboard.</p>
                <p className="lead">
                    <a className="btn btn-primary btn-lg" href="#" role="button">Sign Up</a>
                </p>    
            </div>
        </div>
    );
};

export default Home;