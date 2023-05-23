import React, { useState } from 'react';
import './AlertModalNoData.css';

function AlertModalNoData(props) {
    const [showModal, setShowModal] = useState(true);

      return (
        <div className={showModal ? "modal display-block" : "modal display-none"}>
            <section className="modal-main">
                <span>The app may currently show mock data.</span><br/>
                <span>Thank you for your understanding.</span><br/><br/>
                <button onClick={() => setShowModal(false)}>Close</button>
            </section>
        </div>

      )
  }
  
  export default AlertModalNoData;