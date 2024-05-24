"use client"

import React, { useEffect, useState } from 'react';
import { UserButton } from "@clerk/nextjs";
import axios from 'axios';
import AuthWrapper from './auth-wrapper';
import EndpointForm from './endpoint-form';
import EndpointList from './endpoint-list';

export function Dashboard() {
  const [endpoints, setEndpoints] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchEndpoints = async (token: any) => {
    try {
      const response = await axios.get('https://api-mocket.azurewebsites.net/api/Endpoints', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEndpoints(response.data);
    } catch (error) {
      console.error('Error fetching endpoints:', error);
    } finally {
      setLoading(false);
    }
  };
  
  return (
    <AuthWrapper>
      {({ token }: {token: any}) => (
        <main className="flex flex-col gap-8 p-6 md:p-10">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">API Mocked Endpoints</h1>
            <div className="flex justify-end">
              <EndpointForm token={token} fetchEndpoints={() => fetchEndpoints(token)} />
              <div className="flex items-center pl-10">
                <UserButton />
              </div>
            </div>
          </div>
          {loading ? (
            <div>Loading...</div>
          ) : (
            <EndpointList endpoints={endpoints} />
          )}
        </main>
      )}
    </AuthWrapper>
  );
}
