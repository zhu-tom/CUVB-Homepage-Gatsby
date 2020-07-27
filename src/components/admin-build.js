import React, { useState } from 'react';
import { getUser } from '../services/auth';

export default function Build() {
    const [isLoading, setIsLoading] = useState(false);

    const rebuild = () => {
        setIsLoading(true);
        fetch(`${process.env.GATSBY_API_URL || ""}/api/build`, {
            headers: {
                "Authorization": getUser()._id,
            },
            method: "GET",
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <>
            <p>
                <a href="https://app.netlify.com/sites/competent-williams-c5d8f7/deploys">
                    <img src="https://api.netlify.com/api/v1/badges/477bb40d-8de2-4975-868b-da6bceef3a79/deploy-status" alt="Netlify Status"/>
                </a>
            </p>
            <div className="field">
                <div className="control">
                    <button className={`button is-primary ${isLoading ? "is-loading":""}`} onClick={rebuild}>Update & Rebuild Site</button>
                </div>
            </div>
        </>
    );
}