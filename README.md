# Guilded Rich Activity Spotify Service

> ALTHOUGH THIS PROJECT TRIES TO RESPECT RATELIMITS AND KEEP EXPLOITS TO A MINIMUM, THIS PROJECT STILL USES THE CLIENT API AND IS THUS AUTOMATICALLY IN A GREY ZONE, I MADE IT TO LEARN MORE ABOUT TAURI, RUST, BROWSERSIDE SVELTEKIT AND THE GUILDED API, I WONT BE RESPONSIBLE IF ANYTHING HAPPENS TO YOUR ACCOUNT IN USING THIS PROJECT AND AS MUCH AS I LIKE THIS PROJ I DEFINITELY DONT GUARANTEE ANY MAINTANENCE OR USER SUPPORT FOR THIS PROJECT, PROCEED AT YOUR OWN WILL.

The **Guilded Rich Activity Spotify Service** is an application built with Tauri, utilizing SvelteKit and Rust. It is specifically designed to operate within the constraints of the Guilded Client API rate limits and prioritize user privacy/protection. To use this application, users are required to create their own Spotify app on the Spotify Developer Dashboard, add the client ID and client secret as environment variables in the `.env` file during the compilation process. Please note that this project needs to be compiled from source.

## Prerequisites

Before you get started, ensure that you have the following prerequisites:

- **Node.js and npm**: Required for running the SvelteKit app.
- **Rust and Cargo**: Needed for building the Rust components.
- **Yarn**: The project relies on Yarn for managing dependencies and running in the development environment.
- A **Spotify Developer Account**: You must have an account to create and configure your Spotify app.

## Installation

Follow these steps to set up the Guilded Rich Activity Spotify Service:

1. Clone the project repository:

   ```shell
   git clone https://github.com/sohamjaiswal/grass
   cd grass
   ```

2. Create a `.env` file in the project's root directory and include your Spotify app's client ID and client secret:

   ```plaintext
   CLIENT_ID=your_client_id
   CLIENT_SECRET=your_client_secret
   ```

3. Install project dependencies using Yarn:

   ```shell
   yarn
   ```

## Usage

To run the Guilded Rich Activity Spotify Service, follow these instructions:

1. Start the live development server:

   ```shell
   yarn tauri dev
   ```

2. Login to Guilded and backup current status from the profile page accessible by clicking your pfp in the sidebar menu.

3. Link spotify, turn on the service (will start spotify api polling monitor and, reset your status to the backup status, if not actively transitting music status to guilded)

4. Turn on guilded sync, and if everything is fine, your status will be set to what you are listening, you can finetune some parameters of your status in [get-status.ts](src/lib/get-status.ts)

**Note**: Spotify authentication tokens expire after 1 hour, so be prepared to reauthorize periodically.

## Other Stuff
Enjoy using the Guilded Rich Activity Spotify Service! Your contributions are welcome to make it even better.