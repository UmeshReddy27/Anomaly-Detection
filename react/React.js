// src/components/Dashboard.js

import React, { useState, useEffect } from 'react';

function Dashboard() {
  const [alerts, setAlerts] = useState([]);

  const analyzeSequence = async (sequence) => {
    try {
      // --- IMPORTANT CHANGE FOR SAME LAPTOP ---
      const response = await fetch('http://localhost:8000/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ data: sequence }),
      });
      if (!response.ok) throw new Error('Network response was not ok');
      return await response.json();
    } catch (error) {
      console.error("API call failed:", error);
    }
  };

  // ... (The rest of the file is the same) ...

  useEffect(() => {
    const intervalId = setInterval(async () => {
      const sampleSequence = [
        [99999, 6, 6, 999999, 11698, 999, 0, 52.67, 9999, 0, 1949.67, 10315.8, 14322.6, 30948, 0, 30948, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [5, 4, 2, 43, 92, 21, 0, 10.75, 52, 0, 46.0, 76466.7, 132454.4, 229400, 0, 229400, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [99999, 6, 6, 999999, 11698, 999, 0, 52.67, 9999, 0, 1949.67, 10315.8, 14322.6, 30948, 0, 30948, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [5, 4, 2, 43, 92, 21, 0, 10.75, 52, 0, 46.0, 76466.7, 132454.4, 229400, 0, 229400, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [99999, 6, 6, 999999, 11698, 999, 0, 52.67, 9999, 0, 1949.67, 10315.8, 14322.6, 30948, 0, 30948, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [5, 4, 2, 43, 92, 21, 0, 10.75, 52, 0, 46.0, 76466.7, 132454.4, 229400, 0, 229400, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [99999, 6, 6, 999999, 11698, 999, 0, 52.67, 9999, 0, 1949.67, 10315.8, 14322.6, 30948, 0, 30948, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [5, 4, 2, 43, 92, 21, 0, 10.75, 52, 0, 46.0, 76466.7, 132454.4, 229400, 0, 229400, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [99999, 6, 6, 999999, 11698, 999, 0, 52.67, 9999, 0, 1949.67, 10315.8, 14322.6, 30948, 0, 30948, 0, 0, 0, 0, 0, 0, 0, 0, 0],
        [5, 4, 2, 43, 92, 21, 0, 10.75, 52, 0, 46.0, 76466.7, 132454.4, 229400, 0, 229400, 0, 0, 0, 0, 0, 0, 0, 0, 0],
      ];
      const result = await analyzeSequence(sampleSequence);
      if (result && result.is_anomaly) {
        const newAlert = {
          id: new Date().getTime(),
          score: result.anomaly_score.toFixed(4),
          time: new Date().toLocaleTimeString(),
        };
        setAlerts(prevAlerts => [newAlert, ...prevAlerts]);
      }
    }, 5000);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Network Anomaly Detection Dashboard</h1>
      <h2>Live Alerts</h2>
      <ul>
        {alerts.length === 0 ? (
          <p>No anomalies detected yet. Monitoring...</p>
        ) : (
          alerts.map(alert => (
            <li key={alert.id}>
              <strong>Anomaly Detected!</strong> Score: {alert.score} at {alert.time}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}

export default Dashboard;