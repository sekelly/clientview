
import React from 'react';

import './App.css';

declare var ZoomMtg

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.4.0/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function App() {

  // setup your signature endpoint here: https://github.com/zoom/meetingsdk-sample-signature-node.js
  var signatureEndpoint = 'https://websdk210.herokuapp.com/'
  var apiKey = 'qzloYzd5SRKT9ve2PMc88Q'
  var meetingNumber = new URLSearchParams(window.location.search).get('meetingnumber')
  var role = 0
  var leaveUrl = 'https://zoom.us/'
  var userName = 'Client View 240a'
  var userEmail = ''
  var passWord = new URLSearchParams(window.location.search).get('passcode')
  // pass in the registrant's token if your meeting or webinar requires registration. More info here:
  // Meetings: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/meetings#join-registered
  // Webinars: https://marketplace.zoom.us/docs/sdk/native-sdks/web/client-view/webinars#join-registered
  var registrantToken = ''
  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          apiKey: apiKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className="App">
      <main>
        <h1>WebSDK Client View 240</h1>

        <button onClick={getSignature}>MeetNow Train</button>
      </main>
      <h2>No Pain No Gain</h2>
      <p>Schedule Appointment</p>
      <p>Goals</p>
      <p>Personal Records</p>
    </div>
  );
}

export default App;
