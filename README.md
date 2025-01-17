# Crypto Payment Bot

A Telegram bot for processing cryptocurrency payments using the Cryptomus API. This bot handles payment creation, status checking, and database management with a seamless integration of scheduled tasks and user interactions.

## Features

- **Payment Creation**: Generate payment links with unique identifiers.
- **Payment Status Check**: Automatically checks and updates the status of payments.
- **Database Integration**: Stores payment details in a database.
- **Cron Jobs**: Periodically checks payment statuses.

## How It Works

### Payment Creation

When a user sends the `/start` command:

1. A payment is created using the Cryptomus API.
2. The payment details are stored in the database.
3. The bot replies with a payment link.

### Scheduled Payment Updates

- A cron job runs every 5 seconds to:
  1. Fetch incomplete payments from the database.
  2. Check their status via the Cryptomus API.
  3. Update the database and notify the user if the payment is complete.
