
const sendMail = require('./sendMails');



async function sendMatchedItemsMail(userEmail, matchedItems) {
  if (!matchedItems || matchedItems.length === 0) {
    return;
  }

  const subject = 'Matched Items Found for Your Lost Report';

  // Plain text version
  const text = matchedItems.map((item, idx) =>
    `${idx + 1}. Name: ${item.name}\nDescription: ${item.description}\nImage: ${item.image}\nLocation: ${item.location}
  \nLink: ${item.id || ''}\nstatus: ${item.claimed}\ndate: ${item.date || 'N/A'}\n`
  ).join('\n');

  // HTML version
  const html = `
    <h2>Matched Items Found</h2>
    <ul>
      ${matchedItems.map(item => `
        <li>
          <strong>Name:</strong> ${item.name}<br/>
          <strong>Description:</strong> ${item.description}<br/>
          <strong>Location:</strong> ${item.location}<br/>
          <strong>Date:</strong> ${item.date || 'N/A'}<br/>
          <strong>Status:</strong> ${item.claimed}<br/>
          <img src="${item.image}" alt="${item.name}" style="max-width:200px; max-height:200px;"/><br/>
          <a href="${item.id || '#'}" target="_blank">View Item</a>
        </li>
      `).join('')}
    </ul>
  `;

  await sendMail(userEmail, subject, text, html);
}

module.exports = sendMatchedItemsMail;
