import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import './CryptoList.css';

function CryptoList() {
  const [cryptos, setCryptos] = useState([]);
  const [prices, setPrices] = useState({});
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/coins/markets')
    .then(response => {
      console.log('Data fetched:', response.data);
      setCryptos(response.data);
      const pricesData = {};
      response.data.forEach(crypto => {
        pricesData[crypto.id] = {
          labels: crypto.sparkline_in_7d.price.map((_, index) => index),
          data: crypto.sparkline_in_7d.price
        };
      });
      setPrices(pricesData);
    })
    .catch(error => {
      console.error('Ошибка при получении данных:', error);
    });
  }, []);

  const filteredCryptos = cryptos.filter(crypto =>
    crypto.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <section className="crypto-list">
      <h2>Цены на криптовалюты</h2>
      <input
        type="text"
        placeholder="Поиск криптовалюты..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <table>
        <thead>
          <tr>
            <th>Криптовалюта</th>
            <th>Цена</th>
            <th>Рыночная капитализация</th>
            <th>Тренд за 7 дней</th>
          </tr>
        </thead>
        <tbody>
          {filteredCryptos.map(crypto => (
            <tr key={crypto.id}>
              <td>{crypto.name}</td>
              <td>${crypto.current_price.toLocaleString()}</td>
              <td>${crypto.market_cap.toLocaleString()}</td>
              <td>
                {prices[crypto.id] && (
                  <div className="chart-container">
                    <Line
                      data={{
                        labels: prices[crypto.id].labels,
                        datasets: [
                          {
                            label: 'Цена',
                            data: prices[crypto.id].data,
                            borderColor: 'rgba(75,192,192,1)',
                            borderWidth: 2,
                            fill: false
                          }
                        ]
                      }}
                      options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        scales: {
                          x: { display: false },
                          y: { display: false }
                        },
                        plugins: {
                          legend: { display: false }
                        }
                      }}
                    />
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default CryptoList;

