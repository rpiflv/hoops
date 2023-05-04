import React, { useState } from 'react';
import './AlertModalNoData.css';

function AlertModalNoData(props) {
    const [showModal, setShowModal] = useState(true);

      return (
        <div className={showModal ? "modal display-block" : "modal display-none"}>
            <section className="modal-main">
                <p>The app may currently show mock data.</p>
                <p>Thank you for your understanding.</p>

                <button onClick={() => setShowModal(false)}>Close</button>
            </section>
        </div>

      )
  }
  
  export default AlertModalNoData;